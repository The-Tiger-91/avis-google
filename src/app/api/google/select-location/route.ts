import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchBusinessHours, fetchReviews, parseStarRating } from '@/lib/google/reviews'
import { generateReviewResponse } from '@/lib/ai/client'
import { isDangerous } from '@/lib/utils'
import { NextResponse } from 'next/server'

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000
const TWELVE_MONTHS_MS = 365 * 24 * 60 * 60 * 1000

interface PendingLocation {
  account_name: string
  location_name: string
  title: string
  address: string | null
}

export async function POST(request: Request) {
  try {
    const { session_id, selected_location_names } = await request.json()

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Fetch pending connection
    const { data: pending } = await supabase
      .from('pending_google_connections')
      .select('*')
      .eq('id', session_id)
      .eq('user_id', user.id)
      .single()

    if (!pending) return NextResponse.json({ error: 'Session expired' }, { status: 404 })

    const selectedLocations = (pending.locations as PendingLocation[]).filter(
      (loc) => selected_location_names.includes(loc.location_name)
    )

    for (const loc of selectedLocations) {
      const hours = await fetchBusinessHours(pending.access_token, loc.location_name)

      const { data: business } = await supabase
        .from('businesses')
        .upsert(
          {
            user_id: user.id,
            google_account_id: loc.account_name,
            google_location_name: loc.location_name,
            business_name: loc.title,
            address: loc.address,
            google_access_token: pending.access_token,
            google_refresh_token: pending.refresh_token,
            google_token_expires_at: pending.token_expires_at,
            business_hours: hours,
            google_connected_at: new Date().toISOString(),
          },
          { onConflict: 'google_location_name', ignoreDuplicates: false }
        )
        .select()
        .single()

      if (business && !business.initial_sync_done) {
        await runInitialSync(pending.access_token, business, loc.location_name)
      }
    }

    // Clean up pending connection
    await supabase
      .from('pending_google_connections')
      .delete()
      .eq('id', session_id)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Select location error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runInitialSync(accessToken: string, business: any, locationName: string) {
  const supabase = createAdminClient()
  const now = new Date()
  const twelveMonthsAgo = new Date(now.getTime() - TWELVE_MONTHS_MS)
  const thirtyDaysAgo = new Date(now.getTime() - THIRTY_DAYS_MS)

  try {
    const googleReviews = await fetchReviews(accessToken, locationName, twelveMonthsAgo)

    for (const gReview of googleReviews) {
      const rating = parseStarRating(gReview.starRating)
      const reviewDate = new Date(gReview.createTime)
      const isRecent = reviewDate >= thirtyDaysAgo
      const hasGoogleReply = !!gReview.reviewReply

      let status = 'ignored'
      if (hasGoogleReply) {
        status = 'responded'
      } else if (isRecent) {
        status = 'new'
      }

      const comment = gReview.comment || null
      const { data: newReview, error: reviewError } = await supabase
        .from('reviews')
        .insert({
          business_id: business.id,
          google_review_id: gReview.reviewId,
          reviewer_name: gReview.reviewer?.displayName || null,
          reviewer_photo_url: gReview.reviewer?.profilePhotoUrl || null,
          rating,
          comment,
          review_created_at: gReview.createTime,
          status,
          photo_urls: gReview.photos?.map((p: { photoUri: string }) => p.photoUri) || [],
          is_dangerous: isDangerous(comment),
        })
        .select()
        .single()

      if (reviewError || !newReview) continue

      if (status === 'new') {
        try {
          const aiText = await generateReviewResponse({
            businessName: business.business_name,
            businessType: business.business_type,
            tonePreference: business.tone_preference || 'professionnel',
            customInstructions: business.custom_instructions,
            reviewerName: gReview.reviewer?.displayName || null,
            rating,
            comment: gReview.comment || null,
          })

          await supabase.from('responses').insert({
            review_id: newReview.id,
            ai_generated_text: aiText,
            status: 'draft',
          })

          await supabase
            .from('reviews')
            .update({ status: 'response_pending' })
            .eq('id', newReview.id)
        } catch {
          // AI generation failed — cron will retry
        }
      }
    }

    await supabase
      .from('businesses')
      .update({
        initial_sync_done: true,
        last_poll_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq('id', business.id)
  } catch (error) {
    console.error('Initial sync error for', business.business_name, error)
  }
}

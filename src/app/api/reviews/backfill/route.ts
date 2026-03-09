import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateReviewResponse } from '@/lib/ai/client'
import { getAuthenticatedClient, postReply } from '@/lib/google/reviews'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { businessId, since } = await request.json()

  if (!businessId || !since) {
    return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
  }

  // Verify ownership
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!business) {
    return NextResponse.json({ error: 'Établissement non trouvé' }, { status: 404 })
  }

  const sinceDate = new Date(since)

  // Find ignored reviews since the chosen date
  const { data: ignoredReviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('business_id', businessId)
    .eq('status', 'ignored')
    .gte('review_created_at', sinceDate.toISOString())
    .order('review_created_at', { ascending: false })

  if (!ignoredReviews || ignoredReviews.length === 0) {
    return NextResponse.json({ processed: 0, message: 'Aucun avis ancien à traiter' })
  }

  let processed = 0
  let errors = 0

  // Refresh Google token if needed for auto mode
  let accessToken = business.google_access_token
  if (business.response_mode === 'auto') {
    try {
      const { newAccessToken } = await getAuthenticatedClient(
        business.google_access_token,
        business.google_refresh_token,
        business.google_token_expires_at
      )
      if (newAccessToken) {
        accessToken = newAccessToken
        await supabase
          .from('businesses')
          .update({ google_access_token: newAccessToken })
          .eq('id', business.id)
      }
    } catch {
      // continue with existing token
    }
  }

  for (const review of ignoredReviews) {
    try {
      const aiText = await generateReviewResponse({
        businessName: business.business_name,
        businessType: business.business_type,
        tonePreference: business.tone_preference || 'professionnel',
        customInstructions: business.custom_instructions,
        reviewerName: review.reviewer_name,
        rating: review.rating,
        comment: review.comment,
      })

      const { data: newResponse } = await supabase
        .from('responses')
        .insert({
          review_id: review.id,
          ai_generated_text: aiText,
          status: 'draft',
        })
        .select()
        .single()

      if (business.response_mode === 'auto' && newResponse) {
        try {
          const reviewName = `${business.google_location_name}/reviews/${review.google_review_id}`
          await postReply(accessToken, reviewName, aiText)

          await supabase
            .from('responses')
            .update({ status: 'published', final_text: aiText, published_at: new Date().toISOString() })
            .eq('id', newResponse.id)

          await supabase
            .from('reviews')
            .update({ status: 'responded' })
            .eq('id', review.id)
        } catch {
          await supabase
            .from('reviews')
            .update({ status: 'response_pending' })
            .eq('id', review.id)
        }
      } else {
        await supabase
          .from('reviews')
          .update({ status: 'response_pending' })
          .eq('id', review.id)
      }

      processed++
    } catch {
      errors++
    }
  }

  return NextResponse.json({ processed, errors, total: ignoredReviews.length })
}

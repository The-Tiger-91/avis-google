import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  fetchReviews,
  parseStarRating,
  getAuthenticatedClient,
  postReply,
} from '@/lib/google/reviews'
import { generateReviewResponse } from '@/lib/ai/client'
import { isDangerous } from '@/lib/utils'

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const results: { business: string; newReviews: number; errors: string[] }[] = []

  // Fetch all active businesses
  const { data: businesses, error: bizError } = await supabase
    .from('businesses')
    .select('*')
    .eq('is_active', true)

  if (bizError || !businesses) {
    return NextResponse.json({ error: 'Failed to fetch businesses' }, { status: 500 })
  }

  for (const business of businesses) {
    const businessResult = { business: business.business_name, newReviews: 0, errors: [] as string[] }

    try {
      if (!business.google_access_token || !business.google_location_name) {
        businessResult.errors.push('Missing Google credentials or location')
        results.push(businessResult)
        continue
      }

      // Refresh token if needed
      const { newAccessToken, newExpiresAt } = await getAuthenticatedClient(
        business.google_access_token,
        business.google_refresh_token,
        business.google_token_expires_at
      )

      const accessToken = newAccessToken || business.google_access_token

      // Update tokens if refreshed
      if (newAccessToken) {
        await supabase
          .from('businesses')
          .update({
            google_access_token: newAccessToken,
            google_token_expires_at: newExpiresAt,
            updated_at: new Date().toISOString(),
          })
          .eq('id', business.id)
      }

      // Fetch reviews from Google
      const googleReviews = await fetchReviews(accessToken, business.google_location_name)

      for (const gReview of googleReviews) {
        // Check if review already exists
        const { data: existing } = await supabase
          .from('reviews')
          .select('id')
          .eq('google_review_id', gReview.reviewId)
          .single()

        if (existing) continue // Already processed

        // Insert new review
        const rating = parseStarRating(gReview.starRating)
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
            status: 'new',
            photo_urls: gReview.photos?.map(p => p.photoUri) || [],
            is_dangerous: isDangerous(comment),
          })
          .select()
          .single()

        if (reviewError || !newReview) {
          businessResult.errors.push(`Failed to insert review: ${reviewError?.message}`)
          continue
        }

        // Skip reviews that already have a reply on Google
        if (gReview.reviewReply) {
          await supabase
            .from('reviews')
            .update({ status: 'responded' })
            .eq('id', newReview.id)
          continue
        }

        // Generate AI response
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

          // Insert response
          const { data: newResponse } = await supabase
            .from('responses')
            .insert({
              review_id: newReview.id,
              ai_generated_text: aiText,
              status: 'draft',
            })
            .select()
            .single()

          // Auto mode: publish immediately
          if (business.response_mode === 'auto' && newResponse) {
            try {
              const reviewName = `${business.google_location_name}/reviews/${gReview.reviewId}`
              await postReply(accessToken, reviewName, aiText)

              await supabase
                .from('responses')
                .update({
                  status: 'published',
                  final_text: aiText,
                  published_at: new Date().toISOString(),
                })
                .eq('id', newResponse.id)

              await supabase
                .from('reviews')
                .update({ status: 'responded' })
                .eq('id', newReview.id)
            } catch (publishError) {
              const errMsg = publishError instanceof Error ? publishError.message : 'Unknown error'
              await supabase
                .from('responses')
                .update({ status: 'failed', error_message: errMsg })
                .eq('id', newResponse!.id)

              businessResult.errors.push(`Failed to auto-publish: ${errMsg}`)
            }
          } else {
            // Validation mode: mark as pending
            await supabase
              .from('reviews')
              .update({ status: 'response_pending' })
              .eq('id', newReview.id)
          }

          businessResult.newReviews++
        } catch (aiError) {
          const errMsg = aiError instanceof Error ? aiError.message : 'AI generation failed'
          businessResult.errors.push(errMsg)
        }
      }

      // Update last_poll_at
      await supabase
        .from('businesses')
        .update({
          last_poll_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', business.id)
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error'
      businessResult.errors.push(errMsg)
    }

    results.push(businessResult)
  }

  return NextResponse.json({
    success: true,
    processed: results.length,
    results,
  })
}

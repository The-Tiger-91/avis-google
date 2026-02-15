import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateReviewResponse } from '@/lib/ai/client'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { reviewId } = await request.json()

  if (!reviewId) {
    return NextResponse.json({ error: 'reviewId manquant' }, { status: 400 })
  }

  // Fetch review with business (verify ownership)
  const { data: review } = await supabase
    .from('reviews')
    .select('*, businesses!inner(*)')
    .eq('id', reviewId)
    .eq('businesses.user_id', user.id)
    .single()

  if (!review) {
    return NextResponse.json({ error: 'Avis non trouvé' }, { status: 404 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const business = (review as any).businesses

  // Generate new AI response
  const aiText = await generateReviewResponse({
    businessName: business.business_name,
    businessType: business.business_type,
    tonePreference: business.tone_preference || 'professionnel',
    customInstructions: business.custom_instructions,
    reviewerName: review.reviewer_name,
    rating: review.rating,
    comment: review.comment,
  })

  // Insert new response (mark old ones as rejected)
  await supabase
    .from('responses')
    .update({ status: 'rejected' })
    .eq('review_id', reviewId)
    .eq('status', 'draft')

  const { data: newResponse } = await supabase
    .from('responses')
    .insert({
      review_id: reviewId,
      ai_generated_text: aiText,
      status: 'draft',
    })
    .select()
    .single()

  return NextResponse.json({ response: newResponse })
}

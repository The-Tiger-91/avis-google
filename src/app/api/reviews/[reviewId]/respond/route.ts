import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedClient, postReply } from '@/lib/google/reviews'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const { reviewId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const body = await request.json()
  const { responseId, finalText, action } = body

  if (!responseId || !action) {
    return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
  }

  // Verify ownership: review -> business -> user
  const { data: review } = await supabase
    .from('reviews')
    .select('*, businesses!inner(*, profiles!inner(id))')
    .eq('id', reviewId)
    .eq('businesses.user_id', user.id)
    .single()

  if (!review) {
    return NextResponse.json({ error: 'Avis non trouvé' }, { status: 404 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const business = (review as any).businesses

  if (action === 'reject') {
    await supabase
      .from('responses')
      .update({ status: 'rejected', updated_at: new Date().toISOString() })
      .eq('id', responseId)

    await supabase
      .from('reviews')
      .update({ status: 'ignored' })
      .eq('id', reviewId)

    return NextResponse.json({ success: true })
  }

  if (action === 'approve') {
    if (!finalText) {
      return NextResponse.json({ error: 'Texte de réponse manquant' }, { status: 400 })
    }

    try {
      // Refresh Google token
      const { newAccessToken } = await getAuthenticatedClient(
        business.google_access_token,
        business.google_refresh_token,
        business.google_token_expires_at
      )

      const accessToken = newAccessToken || business.google_access_token

      if (newAccessToken) {
        await supabase
          .from('businesses')
          .update({ google_access_token: newAccessToken })
          .eq('id', business.id)
      }

      // Post reply to Google
      const reviewName = `${business.google_location_name}/reviews/${review.google_review_id}`
      await postReply(accessToken, reviewName, finalText)

      // Update response
      await supabase
        .from('responses')
        .update({
          status: 'published',
          final_text: finalText,
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', responseId)

      // Update review
      await supabase
        .from('reviews')
        .update({ status: 'responded' })
        .eq('id', reviewId)

      return NextResponse.json({ success: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur de publication'

      await supabase
        .from('responses')
        .update({ status: 'failed', error_message: message })
        .eq('id', responseId)

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
}

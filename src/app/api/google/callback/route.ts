import { createClient } from '@/lib/supabase/server'
import { getGoogleTokens } from '@/lib/google/auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state') // user id

  if (!code || !state) {
    return NextResponse.redirect(`${origin}/etablissements?error=missing_params`)
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.id !== state) {
      return NextResponse.redirect(`${origin}/connexion`)
    }

    const tokens = await getGoogleTokens(code)

    if (!tokens.access_token) {
      return NextResponse.redirect(`${origin}/etablissements?error=no_token`)
    }

    // Sauvegarde les tokens immédiatement (les établissements seront chargés depuis le modal)
    const { data: pending } = await supabase
      .from('pending_google_connections')
      .insert({
        user_id: user.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || null,
        token_expires_at: tokens.expiry_date
          ? new Date(tokens.expiry_date).toISOString()
          : null,
        locations: [],
      })
      .select('id')
      .single()

    if (!pending) {
      return NextResponse.redirect(`${origin}/etablissements?error=session_failed`)
    }

    return NextResponse.redirect(`${origin}/tableau-de-bord?session=${pending.id}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Google OAuth callback error:', message)
    return NextResponse.redirect(`${origin}/etablissements?error=oauth_failed&detail=${encodeURIComponent(message)}`)
  }
}

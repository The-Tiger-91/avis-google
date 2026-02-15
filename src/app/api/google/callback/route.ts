import { createClient } from '@/lib/supabase/server'
import { getGoogleTokens } from '@/lib/google/auth'
import { fetchAccounts, fetchLocations } from '@/lib/google/reviews'
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

    // Exchange code for tokens
    const tokens = await getGoogleTokens(code)

    if (!tokens.access_token) {
      return NextResponse.redirect(`${origin}/etablissements?error=no_token`)
    }

    // Fetch accounts and locations
    const accounts = await fetchAccounts(tokens.access_token)

    for (const account of accounts) {
      const locations = await fetchLocations(tokens.access_token, account.name)

      for (const location of locations) {
        // Create a business entry for each location
        await supabase.from('businesses').upsert(
          {
            user_id: user.id,
            google_account_id: account.name,
            google_location_name: location.name,
            business_name: location.title || 'Mon commerce',
            address: location.storefrontAddress?.addressLines?.join(', ') || null,
            google_access_token: tokens.access_token,
            google_refresh_token: tokens.refresh_token || null,
            google_token_expires_at: tokens.expiry_date
              ? new Date(tokens.expiry_date).toISOString()
              : null,
          },
          {
            onConflict: 'google_location_name',
            ignoreDuplicates: false,
          }
        )
      }
    }

    return NextResponse.redirect(`${origin}/etablissements?success=true`)
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(`${origin}/etablissements?error=oauth_failed`)
  }
}

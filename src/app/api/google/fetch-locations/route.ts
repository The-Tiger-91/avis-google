import { createClient } from '@/lib/supabase/server'
import { fetchAccounts, fetchLocations } from '@/lib/google/reviews'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { session_id } = await request.json()
    if (!session_id) {
      return NextResponse.json({ error: 'missing session_id' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const { data: session } = await supabase
      .from('pending_google_connections')
      .select('access_token')
      .eq('id', session_id)
      .eq('user_id', user.id)
      .single()

    if (!session) {
      return NextResponse.json({ error: 'session not found' }, { status: 404 })
    }

    const locations: Array<{
      account_name: string
      location_name: string
      title: string
      address: string | null
    }> = []

    const accounts = await fetchAccounts(session.access_token)
    for (const account of accounts) {
      const locs = await fetchLocations(session.access_token, account.name)
      for (const loc of locs) {
        locations.push({
          account_name: account.name,
          location_name: loc.name,
          title: loc.title || 'Mon commerce',
          address: loc.storefrontAddress?.addressLines?.join(', ') || null,
        })
      }
    }

    // Met à jour la session avec les établissements trouvés
    await supabase
      .from('pending_google_connections')
      .update({ locations })
      .eq('id', session_id)

    return NextResponse.json({ locations })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('fetch-locations error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

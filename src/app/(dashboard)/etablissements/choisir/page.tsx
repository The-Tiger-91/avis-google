import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LocationPicker } from '@/components/dashboard/location-picker'

const MAX_BUSINESSES = 5

export default async function ChoisirEtablissementPage({
  searchParams,
}: {
  searchParams: { session?: string }
}) {
  const sessionId = searchParams.session
  if (!sessionId) redirect('/etablissements')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const { data: pending } = await supabase
    .from('pending_google_connections')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .single()

  if (!pending) redirect('/etablissements?error=session_expired')

  const { count: existingCount } = await supabase
    .from('businesses')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const remaining = MAX_BUSINESSES - (existingCount || 0)

  if (remaining <= 0) redirect('/etablissements')

  return (
    <div className="max-w-lg mx-auto pt-10 space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 48 48" className="h-7 w-7">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
          </div>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Choisissez votre établissement</h1>
        <p className="text-sm text-gray-500 mt-1">
          {pending.locations.length === 1
            ? 'Nous avons trouvé 1 établissement dans votre compte Google Business.'
            : `Nous avons trouvé ${pending.locations.length} établissements dans votre compte Google Business.`
          }
        </p>
      </div>

      <LocationPicker
        sessionId={sessionId}
        locations={pending.locations}
        maxSelect={remaining}
      />
    </div>
  )
}

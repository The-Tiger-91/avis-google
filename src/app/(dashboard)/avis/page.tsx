import { createClient } from '@/lib/supabase/server'
import { ReviewListClient } from '@/components/dashboard/review-list-client'
import Link from 'next/link'
import { Store } from 'lucide-react'

export default async function AvisPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null // middleware gère le redirect

  const { data: businesses } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)

  if (!businesses || businesses.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tous les avis</h1>
          <p className="text-gray-500 mt-1">Consultez et gérez tous les avis de vos établissements</p>
        </div>
        <div className="flex justify-center pt-8">
          <div className="text-center max-w-sm">
            <Store className="h-10 w-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-4">
              Connectez un établissement Google Business pour voir vos avis ici.
            </p>
            <Link
              href="/etablissements/nouveau"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Connecter un établissement
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const businessIds = businesses.map((b) => b.id)

  const { data: reviews } = await supabase
    .from('reviews')
    .select(`*, responses (*)`)
    .in('business_id', businessIds)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tous les avis</h1>
        <p className="text-gray-500 mt-1">
          Consultez et gérez tous les avis de vos établissements
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 border rounded-lg px-3 py-2 w-fit">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Synchronisation automatique toutes les 15 minutes
      </div>

      <ReviewListClient initialReviews={reviews || []} showViewAll={false} />
    </div>
  )
}

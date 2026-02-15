import { createClient } from '@/lib/supabase/server'
import { ReviewListClient } from '@/components/dashboard/review-list-client'

export default async function AvisPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: businesses } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user!.id)

  const businessIds = businesses?.map((b) => b.id) || []

  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      responses (*)
    `)
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

      <ReviewListClient initialReviews={reviews || []} />
    </div>
  )
}

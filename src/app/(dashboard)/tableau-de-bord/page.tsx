import { createClient } from '@/lib/supabase/server'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { Card, CardContent } from '@/components/ui/card'
import { Store } from 'lucide-react'
import Link from 'next/link'
import { ReviewListClient } from '@/components/dashboard/review-list-client'

export default async function TableauDeBordPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get user's businesses
  const { data: businesses } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user!.id)

  const businessIds = businesses?.map((b) => b.id) || []

  if (businessIds.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <Card>
          <CardContent className="text-center py-12">
            <Store className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Bienvenue sur Reply Genius !
            </h3>
            <p className="text-gray-500 mb-6">
              Connectez votre premier établissement pour commencer.
            </p>
            <Link
              href="/etablissements"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
            >
              Connecter mon Google Business
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Fetch stats
  const { count: newReviewsCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .in('business_id', businessIds)
    .in('status', ['new', 'response_pending'])

  const { count: respondedCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .in('business_id', businessIds)
    .eq('status', 'responded')

  const { data: ratingData } = await supabase
    .from('reviews')
    .select('rating')
    .in('business_id', businessIds)

  const avgRating = ratingData && ratingData.length > 0
    ? ratingData.reduce((sum, r) => sum + r.rating, 0) / ratingData.length
    : 0

  const { count: pendingCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .in('business_id', businessIds)
    .eq('status', 'response_pending')

  // Fetch recent reviews with responses
  const { data: recentReviews } = await supabase
    .from('reviews')
    .select(`
      *,
      responses (*)
    `)
    .in('business_id', businessIds)
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>

      <StatsCards
        newReviews={newReviewsCount || 0}
        responsesSent={respondedCount || 0}
        averageRating={avgRating}
        pendingResponses={pendingCount || 0}
      />

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Avis récents</h2>
        <ReviewListClient initialReviews={recentReviews || []} />
      </div>
    </div>
  )
}

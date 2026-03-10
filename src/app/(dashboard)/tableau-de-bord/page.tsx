import { createClient } from '@/lib/supabase/server'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ReviewListClient } from '@/components/dashboard/review-list-client'
import { HoursCard } from '@/components/dashboard/hours-card'
import { InsightsCard } from '@/components/dashboard/insights-card'
import { BusinessSelector } from '@/components/dashboard/business-selector'
import { ConnectGoogleButton } from '@/components/dashboard/connect-google-button'
import { LocationPickerModal } from '@/components/dashboard/location-picker-modal'
import { MOCK_REVIEWS, MOCK_BUSINESSES } from '@/lib/mock-data'

const GoogleBadge = () => (
  <span className="flex items-center gap-1.5 text-sm bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full font-medium shadow-sm">
    <svg viewBox="0 0 48 48" className="h-5 w-5 flex-shrink-0">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
    Google
  </span>
)

function LockedView({ dismissed }: { dismissed?: boolean }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-sm text-gray-400 mt-0.5">Aucun établissement connecté</p>
      </div>
      <StatsCards newReviews={0} responsesSent={0} averageRating={0} pendingResponses={0} />
      <div className="flex justify-center pt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="h-9 w-9">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
            </div>
          </div>
          {dismissed ? (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Vous n&apos;avez pas sélectionné d&apos;établissement
              </h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Sans établissement connecté, vos avis Google ne peuvent pas être affichés ni traités par l&apos;IA. Connectez-en un maintenant.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Connectez Google Business</h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Reliez votre établissement pour recevoir vos avis Google et laisser l&apos;IA y répondre automatiquement.
              </p>
            </>
          )}
          <ConnectGoogleButton />
          <p className="text-xs text-gray-400 mt-3">Prend moins de 2 minutes</p>
        </div>
      </div>
    </div>
  )
}

function DemoView() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-sm text-gray-500 mt-0.5">{MOCK_BUSINESSES[0].business_name}</p>
        </div>
        <BusinessSelector businesses={MOCK_BUSINESSES} selectedId={MOCK_BUSINESSES[0].id} />
      </div>
      <StatsCards newReviews={12} responsesSent={47} averageRating={4.3} pendingResponses={3} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Avis récents</h2>
            <GoogleBadge />
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Synchro toutes les 15 min
            </span>
          </div>
          <ReviewListClient initialReviews={MOCK_REVIEWS} />
        </div>
        <div className="space-y-4 mt-11 sticky top-0">
          <HoursCard />
          <InsightsCard reviews={MOCK_REVIEWS} />
        </div>
      </div>
    </div>
  )
}

export default async function TableauDeBordPage({
  searchParams,
}: {
  searchParams: { business?: string; preview?: string; session?: string; dismissed?: string }
}) {
  if (searchParams.preview === 'locked') return <LockedView />
  if (searchParams.preview === 'demo') return <DemoView />

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Charge la session Google OAuth si présente (après connexion Google Business)
  type PendingLocation = { account_name: string; location_name: string; title: string; address: string | null }
  let pendingSession: { id: string; locations: PendingLocation[] } | null = null
  if (searchParams.session) {
    const { data } = await supabase
      .from('pending_google_connections')
      .select('id, locations')
      .eq('id', searchParams.session)
      .eq('user_id', user.id)
      .single()
    if (data) pendingSession = { id: data.id, locations: data.locations as PendingLocation[] }
  }

  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, business_name, business_hours')
    .eq('user_id', user.id)

  // Pas d'établissement → vue verrouillée (+ modal si session en cours)
  if (!businesses || businesses.length === 0) {
    return (
      <>
        <LockedView dismissed={searchParams.dismissed === '1'} />
        {pendingSession && (
          <LocationPickerModal
            sessionId={pendingSession.id}
            locations={pendingSession.locations}
          />
        )}
      </>
    )
  }

  // Établissement sélectionné (par URL param ou le premier par défaut)
  const selectedId = searchParams.business && businesses.some(b => b.id === searchParams.business)
    ? searchParams.business
    : businesses[0].id

  const selectedBusiness = businesses.find(b => b.id === selectedId)!
  const filterIds = [selectedId]

  const { count: newReviewsCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .in('business_id', filterIds)
    .in('status', ['new', 'response_pending'])

  const { count: respondedCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .in('business_id', filterIds)
    .eq('status', 'responded')

  const { data: ratingData } = await supabase
    .from('reviews')
    .select('rating')
    .in('business_id', filterIds)

  const avgRating = ratingData && ratingData.length > 0
    ? ratingData.reduce((sum, r) => sum + r.rating, 0) / ratingData.length
    : 0

  const { count: pendingCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .in('business_id', filterIds)
    .eq('status', 'response_pending')

  const { data: recentReviews } = await supabase
    .from('reviews')
    .select(`*, responses (*)`)
    .in('business_id', filterIds)
    .order('created_at', { ascending: false })
    .limit(20)

  const allReviews = ratingData || []

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-sm text-gray-500 mt-0.5">{selectedBusiness.business_name}</p>
        </div>
        <BusinessSelector businesses={businesses} selectedId={selectedId} />
      </div>

      <StatsCards
        newReviews={newReviewsCount || 0}
        responsesSent={respondedCount || 0}
        averageRating={avgRating}
        pendingResponses={pendingCount || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Avis récents</h2>
            <GoogleBadge />
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Synchro toutes les 15 min
            </span>
          </div>
          <ReviewListClient initialReviews={recentReviews || []} businessName={selectedBusiness.business_name} />
        </div>
        <div className="space-y-4 mt-11 sticky top-0">
          <HoursCard hours={selectedBusiness.business_hours} />
          <InsightsCard reviews={allReviews} />
        </div>
      </div>
    </div>
  )
}

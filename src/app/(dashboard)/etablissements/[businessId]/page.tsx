import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ReviewListClient } from '@/components/dashboard/review-list-client'
import { MapPin, ArrowLeft, Settings } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DeleteBusinessButton } from './delete-button'
import { BackfillButton } from './backfill-button'

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const { businessId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .eq('user_id', user!.id)
    .single()

  if (!business) {
    notFound()
  }

  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      responses (*)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })

  const totalReviews = reviews?.length || 0
  const avgRating = totalReviews > 0
    ? (reviews!.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '—'
  const respondedCount = reviews?.filter(r => r.status === 'responded').length || 0
  const pendingCount = reviews?.filter(r => r.status === 'new' || r.status === 'response_pending').length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/etablissements"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {business.business_name}
          </h1>
          {business.address && (
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="h-3.5 w-3.5" />
              {business.address}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={business.is_active ? 'success' : 'default'}>
            {business.is_active ? 'Actif' : 'Inactif'}
          </Badge>
          <Badge variant={business.response_mode === 'auto' ? 'info' : 'warning'}>
            {business.response_mode === 'auto' ? 'Auto' : 'Validation'}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total avis', value: totalReviews },
          { label: 'Note moyenne', value: avgRating },
          { label: 'Répondu', value: respondedCount },
          { label: 'En attente', value: pendingCount },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info & Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Informations</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Type</span>
              <p className="font-medium text-gray-900 mt-0.5">
                {business.business_type || '—'}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Ton</span>
              <p className="font-medium text-gray-900 mt-0.5 capitalize">
                {business.tone_preference || 'professionnel'}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Mode de réponse</span>
              <p className="font-medium text-gray-900 mt-0.5">
                {business.response_mode === 'auto' ? 'Automatique' : 'Validation manuelle'}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Dernier scan</span>
              <p className="font-medium text-gray-900 mt-0.5">
                {business.last_poll_at
                  ? new Date(business.last_poll_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Jamais'}
              </p>
            </div>
          </div>

          {business.custom_instructions && (
            <div className="pt-3 border-t">
              <span className="text-sm text-gray-500">Instructions personnalisées</span>
              <p className="text-sm text-gray-900 mt-1">{business.custom_instructions}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-3 border-t flex-wrap">
            <Link href="/parametres">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
                Modifier les paramètres
              </Button>
            </Link>
            <BackfillButton
              businessId={business.id}
              googleConnectedAt={business.google_connected_at || null}
            />
            <DeleteBusinessButton businessId={business.id} businessName={business.business_name} />
          </div>

        </CardContent>
      </Card>

      {/* Reviews */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Avis ({totalReviews})
        </h2>
        <ReviewListClient initialReviews={reviews || []} />
      </div>
    </div>
  )
}

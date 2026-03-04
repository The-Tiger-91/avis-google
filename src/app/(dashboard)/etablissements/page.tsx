import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Store, MapPin } from 'lucide-react'
import Link from 'next/link'
import { ConnectGoogleButton } from '@/components/dashboard/connect-google-button'

const MAX_BUSINESSES = 5

export default async function EtablissementsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null // middleware gère le redirect

  const businesses = (await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })).data || []

  const atLimit = businesses.length >= MAX_BUSINESSES

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes établissements</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            Gérez vos commerces connectés à Google Business
            <span className={`text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded-full ${
              atLimit ? 'bg-amber-50 text-amber-500' : 'bg-gray-100 text-gray-400'
            }`}>
              {businesses.length} / {MAX_BUSINESSES}
            </span>
          </p>
        </div>
        {!atLimit && <ConnectGoogleButton />}
        {atLimit && (
          <span className="text-xs text-amber-500 font-medium bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg">
            Limite atteinte — passez en Premium+
          </span>
        )}
      </div>

      {businesses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Store className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun établissement connecté
            </h3>
            <p className="text-gray-500 mb-6">
              Connectez votre Google Business pour commencer à répondre aux avis automatiquement.
            </p>
            <ConnectGoogleButton />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {businesses.map((business) => (
            <Link key={business.id} href={`/etablissements/${business.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <Store className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {business.business_name}
                      </h3>
                      {business.address && (
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {business.address}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={business.is_active ? 'success' : 'default'}>
                      {business.is_active ? 'Actif' : 'Inactif'}
                    </Badge>
                    <Badge variant={business.response_mode === 'auto' ? 'info' : 'warning'}>
                      {business.response_mode === 'auto' ? 'Auto' : 'Validation'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

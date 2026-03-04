import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap } from 'lucide-react'
import { AbonnementPlans } from './plans'

export default async function AbonnementPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const plan = user?.user_metadata?.plan || 'pro'
  const userBilling = user?.user_metadata?.billing || 'monthly'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Abonnement</h1>
        <p className="text-gray-500 mt-1">
          Gérez votre plan et votre facturation
        </p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Plan actuel
            </h2>
            <Badge variant={plan === 'premium' ? 'info' : 'success'}>
              {plan === 'premium' ? 'Premium' : 'Pro'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {plan === 'premium'
                ? (userBilling === 'yearly' ? '42' : '49')
                : (userBilling === 'yearly' ? '25' : '29')}€
            </span>
            <span className="text-gray-400">/mois</span>
            {userBilling === 'yearly' && (
              <span className="text-xs text-green-600 font-medium ml-1">(annuel)</span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Votre abonnement est actif.
          </p>
          <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 rounded-lg p-3">
            <Zap className="h-4 w-4 flex-shrink-0" />
            <span>
              L&apos;intégration Stripe pour le paiement sera disponible prochainement.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Plan comparison */}
      <h2 className="text-lg font-semibold text-gray-900">Comparer les plans</h2>
      <AbonnementPlans currentPlan={plan} />

      <p className="text-xs text-gray-400 text-center">
        Sans engagement, annulez à tout moment. Le paiement Stripe sera activé prochainement.
      </p>
    </div>
  )
}

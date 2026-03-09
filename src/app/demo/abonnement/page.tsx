import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Pro',
    price: { monthly: 29, yearly: 25 },
    features: [
      '1 établissement',
      '50 réponses/mois',
      'Choix du ton',
      'Mode validation manuelle',
      'Statistiques & rapports',
      'Historique 12 mois',
      'Support email',
    ],
    variant: 'success' as const,
    cta: 'Choisir Pro',
  },
  {
    name: 'Premium',
    price: { monthly: 49, yearly: 42 },
    features: [
      '5 établissements',
      'Réponses illimitées',
      'Choix du ton',
      'Mode validation manuelle',
      'Mode automatique',
      'Instructions personnalisées',
      'Réponses multilingues',
      'Statistiques & rapports',
      'Historique illimité',
      'Support prioritaire',
    ],
    variant: 'info' as const,
    cta: 'Choisir Premium',
    recommended: true,
  },
]

export default function DemoAbonnementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Abonnement</h1>
        <p className="text-gray-500 mt-1">Choisissez le plan adapté à votre activité</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 rounded-lg p-3 border border-yellow-100">
        <Zap className="h-4 w-4 flex-shrink-0" />
        Mode démo — <Link href="/inscription" className="underline font-medium">Créez un compte</Link> pour souscrire.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.recommended ? 'ring-2 ring-indigo-500' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{plan.name}</h2>
                <div className="flex items-center gap-2">
                  {plan.recommended && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                      Recommandé
                    </span>
                  )}
                  <Badge variant={plan.variant}>{plan.name}</Badge>
                </div>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-gray-900">{plan.price.monthly}€</span>
                <span className="text-gray-400">/mois</span>
              </div>
              <p className="text-xs text-green-600 font-medium">{plan.price.yearly}€/mois en annuel</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/inscription"
                className="block text-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                {plan.cta}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

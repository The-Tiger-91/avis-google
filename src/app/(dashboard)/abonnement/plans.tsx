'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const plans = [
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 29,
    yearlyPrice: 25,
    features: [
      '1 établissement',
      '50 réponses/mois',
      'Choix du ton',
      'Support email',
    ],
    color: 'blue',
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 49,
    yearlyPrice: 42,
    features: [
      '5 établissements',
      'Réponses illimitées',
      'Mode automatique',
      'Instructions personnalisées',
      'Support prioritaire',
    ],
    color: 'purple',
  },
]

export function AbonnementPlans({ currentPlan }: { currentPlan: string }) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')

  return (
    <div>
      {/* Toggle mensuel/annuel */}
      <div className="relative flex items-center justify-center gap-3 mb-6">
        <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>
          Mensuel
        </span>
        <button
          type="button"
          onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
          className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
            billing === 'yearly' ? 'bg-purple-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
              billing === 'yearly' ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${billing === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>
          Annuel
        </span>
        <span className={`absolute left-1/2 ml-2 translate-x-[5.2rem] text-xs font-bold px-2 py-0.5 rounded-full transition-opacity ${
          billing === 'yearly' ? 'bg-green-100 text-green-700 opacity-100' : 'opacity-0'
        }`}>
          -15%
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {plans.map((p) => {
          const isCurrent = p.id === currentPlan
          const price = billing === 'yearly' ? p.yearlyPrice : p.monthlyPrice
          const originalPrice = billing === 'yearly' ? p.monthlyPrice : null
          const borderColor = isCurrent
            ? p.color === 'purple'
              ? 'border-purple-600 ring-1 ring-purple-600'
              : 'border-blue-600 ring-1 ring-blue-600'
            : 'border-gray-200'

          return (
            <Card key={p.id} className={borderColor}>
              <CardContent className="py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                  {isCurrent && (
                    <Badge variant="success">Actuel</Badge>
                  )}
                </div>
                <div className="mb-1">
                  {originalPrice && (
                    <span className="text-lg line-through text-gray-400 mr-2">
                      {originalPrice}€
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">{price}€</span>
                  <span className="text-gray-400 text-sm">/mois</span>
                </div>
                {billing === 'yearly' && (
                  <p className="text-xs text-gray-400 mb-4">
                    Facturé {price * 12}€/an
                  </p>
                )}
                {billing === 'monthly' && <div className="mb-4" />}
                <ul className="space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${
                        p.color === 'purple' ? 'text-purple-500' : 'text-blue-500'
                      }`} />
                      {f}
                    </li>
                  ))}
                </ul>
                {!isCurrent && (
                  <button
                    className={`w-full mt-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                      p.color === 'purple'
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled
                  >
                    {p.id === 'premium' ? 'Passer au Premium' : 'Rétrograder'}
                  </button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

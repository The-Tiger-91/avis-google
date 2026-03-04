'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Pro',
    monthlyPrice: 29,
    yearlyPrice: 25,
    features: ['1 établissement', '50 réponses/mois', 'Choix du ton', 'Support email'],
    highlighted: false,
    plan: 'pro',
  },
  {
    name: 'Premium',
    monthlyPrice: 49,
    yearlyPrice: 42,
    features: ['5 établissements', 'Réponses illimitées', 'Mode automatique', 'Instructions personnalisées', 'Support prioritaire'],
    highlighted: true,
    plan: 'premium',
  },
]

export function PricingToggle() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')

  return (
    <div>
      {/* Toggle */}
      <div className="relative flex items-center justify-center gap-3 mb-10">
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

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {PLANS.map((plan) => {
          const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
          const originalPrice = billing === 'yearly' ? plan.monthlyPrice : null

          return (
            <div
              key={plan.name}
              className={`rounded-xl p-6 border relative ${
                plan.highlighted
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg scale-105'
                  : 'bg-white'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-0.5 rounded-full">
                  Populaire
                </div>
              )}
              <h3
                className={`text-lg font-semibold mb-2 ${
                  plan.highlighted ? 'text-white' : 'text-gray-900'
                }`}
              >
                {plan.name}
              </h3>
              <div className="mb-1">
                {originalPrice && (
                  <span className={`text-lg line-through mr-2 ${plan.highlighted ? 'text-purple-300' : 'text-gray-400'}`}>
                    {originalPrice}€
                  </span>
                )}
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {price}€
                </span>
                <span className={plan.highlighted ? 'text-purple-200' : 'text-gray-400'}>
                  /mois
                </span>
              </div>
              {billing === 'yearly' && (
                <p className={`text-xs mb-4 ${plan.highlighted ? 'text-purple-200' : 'text-gray-400'}`}>
                  Facturé {price * 12}€/an
                </p>
              )}
              {billing === 'monthly' && <div className="mb-6" />}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2 text-sm ${
                      plan.highlighted ? 'text-purple-100' : 'text-gray-600'
                    }`}
                  >
                    <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? 'text-purple-200' : 'text-blue-600'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/inscription?plan=${plan.plan}${billing === 'yearly' ? '&billing=yearly' : ''}`}
                className={`block text-center py-2.5 rounded-lg font-medium text-sm ${
                  plan.highlighted
                    ? 'bg-white text-purple-600 hover:bg-purple-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Commencer
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  Star,
  CreditCard,
  Shield,
  Lock,
  Loader2,
  Check,
  CheckCircle2,
} from 'lucide-react'

function detectCardBrand(number: string): 'visa' | 'mastercard' | null {
  const clean = number.replace(/\s/g, '')
  if (clean.startsWith('4')) return 'visa'
  if (clean.startsWith('5') || clean.startsWith('2')) return 'mastercard'
  return null
}

function formatCardNumber(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 16)
  return clean.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 4)
  if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2)
  return clean
}

export default function PaiementPage() {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardName, setCardName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [plan, setPlan] = useState<string>('pro')
  const [billing, setBilling] = useState<string>('yearly')
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/connexion')
        return
      }
      if (user.user_metadata?.has_paid) {
        router.push('/tableau-de-bord')
        return
      }
      setPlan(user.user_metadata?.plan || 'pro')
      setBilling(user.user_metadata?.billing || 'yearly')
      setPageLoading(false)
    })
  }, [router])

  const prices: Record<string, Record<string, { monthly: number; yearly: number; yearlyTotal: number }>> = {
    pro: { monthly: { monthly: 29, yearly: 25, yearlyTotal: 300 }, yearly: { monthly: 29, yearly: 25, yearlyTotal: 300 } },
    premium: { monthly: { monthly: 49, yearly: 42, yearlyTotal: 504 }, yearly: { monthly: 49, yearly: 42, yearlyTotal: 504 } },
  }

  const currentPrice = billing === 'yearly'
    ? prices[plan]?.yearly?.yearly || 25
    : prices[plan]?.monthly?.monthly || 29

  const yearlyTotal = prices[plan]?.yearly?.yearlyTotal || 300

  const features: Record<string, string[]> = {
    pro: ['1 établissement', '50 réponses/mois', 'Choix du ton', 'Support email'],
    premium: ['5 établissements', 'Réponses illimitées', 'Mode automatique', 'Instructions personnalisées', 'Support prioritaire'],
  }

  const cardClean = cardNumber.replace(/\s/g, '')
  const expiryClean = expiry.replace('/', '')
  const isValid = cardClean.length === 16 && expiryClean.length === 4 && cvc.length === 3 && cardName.trim().length > 0
  const brand = detectCardBrand(cardNumber)

  async function handlePay() {
    if (!isValid) return
    setLoading(true)

    // Simulation du paiement (2 secondes)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const supabase = createClient()
    await supabase.auth.updateUser({
      data: { has_paid: true },
    })

    setSuccess(true)

    // Redirect après animation
    setTimeout(() => {
      router.push('/tableau-de-bord')
      router.refresh()
    }, 2000)
  }

  if (pageLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-lg w-full animate-pulse h-96" />
    )
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-lg w-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-scale-in">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Paiement confirmé !</h2>
        <p className="text-sm text-gray-500">Redirection vers votre tableau de bord...</p>
        <Loader2 className="h-5 w-5 text-gray-400 animate-spin mt-4" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-lg w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-6 w-6 text-purple-600" />
        <span className="text-lg font-bold font-logo">Reply Genius</span>
      </div>

      {/* Récapitulatif du plan */}
      <div className={`rounded-xl border p-4 mb-6 ${plan === 'premium' ? 'border-purple-200 bg-purple-50' : 'border-blue-200 bg-blue-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className={`text-sm font-bold ${plan === 'premium' ? 'text-purple-700' : 'text-blue-700'}`}>
              Plan {plan === 'premium' ? 'Premium' : 'Pro'}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              {billing === 'yearly' ? 'Facturation annuelle' : 'Facturation mensuelle'}
            </span>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${plan === 'premium' ? 'text-purple-700' : 'text-blue-700'}`}>
              {currentPrice}€
            </span>
            <span className="text-xs text-gray-500">/mois</span>
          </div>
        </div>
        {billing === 'yearly' && (
          <p className="text-xs text-gray-500 mb-3">
            Facturé {yearlyTotal}€/an — vous économisez {plan === 'premium' ? '84' : '48'}€
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {(features[plan] || features.pro).map((f) => (
            <span key={f} className="flex items-center gap-1 text-[11px] text-gray-600">
              <CheckCircle2 className={`h-3 w-3 ${plan === 'premium' ? 'text-purple-500' : 'text-blue-500'} flex-shrink-0`} />
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Formulaire de carte */}
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Informations de paiement</h3>

      <div className="space-y-3">
        {/* Numéro de carte */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Numéro de carte</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              className="w-full pl-10 pr-16 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
            {brand && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500 uppercase">
                {brand === 'visa' ? 'VISA' : 'MC'}
              </span>
            )}
          </div>
        </div>

        {/* Expiration + CVC */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Expiration</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
              placeholder="123"
              className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
        </div>

        {/* Nom sur la carte */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Nom sur la carte</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="JEAN DUPONT"
            className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm uppercase"
          />
        </div>
      </div>

      {/* Badges sécurité */}
      <div className="flex items-center justify-center gap-4 mt-4 mb-5">
        <span className="flex items-center gap-1 text-[11px] text-gray-400">
          <Lock className="h-3 w-3" />
          Paiement sécurisé
        </span>
        <span className="flex items-center gap-1 text-[11px] text-gray-400">
          <Shield className="h-3 w-3" />
          Données chiffrées
        </span>
      </div>

      {/* Bouton Payer */}
      <button
        onClick={handlePay}
        disabled={!isValid || loading}
        className={`w-full py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
          plan === 'premium'
            ? 'bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-40'
            : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40'
        } disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Payer {billing === 'yearly' ? `${yearlyTotal}€` : `${currentPrice}€`}
            {billing === 'yearly' && <span className="text-xs opacity-75">({currentPrice}€/mois)</span>}
          </>
        )}
      </button>

      <p className="text-[10px] text-gray-400 text-center mt-3">
        Sans engagement — annulez à tout moment depuis votre espace.
      </p>
    </div>
  )
}

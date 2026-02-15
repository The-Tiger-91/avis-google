'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  Star,
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  Lock,
  User,
  Loader2,
  Store,
  ChefHat,
  Wrench,
  Scissors,
  ShoppingBag,
  Heart,
  Building2,
  Car,
  Dumbbell,
  GraduationCap,
  CheckCircle2,
  MoreHorizontal,
} from 'lucide-react'
import Link from 'next/link'

const BUSINESS_TYPES = [
  { id: 'restauration', label: 'Restauration', icon: ChefHat },
  { id: 'boulangerie', label: 'Boulangerie / Pâtisserie', icon: Store },
  { id: 'coiffure', label: 'Coiffure / Beauté', icon: Scissors },
  { id: 'garage', label: 'Garage / Auto', icon: Car },
  { id: 'commerce', label: 'Commerce / Boutique', icon: ShoppingBag },
  { id: 'sante', label: 'Santé / Bien-être', icon: Heart },
  { id: 'artisan', label: 'Artisan', icon: Wrench },
  { id: 'hotel', label: 'Hôtel / Hébergement', icon: Building2 },
  { id: 'sport', label: 'Sport / Fitness', icon: Dumbbell },
  { id: 'formation', label: 'Formation / Éducation', icon: GraduationCap },
  { id: 'autre', label: 'Autre', icon: MoreHorizontal },
]

const TONES = [
  { id: 'professionnel', label: 'Professionnel', desc: 'Courtois et sérieux, adapté à la plupart des activités.' },
  { id: 'amical', label: 'Amical', desc: 'Chaleureux et décontracté, idéal pour les commerces de proximité.' },
  { id: 'formel', label: 'Formel', desc: 'Très respectueux et soigné, parfait pour les hôtels ou cabinets.' },
]

export default function InscriptionPage() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState('')
  const [customType, setCustomType] = useState('')
  const [correctedType, setCorrectedType] = useState('')
  const [typeStatus, setTypeStatus] = useState<'idle' | 'ok' | 'invalid' | 'loading'>('idle')
  const [selectedTone, setSelectedTone] = useState('professionnel')
  const [businessName, setBusinessName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-correct custom type with debounce
  useEffect(() => {
    if (selectedType !== 'autre' || customType.trim().length < 3) {
      setCorrectedType('')
      setTypeStatus('idle')
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    setTypeStatus('loading')

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/ai/correct-type', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: customType }),
        })
        const data = await res.json()
        if (data.status === 'invalid') {
          setCorrectedType('')
          setTypeStatus('invalid')
        } else if (data.corrected && data.corrected.toLowerCase() !== customType.trim().toLowerCase()) {
          setCorrectedType(data.corrected)
          setTypeStatus('ok')
        } else {
          setCorrectedType('')
          setTypeStatus('ok')
        }
      } catch {
        setCorrectedType('')
        setTypeStatus('idle')
      }
    }, 600)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [customType, selectedType])

  const totalSteps = 4

  async function handleSignup() {
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          business_type: selectedType === 'autre' ? (correctedType || customType.trim()) : selectedType,
          business_name: businessName,
          tone_preference: selectedTone,
        },
      },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    router.push('/tableau-de-bord')
    router.refresh()
  }

  function canGoNext() {
    switch (step) {
      case 1: return selectedType !== '' && (selectedType !== 'autre' || (customType.trim().length > 0 && typeStatus !== 'invalid' && typeStatus !== 'loading'))
      case 2: return businessName.trim().length > 0
      case 3: return selectedTone !== ''
      case 4: return fullName && email && password.length >= 6
      default: return false
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-lg w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Star className="h-6 w-6 text-blue-600" />
        <span className="text-lg font-bold">Reply Genius</span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-8 mt-4">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i + 1 <= step ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Step 1: Type d'activité */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Quel est votre domaine ?
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Cela nous aide à personnaliser les réponses pour votre activité.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {BUSINESS_TYPES.map((type) => (
              <button
                type="button"
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all ${
                  selectedType === type.id
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <type.icon className={`h-4 w-4 flex-shrink-0 ${
                  selectedType === type.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </div>
          {selectedType === 'autre' && (
            <div>
              <input
                type="text"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                placeholder="Ex : Cabinet dentaire, Agence immobilière..."
                className={`w-full mt-3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
                  typeStatus === 'invalid' ? 'border-red-300 bg-red-50' : ''
                }`}
                autoFocus
              />
              {typeStatus === 'loading' && (
                <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Vérification...
                </p>
              )}
              {correctedType && typeStatus === 'ok' && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomType(correctedType)
                    setCorrectedType('')
                  }}
                  className="mt-2 text-xs text-green-600 hover:text-green-700 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Check className="h-3 w-3" />
                  Vouliez-vous dire « {correctedType} » ? Cliquez pour corriger
                </button>
              )}
              {typeStatus === 'invalid' && (
                <p className="mt-2 text-xs text-red-500">
                  Ce type d&apos;activité n&apos;est pas reconnu. Veuillez saisir un métier ou secteur valide.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Nom du commerce */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Nom de votre établissement
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Tel qu&apos;il apparaît sur Google.
          </p>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="ex : Boulangerie Martin, Garage du Centre..."
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            autoFocus
          />
        </div>
      )}

      {/* Step 3: Ton des réponses */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Quel ton pour vos réponses ?
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Choisissez le style qui correspond à votre image.
          </p>
          <div className="space-y-3">
            {TONES.map((tone) => (
              <button
                type="button"
                key={tone.id}
                onClick={() => setSelectedTone(tone.id)}
                className={`w-full flex items-start gap-3 p-4 rounded-lg border text-left transition-all ${
                  selectedTone === tone.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedTone === tone.id ? 'border-blue-600' : 'border-gray-300'
                }`}>
                  {selectedTone === tone.id && (
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    selectedTone === tone.id ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {tone.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{tone.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Plan info */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-900">Plan Pro</span>
              <span className="text-lg font-bold text-blue-600">29€<span className="text-xs font-normal text-blue-400">/mois</span></span>
            </div>
            <ul className="space-y-1.5">
              {['3 établissements', '100 réponses/mois', 'Mode validation', 'Choix du ton', 'Support prioritaire'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-blue-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-blue-400 mt-2">14 jours d&apos;essai gratuit, sans engagement</p>
          </div>
        </div>
      )}

      {/* Step 4: Création de compte */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Créez votre compte
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Dernière étape ! Vous pourrez connecter votre Google Business ensuite.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jean Dupont"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6 caractères minimum"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Résumé */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              <p className="text-xs text-gray-400">Résumé de votre configuration</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Activité</span>
                <span className="font-medium text-gray-900">
                  {selectedType === 'autre' ? (correctedType || customType) : BUSINESS_TYPES.find((t) => t.id === selectedType)?.label}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Établissement</span>
                <span className="font-medium text-gray-900">{businessName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ton</span>
                <span className="font-medium text-gray-900">
                  {TONES.find((t) => t.id === selectedTone)?.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={() => canGoNext() && setStep(step + 1)}
            disabled={!canGoNext()}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuer
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSignup}
            disabled={!canGoNext() || loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-40"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Créer mon compte
          </button>
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 mt-4">
        Étape {step} sur {totalSteps}
        {step === 1 && (
          <span className="block mt-2">
            Déjà un compte ?{' '}
            <Link href="/connexion" className="text-blue-600 hover:underline">
              Se connecter
            </Link>
          </span>
        )}
      </p>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
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
  Plus,
  X,
  ThumbsUp,
} from 'lucide-react'
import Link from 'next/link'

// Exemples d'avis et réponses par domaine et ton
const REVIEW_EXAMPLES: Record<string, { reviewer: string; rating: number; comment: string; responses: Record<string, string> }> = {
  restauration: {
    reviewer: 'Marie L.',
    rating: 4,
    comment: 'Très bon repas, le plat du jour était délicieux. Service un peu lent mais personnel agréable.',
    responses: {
      professionnel: 'Merci Marie pour votre retour. Nous sommes ravis que le plat du jour vous ait plu. Nous prenons note de votre remarque concernant le service et travaillons à améliorer nos délais. Au plaisir de vous revoir.',
      amical: 'Merci beaucoup Marie ! 😊 Super content que le plat du jour vous ait régalée ! On va bosser sur la rapidité du service, promis. À très vite chez nous !',
      formel: 'Chère Marie, nous vous remercions sincèrement pour ce retour détaillé. Nous sommes honorés que notre plat du jour ait su vous satisfaire. Veuillez accepter nos excuses pour le délai de service. Nous mettons tout en œuvre pour y remédier. Nous espérons avoir le plaisir de vous accueillir à nouveau.',
    },
  },
  boulangerie: {
    reviewer: 'Thomas R.',
    rating: 5,
    comment: 'Les croissants sont incroyables, les meilleurs du quartier ! J\'y vais tous les matins.',
    responses: {
      professionnel: 'Merci Thomas pour ce bel avis ! Nous sommes fiers de nos croissants, préparés chaque matin avec soin. C\'est un plaisir de vous compter parmi nos clients fidèles.',
      amical: 'Oh merci Thomas, ça fait trop plaisir ! 🥐 On met tout notre cœur dans nos croissants, et c\'est grâce à des clients comme vous qu\'on se lève à 4h du mat\' avec le sourire ! À demain !',
      formel: 'Cher Thomas, nous vous sommes très reconnaissants pour cet avis élogieux. Savoir que nos croissants font partie de votre quotidien est pour nous la plus belle des récompenses. Nous nous engageons à maintenir cette qualité. Merci pour votre fidélité.',
    },
  },
  coiffure: {
    reviewer: 'Sophie M.',
    rating: 4,
    comment: 'Très bonne coupe, la coiffeuse a bien compris ce que je voulais. Salon propre et ambiance agréable.',
    responses: {
      professionnel: 'Merci Sophie pour votre retour positif. Nous sommes contents que la coupe corresponde à vos attentes. Notre équipe met un point d\'honneur à écouter chaque cliente. À bientôt au salon.',
      amical: 'Merci Sophie ! 💇‍♀️ Trop contente que tu sois repartie avec la coupe parfaite ! On adore quand nos clientes sont ravies. On t\'attend pour la prochaine !',
      formel: 'Chère Sophie, nous vous remercions pour ce retour très apprécié. La satisfaction de nos clientes est notre priorité absolue, et nous sommes ravis d\'avoir su répondre à vos attentes. Nous serons honorés de vous accueillir à nouveau.',
    },
  },
  garage: {
    reviewer: 'Jean-Pierre D.',
    rating: 4,
    comment: 'Réparation rapide et prix honnête. Le mécanicien a bien expliqué le problème. Je recommande.',
    responses: {
      professionnel: 'Merci Jean-Pierre pour votre recommandation. La transparence et la rapidité sont essentielles pour nous. Nous sommes contents que notre mécanicien ait pris le temps de bien vous expliquer l\'intervention.',
      amical: 'Merci Jean-Pierre ! 🔧 On essaie toujours d\'être clairs et honnêtes avec nos clients. Content que la réparation ait été rapide ! N\'hésitez pas à revenir, on sera là !',
      formel: 'Cher Monsieur, nous vous remercions vivement pour cet avis et votre recommandation. Notre engagement envers la transparence et l\'excellence du service est au cœur de notre métier. Nous sommes à votre disposition pour tout besoin futur.',
    },
  },
  commerce: {
    reviewer: 'Claire B.',
    rating: 5,
    comment: 'Boutique très bien tenue, large choix et conseils personnalisés. J\'ai trouvé exactement ce que je cherchais.',
    responses: {
      professionnel: 'Merci Claire ! Nous sommes ravis de vous avoir aidée à trouver ce que vous cherchiez. Le conseil personnalisé est au cœur de notre approche. À bientôt dans notre boutique.',
      amical: 'Merci Claire ! 🛍️ Ça fait super plaisir ! On adore prendre le temps de bien conseiller nos clients. Contente que tu aies trouvé ton bonheur ! Reviens quand tu veux !',
      formel: 'Chère Claire, votre satisfaction nous honore. Nous nous efforçons d\'offrir un service de conseil personnalisé et un choix soigné. C\'est avec grand plaisir que nous vous accueillerons à nouveau.',
    },
  },
  sante: {
    reviewer: 'Marc V.',
    rating: 5,
    comment: 'Excellent praticien, très à l\'écoute. Les explications sont claires et le suivi est top.',
    responses: {
      professionnel: 'Merci Marc pour votre confiance. L\'écoute et la clarté des explications sont essentielles à une bonne prise en charge. Nous sommes heureux que le suivi vous convienne.',
      amical: 'Merci Marc ! 😊 C\'est super gentil. Votre bien-être est notre priorité et on est contents que vous vous sentiez bien accompagné. À bientôt !',
      formel: 'Cher Marc, nous vous remercions pour cet avis témoignant de votre confiance. L\'écoute attentive et la qualité du suivi sont les piliers de notre pratique. Nous restons à votre entière disposition.',
    },
  },
  artisan: {
    reviewer: 'Nathalie F.',
    rating: 4,
    comment: 'Travail soigné et dans les délais. Bon contact, je le recommande pour la plomberie.',
    responses: {
      professionnel: 'Merci Nathalie pour votre recommandation. Le respect des délais et la qualité du travail sont nos priorités. N\'hésitez pas à nous contacter pour tout futur besoin.',
      amical: 'Merci Nathalie ! 🔨 Content que le travail vous plaise et que les délais aient été respectés ! N\'hésitez surtout pas si vous avez besoin de quoi que ce soit !',
      formel: 'Chère Nathalie, nous vous sommes reconnaissants pour ce retour et votre recommandation. La rigueur et le soin apporté à chaque intervention sont nos engagements fondamentaux. Nous restons à votre disposition.',
    },
  },
  hotel: {
    reviewer: 'David & Laura',
    rating: 5,
    comment: 'Séjour parfait ! Chambre propre, petit-déjeuner copieux et personnel aux petits soins.',
    responses: {
      professionnel: 'Merci David et Laura pour ce retour élogieux. Nous sommes ravis que votre séjour ait été à la hauteur de vos attentes. Notre équipe sera ravie de vous accueillir à nouveau.',
      amical: 'Merci David et Laura ! ☀️ Trop contents que vous ayez passé un super séjour ! On transmet vos compliments à toute l\'équipe. On vous attend pour la prochaine escapade !',
      formel: 'Chers David et Laura, nous sommes profondément touchés par votre retour. L\'excellence de l\'accueil et le confort de nos hôtes sont notre raison d\'être. C\'est avec grand plaisir que nous vous accueillerons lors d\'un prochain séjour.',
    },
  },
  sport: {
    reviewer: 'Karim A.',
    rating: 4,
    comment: 'Super salle, équipements récents et coachs motivants. Ambiance top pour s\'entraîner.',
    responses: {
      professionnel: 'Merci Karim ! Nous investissons régulièrement dans nos équipements et la formation de nos coachs. Ravi que l\'ambiance vous motive. À bientôt pour votre prochaine séance.',
      amical: 'Merci Karim ! 💪 Ça motive de lire ça ! Nos coachs vont être super contents. On t\'attend pour ta prochaine session, on va tout donner !',
      formel: 'Cher Karim, nous vous remercions pour cet avis encourageant. La qualité de nos équipements et l\'expertise de nos coachs sont au cœur de notre engagement. Nous sommes honorés de contribuer à votre bien-être sportif.',
    },
  },
  formation: {
    reviewer: 'Émilie T.',
    rating: 5,
    comment: 'Formation très complète et formateur passionné. J\'ai appris énormément en quelques jours.',
    responses: {
      professionnel: 'Merci Émilie pour ce retour. Nous sommes heureux que la formation ait répondu à vos attentes. La passion et la pédagogie de nos formateurs font notre fierté.',
      amical: 'Merci Émilie ! 🎓 Trop content que tu aies appris plein de choses ! On transmet au formateur, il va être ravi. N\'hésite pas à revenir pour d\'autres formations !',
      formel: 'Chère Émilie, votre retour nous honore. L\'excellence pédagogique et la transmission du savoir sont au fondement de notre mission. Nous sommes ravis d\'avoir contribué à votre développement professionnel.',
    },
  },
}

// Exemple par défaut pour "autre" et types non listés
const DEFAULT_EXAMPLE = {
  reviewer: 'Isabelle C.',
  rating: 4,
  comment: 'Service de qualité, professionnel et à l\'écoute. Je recommande vivement.',
  responses: {
    professionnel: 'Merci Isabelle pour votre recommandation. Votre satisfaction est notre priorité et nous sommes ravis d\'avoir répondu à vos attentes. Au plaisir de vous revoir.',
    amical: 'Merci Isabelle ! 😊 Ça fait vraiment plaisir ! On est toujours là pour nos clients. N\'hésitez pas à revenir, on vous accueillera avec plaisir !',
    formel: 'Chère Isabelle, nous vous adressons nos sincères remerciements pour cet avis et votre recommandation. Votre confiance nous honore et nous nous engageons à maintenir ce niveau d\'exigence. Nous restons à votre entière disposition.',
  },
}

// Associe un type personnalisé au domaine d'exemple le plus proche
function matchCustomTypeToDomain(text: string): string | null {
  const t = text.toLowerCase()
  const mappings: [string[], string][] = [
    [['restaurant', 'café', 'bar', 'traiteur', 'pizzeria', 'brasserie', 'bistrot', 'snack', 'fast food', 'sushi', 'crêperie'], 'restauration'],
    [['boulang', 'pâtiss', 'chocolat', 'confiser', 'glacier'], 'boulangerie'],
    [['coiff', 'beauté', 'esthéti', 'ongler', 'manucur', 'barbier', 'barber', 'nail', 'maquill'], 'coiffure'],
    [['garage', 'auto', 'mécanicien', 'carrosseri', 'pneu', 'contrôle technique', 'lavage'], 'garage'],
    [['boutique', 'magasin', 'commerce', 'épiceri', 'supermarché', 'fleuriste', 'librairi', 'bijout', 'opticien', 'pharmacie'], 'commerce'],
    [['médecin', 'docteur', 'dentist', 'kiné', 'ostéopath', 'psycholog', 'infirmi', 'sage-femme', 'véto', 'vétérinair', 'ophtalmo', 'dermato', 'cabinet médical', 'clinique', 'laboratoir', 'santé', 'bien-être', 'spa', 'massage', 'thérapeut'], 'sante'],
    [['plombi', 'électrici', 'menuisi', 'peintre', 'maçon', 'charpent', 'serrurier', 'chauffagist', 'couvreur', 'jardinier', 'paysagist', 'artisan', 'rénovation', 'déménag'], 'artisan'],
    [['hôtel', 'hotel', 'gîte', 'chambre d\'hôte', 'auberge', 'hébergement', 'camping', 'résidence', 'location vacance'], 'hotel'],
    [['salle de sport', 'fitness', 'musculation', 'yoga', 'pilates', 'danse', 'boxe', 'arts martiaux', 'piscine', 'coach sportif', 'crossfit'], 'sport'],
    [['formation', 'école', 'cours', 'auto-école', 'enseignement', 'tutorat', 'soutien scolaire', 'centre de formation', 'université', 'institut'], 'formation'],
    [['avocat', 'notaire', 'huissier', 'cabinet', 'juridique', 'comptabl', 'expert-comptabl', 'conseil', 'consultant', 'assurance', 'banque', 'agence immobilièr', 'immobilier', 'architecte', 'agence'], 'commerce'],
  ]

  for (const [keywords, domain] of mappings) {
    for (const keyword of keywords) {
      if (t.includes(keyword)) return domain
    }
  }
  return null
}

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
  { id: 'professionnel', label: 'Professionnel', desc: 'Courtois et sérieux, adapté à la plupart des activités.', color: 'indigo' },
  { id: 'amical', label: 'Amical', desc: 'Chaleureux et décontracté, idéal pour les commerces de proximité.', color: 'green' },
  { id: 'formel', label: 'Formel', desc: 'Très respectueux et soigné, parfait pour les hôtels ou cabinets.', color: 'amber' },
]

const TONE_COLORS: Record<string, { border: string; bg: string; radio: string; text: string }> = {
  indigo: { border: 'border-indigo-600', bg: 'bg-indigo-50', radio: 'bg-indigo-600 border-indigo-600', text: 'text-indigo-700' },
  green:  { border: 'border-green-600',  bg: 'bg-green-50',  radio: 'bg-green-600 border-green-600',   text: 'text-green-700' },
  amber:  { border: 'border-amber-600',  bg: 'bg-amber-50',  radio: 'bg-amber-600 border-amber-600',   text: 'text-amber-700' },
}

export default function InscriptionPage() {
  return (
    <Suspense fallback={<div className="bg-white rounded-2xl shadow-sm border p-8 max-w-lg w-full animate-pulse h-96" />}>
      <InscriptionForm />
    </Suspense>
  )
}

function InscriptionForm() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [customType, setCustomType] = useState('')
  const [correctedType, setCorrectedType] = useState('')
  const [typeStatus, setTypeStatus] = useState<'idle' | 'ok' | 'invalid' | 'loading'>('idle')
  const [selectedTone, setSelectedTone] = useState('professionnel')
  const [toneAnimKey, setToneAnimKey] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'premium'>('pro')
  const [responseMode, setResponseMode] = useState<'validation' | 'auto'>('validation')
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  const [customInstructions, setCustomInstructions] = useState<string[]>([])
  const [newInstruction, setNewInstruction] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [errorField, setErrorField] = useState<'email' | 'password' | 'general' | ''>('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pré-sélectionner le plan et billing depuis l'URL
  useEffect(() => {
    const planParam = searchParams.get('plan')
    if (planParam === 'premium') {
      setSelectedPlan('premium')
    }
    const billingParam = searchParams.get('billing')
    if (billingParam === 'yearly') {
      setBilling('yearly')
    }
  }, [searchParams])

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

  const totalSteps = 5

  function translateError(msg: string): { message: string; field: 'email' | 'password' | 'general' } {
    const m = msg.toLowerCase()
    if (m.includes('invalid format') || m.includes('invalid email'))
      return { message: 'Adresse email invalide.', field: 'email' }
    if (m.includes('already registered') || m.includes('already been registered'))
      return { message: 'Cette adresse email est déjà utilisée.', field: 'email' }
    if (m.includes('password') && (m.includes('short') || m.includes('at least')))
      return { message: 'Le mot de passe doit contenir au moins 6 caractères.', field: 'password' }
    if (m.includes('password'))
      return { message: 'Mot de passe invalide.', field: 'password' }
    if (m.includes('rate limit') || m.includes('too many'))
      return { message: 'Trop de tentatives. Veuillez réessayer dans quelques minutes.', field: 'general' }
    if (m.includes('email'))
      return { message: 'Adresse email invalide.', field: 'email' }
    return { message: 'Une erreur est survenue. Veuillez réessayer.', field: 'general' }
  }

  async function handleSignup() {
    setError('')
    setErrorField('')
    setLoading(true)

    const supabase = createClient()
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          business_type: selectedType === 'autre' ? (correctedType || customType.trim()) : selectedType,
          tone_preference: selectedTone,
          plan: selectedPlan,
          billing: billing,
          response_mode: responseMode,
          custom_instructions: customInstructions.length > 0 ? customInstructions.join('\n') : '',
        },
      },
    })

    if (signupError) {
      const { message, field } = translateError(signupError.message)
      setError(message)
      setErrorField(field)
      setLoading(false)
      return
    }

    router.push('/paiement')
    router.refresh()
  }

  function canGoNext() {
    switch (step) {
      case 1: return selectedType !== '' && (selectedType !== 'autre' || (customType.trim().length > 0 && typeStatus !== 'invalid' && typeStatus !== 'loading'))
      case 2: return selectedPlatform !== ''
      case 3: return selectedTone !== ''
      case 4: return true
      case 5: return fullName && email && password.length >= 6
      default: return false
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-lg w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Star className="h-6 w-6 text-purple-600" />
        <span className="text-lg font-bold font-logo">Reply Genius</span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-8 mt-4">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i + 1 <= step ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Step 1: Type d'activité */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Quel est votre secteur d&apos;activité ?
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
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <type.icon className={`h-4 w-4 flex-shrink-0 ${
                  selectedType === type.id ? 'text-indigo-600' : 'text-gray-400'
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
                className={`w-full mt-3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm ${
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

      {/* Step 2: Plateforme */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Choisissez votre plateforme
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Sur quelle plateforme souhaitez-vous gérer vos avis ?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                id: 'google', name: 'Google',
                icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
              },
              {
                id: 'tripadvisor', name: 'TripAdvisor',
                icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#00AA6C"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/></svg>,
              },
              {
                id: 'trustpilot', name: 'Trustpilot',
                icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#00B67A"><path d="M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.84 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388 4.583-3.326L24 9.311z"/></svg>,
              },
              {
                id: 'booking', name: 'Booking.com',
                icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#003580"><path d="M24 0H0v24h24ZM8.575 6.563h2.658c2.108 0 3.473 1.15 3.473 2.898 0 1.15-.575 1.82-.91 2.108l-.287.263.335.192c.815.479 1.318 1.389 1.318 2.395 0 1.988-1.51 3.257-3.857 3.257H7.449V7.713c0-.623.503-1.126 1.126-1.15zm1.7 1.868c-.479.024-.694.264-.694.79v1.893h1.676c.958 0 1.294-.743 1.294-1.365 0-.815-.503-1.318-1.318-1.318zm-.096 4.36c-.407.071-.598.31-.598.79v2.251h1.868c.934 0 1.509-.55 1.509-1.533 0-.934-.599-1.509-1.51-1.509zm7.737 2.394c.743 0 1.341.599 1.341 1.342a1.34 1.34 0 0 1-1.341 1.341 1.355 1.355 0 0 1-1.341-1.341c0-.743.598-1.342 1.34-1.342z"/></svg>,
              },
              {
                id: 'facebook', name: 'Facebook',
                icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
              },
              {
                id: 'yelp', name: 'Yelp',
                icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#FF1A1A"><path d="m7.6885 15.1415-3.6715.8483c-.3769.0871-.755.183-1.1452.155-.2611-.0188-.5122-.0414-.7606-.213a1.179 1.179 0 0 1-.331-.3594c-.3486-.5519-.3656-1.3661-.3697-2.0004a6.2874 6.2874 0 0 1 .3314-2.0642 1.857 1.857 0 0 1 .1073-.2474 2.3426 2.3426 0 0 1 .1255-.2165 2.4572 2.4572 0 0 1 .1563-.1975 1.1736 1.1736 0 0 1 .399-.2831 1.082 1.082 0 0 1 .4592-.0837c.2355.0016.5139.052.91.1734.0555.0191.1237.0382.1856.0572.3277.1013.7048.2404 1.1499.3987.6863.2404 1.3663.487 2.0463.7397l1.2117.4423c.2217.0807.4363.18.6412.297.174.0984.3273.2298.4512.387a1.217 1.217 0 0 1 .192.4309 1.2205 1.2205 0 0 1-.872 1.4522c-.0468.0151-.0852.0239-.1085.0293l-1.105.2553zM18.8208 7.565a1.8506 1.8506 0 0 0-.2042-.1754 2.4082 2.4082 0 0 0-.2077-.1394 2.3607 2.3607 0 0 0-.2269-.109 1.1705 1.1705 0 0 0-.482-.0796 1.0862 1.0862 0 0 0-.4498.1263c-.2107.1048-.4388.2732-.742.5551-.042.0417-.0947.0886-.142.133-.2502.2351-.5286.5252-.8599.863a114.6363 114.6363 0 0 0-1.5166 1.5629l-.8962.9293a4.1897 4.1897 0 0 0-.4466.5483 1.541 1.541 0 0 0-.2364.5459 1.2199 1.2199 0 0 0 .0107.4518l.0046.02a1.218 1.218 0 0 0 1.4184.923 1.162 1.162 0 0 0 .1105-.0213l4.7781-1.104c.3766-.087.7587-.1667 1.097-.3631.2269-.1316.4428-.262.5909-.5252a1.1793 1.1793 0 0 0 .1405-.4683c.0733-.6512-.2668-1.3908-.5403-1.963a6.2792 6.2792 0 0 0-1.2001-1.7103zM8.9703.0754a8.6724 8.6724 0 0 0-.83.1564c-.2754.066-.548.1383-.8146.2236-.868.2844-2.0884.8063-2.295 1.8065-.1165.5655.1595 1.1439.3737 1.66.2595.6254.614 1.1889.9373 1.7777.8543 1.5545 1.7245 3.0993 2.5922 4.6457.259.4617.5416 1.0464 1.043 1.2856a1.058 1.058 0 0 0 .1013.0383c.2248.0851.4699.1016.7041.0471a4.3015 4.3015 0 0 0 .0418-.0097 1.2136 1.2136 0 0 0 .5658-.3397 1.1033 1.1033 0 0 0 .079-.0822c.3463-.435.3454-1.0833.3764-1.6134.1042-1.771.2139-3.5423.3009-5.3142.0332-.6712.1055-1.3333.0655-2.0096-.0328-.5579-.0368-1.1984-.3891-1.6563-.6218-.8073-1.9476-.741-2.8523-.6158zm2.084 15.9505a1.1053 1.1053 0 0 0-1.2306-.4145 1.1398 1.1398 0 0 0-.1526.0633 1.4806 1.4806 0 0 0-.2171.1354c-.1992.1475-.3668.3392-.5196.5315-.0386.049-.074.1143-.12.1562l-.7686 1.0573a113.9168 113.9168 0 0 0-1.2913 1.789c-.278.3895-.5184.7184-.7083 1.0094-.036.0547-.0734.116-.1075.1647-.2277.3522-.3566.6092-.4228.8381a1.0945 1.0945 0 0 0-.046.4721c.0211.1655.0768.3246.1635.467.046.0715.0957.1406.1487.207a2.334 2.334 0 0 0 .1754.1825 1.843 1.843 0 0 0 .2108.1732c.5304.369 1.1112.6342 1.722.8391a6.0958 6.0958 0 0 0 1.5716.3004c.091.0046.1821.0025.2728-.006a2.3878 2.3878 0 0 0 .2506-.0351 2.3862 2.3862 0 0 0 .2447-.071 1.1927 1.1927 0 0 0 .4175-.2658c.1127-.113.1994-.249.2541-.3989.0889-.2214.1473-.5026.1857-.92.0034-.0593.0118-.1305.0177-.1958.0304-.3463.0443-.7531.0666-1.2315.0375-.7357.067-1.4681.0903-2.2026 0 0 .0495-1.3053.0494-1.306.0113-.3008.002-.6342-.0814-.9336a1.396 1.396 0 0 0-.1756-.4054zm8.6754 2.0439c-.1605-.176-.3878-.3514-.7462-.5682-.0518-.0288-.1124-.0674-.1684-.1009-.2985-.1795-.658-.3684-1.078-.5965a120.7615 120.7615 0 0 0-1.9427-1.042l-1.1515-.6107c-.0597-.0175-.1203-.0607-.1766-.0878-.2212-.1058-.4558-.2045-.6992-.2498a1.4915 1.4915 0 0 0-.2545-.0265 1.1527 1.1527 0 0 0-.1648.01 1.1077 1.1077 0 0 0-.9227.9133 1.4186 1.4186 0 0 0 .0159.439c.0563.3065.1932.6096.3346.875l.615 1.1526c.3422.65.6884 1.2963 1.0435 1.9406.229.4202.4196.7799.5982 1.078.0338.056.0721.1163.1011.1682.2173.3584.392.584.569.7458.1146.1107.252.195.4026.247.1583.0525.326.071.4919.0546a2.368 2.368 0 0 0 .251-.0435c.0817-.022.1622-.048.241-.0784a1.863 1.863 0 0 0 .2475-.1143 6.1018 6.1018 0 0 0 1.2818-.9597c.4596-.4522.8659-.9454 1.182-1.51.044-.08.0819-.163.1138-.2483a2.49 2.49 0 0 0 .0773-.2411c.0186-.083.033-.1669.0429-.2513a1.188 1.188 0 0 0-.0565-.491 1.0933 1.0933 0 0 0-.248-.4041z"/></svg>,
              },
            ].map((platform) => (
              <button
                key={platform.id}
                type="button"
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${
                  selectedPlatform === platform.id
                    ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex-shrink-0">{platform.icon}</div>
                <span className={`text-sm font-medium ${selectedPlatform === platform.id ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {platform.name}
                </span>
                {selectedPlatform === platform.id && (
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 ml-auto flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Ton */}
      {step === 3 && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-gray-900">
              Quel ton pour vos réponses ?
            </h2>
            <span className="text-[10px] text-gray-400">Vous pouvez modifier plus tard</span>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Choisissez le style qui correspond à votre image.
          </p>

          {/* Aperçu : exemple d'avis + réponse selon le ton et la plateforme */}
          {(() => {
            const customDomain = selectedType === 'autre' ? matchCustomTypeToDomain(correctedType || customType) : null
            const example = REVIEW_EXAMPLES[customDomain || selectedType] || DEFAULT_EXAMPLE

            const yelpSquareColors: Record<number, string> = { 1: '#FFCC33', 2: '#FFAD1D', 3: '#FF8C00', 4: '#F26A2E', 5: '#FF1A1A' }

            const platformConfig = {
              google: {
                headerBg: 'bg-white',
                headerBorder: 'border-gray-200',
                avatarBg: 'bg-red-500',
                avatarText: 'text-white',
                renderRating: (r: number) => (
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i <= r ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                  </div>
                ),
                logo: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ),
              },
              tripadvisor: {
                headerBg: 'bg-[#f2faf6]',
                headerBorder: 'border-[#00852f]/20',
                avatarBg: 'bg-[#00852f]/10',
                avatarText: 'text-[#00852f]',
                renderRating: (r: number) => (
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className={`w-3 h-3 rounded-full border ${i <= r ? 'bg-[#00852f] border-[#00852f]' : 'bg-white border-gray-300'}`} />
                    ))}
                  </div>
                ),
                logo: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="#00852f">
                    <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
                  </svg>
                ),
              },
              trustpilot: {
                headerBg: 'bg-[#f5faf7]',
                headerBorder: 'border-[#00B67A]/20',
                avatarBg: 'bg-[#00B67A]/10',
                avatarText: 'text-[#00B67A]',
                renderRating: (r: number) => (
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className={`w-3.5 h-3.5 flex items-center justify-center ${i <= r ? 'bg-[#00B67A]' : 'bg-gray-200'}`}>
                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="#00B67A">
                          <path d="M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.84 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388 4.583-3.326L24 9.311z" fill="white"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                ),
                logo: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="#00B67A">
                    <path d="M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.84 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388 4.583-3.326L24 9.311z"/>
                  </svg>
                ),
              },
              booking: {
                headerBg: 'bg-[#f0f4ff]',
                headerBorder: 'border-[#003580]/15',
                avatarBg: 'bg-[#003580]/10',
                avatarText: 'text-[#003580]',
                renderRating: (r: number) => (
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white bg-[#003580] px-1.5 py-0.5 rounded">
                      {(r * 2).toFixed(1)}
                    </span>
                    <span className="text-[10px] text-gray-500">/ 10</span>
                  </div>
                ),
                logo: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="#003580">
                    <path d="M24 0H0v24h24ZM8.575 6.563h2.658c2.108 0 3.473 1.15 3.473 2.898 0 1.15-.575 1.82-.91 2.108l-.287.263.335.192c.815.479 1.318 1.389 1.318 2.395 0 1.988-1.51 3.257-3.857 3.257H7.449V7.713c0-.623.503-1.126 1.126-1.15zm1.7 1.868c-.479.024-.694.264-.694.79v1.893h1.676c.958 0 1.294-.743 1.294-1.365 0-.815-.503-1.318-1.318-1.318zm-.096 4.36c-.407.071-.598.31-.598.79v2.251h1.868c.934 0 1.509-.55 1.509-1.533 0-.934-.599-1.509-1.51-1.509zm7.737 2.394c.743 0 1.341.599 1.341 1.342a1.34 1.34 0 0 1-1.341 1.341 1.355 1.355 0 0 1-1.341-1.341c0-.743.598-1.342 1.34-1.342z"/>
                  </svg>
                ),
              },
              facebook: {
                headerBg: 'bg-white',
                headerBorder: 'border-gray-200',
                avatarBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
                avatarText: 'text-white',
                renderRating: () => (
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5 text-[#1877F2] fill-[#1877F2]" />
                    <span className="text-xs font-medium text-[#1877F2]">Recommande</span>
                  </div>
                ),
                logo: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ),
              },
              yelp: {
                headerBg: 'bg-[#fff5f5]',
                headerBorder: 'border-[#FF1A1A]/15',
                avatarBg: 'bg-[#FF1A1A]/10',
                avatarText: 'text-[#FF1A1A]',
                renderRating: (r: number) => (
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-[14px] h-[14px] rounded-[2px] flex items-center justify-center"
                        style={{ backgroundColor: i <= r ? (yelpSquareColors[r] || '#D32323') : '#E0E0E0' }}>
                        <svg className="w-2 h-2" viewBox="0 0 18 18" fill="white">
                          <path d="M9 1.5l2.47 4.55 5.03.95-3.52 3.73.64 5.02L9 13.77l-4.62 2.98.64-5.02L1.5 7 6.53 6.05z"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                ),
                logo: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="#FF1A1A">
                    <path d="m7.6885 15.1415-3.6715.8483c-.3769.0871-.755.183-1.1452.155-.2611-.0188-.5122-.0414-.7606-.213a1.179 1.179 0 0 1-.331-.3594c-.3486-.5519-.3656-1.3661-.3697-2.0004a6.2874 6.2874 0 0 1 .3314-2.0642 1.857 1.857 0 0 1 .1073-.2474 2.3426 2.3426 0 0 1 .1255-.2165 2.4572 2.4572 0 0 1 .1563-.1975 1.1736 1.1736 0 0 1 .399-.2831 1.082 1.082 0 0 1 .4592-.0837c.2355.0016.5139.052.91.1734.0555.0191.1237.0382.1856.0572.3277.1013.7048.2404 1.1499.3987.6863.2404 1.3663.487 2.0463.7397l1.2117.4423c.2217.0807.4363.18.6412.297.174.0984.3273.2298.4512.387a1.217 1.217 0 0 1 .192.4309 1.2205 1.2205 0 0 1-.872 1.4522c-.0468.0151-.0852.0239-.1085.0293l-1.105.2553zM18.8208 7.565a1.8506 1.8506 0 0 0-.2042-.1754 2.4082 2.4082 0 0 0-.2077-.1394 2.3607 2.3607 0 0 0-.2269-.109 1.1705 1.1705 0 0 0-.482-.0796 1.0862 1.0862 0 0 0-.4498.1263c-.2107.1048-.4388.2732-.742.5551-.042.0417-.0947.0886-.142.133-.2502.2351-.5286.5252-.8599.863a114.6363 114.6363 0 0 0-1.5166 1.5629l-.8962.9293a4.1897 4.1897 0 0 0-.4466.5483 1.541 1.541 0 0 0-.2364.5459 1.2199 1.2199 0 0 0 .0107.4518l.0046.02a1.218 1.218 0 0 0 1.4184.923 1.162 1.162 0 0 0 .1105-.0213l4.7781-1.104c.3766-.087.7587-.1667 1.097-.3631.2269-.1316.4428-.262.5909-.5252a1.1793 1.1793 0 0 0 .1405-.4683c.0733-.6512-.2668-1.3908-.5403-1.963a6.2792 6.2792 0 0 0-1.2001-1.7103zM8.9703.0754a8.6724 8.6724 0 0 0-.83.1564c-.2754.066-.548.1383-.8146.2236-.868.2844-2.0884.8063-2.295 1.8065-.1165.5655.1595 1.1439.3737 1.66.2595.6254.614 1.1889.9373 1.7777.8543 1.5545 1.7245 3.0993 2.5922 4.6457.259.4617.5416 1.0464 1.043 1.2856a1.058 1.058 0 0 0 .1013.0383c.2248.0851.4699.1016.7041.0471a4.3015 4.3015 0 0 0 .0418-.0097 1.2136 1.2136 0 0 0 .5658-.3397 1.1033 1.1033 0 0 0 .079-.0822c.3463-.435.3454-1.0833.3764-1.6134.1042-1.771.2139-3.5423.3009-5.3142.0332-.6712.1055-1.3333.0655-2.0096-.0328-.5579-.0368-1.1984-.3891-1.6563-.6218-.8073-1.9476-.741-2.8523-.6158zm2.084 15.9505a1.1053 1.1053 0 0 0-1.2306-.4145 1.1398 1.1398 0 0 0-.1526.0633 1.4806 1.4806 0 0 0-.2171.1354c-.1992.1475-.3668.3392-.5196.5315-.0386.049-.074.1143-.12.1562l-.7686 1.0573a113.9168 113.9168 0 0 0-1.2913 1.789c-.278.3895-.5184.7184-.7083 1.0094-.036.0547-.0734.116-.1075.1647-.2277.3522-.3566.6092-.4228.8381a1.0945 1.0945 0 0 0-.046.4721c.0211.1655.0768.3246.1635.467.046.0715.0957.1406.1487.207a2.334 2.334 0 0 0 .1754.1825 1.843 1.843 0 0 0 .2108.1732c.5304.369 1.1112.6342 1.722.8391a6.0958 6.0958 0 0 0 1.5716.3004c.091.0046.1821.0025.2728-.006a2.3878 2.3878 0 0 0 .2506-.0351 2.3862 2.3862 0 0 0 .2447-.071 1.1927 1.1927 0 0 0 .4175-.2658c.1127-.113.1994-.249.2541-.3989.0889-.2214.1473-.5026.1857-.92.0034-.0593.0118-.1305.0177-.1958.0304-.3463.0443-.7531.0666-1.2315.0375-.7357.067-1.4681.0903-2.2026 0 0 .0495-1.3053.0494-1.306.0113-.3008.002-.6342-.0814-.9336a1.396 1.396 0 0 0-.1756-.4054zm8.6754 2.0439c-.1605-.176-.3878-.3514-.7462-.5682-.0518-.0288-.1124-.0674-.1684-.1009-.2985-.1795-.658-.3684-1.078-.5965a120.7615 120.7615 0 0 0-1.9427-1.042l-1.1515-.6107c-.0597-.0175-.1203-.0607-.1766-.0878-.2212-.1058-.4558-.2045-.6992-.2498a1.4915 1.4915 0 0 0-.2545-.0265 1.1527 1.1527 0 0 0-.1648.01 1.1077 1.1077 0 0 0-.9227.9133 1.4186 1.4186 0 0 0 .0159.439c.0563.3065.1932.6096.3346.875l.615 1.1526c.3422.65.6884 1.2963 1.0435 1.9406.229.4202.4196.7799.5982 1.078.0338.056.0721.1163.1011.1682.2173.3584.392.584.569.7458.1146.1107.252.195.4026.247.1583.0525.326.071.4919.0546a2.368 2.368 0 0 0 .251-.0435c.0817-.022.1622-.048.241-.0784a1.863 1.863 0 0 0 .2475-.1143 6.1018 6.1018 0 0 0 1.2818-.9597c.4596-.4522.8659-.9454 1.182-1.51.044-.08.0819-.163.1138-.2483a2.49 2.49 0 0 0 .0773-.2411c.0186-.083.033-.1669.0429-.2513a1.188 1.188 0 0 0-.0565-.491 1.0933 1.0933 0 0 0-.248-.4041z"/>
                  </svg>
                ),
              },
            }

            const platform = platformConfig[selectedPlatform as keyof typeof platformConfig] || platformConfig.google

            return (
              <div className="relative mb-5">
                {toneAnimKey > 0 && (
                  <svg key={toneAnimKey} className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                    <rect x="1" y="1" rx="7" ry="7" fill="none" stroke="#6366f1" strokeWidth="2.5" pathLength="100"
                      className="animate-draw-border" style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }} />
                  </svg>
                )}
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  {/* Avis client — style plateforme */}
                  <div className={`${platform.headerBg} px-4 py-3 border-b ${platform.headerBorder}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-7 h-7 rounded-full ${platform.avatarBg} flex items-center justify-center text-xs font-bold ${platform.avatarText}`}>
                        {example.reviewer.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{example.reviewer}</span>
                      <div className="ml-auto flex items-center gap-1.5">
                        {platform.renderRating(example.rating)}
                        {platform.logo}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">« {example.comment} »</p>
                  </div>
                  {/* Réponse IA */}
                  <div className="px-4 py-3 bg-white">
                    <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide mb-1.5">
                      Réponse Reply Genius — ton {TONES.find(t => t.id === selectedTone)?.label.toLowerCase()}
                    </p>
                    <p className="text-xs text-gray-700 leading-relaxed">{example.responses[selectedTone]}</p>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Sélection du ton */}
          <div className="space-y-2 mb-6">
            {TONES.map((tone) => {
              const isSelected = selectedTone === tone.id
              const c = TONE_COLORS[tone.color]
              return (
                <button
                  type="button"
                  key={tone.id}
                  onClick={() => {
                    if (tone.id !== selectedTone) {
                      setSelectedTone(tone.id)
                      setToneAnimKey(k => k + 1)
                    }
                  }}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                    isSelected ? `${c.border} ${c.bg}` : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? c.border : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <div className={`w-2 h-2 rounded-full ${c.radio}`} />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isSelected ? c.text : 'text-gray-900'}`}>
                      {tone.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{tone.desc}</p>
                  </div>
                </button>
              )
            })}
          </div>

        </div>
      )}

      {/* Step 4: Formule */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Choisissez votre formule
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Sélectionnez le plan adapté à votre activité.
          </p>

          {/* Toggle mensuel/annuel */}
          <div className="relative flex items-center justify-center gap-2 mb-4">
            <span className={`text-xs font-medium ${billing === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>
              Mensuel
            </span>
            <button
              type="button"
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
                billing === 'yearly' ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                  billing === 'yearly' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-medium ${billing === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>
              Annuel
            </span>
            <span className={`absolute left-1/2 ml-2 translate-x-[4.2rem] text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-opacity ${
              billing === 'yearly' ? 'bg-green-100 text-green-700 opacity-100' : 'opacity-0'
            }`}>
              -15%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {/* Plan Pro */}
            <button
              type="button"
              onClick={() => {
                setSelectedPlan('pro')
                setResponseMode('validation')
              }}
              className={`relative p-4 rounded-lg border text-left transition-all flex flex-col ${
                selectedPlan === 'pro'
                  ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className={`text-sm font-bold ${selectedPlan === 'pro' ? 'text-indigo-700' : 'text-gray-900'}`}>Pro</p>
              <div className="mt-1">
                {billing === 'yearly' && (
                  <span className="text-sm line-through text-gray-400 mr-1">29€</span>
                )}
                <span className="text-lg font-bold text-indigo-600">
                  {billing === 'yearly' ? '25' : '29'}€
                </span>
                <span className="text-xs font-normal text-gray-400">/mois</span>
              </div>
              {billing === 'yearly' && (
                <p className="text-[10px] text-gray-400 mt-0.5">Facturé 300€/an</p>
              )}
              <ul className="mt-3 space-y-1.5 flex-1">
                {['1 établissement', '50 réponses/mois', 'Choix du ton', 'Support email'].map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                    <CheckCircle2 className="h-3 w-3 text-indigo-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-gray-500 mt-3 text-center">Sans engagement</p>
            </button>

            {/* Plan Premium */}
            <button
              type="button"
              onClick={() => setSelectedPlan('premium')}
              className={`relative p-4 rounded-lg border text-left transition-all flex flex-col ${
                selectedPlan === 'premium'
                  ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="absolute -top-2.5 right-3 bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                Populaire
              </div>
              <p className={`text-sm font-bold ${selectedPlan === 'premium' ? 'text-purple-700' : 'text-gray-900'}`}>Premium</p>
              <div className="mt-1">
                {billing === 'yearly' && (
                  <span className="text-sm line-through text-gray-400 mr-1">49€</span>
                )}
                <span className="text-lg font-bold text-purple-600">
                  {billing === 'yearly' ? '42' : '49'}€
                </span>
                <span className="text-xs font-normal text-gray-400">/mois</span>
              </div>
              {billing === 'yearly' && (
                <p className="text-[10px] text-purple-400 mt-0.5">Facturé 504€/an</p>
              )}
              <ul className="mt-3 space-y-1.5 flex-1">
                {['5 établissements', 'Réponses illimitées', 'Mode automatique', 'Instructions personnalisées', 'Support prioritaire'].map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                    <CheckCircle2 className="h-3 w-3 text-purple-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-purple-500 mt-3 text-center">Sans engagement</p>
            </button>
          </div>

          {/* Mode de réponse */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Mode de réponse</h3>
            <span className="text-[10px] text-gray-400">Vous pouvez modifier plus tard</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Mode validation */}
            <button
              type="button"
              onClick={() => setResponseMode('validation')}
              className={`p-3 rounded-lg border text-left transition-all ${
                responseMode === 'validation'
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  responseMode === 'validation' ? 'border-indigo-600' : 'border-gray-300'
                }`}>
                  {responseMode === 'validation' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  )}
                </div>
                <p className={`text-sm font-medium ${responseMode === 'validation' ? 'text-indigo-700' : 'text-gray-900'}`}>
                  Validation
                </p>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">
                Vous validez chaque réponse avant publication.
              </p>
            </button>

            {/* Mode automatique */}
            <button
              type="button"
              onClick={() => {
                if (selectedPlan === 'premium') setResponseMode('auto')
              }}
              disabled={selectedPlan === 'pro'}
              className={`p-3 rounded-lg border text-left transition-all relative ${
                selectedPlan === 'pro'
                  ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                  : responseMode === 'auto'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  responseMode === 'auto' && selectedPlan === 'premium' ? 'border-purple-600' : 'border-gray-300'
                }`}>
                  {responseMode === 'auto' && selectedPlan === 'premium' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  )}
                </div>
                <p className={`text-sm font-medium ${
                  responseMode === 'auto' && selectedPlan === 'premium' ? 'text-purple-700' : 'text-gray-900'
                }`}>
                  Automatique
                </p>
                {selectedPlan === 'pro' && (
                  <span className="ml-auto text-[9px] font-bold bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full uppercase">
                    Premium
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">
                L&apos;IA répond automatiquement aux avis.
              </p>
            </button>
          </div>

          {/* Instructions personnalisées */}
          <div className="flex items-center justify-between mt-6 mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Instructions personnalisées</h3>
            <span className="text-[10px] text-gray-400">Vous pouvez modifier plus tard</span>
          </div>
          <div
            className={`rounded-lg border text-left transition-all p-3 ${
              selectedPlan === 'pro'
                ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                : 'border-purple-600 bg-purple-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <p className={`text-sm font-medium ${
                selectedPlan === 'premium' ? 'text-purple-700' : 'text-gray-900'
              }`}>
                Consignes pour l&apos;IA
              </p>
              {selectedPlan === 'pro' && (
                <span className="ml-auto text-[9px] font-bold bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full uppercase">
                  Premium
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 leading-snug mb-3">
              Donnez des consignes spécifiques à l&apos;IA pour personnaliser vos réponses.
            </p>

            {customInstructions.length > 0 && (
              <div className="space-y-2 mb-3">
                {customInstructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white rounded-lg border border-purple-200 px-3 py-2"
                  >
                    <span className="text-xs text-gray-700 flex-1">{instruction}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCustomInstructions(customInstructions.filter((_, i) => i !== index))
                      }
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {(selectedPlan === 'premium' ? customInstructions.length < 5 : true) && (
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={selectedPlan === 'pro' ? '' : newInstruction}
                  onChange={(e) => {
                    if (selectedPlan === 'premium') setNewInstruction(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (selectedPlan === 'premium' && e.key === 'Enter' && newInstruction.trim()) {
                      e.preventDefault()
                      setCustomInstructions([...customInstructions, newInstruction.trim()])
                      setNewInstruction('')
                    }
                  }}
                  disabled={selectedPlan === 'pro'}
                  placeholder="ex : Mentionner notre équipe par « la team beauté »"
                  className={`flex-1 px-3 py-2 border rounded-lg text-xs outline-none ${
                    selectedPlan === 'pro'
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-purple-200 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (selectedPlan === 'premium' && newInstruction.trim()) {
                      setCustomInstructions([...customInstructions, newInstruction.trim()])
                      setNewInstruction('')
                    }
                  }}
                  disabled={selectedPlan === 'pro' || !newInstruction.trim()}
                  className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Ajouter
                </button>
              </div>
            )}

            {selectedPlan === 'premium' && (
              <p className="text-[10px] text-purple-400 text-right">
                {customInstructions.length}/5 instructions
              </p>
            )}
          </div>

          <p className="text-[10px] text-gray-400 mt-4 text-center">Sans engagement, annulez à tout moment</p>
        </div>
      )}

      {/* Step 5: Création de compte */}
      {step === 5 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Créez votre compte <span className="text-purple-600">Reply Genius</span>
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Ce compte est pour accéder à votre espace Reply Genius. Vous connecterez votre Google Business depuis le tableau de bord.
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
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${errorField === 'email' ? 'text-red-400' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errorField === 'email') { setError(''); setErrorField('') } }}
                  placeholder="vous@exemple.com"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none text-sm ${
                    errorField === 'email'
                      ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                      : 'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${errorField === 'password' ? 'text-red-400' : 'text-gray-400'}`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errorField === 'password') { setError(''); setErrorField('') } }}
                  placeholder="6 caractères minimum"
                  required
                  minLength={6}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none text-sm ${
                    errorField === 'password'
                      ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                      : 'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                <X className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

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
                <span className="text-gray-600">Plateforme</span>
                <span className="font-medium text-gray-900 capitalize">{selectedPlatform}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ton</span>
                <span className="font-medium text-gray-900">
                  {TONES.find((t) => t.id === selectedTone)?.label}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Plan</span>
                <span className={`font-medium ${selectedPlan === 'premium' ? 'text-purple-700' : 'text-indigo-700'}`}>
                  {selectedPlan === 'premium'
                    ? `Premium ${billing === 'yearly' ? '42' : '49'}€/mois`
                    : `Pro ${billing === 'yearly' ? '25' : '29'}€/mois`}
                  {billing === 'yearly' && ' (annuel)'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Mode</span>
                <span className="font-medium text-gray-900">
                  {responseMode === 'auto' ? 'Automatique' : 'Validation'}
                </span>
              </div>
              {customInstructions.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Instructions</span>
                  <span className="font-medium text-purple-700">
                    {customInstructions.length} consigne{customInstructions.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
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
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuer
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSignup}
            disabled={!canGoNext() || loading}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-700 disabled:opacity-40"
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
            <Link href="/connexion" className="text-indigo-600 hover:underline">
              Se connecter
            </Link>
          </span>
        )}
      </p>
    </div>
  )
}

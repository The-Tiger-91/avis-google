import Link from 'next/link'
import {
  Star,
  Zap,
  Shield,
  Clock,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { PricingToggle } from '@/components/landing/pricing-toggle'
import { PlatformDemo } from '@/components/landing/platform-demo'
import { ScrollReveal } from '@/components/landing/scroll-reveal'
import { ScrollToPricingButton } from '@/components/landing/scroll-to-pricing-button'
import { Logo } from '@/components/logo'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} textSize="text-xl" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/connexion"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium"
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4">
        <ScrollReveal>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:pl-8">

          {/* Texte */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Réponses naturelles et adaptées à votre ton
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Répondez à vos avis en ligne{' '}
              <span className="text-indigo-600">automatiquement</span>
            </h1>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">
              On transforme vos avis clients en <span className="text-purple-600">nouveaux clients</span>.
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mb-10">
              Chaque avis sans réponse, c&apos;est un client perdu. Ne laissez plus
              jamais un avis sans réponse professionnelle et personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <Link
                href="/inscription"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-lg hover:bg-indigo-700 font-medium text-lg"
              >
                Commencer maintenant
                <ArrowRight className="h-5 w-5" />
              </Link>
              <ScrollToPricingButton />
            </div>
          </div>

          {/* Illustration */}
          <div className="flex-1 flex justify-center lg:mt-12">
            <img src="/illu1.png" alt="Illustration Reply Genius" className="w-full max-w-md" />
          </div>

        </div>
        </ScrollReveal>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Pourquoi répondre à vos avis ?
          </h2>
          <p className="text-gray-500 text-center mb-14 max-w-2xl mx-auto">
            Les chiffres parlent d&apos;eux-mêmes
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, stat: '+35%', label: 'de visibilité sur Google', grad: 'from-indigo-50 to-violet-100', icon_grad: 'from-indigo-500 to-violet-600', text: 'text-indigo-700' },
              { icon: Star, stat: '4.5x', label: 'plus de confiance client', grad: 'from-violet-50 to-purple-100', icon_grad: 'from-violet-500 to-purple-600', text: 'text-violet-700' },
              { icon: Clock, stat: '5h', label: 'économisées par semaine', grad: 'from-purple-50 to-violet-100', icon_grad: 'from-purple-500 to-violet-600', text: 'text-purple-700' },
              { icon: MessageSquare, stat: '100%', label: 'de taux de réponse', grad: 'from-indigo-50 to-purple-100', icon_grad: 'from-indigo-500 to-purple-600', text: 'text-indigo-700' },
            ].map((item) => (
              <div key={item.label} className={`bg-gradient-to-br ${item.grad} rounded-2xl border border-violet-100 shadow-sm hover:shadow-md transition-shadow p-6 text-center`}>
                <div className={`w-12 h-12 bg-gradient-to-br ${item.icon_grad} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <p className={`text-3xl sm:text-4xl font-bold ${item.text} mb-1`}>{item.stat}</p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      <PlatformDemo />

      {/* App Preview - features + dashboard */}
      <section className="py-16 px-4 overflow-hidden">
        <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">La plateforme</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Simple, puissant, prêt en 5 minutes</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* --- Colonne gauche : features --- */}
            <div className="space-y-6">
              {[
                {
                  icon: '🎨',
                  title: 'Choisissez votre ton',
                  desc: 'Professionnel, amical ou formel — l\'IA s\'adapte à votre image de marque pour chaque réponse.',
                  detail: (
                    <div className="flex gap-2 mt-2">
                      {[
                        { label: 'Professionnel', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                        { label: 'Amical', cls: 'bg-green-50 text-green-700 border-green-200' },
                        { label: 'Formel', cls: 'bg-purple-50 text-purple-700 border-purple-200' },
                      ].map((t) => (
                        <span key={t.label} className={`text-xs px-2.5 py-1 rounded-full font-medium border ${t.cls}`}>{t.label}</span>
                      ))}
                    </div>
                  ),
                },
                {
                  icon: '⚡',
                  title: 'Réponse en 30 secondes',
                  desc: 'Dès qu\'un avis arrive, l\'IA génère une réponse personnalisée. Vous n\'avez qu\'à approuver.',
                },
                {
                  icon: '✅',
                  title: 'Vous gardez le contrôle',
                  desc: 'Validez, modifiez ou automatisez complètement. L\'interface est claire et sans friction.',
                },
                {
                  icon: '📊',
                  title: 'Tableau de bord centralisé',
                  desc: 'Tous vos avis, toutes vos réponses, toutes vos plateformes au même endroit.',
                },
              ].map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                    {'detail' in f && f.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* --- Colonne droite : mockup dashboard --- */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-white">
              <div className="bg-gray-100 border-b border-gray-200 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-md px-2 py-0.5 text-[9px] text-gray-400 border border-gray-200">replygenius.fr/tableau-de-bord</div>
              </div>
              <div className="flex bg-white" style={{ minHeight: 280 }}>
                <div className="w-20 bg-gray-50 border-r border-gray-100 flex flex-col py-3 gap-1 flex-shrink-0 px-2">
                  <div className="flex items-center gap-1.5 mb-3 px-1">
                    <div className="w-3 h-3 rounded-sm bg-indigo-600" />
                    <span className="text-[7px] font-bold text-gray-800">Reply Genius</span>
                  </div>
                  {[{ label: 'Tableau de bord', active: true }, { label: 'Avis', active: false }, { label: 'Établissements', active: false }, { label: 'Paramètres', active: false }].map((item) => (
                    <div key={item.label} className={`px-2 py-1 rounded text-[6.5px] font-medium ${item.active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-400'}`}>{item.label}</div>
                  ))}
                </div>
                <div className="flex-1 p-4 space-y-3 overflow-hidden bg-[#F8FAFC]">
                  <div className="text-[10px] font-bold text-gray-900">Tableau de bord</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Nouveaux avis', val: '12', color: 'bg-white border border-gray-100' },
                      { label: 'Réponses envoyées', val: '47', color: 'bg-white border border-gray-100' },
                      { label: 'Note moyenne', val: '4.3 ★', color: 'bg-white border border-gray-100' },
                      { label: 'En attente', val: '3', color: 'bg-white border border-gray-100' },
                    ].map((s) => (
                      <div key={s.label} className={`${s.color} rounded-lg p-2`}>
                        <div className="text-[6px] text-gray-400">{s.label}</div>
                        <div className="text-[11px] font-bold text-gray-800 mt-0.5">{s.val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-[7.5px] font-semibold text-gray-700">Avis récents</div>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Jean D.', stars: '★★★★★', text: 'Excellent pain au levain...', badge: 'Répondu', color: 'bg-green-100 text-green-700' },
                      { name: 'Marie P.', stars: '★★', text: 'Attente trop longue...', badge: 'En attente', color: 'bg-orange-100 text-orange-700' },
                      { name: 'Lucas B.', stars: '★★★★', text: 'Bon croissant mais...', badge: 'Brouillon', color: 'bg-indigo-100 text-indigo-700' },
                    ].map((r) => (
                      <div key={r.name} className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-between border border-gray-100">
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[7px] font-semibold text-gray-700">{r.name}</span>
                            <span className="text-yellow-400 text-[6.5px]">{r.stars}</span>
                          </div>
                          <div className="text-[6px] text-gray-400 mt-0.5">{r.text}</div>
                        </div>
                        <span className={`text-[6px] px-1.5 py-0.5 rounded-full font-medium ${r.color}`}>{r.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-indigo-50">
        <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            En 3 étapes simples, automatisez vos réponses aux avis en ligne
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-6">

            {/* Illustration */}
            <div className="flex-shrink-0 flex justify-center lg:ml-10 lg:-translate-x-9">
              <img
                src="/modern-flat-vector-character-holding-a-smartphone--3.svg"
                alt="Illustration Comment ça marche"
                className="w-80 lg:w-[26rem]"
              />
            </div>

            {/* Steps */}
            <div className="flex-1 grid gap-6">
              {[
                {
                  icon: Shield,
                  title: '1. Connectez vos plateformes',
                  desc: 'Liez Google, Facebook, Yelp, TripAdvisor et plus en un clic. Vos données restent sécurisées.',
                  grad: 'from-indigo-50 to-violet-100',
                  icon_grad: 'from-indigo-500 to-violet-600',
                  text: 'text-indigo-700',
                },
                {
                  icon: MessageSquare,
                  title: "2. L'IA génère les réponses",
                  desc: 'Notre IA détecte les nouveaux avis et rédige des réponses personnalisées et professionnelles.',
                  grad: 'from-violet-50 to-purple-100',
                  icon_grad: 'from-violet-500 to-purple-600',
                  text: 'text-violet-700',
                },
                {
                  icon: CheckCircle2,
                  title: '3. Validez ou automatisez',
                  desc: 'Approuvez chaque réponse avant publication, ou activez le mode automatique.',
                  grad: 'from-purple-50 to-violet-100',
                  icon_grad: 'from-purple-500 to-violet-600',
                  text: 'text-purple-700',
                },
              ].map((feature) => (
                <div key={feature.title} className="bg-white rounded-xl p-6 border flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.icon_grad} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${feature.text} mb-1`}>{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-violet-100">
        <ScrollReveal>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Choisissez le plan adapté à votre activité
          </p>
          <PricingToggle />
        </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-indigo-800 relative overflow-hidden">

        {/* Éclairs gauche → vers le texte */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="420" height="280" viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glowL">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <linearGradient id="boltGradL1" x1="0" y1="0" x2="420" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A78BFA" stopOpacity="1"/>
                <stop offset="0.7" stopColor="#6366F1" stopOpacity="0.6"/>
                <stop offset="1" stopColor="#6366F1" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="boltGradL2" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C4B5FD" stopOpacity="0.9"/>
                <stop offset="0.7" stopColor="#818CF8" stopOpacity="0.4"/>
                <stop offset="1" stopColor="#818CF8" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="boltGradL3" x1="0" y1="0" x2="350" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7C3AED" stopOpacity="0.8"/>
                <stop offset="0.7" stopColor="#6366F1" stopOpacity="0.3"/>
                <stop offset="1" stopColor="#6366F1" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* Éclair principal — épais + glow */}
            <path d="M0 140 L90 75 L68 120 L180 95 L140 138 L260 122 L215 155 L420 142" stroke="url(#boltGradL1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#glowL)"/>
            {/* Halo large */}
            <path d="M0 140 L90 75 L68 120 L180 95 L140 138 L260 122 L215 155 L420 142" stroke="url(#boltGradL1)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.15"/>
            {/* Éclair haut */}
            <path d="M0 85 L70 50 L52 85 L150 65 L118 95 L250 80 L220 105 L380 95" stroke="url(#boltGradL2)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#glowL)"/>
            {/* Éclair bas */}
            <path d="M0 195 L80 170 L62 200 L170 180 L142 208 L270 193 L238 218 L390 205" stroke="url(#boltGradL3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#glowL)"/>
          </svg>
        </div>

        {/* Éclairs droite → vers le texte (inversé) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="420" height="280" viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: 'scaleX(-1)'}}>
            <defs>
              <filter id="glowR">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <linearGradient id="boltGradR1" x1="0" y1="0" x2="420" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A78BFA" stopOpacity="1"/>
                <stop offset="0.7" stopColor="#6366F1" stopOpacity="0.6"/>
                <stop offset="1" stopColor="#6366F1" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="boltGradR2" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C4B5FD" stopOpacity="0.9"/>
                <stop offset="0.7" stopColor="#818CF8" stopOpacity="0.4"/>
                <stop offset="1" stopColor="#818CF8" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="boltGradR3" x1="0" y1="0" x2="350" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7C3AED" stopOpacity="0.8"/>
                <stop offset="0.7" stopColor="#6366F1" stopOpacity="0.3"/>
                <stop offset="1" stopColor="#6366F1" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0 140 L90 75 L68 120 L180 95 L140 138 L260 122 L215 155 L420 142" stroke="url(#boltGradR1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#glowR)"/>
            <path d="M0 140 L90 75 L68 120 L180 95 L140 138 L260 122 L215 155 L420 142" stroke="url(#boltGradR1)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.15"/>
            <path d="M0 85 L70 50 L52 85 L150 65 L118 95 L250 80 L220 105 L380 95" stroke="url(#boltGradR2)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#glowR)"/>
            <path d="M0 195 L80 170 L62 200 L170 180 L142 208 L270 193 L238 218 L390 205" stroke="url(#boltGradR3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#glowR)"/>
          </svg>
        </div>

        <ScrollReveal>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à automatiser vos réponses ?
          </h2>
          <p className="text-indigo-300 mb-8">
            Rejoignez des centaines de commerçants qui gagnent du temps chaque jour.
          </p>
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-lg hover:bg-indigo-50 font-medium text-lg"
          >
            Commencer maintenant
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        </ScrollReveal>
      </section>

      {/* Logo Comparison - TEMPORAIRE */}
      <section className="py-10 px-4 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Comparaison logos — choisissez votre préféré</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* Logo A — Bulle éclair */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center gap-4 shadow-sm">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Option A — Bulle & éclair</p>
              <div className="flex items-center gap-2.5">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="bubbleGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4F46E5"/>
                      <stop offset="1" stopColor="#7C3AED"/>
                    </linearGradient>
                  </defs>
                  <rect width="36" height="36" rx="10" fill="url(#bubbleGrad)"/>
                  {/*
                    Bulle propre : r=2 sur chaque coin
                    (9,9)→coin tr(29,11)→(29,21)→coin br(27,23)
                    →(20,23)→queue(15,28)→(15,23)→(9,23)→coin bl(7,21)→(7,11)→coin tl(9,9)
                  */}
                  <path
                    d="M9 9 H27 a2 2 0 0 1 2 2 V21 a2 2 0 0 1 -2 2 H20 L15 28 V23 H9 a2 2 0 0 1 -2 -2 V11 a2 2 0 0 1 2 -2 Z"
                    fill="white"
                    fillOpacity="0.18"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  {/* Éclair équilibré : haut 8px (y10→18), bas 8px (y15→23) */}
                  <path d="M21 10 L14 18 L18 18 L15 23 L22 15 L18 15 Z" fill="white"/>
                </svg>
                <span className="text-xl font-bold text-gray-900 tracking-tight">Reply<span className="text-indigo-600">Genius</span></span>
              </div>
              <p className="text-[11px] text-gray-400 text-center">Bulle de message + éclair, gradient indigo/violet</p>
            </div>

            {/* Logo B — Tech & Futuriste */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center gap-4 shadow-sm">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Option B — Tech</p>
              <div className="flex items-center gap-2.5">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7C3AED"/>
                      <stop offset="1" stopColor="#2563EB"/>
                    </linearGradient>
                  </defs>
                  <rect width="32" height="32" rx="8" fill="url(#grad1)"/>
                  <path d="M8 16L14 10L20 16L26 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 22L14 16L20 22L26 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
                </svg>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent tracking-tight">Reply Genius</span>
              </div>
              <p className="text-[11px] text-gray-400 text-center">Gradient violet→bleu, forme géométrique</p>
            </div>

            {/* Logo C — Étoile violette */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center gap-4 shadow-sm">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Option C — Violet Star</p>
              <div className="flex items-center gap-2.5">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="starGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7C3AED"/>
                      <stop offset="1" stopColor="#2563EB"/>
                    </linearGradient>
                  </defs>
                  <rect width="32" height="32" rx="8" fill="url(#starGrad)"/>
                  <path d="M16 7l2.47 5.01L24 13.07l-4 3.9.94 5.52L16 20l-4.94 2.49.94-5.52-4-3.9 5.53-.06z" fill="white" strokeLinejoin="round"/>
                </svg>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent tracking-tight">Reply Genius</span>
              </div>
              <p className="text-[11px] text-gray-400 text-center">Étoile blanche sur gradient violet/bleu</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={22} textSize="text-base" />
          </div>
          <div className="flex items-center gap-6">
            <Link href="/politique-de-confidentialite" className="text-sm text-gray-400 hover:text-gray-600">
              Confidentialité
            </Link>
            <Link href="/conditions-generales" className="text-sm text-gray-400 hover:text-gray-600">
              CGU
            </Link>
            <p className="text-sm text-gray-400">
              © 2026 Reply Genius.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

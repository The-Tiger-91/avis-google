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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Star className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold font-logo">Reply Genius</span>
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
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4">
        <ScrollReveal>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Réponses naturelles et adaptées à votre ton
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Répondez à vos avis en ligne{' '}
            <span className="text-blue-600">automatiquement</span>
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">
            On transforme vos avis clients en <span className="text-purple-600">nouveaux clients</span>.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            Chaque avis sans réponse, c&apos;est un client perdu. Ne laissez plus
            jamais un avis sans réponse professionnelle et personnalisée.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 font-medium text-lg"
            >
              Commencer maintenant
              <ArrowRight className="h-5 w-5" />
            </Link>
            <ScrollToPricingButton />
          </div>

        </div>
        </ScrollReveal>
      </section>

      {/* App Preview - features + dashboard */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-gray-200 overflow-hidden">
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

      <PlatformDemo />

      {/* Features */}
      <section className="py-20 px-4 bg-gray-100">
        <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            En 3 étapes simples, automatisez vos réponses aux avis en ligne
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: '1. Connectez vos plateformes',
                desc: 'Liez Google, Facebook, Yelp, TripAdvisor et plus en un clic. Vos données restent sécurisées.',
              },
              {
                icon: MessageSquare,
                title: "2. L'IA génère les réponses",
                desc: 'Notre IA détecte les nouveaux avis et rédige des réponses personnalisées et professionnelles.',
              },
              {
                icon: CheckCircle2,
                title: '3. Validez ou automatisez',
                desc: 'Approuvez chaque réponse avant publication, ou activez le mode automatique.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
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
              { icon: TrendingUp, stat: '+35%', label: 'de visibilité sur Google', color: 'bg-blue-50 text-blue-600' },
              { icon: Star, stat: '4.5x', label: 'plus de confiance client', color: 'bg-purple-50 text-purple-600' },
              { icon: Clock, stat: '5h', label: 'économisées par semaine', color: 'bg-green-50 text-green-600' },
              { icon: MessageSquare, stat: '100%', label: 'de taux de réponse', color: 'bg-orange-50 text-orange-600' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                <div className={`w-12 h-12 ${item.color.split(' ')[0]} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`h-6 w-6 ${item.color.split(' ')[1]}`} />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{item.stat}</p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gray-100">
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
      <section className="py-20 px-4">
        <ScrollReveal>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à automatiser vos réponses ?
          </h2>
          <p className="text-gray-500 mb-8">
            Rejoignez des centaines de commerçants qui gagnent du temps chaque jour.
          </p>
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 font-medium text-lg"
          >
            Commencer maintenant
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600" />
            <span className="font-bold font-logo">Reply Genius</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2026 Reply Genius. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

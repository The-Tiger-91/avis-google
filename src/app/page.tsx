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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Star className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Reply Genius</span>
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
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Propulsé par l&apos;intelligence artificielle
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Répondez à vos avis Google{' '}
            <span className="text-blue-600">automatiquement</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Ne laissez plus jamais un avis sans réponse. Notre IA génère des
            réponses personnalisées et professionnelles en quelques secondes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 font-medium text-lg"
            >
              Commencer gratuitement
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 text-gray-600 px-8 py-3.5 rounded-lg border hover:bg-gray-50 font-medium"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Demo preview - Style Google Reviews */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-sm text-gray-500 mb-6">
            Voici ce que vos clients voient sur Google :
          </p>
          <div className="space-y-4">
            {/* Avis positif */}
            <div className="bg-white rounded-xl p-5 border shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  JD
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900">Jean Dupont</span>
                    <span className="text-xs text-gray-400">Il y a 2 jours</span>
                  </div>
                  <div className="flex gap-0.5 my-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm">
                    Excellent pain au levain, croustillant à souhait ! Le personnel est très accueillant. Je recommande vivement cette boulangerie.
                  </p>

                  {/* Réponse du propriétaire - comme sur Google */}
                  <div className="mt-4 ml-2 pl-4 border-l-2 border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        BM
                      </div>
                      <span className="text-xs font-semibold text-gray-900">Boulangerie Martin</span>
                      <span className="text-[10px] text-gray-400">Propriétaire</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Merci beaucoup Jean ! Nous sommes ravis que notre pain au levain vous plaise, c&apos;est notre fierté.
                      Votre recommandation nous touche sincèrement. À très bientôt !
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Avis négatif */}
            <div className="bg-white rounded-xl p-5 border shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  MP
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900">Marie Petit</span>
                    <span className="text-xs text-gray-400">Il y a 5 heures</span>
                  </div>
                  <div className="flex gap-0.5 my-1">
                    {[1, 2].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[3, 4, 5].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gray-200 text-gray-200" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm">
                    Déçue par l&apos;attente, 20 minutes pour un croissant. Le produit est bon mais le service laisse à désirer.
                  </p>

                  {/* Réponse du propriétaire - comme sur Google */}
                  <div className="mt-4 ml-2 pl-4 border-l-2 border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        BM
                      </div>
                      <span className="text-xs font-semibold text-gray-900">Boulangerie Martin</span>
                      <span className="text-[10px] text-gray-400">Propriétaire</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Bonjour Marie, nous sommes navrés pour cette attente inhabituelle. Nous renforçons notre équipe
                      aux heures de pointe pour améliorer la rapidité. Nous espérons vous accueillir à nouveau
                      dans de meilleures conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Avis moyen - en attente de validation */}
            <div className="bg-white rounded-xl p-5 border shadow-sm ring-2 ring-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  LB
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900">Lucas Bernard</span>
                    <span className="text-xs text-gray-400">Il y a 1 heure</span>
                  </div>
                  <div className="flex gap-0.5 my-1">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="h-3.5 w-3.5 fill-gray-200 text-gray-200" />
                  </div>
                  <p className="text-gray-700 text-sm">
                    Bons croissants mais un peu cher pour le quartier. L&apos;accueil est sympa par contre.
                  </p>

                  {/* Réponse en attente de validation */}
                  <div className="mt-4 ml-2 pl-4 border-l-2 border-blue-300 bg-blue-50/50 rounded-r-lg py-3 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        BM
                      </div>
                      <span className="text-xs font-semibold text-gray-900">Boulangerie Martin</span>
                      <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                        <Clock className="h-2.5 w-2.5" />
                        En attente de validation
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Merci Lucas pour votre retour ! Nous sommes contents que nos croissants et notre accueil vous plaisent.
                      Nous travaillons à proposer des formules plus accessibles.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium cursor-pointer hover:bg-blue-700">Publier la réponse</span>
                      <span className="px-3 py-1.5 bg-white border text-gray-500 rounded-md text-xs font-medium cursor-pointer hover:bg-gray-50">Modifier</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Annotation */}
            <div className="text-center py-2">
              <p className="text-sm text-gray-900 font-medium">
                Ces réponses sont générées automatiquement par notre IA.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Vos clients ne voient qu&apos;une réponse normale du propriétaire sur Google.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            En 3 étapes simples, automatisez vos réponses aux avis Google
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: '1. Connectez votre Google',
                desc: 'Liez votre compte Google Business en un clic. Vos données restent sécurisées.',
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
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi répondre à vos avis ?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, stat: '+35%', label: 'de visibilité sur Google' },
              { icon: Star, stat: '4.5x', label: 'plus de confiance client' },
              { icon: Clock, stat: '5h', label: 'économisées par semaine' },
              { icon: MessageSquare, stat: '100%', label: "de taux de réponse" },
            ].map((item) => (
              <div key={item.label} className="text-center p-6">
                <item.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900 mb-1">{item.stat}</p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Choisissez le plan adapté à votre activité
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Découverte',
                price: 'Gratuit',
                period: '',
                features: ['1 établissement', '5 réponses/mois', 'Mode validation uniquement'],
                cta: 'Commencer',
                highlighted: false,
              },
              {
                name: 'Pro',
                price: '29',
                period: '/mois',
                features: ['3 établissements', '100 réponses/mois', 'Mode validation', 'Choix du ton', 'Support prioritaire'],
                cta: 'Essai gratuit 14 jours',
                highlighted: true,
              },
              {
                name: 'Premium',
                price: '49',
                period: '/mois',
                features: ['Établissements illimités', 'Réponses illimitées', 'Mode automatique', 'Instructions personnalisées', 'Support dédié'],
                cta: 'Essai gratuit 14 jours',
                highlighted: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 border ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                    : 'bg-white'
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    plan.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}{plan.price !== 'Gratuit' && '€'}
                  </span>
                  {plan.period && (
                    <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-400'}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-sm ${
                        plan.highlighted ? 'text-blue-100' : 'text-gray-600'
                      }`}
                    >
                      <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-blue-600'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/inscription"
                  className={`block text-center py-2.5 rounded-lg font-medium text-sm ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
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
            Commencer gratuitement
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-600" />
            <span className="font-bold">Reply Genius</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2026 Reply Genius. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

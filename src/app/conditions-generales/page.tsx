import Link from 'next/link'
import { Logo } from '@/components/logo'

export const metadata = {
  title: "Conditions générales d'utilisation — Reply Genius",
  description: "Conditions générales d'utilisation de Reply Genius",
}

export default function ConditionsGeneralesPage() {
  const lastUpdated = '8 mars 2026'

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Logo size={24} textSize="text-lg" />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conditions générales d&apos;utilisation</h1>
        <p className="text-sm text-gray-500 mb-10">Dernière mise à jour : {lastUpdated}</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Objet</h2>
            <p>
              Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;accès et l&apos;utilisation
              du service Reply Genius, plateforme SaaS de gestion automatisée des réponses aux avis Google Business.
              En créant un compte, vous acceptez ces CGU dans leur intégralité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description du service</h2>
            <p>Reply Genius propose :</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>La connexion à votre compte Google Business Profile via OAuth</li>
              <li>La récupération et l&apos;affichage de vos avis Google</li>
              <li>La génération automatique de réponses personnalisées par intelligence artificielle</li>
              <li>La publication des réponses sur Google Business en votre nom</li>
              <li>Un tableau de bord de suivi et de gestion de vos avis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Abonnements et tarifs</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Plan Pro — 29€/mois (ou 25€/mois en annuel)</p>
                <ul className="list-disc pl-6 mt-1 space-y-1 text-sm">
                  <li>1 établissement</li>
                  <li>50 réponses générées par mois</li>
                  <li>Mode validation manuelle</li>
                  <li>Support email</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Plan Premium — 49€/mois (ou 42€/mois en annuel)</p>
                <ul className="list-disc pl-6 mt-1 space-y-1 text-sm">
                  <li>5 établissements</li>
                  <li>Réponses illimitées</li>
                  <li>Mode automatique (publication sans validation)</li>
                  <li>Instructions personnalisées</li>
                  <li>Réponses multilingues</li>
                  <li>Support prioritaire</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm">
              Les prix s&apos;entendent TTC. La facturation est mensuelle ou annuelle selon le choix effectué à l&apos;inscription.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Paiement et renouvellement</h2>
            <p>
              L&apos;abonnement est renouvelé automatiquement à chaque période. Vous pouvez annuler à tout moment
              depuis votre espace « Abonnement ». L&apos;annulation prend effet à la fin de la période en cours —
              aucun remboursement prorata n&apos;est effectué.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Utilisation du service</h2>
            <p>En utilisant Reply Genius, vous vous engagez à :</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Être le propriétaire ou gestionnaire légitime de l&apos;établissement Google Business connecté</li>
              <li>Ne pas publier de réponses mensongères, diffamatoires ou contraires aux CGU de Google</li>
              <li>Relire les réponses générées avant publication (en mode validation manuelle)</li>
              <li>Ne pas utiliser le service à des fins illicites</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Responsabilité</h2>
            <p>
              Reply Genius est un outil d&apos;assistance. Les réponses générées par l&apos;IA sont des suggestions —
              vous restez seul responsable du contenu publié sur Google Business en votre nom.
            </p>
            <p className="mt-3">
              Reply Genius ne garantit pas un taux de disponibilité de 100% et ne peut être tenu responsable des
              interruptions de service liées aux API Google ou Anthropic, ni des conséquences d&apos;une réponse
              publiée en mode automatique.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Résiliation</h2>
            <p>
              Vous pouvez résilier votre abonnement à tout moment. Reply Genius se réserve le droit de suspendre
              ou supprimer un compte en cas de violation des présentes CGU, sans remboursement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Modification des CGU</h2>
            <p>
              Reply Genius peut modifier les présentes CGU. Vous serez informé par email de toute modification
              substantielle avec un préavis de 30 jours. L&apos;utilisation continue du service vaut acceptation
              des nouvelles CGU.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Droit applicable</h2>
            <p>
              Les présentes CGU sont soumises au droit français. Tout litige sera soumis à la compétence
              exclusive des tribunaux français.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
            <p>
              Pour toute question :{' '}
              <a href="mailto:contact@replygenius.ai" className="text-indigo-600 hover:underline">contact@replygenius.ai</a>
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t py-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto flex gap-4 text-sm text-gray-400">
          <Link href="/politique-de-confidentialite" className="hover:text-gray-600">Politique de confidentialité</Link>
          <Link href="/conditions-generales" className="hover:text-gray-600">Conditions générales</Link>
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
        </div>
      </footer>
    </div>
  )
}

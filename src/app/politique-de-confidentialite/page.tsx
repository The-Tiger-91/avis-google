import Link from 'next/link'
import { Logo } from '@/components/logo'

export const metadata = {
  title: 'Politique de confidentialité — Reply Genius',
  description: 'Politique de confidentialité de Reply Genius',
}

export default function PolitiqueConfidentialitePage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-gray-500 mb-10">Dernière mise à jour : {lastUpdated}</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Présentation</h2>
            <p>
              Reply Genius (ci-après « le Service ») est un service SaaS permettant aux commerçants de gérer et automatiser
              leurs réponses aux avis Google Business grâce à l&apos;intelligence artificielle.
              La présente politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Données collectées</h2>
            <p className="mb-3">Nous collectons les données suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Données de compte :</strong> nom, adresse email, mot de passe (chiffré)</li>
              <li><strong>Données de facturation :</strong> plan choisi, historique des paiements</li>
              <li><strong>Données Google Business :</strong> avis clients, informations sur votre établissement, tokens d&apos;accès OAuth</li>
              <li><strong>Données d&apos;utilisation :</strong> réponses générées, paramètres de ton, instructions personnalisées</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Utilisation des données Google</h2>
            <p className="mb-3">
              Reply Genius accède à votre compte Google Business Profile uniquement pour :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Récupérer les avis clients de votre établissement</li>
              <li>Publier des réponses aux avis en votre nom (avec votre accord)</li>
              <li>Afficher les informations de votre établissement dans votre tableau de bord</li>
            </ul>
            <p className="mt-3">
              Nous ne partageons, ne vendons et n&apos;utilisons pas vos données Google à d&apos;autres fins.
              Vos tokens d&apos;accès Google sont stockés de manière chiffrée et ne sont jamais transmis à des tiers.
            </p>
            <p className="mt-3">
              L&apos;utilisation par Reply Genius des informations reçues via les API Google est conforme à la
              <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-indigo-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                Politique d&apos;utilisation des données utilisateur des services API Google
              </a>, incluant les exigences d&apos;utilisation limitée.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Intelligence artificielle</h2>
            <p>
              Les réponses aux avis sont générées par l&apos;API Claude d&apos;Anthropic. Le contenu des avis
              (note, commentaire, nom du client) est transmis à Anthropic pour générer une réponse adaptée.
              Anthropic est soumis à sa propre politique de confidentialité disponible sur{' '}
              <a href="https://www.anthropic.com/privacy" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">anthropic.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Conservation des données</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vos données de compte sont conservées pendant toute la durée de votre abonnement et 30 jours après résiliation</li>
              <li>Les avis et réponses sont conservés pendant 12 mois (plan Pro) ou indéfiniment (plan Premium)</li>
              <li>Vous pouvez demander la suppression de vos données à tout moment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Partage des données</h2>
            <p>Nous ne vendons jamais vos données. Nous partageons uniquement avec :</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Supabase</strong> — hébergement de la base de données (UE)</li>
              <li><strong>Anthropic</strong> — génération de réponses IA</li>
              <li><strong>Google</strong> — publication des réponses sur Google Business</li>
              <li><strong>Vercel</strong> — hébergement de l&apos;application</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Vos droits (RGPD)</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Droit d&apos;accès</strong> — obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
              <li><strong>Droit à l&apos;effacement</strong> — supprimer vos données</li>
              <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format lisible</li>
              <li><strong>Droit de révocation</strong> — révoquer l&apos;accès Google à tout moment depuis votre tableau de bord</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à :{' '}
              <a href="mailto:contact@replygenius.ai" className="text-indigo-600 hover:underline">contact@replygenius.ai</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Sécurité</h2>
            <p>
              Vos données sont protégées par chiffrement TLS en transit et chiffrement AES-256 au repos.
              Les tokens Google sont stockés de manière sécurisée et ne sont jamais exposés côté client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
            <p>
              Pour toute question relative à cette politique :{' '}
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

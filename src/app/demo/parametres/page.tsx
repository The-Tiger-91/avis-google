import Link from 'next/link'
import { Store, Info } from 'lucide-react'

export default function DemoParametresPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-500 mt-1">Configurez le comportement de l&apos;IA pour chaque établissement</p>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">Mode démo</p>
          <p className="text-sm text-amber-700 mt-0.5">
            Les paramètres sont en lecture seule dans la démo.{' '}
            <Link href="/inscription" className="underline font-medium">
              Créez un compte
            </Link>{' '}
            pour configurer votre établissement.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Store className="h-12 w-12 text-gray-200 mb-4" />
        <h3 className="text-base font-medium text-gray-700 mb-1">Connectez votre Google Business</h3>
        <p className="text-sm text-gray-500 max-w-sm mb-6">
          Une fois connecté, configurez le ton, le mode de réponse et les instructions personnalisées pour chaque établissement.
        </p>
        <Link
          href="/inscription"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Commencer gratuitement
        </Link>
      </div>
    </div>
  )
}

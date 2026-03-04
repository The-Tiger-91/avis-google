import { Sidebar } from '@/components/dashboard/sidebar'
import { PageTransition } from '@/components/dashboard/page-transition'
import Link from 'next/link'
import { Star } from 'lucide-react'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Sidebar basePath="/demo" />
      <div className="flex-1 flex flex-col min-h-0">
        <header className="h-14 bg-white border-b border-gray-100 px-6 flex items-center justify-between flex-shrink-0">
          <div />
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-semibold">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              Mode démo
            </span>
            <div className="w-px h-4 bg-gray-200" />
            <Link
              href="/inscription"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              Créer un compte →
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  )
}

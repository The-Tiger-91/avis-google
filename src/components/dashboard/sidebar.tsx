'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  MessageSquare,
  Store,
  Settings,
  CreditCard,
  Star,
} from 'lucide-react'

const navigation = [
  { name: 'Tableau de bord', href: '/tableau-de-bord', icon: LayoutDashboard },
  { name: 'Avis', href: '/avis', icon: MessageSquare },
  { name: 'Etablissements', href: '/etablissements', icon: Store },
  { name: 'Parametres', href: '/parametres', icon: Settings },
  { name: 'Abonnement', href: '/abonnement', icon: CreditCard },
]

export function Sidebar({ basePath = '' }: { basePath?: string }) {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-white border-r border-gray-100 h-screen flex-shrink-0 p-3 flex flex-col">
      <Link href={basePath ? `${basePath}/tableau-de-bord` : '/'} className="flex items-center gap-2 px-3 py-3.5 mb-4">
        <Star className="h-5 w-5 text-indigo-600 fill-indigo-600" />
        <span className="text-sm font-semibold text-gray-900 tracking-tight font-logo">Reply Genius</span>
      </Link>

      <nav className="flex-1 space-y-0.5">
        {navigation.map((item) => {
          const fullHref = `${basePath}${item.href}`
          const isActive = pathname.startsWith(fullHref)
          return (
            <Link
              key={item.href}
              href={fullHref}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-all',
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              )}
            >
              <item.icon className={cn('h-4 w-4 flex-shrink-0', isActive ? 'text-indigo-600' : 'text-gray-400')} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-100 pt-3 pb-1 px-3">
        <p className="text-[10px] text-gray-300 uppercase tracking-widest font-medium">v1.0</p>
      </div>
    </aside>
  )
}

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

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 flex flex-col">
      <Link href="/" className="flex items-center gap-2 px-3 py-4 mb-6">
        <Star className="h-7 w-7 text-blue-600" />
        <span className="text-lg font-bold text-gray-900">Reply Genius</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

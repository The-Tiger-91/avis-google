'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, User, Star } from 'lucide-react'

interface TopbarProps {
  userName?: string | null
  plan?: string | null
}

export function Topbar({ userName, plan }: TopbarProps) {
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const isPremium = plan === 'premium'

  return (
    <header className="h-14 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
      <div />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <span className="font-medium text-gray-700">{userName || 'Utilisateur'}</span>
          {plan && (
            <span className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
              isPremium
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}>
              <Star className={`h-2.5 w-2.5 ${isPremium ? 'fill-amber-500 text-amber-500' : 'fill-indigo-500 text-indigo-500'}`} />
              {isPremium ? 'Premium' : 'Pro'}
            </span>
          )}
        </div>
        <div className="w-px h-4 bg-gray-200" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Déconnexion
        </button>
      </div>
    </header>
  )
}

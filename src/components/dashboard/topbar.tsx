'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'

interface TopbarProps {
  userName?: string | null
}

export function Topbar({ userName }: TopbarProps) {
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/connexion')
    router.refresh()
  }

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <div />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>{userName || 'Utilisateur'}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </header>
  )
}

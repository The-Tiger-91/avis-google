'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, MapPin, Store, Check } from 'lucide-react'

interface Location {
  account_name: string
  location_name: string
  title: string
  address: string | null
}

export function LocationPickerModal({
  sessionId,
  locations,
}: {
  sessionId: string
  locations: Location[]
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function toggle(locationName: string) {
    setSelected(prev =>
      prev.includes(locationName)
        ? prev.filter(n => n !== locationName)
        : [locationName] // Plan Pro : 1 seul établissement
    )
  }

  function handleClose() {
    router.push('/tableau-de-bord?dismissed=1')
  }

  async function handleConfirm() {
    if (selected.length === 0) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/google/select-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          selected_location_names: selected,
        }),
      })
      if (res.ok) {
        router.push('/tableau-de-bord')
        router.refresh()
      } else {
        setError('Une erreur est survenue. Réessayez.')
        setLoading(false)
      }
    } catch {
      setError('Une erreur est survenue. Réessayez.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fond sombre */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Carte modale */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 48 48" className="h-6 w-6">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Choisissez votre établissement
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {locations.length === 1
                  ? '1 établissement trouvé dans votre compte Google'
                  : `${locations.length} établissements trouvés dans votre compte Google`}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Liste des établissements */}
        <div className="p-6 space-y-2.5 max-h-72 overflow-y-auto">
          {locations.map((loc) => {
            const isSelected = selected.includes(loc.location_name)
            return (
              <button
                key={loc.location_name}
                onClick={() => toggle(loc.location_name)}
                className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? 'bg-indigo-100' : 'bg-white border border-gray-200'
                }`}>
                  {isSelected
                    ? <Check className="h-4 w-4 text-indigo-600" />
                    : <Store className="h-4 w-4 text-gray-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{loc.title}</p>
                  {loc.address && (
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      {loc.address}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 space-y-2">
          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}
          <button
            onClick={handleConfirm}
            disabled={selected.length === 0 || loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Connexion en cours…'
              : selected.length > 0
                ? 'Connecter cet établissement'
                : 'Sélectionnez un établissement'}
          </button>
          <p className="text-center text-xs text-gray-400">
            Vous pourrez en ajouter d&apos;autres plus tard
          </p>
        </div>
      </div>
    </div>
  )
}

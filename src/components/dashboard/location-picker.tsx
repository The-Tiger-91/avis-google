'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Store, Check } from 'lucide-react'

interface Location {
  account_name: string
  location_name: string
  title: string
  address: string | null
}

export function LocationPicker({
  sessionId,
  locations,
  maxSelect,
}: {
  sessionId: string
  locations: Location[]
  maxSelect: number
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function toggle(locationName: string) {
    setSelected(prev => {
      if (prev.includes(locationName)) return prev.filter(n => n !== locationName)
      // Pro (maxSelect=1): remplace la sélection. Premium: cumule jusqu'à maxSelect.
      if (maxSelect === 1) return [locationName]
      if (prev.length >= maxSelect) return prev
      return [...prev, locationName]
    })
  }

  async function handleConfirm() {
    if (selected.length === 0) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/google/select-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, selected_location_names: selected }),
      })
      if (res.ok) {
        router.push('/tableau-de-bord?synced=true')
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
    <div className="space-y-3">
      {locations.map((loc) => {
        const isSelected = selected.includes(loc.location_name)
        return (
          <button
            key={loc.location_name}
            onClick={() => toggle(loc.location_name)}
            className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
              isSelected
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
              isSelected ? 'bg-indigo-100' : 'bg-gray-100'
            }`}>
              {isSelected
                ? <Check className="h-5 w-5 text-indigo-600" />
                : <Store className="h-5 w-5 text-gray-400" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{loc.title}</p>
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

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <button
        onClick={handleConfirm}
        disabled={selected.length === 0 || loading}
        className="w-full mt-2 px-5 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading
          ? 'Connexion en cours…'
          : selected.length > 0
            ? `Connecter ${selected.length > 1 ? `${selected.length} établissements` : 'cet établissement'}`
            : 'Sélectionnez un établissement'
        }
      </button>

      {maxSelect === 1 && (
        <p className="text-center text-xs text-gray-400">
          Plan Pro · 1 établissement maximum
        </p>
      )}
    </div>
  )
}

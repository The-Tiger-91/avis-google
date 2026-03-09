'use client'

import { useState } from 'react'
import { History, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BackfillButton({ businessId, googleConnectedAt }: {
  businessId: string
  googleConnectedAt: string | null
}) {
  const [open, setOpen] = useState(false)
  const [since, setSince] = useState(() => {
    const d = new Date()
    d.setMonth(d.getMonth() - 1)
    return d.toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ processed: number; errors: number; message?: string } | null>(null)

  const minDate = (() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 1)
    return d.toISOString().split('T')[0]
  })()

  const maxDate = googleConnectedAt
    ? new Date(googleConnectedAt).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]

  async function handleBackfill() {
    setLoading(true)
    setResult(null)

    const res = await fetch('/api/reviews/backfill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessId, since }),
    })

    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <History className="h-4 w-4" />
        Traiter les anciens avis
      </Button>
    )
  }

  return (
    <div className="border rounded-xl p-4 bg-amber-50 border-amber-200 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-900">Traiter les anciens avis</p>
          <p className="text-xs text-amber-700 mt-0.5">
            L&apos;IA va générer des réponses pour les avis sans réponse depuis cette date.
          </p>
        </div>
        <button onClick={() => { setOpen(false); setResult(null) }} className="text-amber-500 hover:text-amber-700 text-xs">✕</button>
      </div>

      {!result ? (
        <>
          <div>
            <label className="block text-xs font-medium text-amber-800 mb-1">
              Traiter les avis depuis le :
            </label>
            <input
              type="date"
              value={since}
              min={minDate}
              max={maxDate}
              onChange={(e) => setSince(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-amber-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <p className="text-[11px] text-amber-600 mt-1">
              Maximum 12 mois en arrière. Seuls les avis sans réponse existante seront traités.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleBackfill}
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Traitement en cours...</>
              ) : (
                <><History className="h-4 w-4" />Lancer le traitement</>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Annuler
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-start gap-2">
          {result.processed > 0 ? (
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          )}
          <div className="text-sm">
            {result.message ? (
              <p className="text-amber-800">{result.message}</p>
            ) : (
              <>
                <p className="font-medium text-gray-900">
                  {result.processed} avis traité{result.processed > 1 ? 's' : ''}
                  {result.errors > 0 && `, ${result.errors} erreur${result.errors > 1 ? 's' : ''}`}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Les réponses sont visibles dans la liste des avis.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

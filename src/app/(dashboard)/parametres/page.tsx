'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

export default function ParametresPage() {
  const supabase = createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)

      setBusinesses(data || [])
      setLoading(false)
    }
    load()
  }, [supabase])

  async function handleSave(businessId: string, updates: Record<string, string>) {
    setSaving(businessId)
    await supabase
      .from('businesses')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', businessId)

    setSaving(null)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>

      {businesses.map((business) => (
        <BusinessSettings
          key={business.id}
          business={business}
          saving={saving === business.id}
          onSave={(updates) => handleSave(business.id, updates)}
        />
      ))}

      {businesses.length === 0 && (
        <p className="text-gray-500">
          Aucun établissement à configurer. Connectez un Google Business d&apos;abord.
        </p>
      )}
    </div>
  )
}

function BusinessSettings({
  business,
  saving,
  onSave,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  business: any
  saving: boolean
  onSave: (updates: Record<string, string>) => void
}) {
  const [tone, setTone] = useState(business.tone_preference || 'professionnel')
  const [mode, setMode] = useState(business.response_mode || 'validation')
  const [instructions, setInstructions] = useState(business.custom_instructions || '')
  const [businessType, setBusinessType] = useState(business.business_type || '')

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">{business.business_name}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d&apos;établissement
          </label>
          <input
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            placeholder="ex: Restaurant, Boulangerie, Salon de coiffure..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ton des réponses
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          >
            <option value="professionnel">Professionnel</option>
            <option value="amical">Amical</option>
            <option value="formel">Formel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mode de réponse
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          >
            <option value="validation">Validation manuelle</option>
            <option value="auto">Automatique (premium)</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">
            {mode === 'auto'
              ? "L'IA répond directement sans votre validation."
              : 'Vous validez chaque réponse avant publication.'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructions personnalisées pour l&apos;IA
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="ex: Toujours mentionner notre programme de fidélité, Proposer un café offert pour les avis négatifs..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
          />
        </div>

        <Button
          onClick={() =>
            onSave({
              tone_preference: tone,
              response_mode: mode,
              custom_instructions: instructions,
              business_type: businessType,
            })
          }
          loading={saving}
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </CardContent>
    </Card>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Save,
  Store,
  MessageSquare,
  Zap,
  FileText,
  CheckCircle2,
  Shield,
  Sparkles,
  MapPin,
  Plus,
  X,
} from 'lucide-react'

export default function ParametresPage() {
  const supabase = createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

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
    setSaved(businessId)
    setTimeout(() => setSaved(null), 2000)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-500 mt-1">Configurez vos préférences de réponse</p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-500 mt-1">
          Configurez le comportement de l&apos;IA pour chaque établissement
        </p>
      </div>

      {businesses.map((business) => (
        <BusinessSettings
          key={business.id}
          business={business}
          saving={saving === business.id}
          saved={saved === business.id}
          onSave={(updates) => handleSave(business.id, updates)}
        />
      ))}

      {businesses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Store className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun établissement à configurer
            </h3>
            <p className="text-gray-500">
              Connectez un Google Business pour accéder aux paramètres.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

const toneOptions = [
  {
    value: 'professionnel',
    label: 'Professionnel',
    description: 'Ton sérieux et courtois, adapté à tous les secteurs',
    icon: Shield,
    color: 'blue',
  },
  {
    value: 'amical',
    label: 'Amical',
    description: 'Ton chaleureux et décontracté, crée une proximité',
    icon: MessageSquare,
    color: 'green',
  },
  {
    value: 'formel',
    label: 'Formel',
    description: 'Ton très respectueux et soigné, pour le haut de gamme',
    icon: FileText,
    color: 'amber',
  },
]

const modeOptions = [
  {
    value: 'validation',
    label: 'Validation manuelle',
    description: 'Vous validez chaque réponse avant publication',
    icon: CheckCircle2,
    color: 'blue',
  },
  {
    value: 'auto',
    label: 'Automatique',
    description: "L'IA répond directement sans votre validation",
    icon: Zap,
    color: 'purple',
    badge: 'Premium',
  },
]

function BusinessSettings({
  business,
  saving,
  saved,
  onSave,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  business: any
  saving: boolean
  saved: boolean
  onSave: (updates: Record<string, string>) => void
}) {
  const [tone, setTone] = useState(business.tone_preference || 'professionnel')
  const [mode, setMode] = useState(business.response_mode || 'validation')
  const [instructions, setInstructions] = useState<string[]>(
    business.custom_instructions ? business.custom_instructions.split('\n').filter(Boolean) : []
  )
  const [newInstruction, setNewInstruction] = useState('')
  const [businessType, setBusinessType] = useState(business.business_type || '')

  return (
    <Card>
      <CardContent className="p-0">
        {/* Business header */}
        <div className="flex items-center gap-4 p-6 border-b bg-gray-50/50 rounded-t-xl">
          <div className="p-3 bg-indigo-50 rounded-xl">
            <Store className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{business.business_name}</h2>
            {business.address && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {business.address}
              </p>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Type d'établissement */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
              <Store className="h-4 w-4 text-gray-500" />
              Type d&apos;établissement
            </label>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="ex: Restaurant, Boulangerie, Salon de coiffure..."
              className="w-full px-4 py-2.5 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm bg-white transition-shadow"
            />
          </div>

          {/* Ton des réponses */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              Ton des réponses
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {toneOptions.map((option) => {
                const isSelected = tone === option.value
                const Icon = option.icon
                const colors = {
                  blue: isSelected ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50',
                  green: isSelected ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50',
                  amber: isSelected ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50',
                }
                const iconColors = {
                  blue: isSelected ? 'text-indigo-600' : 'text-gray-400',
                  green: isSelected ? 'text-green-600' : 'text-gray-400',
                  amber: isSelected ? 'text-amber-600' : 'text-gray-400',
                }

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTone(option.value)}
                    className={`relative flex flex-col items-start p-4 rounded-xl border transition-all cursor-pointer text-left ${colors[option.color as keyof typeof colors]}`}
                  >
                    <Icon className={`h-5 w-5 mb-2 ${iconColors[option.color as keyof typeof iconColors]}`} />
                    <span className="text-sm font-medium text-gray-900">{option.label}</span>
                    <span className="text-xs text-gray-500 mt-0.5">{option.description}</span>
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle2 className={`h-4 w-4 ${iconColors[option.color as keyof typeof iconColors]}`} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mode de réponse */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
              <Zap className="h-4 w-4 text-gray-500" />
              Mode de réponse
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modeOptions.map((option) => {
                const isSelected = mode === option.value
                const Icon = option.icon
                const borderClass = isSelected
                  ? option.color === 'purple'
                    ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500'
                    : 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                const iconClass = isSelected
                  ? option.color === 'purple' ? 'text-purple-600' : 'text-indigo-600'
                  : 'text-gray-400'

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMode(option.value)}
                    className={`relative flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer text-left ${borderClass}`}
                  >
                    <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconClass}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{option.label}</span>
                        {option.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                            {option.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 mt-0.5 block">{option.description}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle2 className={`h-4 w-4 ${iconClass}`} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Instructions personnalisées */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Sparkles className="h-4 w-4 text-gray-500" />
                Instructions personnalisées
              </label>
            </div>
            <div className={`rounded-lg border bg-purple-50 p-3 transition-all ${instructions.length > 0 ? 'border-purple-500 ring-1 ring-purple-500' : 'border-purple-200'}`}>
              <p className="text-[11px] text-gray-500 leading-snug mb-3">
                Donnez des instructions spécifiques à l&apos;IA pour personnaliser vos réponses.
              </p>

              {instructions.length > 0 && (
                <div className="space-y-2 mb-3">
                  {instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white rounded-lg border-2 border-purple-200 px-3 py-2"
                    >
                      <span className="text-xs text-gray-700 flex-1">{instruction}</span>
                      <button
                        type="button"
                        onClick={() => setInstructions(instructions.filter((_, i) => i !== index))}
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {instructions.length < 5 && (
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newInstruction}
                    onChange={(e) => setNewInstruction(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newInstruction.trim()) {
                        e.preventDefault()
                        setInstructions([...instructions, newInstruction.trim()])
                        setNewInstruction('')
                      }
                    }}
                    placeholder="ex : Toujours mentionner notre programme de fidélité"
                    className="flex-1 px-3 py-2 border border-purple-200 bg-white rounded-lg text-xs outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newInstruction.trim()) {
                        setInstructions([...instructions, newInstruction.trim()])
                        setNewInstruction('')
                      }
                    }}
                    disabled={!newInstruction.trim()}
                    className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Ajouter
                  </button>
                </div>
              )}
              <p className="text-[10px] text-purple-400 text-right">{instructions.length}/5 instruction{instructions.length > 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Save button */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={() =>
                onSave({
                  tone_preference: tone,
                  response_mode: mode,
                  custom_instructions: instructions.join('\n'),
                  business_type: businessType,
                })
              }
              loading={saving}
            >
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium animate-fade-in">
                <CheckCircle2 className="h-4 w-4" />
                Enregistré !
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

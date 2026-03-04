import { ThumbsUp, ThumbsDown, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const POSITIVE_TAGS = [
  'Cuisine', 'Service', 'Accueil', 'Rapport qualité-prix', 'Cadre agréable', 'Rapidité',
]

const NEGATIVE_TAGS = [
  "Temps d'attente", 'Bruit', 'Prix élevé', 'Service lent',
]

interface InsightsCardProps {
  reviews: { rating: number }[]
}

export function InsightsCard({ reviews }: InsightsCardProps) {
  const total = reviews.length || 1

  const dist = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length
    return { star, count, pct: Math.round((count / total) * 100) }
  })

  return (
    <Card>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-gray-400" />
            <h3 className="text-base font-semibold text-gray-900">Résumé des avis</h3>
          </div>
          <span className="text-[11px] text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded-full font-medium">
            IA
          </span>
        </div>

        {/* Rating distribution */}
        <div className="space-y-1.5 mb-4">
          {dist.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-sm text-gray-400 w-3 flex-shrink-0">{star}</span>
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
              <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    star >= 4 ? 'bg-green-500' : star === 3 ? 'bg-amber-300' : 'bg-red-400'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-sm text-gray-400 w-4 text-right flex-shrink-0">{count}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 my-3" />

        {/* Positive */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsUp className="h-3.5 w-3.5 text-green-700" />
            <span className="text-sm font-semibold text-gray-700">Points positifs</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POSITIVE_TAGS.map(tag => (
              <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-400 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Negative */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsDown className="h-3.5 w-3.5 text-red-600" />
            <span className="text-sm font-semibold text-gray-700">Points à améliorer</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {NEGATIVE_TAGS.map(tag => (
              <span key={tag} className="text-xs bg-red-50 text-red-700 border border-red-300 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare, Send, Star, Clock } from 'lucide-react'

interface StatsCardsProps {
  newReviews: number
  responsesSent: number
  averageRating: number
  pendingResponses: number
}

export function StatsCards({
  newReviews,
  responsesSent,
  averageRating,
  pendingResponses,
}: StatsCardsProps) {
  const stats = [
    {
      label: 'Nouveaux avis',
      value: newReviews,
      icon: MessageSquare,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      label: 'Réponses envoyées',
      value: responsesSent,
      icon: Send,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Note moyenne',
      value: averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      label: 'En attente',
      value: pendingResponses,
      icon: Clock,
      color: 'text-orange-600 bg-orange-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

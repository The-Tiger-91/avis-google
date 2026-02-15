'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from './rating-stars'
import { Check, X, RefreshCw, Edit3 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ReviewCardProps {
  review: {
    id: string
    reviewer_name: string | null
    rating: number
    comment: string | null
    review_created_at: string | null
    status: string
  }
  response?: {
    id: string
    ai_generated_text: string
    final_text: string | null
    status: string
  } | null
  onApprove: (reviewId: string, responseId: string, text: string) => Promise<void>
  onReject: (reviewId: string, responseId: string) => Promise<void>
  onRegenerate: (reviewId: string) => Promise<void>
}

export function ReviewCard({
  review,
  response,
  onApprove,
  onReject,
  onRegenerate,
}: ReviewCardProps) {
  const [editedText, setEditedText] = useState(
    response?.final_text || response?.ai_generated_text || ''
  )
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const statusBadge = {
    new: { label: 'Nouveau', variant: 'info' as const },
    response_pending: { label: 'En attente', variant: 'warning' as const },
    responded: { label: 'Répondu', variant: 'success' as const },
    ignored: { label: 'Ignoré', variant: 'default' as const },
  }

  const badge = statusBadge[review.status as keyof typeof statusBadge] || statusBadge.new

  async function handleAction(action: string) {
    if (!response) return
    setLoading(action)
    try {
      if (action === 'approve') {
        await onApprove(review.id, response.id, editedText)
      } else if (action === 'reject') {
        await onReject(review.id, response.id)
      } else if (action === 'regenerate') {
        await onRegenerate(review.id)
      }
    } finally {
      setLoading(null)
      setIsEditing(false)
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <RatingStars rating={review.rating} />
              <span className="font-medium text-gray-900">
                {review.reviewer_name || 'Anonyme'}
              </span>
            </div>
            {review.review_created_at && (
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(review.review_created_at), {
                  addSuffix: true,
                  locale: fr,
                })}
              </p>
            )}
          </div>
          <Badge variant={badge.variant}>{badge.label}</Badge>
        </div>

        {review.comment && (
          <p className="text-gray-700 text-sm leading-relaxed">
            &ldquo;{review.comment}&rdquo;
          </p>
        )}

        {response && review.status !== 'responded' && review.status !== 'ignored' && (
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <p className="text-xs font-medium text-blue-700 uppercase tracking-wide">
              Réponse proposée par l&apos;IA
            </p>
            {isEditing ? (
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows={4}
                className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            ) : (
              <p className="text-sm text-gray-700">{editedText}</p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                size="sm"
                onClick={() => handleAction('approve')}
                loading={loading === 'approve'}
              >
                <Check className="h-3.5 w-3.5" />
                Publier
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit3 className="h-3.5 w-3.5" />
                {isEditing ? 'Aperçu' : 'Modifier'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleAction('regenerate')}
                loading={loading === 'regenerate'}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Regénérer
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleAction('reject')}
                loading={loading === 'reject'}
              >
                <X className="h-3.5 w-3.5" />
                Ignorer
              </Button>
            </div>
          </div>
        )}

        {response && review.status === 'responded' && (
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-xs font-medium text-green-700 uppercase tracking-wide mb-2">
              Réponse publiée
            </p>
            <p className="text-sm text-gray-700">
              {response.final_text || response.ai_generated_text}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

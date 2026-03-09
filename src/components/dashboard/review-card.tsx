'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { RatingStars } from './rating-stars'
import { Check, X, RefreshCw, Edit3, Clock, AlertTriangle } from 'lucide-react'
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
    photo_urls?: string[]
    is_dangerous?: boolean
  }
  response?: {
    id: string
    ai_generated_text: string
    final_text: string | null
    status: string
  } | null
  businessName?: string
  onApprove: (reviewId: string, responseId: string, text: string) => Promise<void>
  onReject: (reviewId: string, responseId: string) => Promise<void>
  onRegenerate: (reviewId: string) => Promise<void>
}

const AVATAR_COLORS = [
  'bg-red-500', 'bg-purple-500', 'bg-green-500', 'bg-blue-500',
  'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500',
]

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

export function ReviewCard({
  review,
  response,
  businessName = 'Votre établissement',
  onApprove,
  onReject,
  onRegenerate,
}: ReviewCardProps) {
  const [editedText, setEditedText] = useState(
    response?.final_text || response?.ai_generated_text || ''
  )
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const isPending = review.status === 'response_pending'
  const isResponded = review.status === 'responded'
  const isIgnored = review.status === 'ignored'

  const reviewerName = review.reviewer_name || 'Anonyme'
  const avatarColor = getAvatarColor(reviewerName)
  const initials = getInitials(reviewerName)
  const bizInitials = getInitials(businessName)

  async function handleAction(action: string) {
    if (!response) return
    setLoading(action)
    try {
      if (action === 'approve') await onApprove(review.id, response.id, editedText)
      else if (action === 'reject') await onReject(review.id, response.id)
      else if (action === 'regenerate') await onRegenerate(review.id)
    } finally {
      setLoading(null)
      setIsEditing(false)
    }
  }

  return (
    <Card className={review.is_dangerous ? 'ring-2 ring-red-200' : isPending ? 'ring-2 ring-blue-100' : ''}>
      <CardContent className="p-5">
        {review.is_dangerous && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 mb-3">
            <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
            Avis sensible — vérifiez la réponse avant publication
          </div>
        )}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            {/* Name + date + status */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-gray-900">{reviewerName}</span>
                {review.review_created_at && (
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(review.review_created_at), { addSuffix: true, locale: fr })}
                  </span>
                )}
              </div>
              {isIgnored && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Ignoré</span>
              )}
            </div>

            {/* Stars */}
            <div className="my-1">
              <RatingStars rating={review.rating} size="sm" />
            </div>

            {/* Comment */}
            {review.comment && (
              <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
            )}

            {/* Photos */}
            {review.photo_urls && review.photo_urls.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {review.photo_urls.slice(0, 4).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Photo ${i + 1}`}
                    className="h-20 w-20 object-cover rounded-lg border border-gray-100"
                  />
                ))}
              </div>
            )}

            {/* Response — pending */}
            {response && isPending && (
              <div className="mt-4 ml-2 pl-4 border-l-2 border-blue-300 bg-blue-50/50 rounded-r-lg py-3 pr-3">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {bizInitials}
                  </div>
                  <span className="text-xs font-semibold text-gray-900">{businessName}</span>
                  <span className="text-[10px] text-gray-400">Propriétaire</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                    <Clock className="h-2.5 w-2.5" />
                    En attente de validation
                  </span>
                </div>

                {isEditing ? (
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    rows={4}
                    className="w-full p-2.5 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none bg-white mb-3"
                  />
                ) : (
                  <p className="text-sm text-gray-600 mb-3">{editedText}</p>
                )}

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleAction('approve')}
                    disabled={loading === 'approve'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <Check className="h-3 w-3" />
                    {loading === 'approve' ? 'Publication...' : 'Publier la réponse'}
                  </button>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                    {isEditing ? 'Aperçu' : 'Modifier'}
                  </button>
                  <button
                    onClick={() => handleAction('regenerate')}
                    disabled={loading === 'regenerate'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-md text-xs font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" />
                    {loading === 'regenerate' ? '...' : 'Regénérer'}
                  </button>
                  <button
                    onClick={() => handleAction('reject')}
                    disabled={loading === 'reject'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-gray-400 rounded-md text-xs font-medium hover:text-red-500 hover:bg-red-50 disabled:opacity-50 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Ignorer
                  </button>
                </div>
              </div>
            )}

            {/* Response — responded */}
            {response && isResponded && (
              <div className="mt-4 ml-2 pl-4 border-l-2 border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {bizInitials}
                  </div>
                  <span className="text-xs font-semibold text-gray-900">{businessName}</span>
                  <span className="text-[10px] text-gray-400">Propriétaire</span>
                </div>
                <p className="text-sm text-gray-600">
                  {response.final_text || response.ai_generated_text}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

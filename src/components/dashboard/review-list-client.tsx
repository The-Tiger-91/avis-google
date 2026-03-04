'use client'

import { useState } from 'react'
import { ReviewCard } from './review-card'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Review {
  id: string
  reviewer_name: string | null
  rating: number
  comment: string | null
  review_created_at: string | null
  status: string
  photo_urls?: string[]
  responses: Array<{
    id: string
    ai_generated_text: string
    final_text: string | null
    status: string
  }>
}

type FilterType = 'all' | 'pending' | 'responded'

interface ReviewListClientProps {
  initialReviews: Review[]
  businessName?: string
  showViewAll?: boolean
}

export function ReviewListClient({ initialReviews, businessName, showViewAll = true }: ReviewListClientProps) {
  const [reviews, setReviews] = useState(initialReviews)
  const [filter, setFilter] = useState<FilterType>('all')
  const router = useRouter()

  const counts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === 'new' || r.status === 'response_pending').length,
    responded: reviews.filter(r => r.status === 'responded').length,
  }

  const filtered = reviews.filter(r => {
    if (filter === 'pending') return r.status === 'new' || r.status === 'response_pending'
    if (filter === 'responded') return r.status === 'responded'
    return true
  })

  async function handleApprove(reviewId: string, responseId: string, text: string) {
    const res = await fetch(`/api/reviews/${reviewId}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responseId, finalText: text, action: 'approve' }),
    })

    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, status: 'responded' } : r
        )
      )
      router.refresh()
    }
  }

  async function handleReject(reviewId: string, responseId: string) {
    const res = await fetch(`/api/reviews/${reviewId}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responseId, action: 'reject' }),
    })

    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, status: 'ignored' } : r
        )
      )
      router.refresh()
    }
  }

  async function handleRegenerate(reviewId: string) {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewId }),
    })

    if (res.ok) {
      const data = await res.json()
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? {
                ...r,
                status: 'response_pending',
                responses: [data.response],
              }
            : r
        )
      )
    }
  }

  const FILTERS: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'pending', label: 'En attente' },
    { key: 'responded', label: 'Répondus' },
  ]

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              filter === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
              filter === key ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'
            }`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Reviews */}
      {filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          Aucun avis dans cette catégorie.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {filtered.map((review) => {
              const latestResponse = review.responses?.find((r) => r.status === 'draft') ||
                review.responses?.find((r) => r.status === 'published') ||
                review.responses?.[0] || null

              return (
                <ReviewCard
                  key={review.id}
                  review={review}
                  response={latestResponse}
                  businessName={businessName}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onRegenerate={handleRegenerate}
                />
              )
            })}
          </div>

          {/* Voir tous les avis */}
          {showViewAll && (
            <div className="flex justify-end pt-1">
              <Link
                href="/avis"
                className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Voir tous les avis
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}

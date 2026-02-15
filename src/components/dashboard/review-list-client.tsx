'use client'

import { useState } from 'react'
import { ReviewCard } from './review-card'
import { useRouter } from 'next/navigation'

interface Review {
  id: string
  reviewer_name: string | null
  rating: number
  comment: string | null
  review_created_at: string | null
  status: string
  responses: Array<{
    id: string
    ai_generated_text: string
    final_text: string | null
    status: string
  }>
}

interface ReviewListClientProps {
  initialReviews: Review[]
}

export function ReviewListClient({ initialReviews }: ReviewListClientProps) {
  const [reviews, setReviews] = useState(initialReviews)
  const router = useRouter()

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

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun avis pour le moment. Les avis apparaîtront ici automatiquement.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const latestResponse = review.responses?.find((r) => r.status === 'draft') ||
          review.responses?.find((r) => r.status === 'published') ||
          review.responses?.[0] || null

        return (
          <ReviewCard
            key={review.id}
            review={review}
            response={latestResponse}
            onApprove={handleApprove}
            onReject={handleReject}
            onRegenerate={handleRegenerate}
          />
        )
      })}
    </div>
  )
}

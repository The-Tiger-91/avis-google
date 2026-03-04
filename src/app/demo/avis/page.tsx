import { ReviewListClient } from '@/components/dashboard/review-list-client'
import { MOCK_REVIEWS } from '@/lib/mock-data'

export default function DemoAvisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tous les avis</h1>
        <p className="text-gray-500 mt-1">Consultez et gérez tous les avis de vos établissements</p>
      </div>
      <ReviewListClient initialReviews={MOCK_REVIEWS} showViewAll={false} />
    </div>
  )
}

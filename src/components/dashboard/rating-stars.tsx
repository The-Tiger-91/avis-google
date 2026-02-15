import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating: number
  size?: 'sm' | 'md'
}

export function RatingStars({ rating, size = 'md' }: RatingStarsProps) {
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5'

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            iconSize,
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  )
}

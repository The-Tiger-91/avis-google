'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Store, ChevronDown } from 'lucide-react'

interface Business {
  id: string
  business_name: string
}

interface BusinessSelectorProps {
  businesses: Business[]
  selectedId: string
}

export function BusinessSelector({ businesses, selectedId }: BusinessSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (businesses.length <= 1) return null

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('business', e.target.value)
    router.push(`/tableau-de-bord?${params.toString()}`)
  }

  return (
    <div className="relative flex items-center gap-1.5">
      <Store className="h-4 w-4 text-gray-400 flex-shrink-0" />
      <select
        value={selectedId}
        onChange={handleChange}
        className="appearance-none bg-transparent text-sm font-medium text-gray-700 pr-5 cursor-pointer focus:outline-none"
      >
        {businesses.map(b => (
          <option key={b.id} value={b.id}>{b.business_name}</option>
        ))}
      </select>
      <ChevronDown className="h-3.5 w-3.5 text-gray-400 absolute right-0 pointer-events-none" />
    </div>
  )
}

'use client'

export function ScrollToPricingButton() {
  return (
    <button
      onClick={() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
      }}
      className="inline-flex items-center gap-2 text-gray-600 px-8 py-3.5 rounded-lg border hover:bg-gray-50 font-medium"
    >
      Voir les tarifs
    </button>
  )
}

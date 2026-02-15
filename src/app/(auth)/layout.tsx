export const dynamic = 'force-dynamic'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 py-8 sm:py-12">
      <div className="w-full max-w-xl px-4">
        {children}
      </div>
    </div>
  )
}

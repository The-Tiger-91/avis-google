export function Logo({ size = 28, textSize = 'text-xl', white = false }: { size?: number; textSize?: string; white?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C3AED"/>
            <stop offset="1" stopColor="#2563EB"/>
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill={white ? 'rgba(255,255,255,0.2)' : 'url(#logoGrad)'}/>
        <path d="M8 16L14 10L20 16L26 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 22L14 16L20 22L26 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
      </svg>
      <span className={`${textSize} font-bold tracking-tight ${white ? 'text-white' : 'bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent'}`}>
        Reply Genius
      </span>
    </div>
  )
}

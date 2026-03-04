'use client'

import { useEffect, useRef } from 'react'

export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  id,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: 'opacity 0.55s ease-out, transform 0.55s ease-out',
      }}
    >
      {children}
    </div>
  )
}

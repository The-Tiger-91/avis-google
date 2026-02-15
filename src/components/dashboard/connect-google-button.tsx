'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ConnectGoogleButton() {
  const [loading, setLoading] = useState(false)

  async function handleConnect() {
    setLoading(true)
    try {
      const res = await fetch('/api/google/connect')
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleConnect} loading={loading}>
      Connecter Google Business
    </Button>
  )
}

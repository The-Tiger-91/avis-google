import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || text.trim().length < 2) {
      return NextResponse.json({ corrected: null, status: 'too_short' })
    }

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 60,
      messages: [
        {
          role: 'user',
          content: `Tu es un assistant pour une application de gestion d'avis Google. L'utilisateur saisit son type d'activité professionnelle.

Analyse le texte suivant et réponds avec UNIQUEMENT un JSON (pas de markdown, pas de backticks) :
- Si c'est un type d'activité reconnaissable (même avec des fautes) : {"status":"ok","corrected":"Le type corrigé en français correct"}
- Si c'est du texte incompréhensible ou sans rapport avec une activité : {"status":"invalid"}

Exemples :
- "cabine avcat" → {"status":"ok","corrected":"Cabinet d'avocat"}
- "boulengrie" → {"status":"ok","corrected":"Boulangerie"}
- "medcin" → {"status":"ok","corrected":"Médecin"}
- "agance imobilier" → {"status":"ok","corrected":"Agence immobilière"}
- "frhgfgf" → {"status":"invalid"}
- "aaaa" → {"status":"invalid"}

Texte : "${text.trim()}"`,
        },
      ],
    })

    const raw = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : ''

    try {
      const parsed = JSON.parse(raw)
      if (parsed.status === 'invalid') {
        return NextResponse.json({ corrected: null, status: 'invalid' })
      }
      return NextResponse.json({ corrected: parsed.corrected, status: 'ok' })
    } catch {
      return NextResponse.json({ corrected: null, status: 'error' })
    }
  } catch {
    return NextResponse.json({ corrected: null, status: 'error' })
  }
}

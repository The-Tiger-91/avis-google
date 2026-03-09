import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const { businessType } = await request.json()

    if (!businessType || businessType.trim().length < 2) {
      return NextResponse.json({ error: 'too_short' }, { status: 400 })
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      messages: [
        {
          role: 'user',
          content: `Tu aides une application de gestion d'avis clients. Un commerçant a décrit son activité comme : "${businessType.trim()}".

Comprends le sens de cette description (même si elle est approximative ou mal orthographiée) et génère un exemple d'avis client réaliste + 3 réponses adaptées à cette activité spécifique.

Par exemple :
- "espace d internet" = cybercafé / espace internet → avis sur la connexion, les postes, le calme
- "bar a chicha" = bar à chicha / hookah bar → avis sur l'ambiance, les saveurs
- "salle de fete" = salle des fêtes → avis sur l'organisation d'un événement
- "vendeur de telephone" = boutique téléphonie → avis sur un achat ou une réparation

Réponds UNIQUEMENT avec ce JSON (sans markdown, sans backticks) :
{
  "reviewer": "Prénom N.",
  "rating": 4,
  "comment": "Un avis réaliste de 1-2 phrases qui mentionne des détails concrets de l'activité.",
  "responses": {
    "professionnel": "Réponse courtoise et professionnelle (2-3 phrases) adaptée à l'activité.",
    "amical": "Réponse chaleureuse et décontractée avec 1 emoji (2-3 phrases) adaptée à l'activité.",
    "formel": "Réponse très formelle et respectueuse (2-3 phrases) adaptée à l'activité."
  }
}`,
        },
      ],
    })

    const raw = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : ''

    // Strip markdown code blocks if present
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim()

    try {
      const parsed = JSON.parse(cleaned)
      if (!parsed.reviewer || !parsed.comment || !parsed.responses) {
        return NextResponse.json({ error: 'incomplete' }, { status: 500 })
      }
      return NextResponse.json(parsed)
    } catch {
      // Try to extract JSON object from the text
      const match = cleaned.match(/\{[\s\S]*\}/)
      if (match) {
        try {
          const parsed = JSON.parse(match[0])
          return NextResponse.json(parsed)
        } catch { /* fall through */ }
      }
      return NextResponse.json({ error: 'parse_error' }, { status: 500 })
    }
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}

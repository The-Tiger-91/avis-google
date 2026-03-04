import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt, buildUserPrompt } from './prompts'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface GenerateResponseParams {
  businessName: string
  businessType: string | null
  tonePreference: string
  customInstructions: string | null
  reviewerName: string | null
  rating: number
  comment: string | null
  photoUrls?: string[]
}

export async function generateReviewResponse(
  params: GenerateResponseParams
): Promise<string> {
  const systemPrompt = buildSystemPrompt(params)
  const userPrompt = buildUserPrompt(params)

  const photos = params.photoUrls?.filter(Boolean) ?? []

  const userContent: Anthropic.MessageParam['content'] = photos.length > 0
    ? [
        { type: 'text', text: userPrompt },
        ...photos.slice(0, 4).map(url => ({
          type: 'image' as const,
          source: { type: 'url' as const, url },
        })),
        { type: 'text', text: 'Ces photos ont été jointes à cet avis par le client. Tiens-en compte pour personnaliser ta réponse si pertinent.' },
      ]
    : userPrompt

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userContent,
      },
    ],
  })

  const textBlock = message.content.find((block) => block.type === 'text')
  return textBlock?.text || ''
}

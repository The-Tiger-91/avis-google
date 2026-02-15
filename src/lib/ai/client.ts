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
}

export async function generateReviewResponse(
  params: GenerateResponseParams
): Promise<string> {
  const systemPrompt = buildSystemPrompt(params)
  const userPrompt = buildUserPrompt(params)

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  })

  const textBlock = message.content.find((block) => block.type === 'text')
  return textBlock?.text || ''
}

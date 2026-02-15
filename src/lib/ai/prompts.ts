interface PromptContext {
  businessName: string
  businessType: string | null
  tonePreference: string
  customInstructions: string | null
  reviewerName: string | null
  rating: number
  comment: string | null
}

export function buildSystemPrompt(context: PromptContext): string {
  const toneMap: Record<string, string> = {
    professionnel: 'professionnelle et courtoise',
    amical: 'chaleureuse et amicale',
    formel: 'formelle et respectueuse',
  }

  const tone = toneMap[context.tonePreference] || toneMap.professionnel

  const prompt = `Tu es un assistant qui rédige des réponses aux avis Google pour des entreprises.
Tu dois rédiger une réponse personnalisée, ${tone} et naturelle.

Informations sur l'entreprise :
- Nom : ${context.businessName}
${context.businessType ? `- Type : ${context.businessType}` : ''}
${context.customInstructions ? `- Instructions supplémentaires : ${context.customInstructions}` : ''}

Règles :
- Toujours remercier le client pour son avis
- Pour les avis positifs (4-5 étoiles) : remercier chaleureusement, mentionner un détail de leur commentaire si possible
- Pour les avis négatifs (1-2 étoiles) : s'excuser, proposer de résoudre le problème, inviter à revenir
- Pour les avis neutres (3 étoiles) : remercier, reconnaître les points positifs et adresser les critiques
- Garder la réponse entre 2 et 5 phrases
- Ne jamais inventer de faits sur l'entreprise
- Ne pas utiliser d'emojis
- Répondre en français
- Ne pas commencer par "Cher/Chère client(e)"
- Signer avec le nom de l'entreprise`

  return prompt
}

export function buildUserPrompt(context: PromptContext): string {
  if (!context.comment) {
    return `Avis de ${context.reviewerName || 'un client'} — ${context.rating}/5 étoiles
Pas de commentaire écrit, uniquement une note.

Rédige une réponse courte et appropriée basée uniquement sur la note.`
  }

  return `Avis de ${context.reviewerName || 'un client'} — ${context.rating}/5 étoiles
Commentaire : "${context.comment}"

Rédige une réponse appropriée.`
}

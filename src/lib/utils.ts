import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DANGEROUS_KEYWORDS = [
  'arnaque', 'arnaquer', 'arnaqueur',
  'escroc', 'escroquerie',
  'avocat', 'tribunal', 'justice', 'plainte', 'procès', 'poursuite',
  'vol', 'voleur', 'voleuse',
  'mensonge', 'menteur', 'menteuse',
  'horreur', 'horrible',
  'scandale', 'scandaleux', 'scandaleuse',
  'inacceptable',
  'dégoûtant', 'dégoûtante',
  'honte', 'honteux',
  'fraude', 'frauduleux',
]

export function isDangerous(comment: string | null): boolean {
  if (!comment) return false
  const lower = comment.toLowerCase()
  return DANGEROUS_KEYWORDS.some(kw => lower.includes(kw))
}

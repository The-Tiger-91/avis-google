import { refreshGoogleToken, getGoogleOAuthClient } from './auth'

interface GoogleReview {
  reviewId: string
  reviewer: {
    displayName: string
    profilePhotoUrl?: string
  }
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  comment?: string
  createTime: string
  updateTime: string
  reviewReply?: {
    comment: string
    updateTime: string
  }
  photos?: { photoUri: string }[]
}

const STAR_RATING_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
}

export function parseStarRating(rating: string): number {
  return STAR_RATING_MAP[rating] || 3
}

export async function getAuthenticatedClient(
  accessToken: string,
  refreshToken: string,
  tokenExpiresAt: string | null
) {
  const oauth2Client = getGoogleOAuthClient()

  // Check if token needs refresh
  const isExpired = tokenExpiresAt
    ? new Date(tokenExpiresAt) < new Date()
    : true

  if (isExpired && refreshToken) {
    const credentials = await refreshGoogleToken(refreshToken)
    oauth2Client.setCredentials(credentials)
    return {
      client: oauth2Client,
      newAccessToken: credentials.access_token,
      newExpiresAt: credentials.expiry_date
        ? new Date(credentials.expiry_date).toISOString()
        : null,
    }
  }

  oauth2Client.setCredentials({ access_token: accessToken })
  return { client: oauth2Client, newAccessToken: null, newExpiresAt: null }
}

export async function fetchReviews(
  accessToken: string,
  locationName: string,
  since?: Date
): Promise<GoogleReview[]> {
  const url = `https://mybusiness.googleapis.com/v4/${locationName}/reviews?pageSize=50`

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Google API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  const reviews: GoogleReview[] = data.reviews || []

  if (since) {
    return reviews.filter(r => new Date(r.createTime) >= since)
  }
  return reviews
}

export async function fetchBusinessHours(
  accessToken: string,
  locationName: string
): Promise<object | null> {
  // locationName format: "accounts/xxx/locations/yyy" → extract "locations/yyy"
  const parts = locationName.split('/')
  const locationId = parts.slice(-2).join('/')
  const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${locationId}?readMask=regularHours`

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    console.warn(`Could not fetch business hours: ${response.status}`)
    return null
  }

  const data = await response.json()
  return data.regularHours || null
}

export async function postReply(
  accessToken: string,
  reviewName: string,
  comment: string
) {
  const url = `https://mybusiness.googleapis.com/v4/${reviewName}/reply`

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Google API error posting reply: ${response.status} - ${error}`)
  }

  return response.json()
}

export async function fetchAccounts(accessToken: string) {
  const response = await fetch(
    'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch accounts: ${response.status}`)
  }

  const data = await response.json()
  return data.accounts || []
}

export async function fetchLocations(accessToken: string, accountName: string) {
  const response = await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title,storefrontAddress`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch locations: ${response.status}`)
  }

  const data = await response.json()
  return data.locations || []
}

export { type GoogleReview }

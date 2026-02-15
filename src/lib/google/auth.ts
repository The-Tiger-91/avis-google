import { google } from 'googleapis'

export function getGoogleOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
}

export function getGoogleAuthUrl(state: string) {
  const oauth2Client = getGoogleOAuthClient()

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/business.manage'],
    state,
  })
}

export async function getGoogleTokens(code: string) {
  const oauth2Client = getGoogleOAuthClient()
  const { tokens } = await oauth2Client.getToken(code)
  return tokens
}

export async function refreshGoogleToken(refreshToken: string) {
  const oauth2Client = getGoogleOAuthClient()
  oauth2Client.setCredentials({ refresh_token: refreshToken })
  const { credentials } = await oauth2Client.refreshAccessToken()
  return credentials
}

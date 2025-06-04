import { ShopperLogin, helpers } from 'commerce-sdk-isomorphic'
import jwt from 'jsonwebtoken'
import { ensureSDKResponseError } from './type-guards'
import { cookies } from 'next/headers'

// =====================================================================
// API CONFIGURATION
// =====================================================================

export const apiConfig = {
  throwOnBadResponse: true,
  parameters: {
    clientId: process.env.SFCC_CLIENT_ID || '',
    organizationId: process.env.SFCC_ORGANIZATIONID || '',
    shortCode: process.env.SFCC_SHORTCODE || '',
    siteId: process.env.SFCC_SITEID || '',
  },
}

// =====================================================================
// TOKEN VALIDATION UTILITIES
// =====================================================================

// Validate JWT token without verifying signature (since we don't have the secret)
export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token, { complete: true })
    if (!decoded || !decoded.payload || typeof decoded.payload === 'string') {
      return false
    }

    const payload = decoded.payload as jwt.JwtPayload
    const currentTime = Math.floor(Date.now() / 1000)

    // Check if token has expired
    if (payload.exp && payload.exp < currentTime) {
      return false
    }

    // Check if token is not yet valid
    if (payload.nbf && payload.nbf > currentTime) {
      return false
    }

    // Check if token was issued in the future (basic sanity check)
    if (payload.iat && payload.iat > currentTime + 60) {
      return false
    }

    return true
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}

// Get time until token expires (in seconds)
export const getTokenExpirationTime = (token: string): number | null => {
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload
    console.log('decoded', decoded)
    if (!decoded?.exp) {
      return null
    }

    const currentTime = Math.floor(Date.now() / 1000)
    return Math.max(0, decoded.exp - currentTime)
  } catch (error) {
    return null
  }
}

// =====================================================================
// GUEST USER AUTHENTICATION
// =====================================================================

export async function getGuestUserAuthToken() {
  const loginClient = new ShopperLogin(apiConfig)
  try {
    return await helpers.loginGuestUserPrivate(
      loginClient,
      {},
      { clientSecret: process.env.SFCC_SECRET || '' },
    )
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Failed to retrieve access token')
    throw new Error(error)
  }
}

export async function authenticateGuestUser() {
  let guestToken = (await cookies()).get('guest_token')?.value

  // If token is provided, validate it first
  if (guestToken && !isTokenValid(guestToken)) {
    console.log('Provided token is invalid or expired, fetching new token')
    guestToken = undefined
  }

  // If no token or invalid token, get a new one
  if (!guestToken) {
    const cookieStore = await cookies()
    const tokenResponse = await getGuestUserAuthToken()

    guestToken = tokenResponse.access_token

    cookieStore.set('guest_token', guestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokenResponse.expires_in,
      path: '/',
    })

    cookieStore.set('refresh_token', tokenResponse.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokenResponse.refresh_token_expires_in,
      path: '/',
    })

    cookieStore.set('usid', tokenResponse.usid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokenResponse.expires_in,
      path: '/',
    })
  }

  return guestToken
}

export async function getValidGuestUserConfig() {
  const guestToken = await authenticateGuestUser()

  return {
    ...apiConfig,
    headers: {
      authorization: `Bearer ${guestToken}`,
    },
  }
}

export async function getGuestUserConfig(token?: string) {
  const guestToken = token || (await getGuestUserAuthToken()).access_token
  return {
    ...apiConfig,
    headers: {
      authorization: `Bearer ${guestToken}`,
    },
  }
}

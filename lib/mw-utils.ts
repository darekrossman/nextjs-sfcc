import { NextRequest, NextResponse } from 'next/server'
import { i18nConfig } from '@/lib/i18n'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'

const { locales, defaultLocale } = i18nConfig

export const getLocale = (request: NextRequest): string => {
  // Get the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')

  if (!acceptLanguage) {
    return defaultLocale
  }

  // Parse the Accept-Language header to get user's preferred languages
  const headers = { 'accept-language': acceptLanguage }
  const languages = new Negotiator({ headers }).languages()

  try {
    // Use the match function to find the best locale match
    return match(languages, locales, defaultLocale)
  } catch {
    // If no match is found, return default locale
    return defaultLocale
  }
}

const callShopperContextHandler = async (
  request: NextRequest,
  response: NextResponse,
  sourceCode: string,
) => {
  try {
    const url = new URL('/api/shopper-context', request.url)

    const handlerResponse = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
      body: JSON.stringify({ sourceCode }),
    })

    // Extract Set-Cookie headers from the API response
    const setCookieHeaders = handlerResponse.headers.getSetCookie?.() || []
    applyCookiesFromHeaders(response, setCookieHeaders)
  } catch (error) {
    console.error('Error calling shopper context handler:', error)
    return []
  }
}

const setSourceCodeCookie = (response: NextResponse, sourceCode: string) => {
  response.cookies.set('sourceCode', sourceCode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

const applyCookiesFromHeaders = (
  response: NextResponse,
  setCookieHeaders: string[],
) => {
  setCookieHeaders.forEach((cookieHeader) => {
    // Parse cookie header manually since NextResponse doesn't have a direct way
    // to set raw cookie headers
    const cookieParts = cookieHeader.split(';').map((part) => part.trim())
    const nameValue = cookieParts[0]

    if (!nameValue) return

    const [name, value] = nameValue.split('=')

    if (name && value) {
      // Extract cookie options
      const options: any = {}
      cookieParts.slice(1).forEach((part) => {
        const equalIndex = part.indexOf('=')
        const key = equalIndex > -1 ? part.substring(0, equalIndex) : part
        const val = equalIndex > -1 ? part.substring(equalIndex + 1) : undefined

        if (!key) return

        const lowerKey = key.toLowerCase()

        if (lowerKey === 'httponly') options.httpOnly = true
        else if (lowerKey === 'secure') options.secure = true
        else if (lowerKey === 'samesite' && val) options.sameSite = val as any
        else if (lowerKey === 'max-age' && val) options.maxAge = parseInt(val)
        else if (lowerKey === 'path' && val) options.path = val
        else if (lowerKey === 'domain' && val) options.domain = val
      })

      response.cookies.set(name, value, options)
    }
  })
}

export const createShopperContextWithSourceCode = async (
  response: NextResponse,
  request: NextRequest,
  sourceCode: string,
) => {
  setSourceCodeCookie(response, sourceCode)
  await callShopperContextHandler(request, response, sourceCode)
}

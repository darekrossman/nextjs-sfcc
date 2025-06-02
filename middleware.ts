import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18nConfig } from '@/lib/i18n'

const { locales, defaultLocale } = i18nConfig

const getLocale = (request: NextRequest): string => {
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

export const middleware = (request: NextRequest) => {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    return
  }

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products -> /us/products or /fr/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - studio (Sanity Studio)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|studio).*)',
  ],
}

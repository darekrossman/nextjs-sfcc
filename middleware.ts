import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18nConfig } from '@/lib/i18n'
import { getLocale, createShopperContextWithSourceCode } from '@/lib/mw-utils'

const { locales } = i18nConfig

export const middleware = async (request: NextRequest) => {
  // Check if there is any supported locale in the pathname
  const { pathname, searchParams } = request.nextUrl

  // Check for source parameter we can apply to the shopper context
  const sourceParam = searchParams.get('source')

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    if (sourceParam) {
      const response = NextResponse.next()
      await createShopperContextWithSourceCode(response, request, sourceParam)
      return response
    }

    return
  }

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  // Create redirect response
  const response = NextResponse.redirect(request.nextUrl)

  if (sourceParam) {
    await createShopperContextWithSourceCode(response, request, sourceParam)
  }

  return response
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
    '/((?!api|_next/static|_next/image|public/|.*\\..*|favicon.ico|sitemap.xml|robots.txt|studio|slides).*)',
  ],
}

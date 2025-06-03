import { CartProvider } from '@/components/cart/cart-context'
import '../globals.css'
import { SITE_NAME } from '@/lib/constants'
import { getCart } from '@/lib/sfcc'
import { cx } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'
import { baseUrl } from '@/lib/utils'
import { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Major_Mono_Display, Silkscreen, DM_Mono } from 'next/font/google'
import { PropsWithChildren } from 'react'
import { LocaleProvider } from '@/components/locale-context'
import { i18nConfig } from '@/lib/i18n'

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
      en: '/en',
      fr: '/fr',
    },
  },
  robots: {
    follow: false,
    index: false,
  },
}

// Maybe
// - megrim
// - dm mono

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const silkscreen = Silkscreen({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--fonts-pixel',
})

const majorMonoDisplay = Major_Mono_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--fonts-major-mono',
})

const dmMono = DM_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--fonts-mono',
})

export default async function RootLayout({
  params,
  children,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  const cartPromise = getCart(locale)

  return (
    <styled.html
      lang={locale}
      minH="100dvh"
      className={cx(
        geistSans.variable,
        silkscreen.variable,
        majorMonoDisplay.variable,
        dmMono.variable,
      )}
    >
      <styled.body minH="100dvh" display="flex" flexDir="column">
        <LocaleProvider locale={locale}>
          <CartProvider cartPromise={cartPromise}>{children}</CartProvider>
        </LocaleProvider>
        <SpeedInsights />
      </styled.body>
    </styled.html>
  )
}

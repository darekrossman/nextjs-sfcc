import './globals.css'
import { SITE_NAME } from '@/lib/constants'
import { cx } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'
import { baseUrl } from 'lib/utils'
import { Metadata } from 'next'
import { Geist, Geist_Mono, Major_Mono_Display, Silkscreen } from 'next/font/google'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: false,
    index: false,
  },
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <styled.html
      lang="en"
      minH="100dvh"
      className={cx(
        geistSans.variable,
        geistMono.variable,
        silkscreen.variable,
        majorMonoDisplay.variable,
      )}
    >
      <styled.body minH="100dvh" display="flex" flexDir="column">
        {children}
      </styled.body>
    </styled.html>
  )
}

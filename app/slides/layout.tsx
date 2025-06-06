import '../globals.css'
import { PropsWithChildren } from 'react'
import { Geist } from 'next/font/google'
import { Geist_Mono } from 'next/font/google'
import SlideLayout from './wrapper'
import { cx } from '@/styled-system/css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--fonts-geist-mono',
  subsets: ['latin'],
})

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cx(geistSans.variable, geistMono.variable)}>
        <SlideLayout>{children}</SlideLayout>
      </body>
    </html>
  )
}

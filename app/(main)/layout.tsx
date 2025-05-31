import { SanityLive } from '@/sanity/lib/live'
import { Header } from '@/components/layout/header'
import { styled } from '@/styled-system/jsx'
import MiniCart from '@/components/cart/mini-cart'
import { css } from '@/styled-system/css'
import { Suspense } from 'react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <styled.header
        className={css({
          '--transition': 'all 0.4s 0.1s',
          '--fg': '{colors.gray.100}',
          '--bg': '{colors.gray.900}',
          '--border': '{colors.gray.700}',
          '--logo-fill': 'white',
        })}
      >
        <Header />
        {/* <Suspense fallback={null}> */}
        <MiniCart />
        {/* </Suspense> */}
      </styled.header>

      <styled.main display="flex" flexDir="column" flex="1">
        {children}
      </styled.main>

      <SanityLive />
    </>
  )
}

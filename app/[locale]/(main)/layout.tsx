import { SanityLive } from '@/sanity/lib/live'
import { Header } from '@/components/layout/header'
import { styled } from '@/styled-system/jsx'
import MiniCart from '@/components/cart/mini-cart'
import { css } from '@/styled-system/css'
import { PropsWithChildren } from 'react'
import { DisableDraftMode } from '@/components/disable-draft-mode'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'

export default async function Layout({
  params,
  children,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params

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
        <Header locale={locale} />
        {/* <Suspense fallback={null}> */}
        <MiniCart locale={locale} />
        {/* </Suspense> */}
      </styled.header>

      <styled.main display="flex" flexDir="column" flex="1">
        {children}
      </styled.main>

      <SanityLive />

      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </>
  )
}

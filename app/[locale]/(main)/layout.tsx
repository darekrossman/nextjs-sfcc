import { SanityLive } from '@/sanity/lib/live'
import { Header } from '@/components/layout/header'
import { styled } from '@/styled-system/jsx'
import MiniCart from '@/components/cart/mini-cart'
import { PropsWithChildren, Suspense } from 'react'
import { DisableDraftMode } from '@/components/disable-draft-mode'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import Footer from '@/components/layout/footer'

export default async function Layout({
  params,
  children,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params

  return (
    <>
      <header>
        <Header locale={locale} />
      </header>

      <section>
        <Suspense>
          <MiniCart />
        </Suspense>
      </section>

      <styled.main display="flex" flexDir="column" flex="1">
        {children}
      </styled.main>

      <footer>
        <Footer locale={locale} />
      </footer>

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

import { SanityLive } from '@/sanity/lib/live'
import { Header } from '@/components/layout/header'
import { styled } from '@/styled-system/jsx'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <styled.header>
        <Header />
      </styled.header>

      <styled.main display="flex" flexDir="column" flex="1">
        {children}
      </styled.main>

      <SanityLive />
    </>
  )
}

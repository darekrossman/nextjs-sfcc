import { css } from '@/styled-system/css'
import { Divider } from '@/styled-system/jsx'
import { Flex } from '@/styled-system/jsx'
import { Search, SearchIcon } from 'lucide-react'
import { NavSheet } from './nav-sheet'
import { sanityFetch } from '@/sanity/lib/live'
import { MENU_QUERY } from '@/sanity/lib/queries'
import { NavButton } from './nav-button'
import { NavSearch } from './nav-search'

export function Nav({ locale }: { locale: string }) {
  const navPromise = sanityFetch({
    query: MENU_QUERY,
    params: { identifier: 'main-nav', locale },
  })

  return (
    <Flex>
      <NavSheet navPromise={navPromise} />

      <Divider
        hideBelow="md"
        orientation="vertical"
        h="auto"
        color="var(--border)"
        transition="var(--transition)"
      />

      <NavSearch />
    </Flex>
  )
}

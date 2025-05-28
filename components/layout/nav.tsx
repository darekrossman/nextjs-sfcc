import { css } from '@/styled-system/css'
import { Divider } from '@/styled-system/jsx'
import { Flex } from '@/styled-system/jsx'
import { Search } from 'lucide-react'
import { NavSheet } from './nav-sheet'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { NavButton } from './nav-button'

export function Nav() {
  const navPromise = sanityFetch({ query: CATEGORIES_QUERY }).then((res) => res.data)

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

      <NavButton hideBelow="md">
        <Search
          strokeWidth={1}
          className={css({ w: { base: '5', md: '6' }, h: { base: '5', md: '6' } })}
        />
      </NavButton>
    </Flex>
  )
}

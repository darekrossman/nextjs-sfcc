import { css } from '@/styled-system/css'
import { Divider, HTMLStyledProps, styled } from '@/styled-system/jsx'
import { Flex } from '@/styled-system/jsx'
import { Menu, Search } from 'lucide-react'
import { NavSheet } from './nav-sheet'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORIES_QUERY } from '@/sanity/lib/queries'

export function Nav() {
  const navPromise = sanityFetch({ query: CATEGORIES_QUERY }).then((res) => res.data)

  return (
    <Flex>
      <NavSheet navPromise={navPromise}>
        <SqButton>
          <Menu
            strokeWidth={1}
            className={css({
              w: { base: '5', md: '6' },
              h: { base: '5', md: '6' },
              transform: 'translateY(0.5px)',
            })}
          />
        </SqButton>
      </NavSheet>

      <Divider orientation="vertical" h="auto" color="var(--border)" hideBelow="md" />

      <SqButton hideBelow="md">
        <Search
          strokeWidth={1}
          className={css({ w: { base: '5', md: '6' }, h: { base: '5', md: '6' } })}
        />
      </SqButton>
    </Flex>
  )
}

function SqButton(props: HTMLStyledProps<'button'>) {
  return (
    <styled.button
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      w="11"
      h="11"
      bg="var(--bg)"
      color="var(--fg)"
      {...props}
    />
  )
}

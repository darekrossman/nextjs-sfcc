'use client'

import { css } from '@/styled-system/css'
import { NavButton } from './nav-button'
import { Search } from './search'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import * as motion from 'motion/react-client'
import { Box } from '@/styled-system/jsx'

export function NavSearch() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Box position="relative" display="flex">
      {isOpen ? (
        <motion.div
          className={css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '330px',
            bg: 'gray.900',
          })}
        >
          <Search
            id="desktop-search"
            autoFocus={true}
            onBlur={() => setIsOpen(false)}
            onSubmit={() => setIsOpen(false)}
          />
        </motion.div>
      ) : (
        <NavButton hideBelow="md" onClick={() => setIsOpen(true)}>
          <SearchIcon
            strokeWidth={1}
            className={css({ w: { base: '5', md: '6' }, h: { base: '5', md: '6' } })}
          />
        </NavButton>
      )}
    </Box>
  )
}

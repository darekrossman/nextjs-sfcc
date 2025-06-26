'use client'

import { css } from '@/styled-system/css'
import { NavButton } from './nav-button'
import { Search } from './search'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import * as motion from 'motion/react-client'
import { Box } from '@/styled-system/jsx'
import { AnimatePresence } from 'motion/react'

export function NavSearch() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box position="relative" display="flex">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 330 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.2 }}
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
        )}
      </AnimatePresence>

      <NavButton hideBelow="md" onClick={() => setIsOpen(true)} aria-label="Search">
        <SearchIcon
          strokeWidth={1}
          className={css({ w: { base: '5', md: '6' }, h: { base: '5', md: '6' } })}
        />
      </NavButton>
    </Box>
  )
}

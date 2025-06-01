'use client'

import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'
import { ColorSkeleton } from './color-skeleton'
import { useSearchState } from './search-context'
import { ProductSearchResult } from '@/lib/sfcc/types'
import { use } from 'react'
import { css } from '@/styled-system/css'
import { Box } from '@/styled-system/jsx'

export function SearchLoader({
  searchResultsPromise,
}: { searchResultsPromise?: Promise<ProductSearchResult | undefined> }) {
  const { isPending } = useSearchState()

  if (searchResultsPromise) {
    use(searchResultsPromise)
  }

  const pending = searchResultsPromise ? isPending : true

  return (
    <AnimatePresence>
      {pending && (
        <motion.div
          initial={{ opacity: searchResultsPromise ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={css({
            position: 'absolute',
            top: '-1px',
            left: '0',
            w: 'full',
            h: '9px',
            zIndex: 'popover',
            bg: 'blue.100',
          })}
        >
          <ColorSkeleton />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

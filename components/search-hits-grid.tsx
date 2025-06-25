'use client'

import { ProductSearchHit } from '@/components/product-search-hit'
import { ProductSearchResult } from '@/lib/sfcc/types'
import { css } from '@/styled-system/css'
import { Box, Grid } from '@/styled-system/jsx'
import { token } from '@/styled-system/tokens'
import { use } from 'react'
import { useSearchState } from './search-context'
import * as motion from 'motion/react-client'
import { ColorSkeleton } from './color-skeleton'

export function SearchHitsGrid({
  searchResultsPromise,
}: { searchResultsPromise: Promise<ProductSearchResult | undefined> }) {
  const results = use(searchResultsPromise)
  const { isPending } = useSearchState()
  const hits = results?.hits

  return (
    <Box position="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPending ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <Grid
          gridTemplateColumns={{
            base: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
          gap="0"
          className={css({
            '--img-sizes': [
              `(max-width: ${token('breakpoints.md')}px) 50vw`,
              `(max-width: ${token('breakpoints.xl')}px) 33vw`,
              `25vw`,
            ].join(','),
          })}
        >
          {hits?.map((hit, i) => {
            return (
              <ProductSearchHit
                key={hit.representedProduct?.id || hit.productId}
                hit={hit}
                imagePriority={i < 4}
              />
            )
          })}
        </Grid>
      </motion.div>
    </Box>
  )
}

function SearchHitsGridLoading() {
  return (
    <Box position="absolute" top="1px" left="1px" w="full" h="12px" overflow="hidden">
      <ColorSkeleton />
    </Box>
  )
}

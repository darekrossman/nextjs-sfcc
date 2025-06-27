'use client'

import { ProductSearchHit } from '@/components/product-search-hit'
import { ProductSearchResult } from '@/lib/sfcc/types'
import { Box, Grid } from '@/styled-system/jsx'
import { use } from 'react'
import { useSearchState } from './search-context'
import * as motion from 'motion/react-client'

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
        transition={{ duration: 0.15 }}
      >
        <Grid
          gridTemplateColumns={{
            base: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
          gap="0"
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

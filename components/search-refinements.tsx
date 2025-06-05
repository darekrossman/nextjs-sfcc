'use client'

import { RefinementColors } from './refinement-colors'
import { ProductSearchResult, ProductSearchParams } from '@/lib/sfcc/types'
import { css } from '@/styled-system/css'
import * as motion from 'motion/react-client'
import { use } from 'react'

interface SearchRefinementsProps {
  searchResultsPromise: Promise<ProductSearchResult | undefined>
  searchParams: ProductSearchParams
}

export const SearchRefinements = ({
  searchResultsPromise,
  searchParams,
}: SearchRefinementsProps) => {
  const searchResults = use(searchResultsPromise)

  const selectedColors =
    searchResults?.selectedRefinements?.c_refinementColor?.split('|') || []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={css({ w: 'full' })}
    >
      {searchResults?.refinements?.map((refinement, i) => {
        if (refinement.attributeId === 'c_refinementColor') {
          return (
            <RefinementColors
              key={`${refinement.attributeId}-${i}`}
              refinement={refinement}
              selectedColors={selectedColors}
              searchParams={searchParams}
            />
          )
        }
        return null
      })}
    </motion.div>
  )
}

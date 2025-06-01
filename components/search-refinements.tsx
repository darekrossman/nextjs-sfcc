'use client'

import { RefinementColors } from './refinement-colors'
import { ProductSearchResult, ProductSearchParams } from '@/lib/sfcc/types'
import * as motion from 'motion/react-client'
import { use } from 'react'
import { useSearchState } from './search-context'

interface SearchRefinementsProps {
  searchResultsPromise: Promise<ProductSearchResult | undefined>
  searchParams: ProductSearchParams
}

export const SearchRefinements = ({
  searchResultsPromise,
  searchParams,
}: SearchRefinementsProps) => {
  const searchResults = use(searchResultsPromise)
  const { isPending } = useSearchState()

  const selectedColors =
    searchResults?.selectedRefinements?.c_refinementColor?.split('|') || []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
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

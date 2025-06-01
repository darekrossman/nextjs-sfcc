import { pluralizeWithCount } from '@/lib/helpers'
import { ProductSearchResult, ProductSearchParams } from '@/lib/sfcc/types'
import { Flex, styled } from '@/styled-system/jsx'
import { use } from 'react'

interface SearchResultsHeaderProps {
  searchParams: ProductSearchParams
  searchResultsPromise: Promise<ProductSearchResult | undefined>
}

export const SearchResultsHeader = ({
  searchParams,
  searchResultsPromise,
}: SearchResultsHeaderProps) => {
  const results = use(searchResultsPromise)

  return (
    <Flex px="5" align="center" justify="space-between">
      <styled.p fontSize="14px" color="neutral.600">
        {pluralizeWithCount(results?.total ?? 0, 'result', 'results')}
      </styled.p>
    </Flex>
  )
}

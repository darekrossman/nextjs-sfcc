import { PageContainer } from '@/components/page-container'
import SearchResults from '@/components/product-layouts/search-results'
import { parseParamsFromUrl } from '@/lib/sfcc/product-helpers'
import { Center, styled } from '@/styled-system/jsx'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
}

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = (await props.searchParams) || { q: '' }
  /** @todo: implement sorting */

  const productSearchParams = parseParamsFromUrl(searchParams)

  return (
    <PageContainer>
      <Center
        pos="relative"
        bg="neutral.200"
        h={{ base: '192px', md: '192px' }}
        position="sticky"
        top="0"
        zIndex="docked"
      >
        <Center
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          <styled.h1 fontWeight="light" color="white">
            Search results for "{searchParams.q}"
          </styled.h1>
        </Center>
      </Center>

      <PageContainer zIndex="grid" flex="1">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults params={productSearchParams} />
        </Suspense>
      </PageContainer>
    </PageContainer>
  )
}

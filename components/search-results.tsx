import { PageContainer } from '@/components/page-container'
import { css } from '@/styled-system/css'
import { Flex, Grid } from '@/styled-system/jsx'
import { Stack } from '@/styled-system/jsx'
import { Box } from '@/styled-system/jsx'
import { searchProducts } from '@/lib/sfcc'
import { parseParamsFromUrl } from '@/lib/sfcc/product-helpers'
import { SearchHitsGrid } from './search-hits-grid'
import { SearchRefinements } from './search-refinements'
import { SearchResultsHeader } from './search-results-header'
import { Suspense } from 'react'
import { SearchProvider } from './search-context'
import { SearchLoader } from './search-loader'
import { ProductSearchResult } from '@/lib/sfcc/types'

export default async function SearchResults({
  locale,
  category,
  params,
}: {
  locale: string
  category?: string
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = {
    ...parseParamsFromUrl(await params),
    locale,
  }

  if (category && !searchParams.refine?.includes(`cgid=${category}`)) {
    searchParams.refine = [`cgid=${category}`, ...(searchParams.refine || [])]
  }

  const searchResultsPromise = searchProducts(searchParams)
  // const searchResultsPromise = new Promise<ProductSearchResult | undefined>((resolve) => {
  //   setTimeout(() => {
  //     resolve(searchProducts(searchParams))
  //   }, 4000)
  // })

  return (
    <PageContainer
      position="relative"
      bg="var(--bg)"
      className={css({
        '--bg': '{colors.stone.300}',
        '--borderBase': '{colors.stone.400/60}',
      })}
    >
      <SearchProvider>
        <Box position="sticky" top="0" w="full" zIndex="popover">
          <Suspense fallback={<SearchLoader />}>
            <SearchLoader searchResultsPromise={searchResultsPromise} />
          </Suspense>
        </Box>

        <Grid
          gridTemplateColumns={{ base: '1fr', md: '88px 1fr' }}
          gap="0"
          flex="1"
          borderTop="1px solid"
          borderColor="var(--borderBase)"
          mt="-1px"
        >
          <Box>
            <Stack position="sticky" top="166px" zIndex="sticky" alignItems="flex-start">
              <Suspense>
                <SearchRefinements
                  searchResultsPromise={searchResultsPromise}
                  searchParams={searchParams}
                />
              </Suspense>
            </Stack>
          </Box>

          <Box borderLeft="1px solid" borderColor="var(--borderBase)">
            <Flex
              position="sticky"
              top="0"
              h="69px"
              pt="6"
              bg="var(--bg)"
              zIndex="sticky"
              borderBottom="1px solid"
              borderColor="var(--borderBase)"
            >
              <Suspense>
                <SearchResultsHeader
                  searchParams={searchParams}
                  searchResultsPromise={searchResultsPromise}
                />
              </Suspense>
            </Flex>

            <Box position="relative">
              <Suspense>
                <SearchHitsGrid searchResultsPromise={searchResultsPromise} />
              </Suspense>
            </Box>
          </Box>
        </Grid>
      </SearchProvider>
    </PageContainer>
  )
}

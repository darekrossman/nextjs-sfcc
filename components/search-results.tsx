import { PageContainer } from '@/components/page-container'
import { Grid } from '@/styled-system/jsx'
import { Stack } from '@/styled-system/jsx'
import { Box } from '@/styled-system/jsx'
import { searchProducts } from '@/lib/sfcc'
import { parseParamsFromUrl } from '@/lib/sfcc/product-helpers'
import { SearchHitsGrid } from './search-hits-grid'
import { SearchRefinements } from './search-refinements'
import { Suspense } from 'react'
import { SearchProvider } from './search-context'
import { SearchLoader } from './search-loader'
import { SearchMasthead } from './search-masthead'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORY_QUERY } from '@/sanity/lib/queries'
import { CATEGORY_QUERYResult } from '@/sanity/types'

export default async function SearchResults({
  locale,
  categorySlug,
  params,
}: {
  locale: string
  categorySlug?: string
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let category: CATEGORY_QUERYResult | undefined

  if (categorySlug) {
    const { data } = await sanityFetch({
      query: CATEGORY_QUERY,
      params: { slug: categorySlug, locale },
    })
    category = data
  }

  const searchParams = {
    ...parseParamsFromUrl(await params),
    locale,
  }

  if (categorySlug && !searchParams.refine?.includes(`cgid=${categorySlug}`)) {
    searchParams.refine = [`cgid=${categorySlug}`, ...(searchParams.refine || [])]
  }

  const searchResultsPromise = searchProducts(searchParams)

  return (
    <PageContainer>
      <SearchMasthead heading={category?.title} />

      <PageContainer position="relative" bg="var(--bg)">
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
            borderTop={{ md: '1px solid var(--borderBase)' }}
            mt="-1px"
          >
            <Box hideBelow="md">
              <Stack
                position={{ md: 'sticky' }}
                top="166px"
                zIndex="sticky"
                alignItems="flex-start"
              >
                <Suspense>
                  <SearchRefinements
                    searchResultsPromise={searchResultsPromise}
                    searchParams={searchParams}
                  />
                </Suspense>
              </Stack>
            </Box>

            <Box borderLeft="1px solid" borderColor="var(--borderBase)">
              <Box
                position="relative"
                borderTop={{ mdDown: '1px solid var(--borderBase)' }}
              >
                <Suspense>
                  <SearchHitsGrid searchResultsPromise={searchResultsPromise} />
                </Suspense>
              </Box>
            </Box>
          </Grid>
        </SearchProvider>
      </PageContainer>
    </PageContainer>
  )
}

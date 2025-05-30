import { ProductSearchHit } from '@/components/layout/product-search-hit'
import { PageContainer } from '@/components/page-container'
import { ProductSearchResult } from '@/lib/sfcc/types'
import { css } from '@/styled-system/css'
import { Divider, Flex, Grid } from '@/styled-system/jsx'
import { Stack } from '@/styled-system/jsx'
import { Box } from '@/styled-system/jsx'
import { Link, Text } from '@/ui/core'
import Image from 'next/image'
import { use } from 'react'

export default function SearchResults({
  searchResultPromise,
}: { searchResultPromise: Promise<ProductSearchResult> }) {
  const results = use(searchResultPromise)

  // console.log(results)

  return (
    <PageContainer
      bg="var(--bg)"
      className={css({
        '--bg': '{colors.neutral.200}',
        '--borderBase': '{colors.neutral.400/60}',
      })}
    >
      <Grid
        gridTemplateColumns={{ base: '1fr', md: '88px 1fr' }}
        gap="0"
        flex="1"
        borderTop="1px solid"
        borderColor="var(--borderBase)"
        mt="-1px"
      >
        <Box>
          <Stack position="sticky" top="166px" zIndex="sticky">
            <Text variant="static14" color="neutral.600">
              Filters
            </Text>
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
            <Flex px="5" align="center" justify="space-between">
              <Text variant="static14" color="neutral.600">
                Results
              </Text>
            </Flex>
          </Flex>
          <Grid
            gridTemplateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            }}
            gap="0"
          >
            {results.hits.map((hit) => {
              return <ProductSearchHit key={hit.productId} hit={hit} />
            })}
          </Grid>
        </Box>
      </Grid>
    </PageContainer>
  )
}

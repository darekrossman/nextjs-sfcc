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

  console.log(results)

  return (
    <PageContainer
      flex="1"
      bg="var(--bg)"
      className={css({
        '--bg': '{colors.neutral.200}',
        '--borderBase': '{colors.neutral.400/60}',
      })}
    >
      <Grid gridTemplateColumns={{ base: '1fr', md: '89px 1fr' }} gap="0">
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
            {results.products.map((product) => {
              return (
                <Link href={`/product/${product.id}`} key={product.id}>
                  <Stack
                    key={product.id}
                    gap="0"
                    borderRight="1px solid var(--borderBase)"
                    borderBottom="1px dotted {colors.neutral.400/40}"
                    // borderColor="var(--borderBase)"
                  >
                    <Box p="5">
                      <Box pos="relative" w="full" aspectRatio={1}>
                        <Image
                          src={product.imageGroups?.[0]?.images?.[0]?.link || ''}
                          alt={product.imageGroups?.[0]?.images?.[0]?.alt || ''}
                          fill
                        />
                      </Box>
                    </Box>
                    <Stack px="5" pb="4" gap="0" flex="1" textWrap="balance">
                      <Text color="neutral.600" variant="static14">
                        {product.name}
                      </Text>
                      <Text color="neutral.400" variant="static14">
                        {product.price}
                      </Text>
                    </Stack>
                  </Stack>
                </Link>
              )
            })}
          </Grid>
        </Box>
      </Grid>
    </PageContainer>
  )
}

import { ProductSearchHit } from '@/components/layout/product-search-hit'
import { PageContainer } from '@/components/page-container'
import { ProductSearchResult, SearchProductsParameters } from '@/lib/sfcc/types'
import { css } from '@/styled-system/css'
import { Center, Divider, Flex, Grid } from '@/styled-system/jsx'
import { Stack } from '@/styled-system/jsx'
import { Box } from '@/styled-system/jsx'
import { Link, Text } from '@/ui/core'
import Image from 'next/image'
import { searchProducts } from '@/lib/sfcc'
import { token } from '@/styled-system/tokens'
import { addRefinementToQuery } from '@/lib/sfcc/product-helpers'
import { REFINEMENT_COLORS } from '@/lib/constants'

export default async function SearchResults({
  params,
}: {
  params: SearchProductsParameters
}) {
  console.log('params', params)
  const searchResults = await searchProducts(params)

  if (!searchResults.hits?.length) {
    return <div>No results found</div>
  }

  const selectedColors =
    searchResults.selectedRefinements?.c_refinementColor?.split('|') || []

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
          <Stack position="sticky" top="166px" zIndex="sticky" alignItems="flex-start">
            <Stack gap="0.5" alignItems="flex-start" pt="8">
              {Object.entries(REFINEMENT_COLORS).map(([key, value]) => {
                const isSelected = selectedColors.includes(value.label)
                return (
                  <Center key={key}>
                    <Link
                      href={{
                        query: addRefinementToQuery({
                          params,
                          attributeId: 'c_refinementColor',
                          value: value.label,
                        }),
                      }}
                      prefetch={false}
                      display="block"
                      w={isSelected ? '16' : '8'}
                      h="8"
                      bg="var(--refinement-color)"
                      position="relative"
                      className={css({
                        _after: {
                          content: '""',
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          width: '0',
                          height: '0',
                          borderLeft: '6px solid transparent',
                          borderTop: '6px solid white',
                        },
                      })}
                      style={
                        {
                          '--refinement-color': value.hex,
                        } as React.CSSProperties
                      }
                    >
                      <span className={css({ srOnly: true })}>{value.label}</span>
                    </Link>
                  </Center>
                )
              })}
            </Stack>
            {/* {searchResults.refinements?.map((refinement) => {
              if (refinement.attributeId === 'c_refinementColor') {
                return (
                  <Stack key={refinement.attributeId}>
                    {refinement.values?.map((value) => {
                      return (
                        <Link
                          key={value.presentationId}
                          href={{
                            query: addRefinementToQuery({
                              params,
                              attributeId: refinement.attributeId,
                              value: value.value,
                            }),
                          }}
                          prefetch={false}
                        >
                          {value.label}
                        </Link>
                      )
                    })}
                  </Stack>
                )
              }
              return null
            })} */}
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
            className={css({
              '--img-sizes': [
                `(max-width: ${token('breakpoints.md')}px) 50vw`,
                `(max-width: ${token('breakpoints.xl')}px) 33vw`,
                `25vw`,
              ].join(','),
            })}
          >
            {searchResults.hits.map((hit, i) => {
              return (
                <ProductSearchHit key={hit.productId} hit={hit} imagePriority={i < 4} />
              )
            })}
          </Grid>
        </Box>
      </Grid>
    </PageContainer>
  )
}

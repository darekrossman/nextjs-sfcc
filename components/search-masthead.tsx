'use client'

import { ProductSearchResult } from '@/lib/sfcc/types'
import { Stack, Box, Flex, styled, Grid } from '@/styled-system/jsx'
import { ReactNode, use } from 'react'
import { useSearchState } from './search-context'
import { CATEGORY_QUERYResult } from '@/sanity/types'
import { useLocale } from './locale-context'

export function SearchMasthead({
  heading,
  searchResultsPromise,
}: {
  heading?: ReactNode
  backgroundImage?: NonNullable<CATEGORY_QUERYResult>['bannerImage']
  searchResultsPromise: Promise<ProductSearchResult | undefined>
}) {
  const { dict } = useLocale()
  const searchResults = use(searchResultsPromise)
  const { isPending } = useSearchState()

  return (
    <Box position="sticky" top="0" bg="var(--bg)">
      <Flex
        alignItems="center"
        h={{ base: 'auto', md: '167px' }}
        pt={{ base: '60px', md: '6' }}
        pl={{ md: '88px' }}
        zIndex="1"
      >
        <Flex
          position="relative"
          alignItems="flex-end"
          justifyContent={{ md: 'space-between' }}
          zIndex="1"
          py={{ base: '6', md: '0' }}
          pl={{ base: '5', md: '12' }}
          mt={{ md: '-1px' }}
          w="full"
        >
          <Stack gap="5" w="full">
            <styled.h1
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight={{ base: 'light', md: 'light' }}
              lineHeight="1.2"
              color="var(--fg)"
              ml="-1px"
            >
              {heading}
            </styled.h1>

            <Flex alignItems="flex-end" justifyContent="space-between" w="full">
              <Grid
                gridTemplateColumns="max-content 1fr"
                gridTemplateRows={{ base: '1fr 1fr', md: '1fr' }}
                gap="2"
                rowGap="2.5"
              >
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="stone.500/70"
                >
                  {dict.results}:
                </styled.p>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  color="stone.700"
                >
                  {isPending ? '#' : searchResults?.total}
                </styled.p>

                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="stone.500/70"
                >
                  {dict.filters}:
                </styled.p>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  color="stone.700"
                >
                  {isPending
                    ? '#'
                    : (searchResults?.selectedRefinements?.c_refinementColor?.split('|')
                        .length ?? 0)}
                </styled.p>
              </Grid>

              <Flex pr={{ base: '5', md: '11' }} gap="2">
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="stone.500/70"
                >
                  {dict.sortBy}:
                </styled.p>
                <styled.button
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  color="stone.700"
                  textTransform="uppercase"
                >
                  {
                    searchResults?.sortingOptions?.find(
                      (option) => searchResults.selectedSortingOption,
                    )?.label
                  }
                </styled.button>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}

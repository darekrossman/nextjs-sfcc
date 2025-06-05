'use client'

import { ProductSearchResult } from '@/lib/sfcc/types'
import { HStack, Stack, Box, Flex, styled } from '@/styled-system/jsx'
import { ReactNode, use } from 'react'
import { useSearchState } from './search-context'
import { FadeImage } from './fade-image'
import Image from 'next/image'
import { CATEGORY_QUERYResult } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { css } from '@/styled-system/css'

export function SearchMasthead({
  heading,
  backgroundImage,
  searchResultsPromise,
}: {
  heading?: ReactNode
  backgroundImage?: NonNullable<CATEGORY_QUERYResult>['bannerImage']
  searchResultsPromise: Promise<ProductSearchResult | undefined>
}) {
  const searchResults = use(searchResultsPromise)
  const { isPending } = useSearchState()

  return (
    <Box position="sticky" top="0" bg="var(--bg)">
      <Box position="absolute" inset="0" zIndex="0" mixBlendMode="multiply" opacity="0.5">
        {backgroundImage && (
          <Image
            src={urlFor(backgroundImage)
              .width(1408)
              .height(167)

              .url()}
            width={1408}
            height={167}
            alt={backgroundImage.alt ?? ''}
            className={css({
              w: 'auto',
              h: 'full',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'grayscale(100%)',
            })}
          />
        )}
      </Box>
      <Box
        position="absolute"
        inset="0"
        zIndex="1"
        bg={{
          base: 'linear-gradient(333deg, transparent 0%, var(--bg) 50%)',
          md: 'linear-gradient(333deg, transparent 0%, var(--bg) 60%)',
        }}
      />

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
          zIndex="1"
          py={{ base: '5', md: '0' }}
          pl={{ base: '5', md: '12' }}
          mt={{ md: '-1px' }}
        >
          <Stack gap="5">
            <styled.h1
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight={{ base: 'medium', md: 'light' }}
              lineHeight="1.2"
              color="var(--fg)"
            >
              {heading}
            </styled.h1>

            <Stack>
              <HStack>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="stone.500/70"
                >
                  results:
                </styled.p>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  color="stone.700"
                >
                  {isPending ? '...' : searchResults?.total}
                </styled.p>
              </HStack>

              <HStack>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="stone.500/70"
                >
                  filters:
                </styled.p>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  color="stone.700"
                >
                  {isPending ? '...' : 'none'}
                </styled.p>
              </HStack>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}

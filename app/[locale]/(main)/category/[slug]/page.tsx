import { PageContainer } from '@/components/page-container'
import { HeroBanner } from '@/components/hero-banner'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORY_QUERY } from '@/sanity/lib/queries'
import SearchResults from '@/components/search-results'
import { Suspense } from 'react'
import { SearchLoader } from '@/components/search-loader'
import { css } from '@/styled-system/css'
import { HStack } from '@/styled-system/jsx'
import { styled } from '@/styled-system/jsx'
import { Stack } from '@/styled-system/jsx'
import { Flex } from '@/styled-system/jsx'
import { Box } from '@/styled-system/jsx'

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug, locale } = await params

  const { data: category } = await sanityFetch({
    query: CATEGORY_QUERY,
    params: { slug, locale },
  })

  return (
    <PageContainer
      bg="var(--bg)"
      className={css({
        '--fg': '{colors.gray.700}',
        '--bg': '{colors.stone.300}',
        '--borderBase': '{colors.stone.400/50}',
      })}
    >
      <Box
        position="sticky"
        top="0"
        // bgGradient="to-b"
        // gradientFrom="var(--bg)"
        // gradientTo="gray.900/50"
      >
        <Flex
          alignItems="center"
          h={{ base: 'auto', md: '168px' }}
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
                {category?.title}
              </styled.h1>

              <Stack>
                <HStack>
                  <styled.p
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="neutral.500"
                  >
                    results:
                  </styled.p>
                  <styled.p
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight="bold"
                    color="gray.200"
                  >
                    11
                  </styled.p>
                </HStack>

                <HStack>
                  <styled.p
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="neutral.500"
                  >
                    filters:
                  </styled.p>
                  <styled.p
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight="medium"
                    color="neutral.500"
                    opacity="0.5"
                  >
                    none applied
                  </styled.p>
                </HStack>
              </Stack>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <PageContainer zIndex="grid" flex="1">
        <Suspense fallback={<SearchLoader />}>
          <SearchResults locale={locale} category={slug} params={searchParams} />
        </Suspense>
      </PageContainer>
    </PageContainer>
  )
}

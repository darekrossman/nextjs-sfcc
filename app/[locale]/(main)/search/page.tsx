import { HeroBanner } from '@/components/hero-banner'
import { PageContainer } from '@/components/page-container'
import SearchResults from '@/components/search-results'
import { css } from '@/styled-system/css'
import { Center, Flex, HStack, Stack } from '@/styled-system/jsx'
import { styled } from '@/styled-system/jsx'
import { Box } from '@/styled-system/jsx'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const term = (await searchParams)?.q

  return (
    <PageContainer
      bg="var(--bg)"
      className={css({
        '--fg': '{colors.neutral.300}',
        '--bg': '{colors.gray.800}',
        '--borderBase': '{colors.neutral.800}',
      })}
    >
      <Box position="sticky" top="0">
        <Flex
          alignItems="center"
          h={{ base: 'auto', md: '168px' }}
          pt={{ base: '10', md: '6' }}
          pl={{ md: '88px' }}
          zIndex="1"
        >
          <Flex position="relative" alignItems="flex-end" zIndex="1" pl="12" mt="-1px">
            <Stack gap="5">
              <styled.h1
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight={{ base: 'medium', md: 'light' }}
                lineHeight="1.2"
                color="var(--fg)"
              >
                Search Results
              </styled.h1>

              <Stack>
                <HStack>
                  <styled.p
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
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
                  >
                    filters:
                  </styled.p>
                  <styled.p
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight="medium"
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
        <SearchResults locale={locale} params={searchParams} />
      </PageContainer>
    </PageContainer>
  )
}

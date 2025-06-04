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
      <SearchResults locale={locale} params={searchParams} />
    </PageContainer>
  )
}

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

  return (
    <PageContainer
      bg="var(--bg)"
      className={css({
        '--fg': '{colors.gray.700}',
        '--bg': '{colors.stone.300}',
        '--borderBase': '{colors.stone.400/50}',
      })}
    >
      <SearchResults locale={locale} categorySlug={slug} params={searchParams} />
    </PageContainer>
  )
}

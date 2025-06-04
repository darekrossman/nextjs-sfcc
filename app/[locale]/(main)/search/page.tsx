import { Metadata } from 'next'
import { PageContainer } from '@/components/page-container'
import SearchResults from '@/components/search-results'
import { css } from '@/styled-system/css'

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
        '--fg': '{colors.gray.700}',
        '--bg': '{colors.stone.300}',
        '--borderBase': '{colors.stone.400/50}',
      })}
    >
      <SearchResults locale={locale} params={searchParams} />
    </PageContainer>
  )
}

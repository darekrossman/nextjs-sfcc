import { HeroBanner } from '@/components/hero-banner'
import { PageContainer } from '@/components/page-container'
import SearchResults from '@/components/search-results'
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
    <PageContainer>
      <HeroBanner text={`Search results for "${term}"`} />

      <PageContainer zIndex="grid" flex="1">
        <SearchResults locale={locale} params={searchParams} />
      </PageContainer>
    </PageContainer>
  )
}

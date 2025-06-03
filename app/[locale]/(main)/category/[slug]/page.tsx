import { PageContainer } from '@/components/page-container'
import { HeroBanner } from '@/components/hero-banner'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORY_QUERY } from '@/sanity/lib/queries'
import SearchResults from '@/components/search-results'
import { Suspense } from 'react'
import { SearchLoader } from '@/components/search-loader'

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
    <PageContainer>
      <HeroBanner bannerImage={category?.bannerImage} text={category?.title} />

      <PageContainer zIndex="grid" flex="1">
        <Suspense fallback={<SearchLoader />}>
          <SearchResults locale={locale} category={slug} params={searchParams} />
        </Suspense>
      </PageContainer>
    </PageContainer>
  )
}

import { PageContainer } from '@/components/page-container'
import SearchResults from '@/components/search-results'
import { css } from '@/styled-system/css'

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

import { PageBuilder } from '@/components/page-builder'
import { PageContainer } from '@/components/page-container'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_QUERY } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; page: string }>
}) {
  const { locale, page: slug } = await params

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug, locale },
  })

  if (!page) {
    return notFound()
  }

  return (
    <PageContainer>
      {page?.content ? <PageBuilder content={page.content} /> : null}
    </PageContainer>
  )
}

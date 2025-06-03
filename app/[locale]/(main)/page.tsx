import { PageBuilder } from '@/components/page-builder'
import { PageContainer } from '@/components/page-container'
import { sanityFetch } from '@/sanity/lib/live'
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Salesforce Commerce Cloud.',
  openGraph: {
    type: 'website',
  },
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  'use cache'

  const { locale } = await params

  const { data: page } = await sanityFetch({
    query: HOMEPAGE_QUERY,
    params: { locale },
  })

  return (
    <PageContainer>
      {page?.content ? <PageBuilder content={page.content} /> : null}
    </PageContainer>
  )
}

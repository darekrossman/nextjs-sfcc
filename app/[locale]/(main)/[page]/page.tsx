import { PageBuilder } from '@/components/page-builder'
import { PageContainer } from '@/components/page-container'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_QUERY } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>
}): Promise<Metadata> {
  const { locale, page: slug } = await params

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug, locale },
  })

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.title,
    description: page.metaDescription || page.excerpt || undefined,
    robots: {
      index: !page.noIndex,
      follow: !page.noIndex,
    },
    openGraph: {
      title: page.title || undefined,
      description: page.metaDescription || page.excerpt || undefined,
      type: 'website',
      ...(page.mainImage?.asset?.url && {
        images: [
          {
            url: page.mainImage.asset.url,
            width: 1200,
            height: 630,
            alt: page.title || undefined,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title || undefined,
      description: page.metaDescription || page.excerpt || undefined,
      ...(page.mainImage?.asset?.url && {
        images: [page.mainImage.asset.url],
      }),
    },
  }
}

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

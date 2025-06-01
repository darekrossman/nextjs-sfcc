import { HeroBanner } from '@/components/hero-banner'
import { PageBuilder } from '@/components/page-builder'
import { PageContainer } from '@/components/page-container'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_QUERY } from '@/sanity/lib/queries'
import { css } from '@/styled-system/css'
import { Box, Center, Container, Grid, HStack, Stack } from '@/styled-system/jsx'
import { Text } from '@/ui/core'
import { Metadata } from 'next'
import Image from 'next/image'

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
  const { locale } = await params

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: 'home', locale },
  })

  return (
    <PageContainer>
      {page?.content ? <PageBuilder content={page.content} /> : null}
    </PageContainer>
  )
}

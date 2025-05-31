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

export default async function HomePage() {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: 'home' },
  })

  const hero = page?.heroBanner

  return (
    <PageContainer>
      <Center pos="relative" bg="neutral.200" h={{ base: '375px', md: '100dvh' }}>
        {hero?.landscapeImage ? (
          <Image
            src={urlFor(hero.landscapeImage)
              .width(1536)
              .height(1024)
              .crop('entropy')
              .fit('min')
              .quality(100)
              .auto('format')
              .url()}
            alt={hero.landscapeImage.alt || ''}
            fill
            className={css({
              display: 'block',
              w: 'auto',
              h: 'full',
              objectFit: 'cover',
            })}
          />
        ) : null}

        {/* <Center
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="1"
      >
        <Text as="h1" fontWeight="light" variant="heading2" color="white">
          {category?.title}
        </Text>
      </Center> */}
      </Center>
    </PageContainer>
  )
}

import { PageContainer } from '@/components/page-container'
import { getCollectionProducts, getProducts, searchAllProducts } from '@/lib/sfcc'
import { Product } from '@/lib/sfcc/types'
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
  return (
    <PageContainer>
      <Box
        position="relative"
        w="100vw"
        // h={{ base: '375px', md: '400px' }}
        minH="400px"
        aspectRatio="1536 / 1024"
        overflow="hidden"
      >
        <Image
          src="/cms/home-banner-3.webp"
          alt="banner"
          width={1536}
          height={1024}
          className={css({
            display: 'block',
            w: 'full',
            h: 'auto',
            objectFit: 'cover',
          })}
        />
      </Box>
    </PageContainer>
  )
}

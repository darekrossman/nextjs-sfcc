import Link from 'next/link'
import { PageContainer } from '@/components/page-container'
import { Box, Center } from '@/styled-system/jsx'
import { Text } from '@/ui/core'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORY_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { css } from '@/styled-system/css'
import { getCollectionProducts } from '@/lib/sfcc'
import SearchResults from '@/components/product-layouts/search-results'
import { Suspense } from 'react'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: category } = await sanityFetch({
    query: CATEGORY_QUERY,
    params: { slug },
  })

  const productSearchPromise = getCollectionProducts({ collection: slug })

  const hero = category?.heroBanner

  return (
    <PageContainer>
      <Center
        pos="relative"
        bg="gray.900"
        h={{ base: '375px', md: '375px' }}
        position="sticky"
        top="0"
        zIndex="docked"
      >
        {hero?.landscapeImage ? (
          <Image
            src={urlFor(hero.landscapeImage)
              .width(1600)
              .height(375)
              .crop('entropy')
              .fit('min')
              .quality(100)
              .auto('format')
              .url()}
            alt={hero.landscapeImage.alt || ''}
            width="1600"
            height="375"
            className={css({
              display: 'block',
              w: 'auto',
              h: 'full',
              objectFit: 'cover',
            })}
          />
        ) : null}

        <Center
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          <Text as="h1" fontWeight="light" variant="heading2" color="white">
            {category?.title}
          </Text>
        </Center>
      </Center>

      <PageContainer zIndex="grid" flex="1">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults searchResultPromise={productSearchPromise} />
        </Suspense>
      </PageContainer>
    </PageContainer>
  )
}

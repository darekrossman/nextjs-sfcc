import Link from 'next/link'
import { PageContainer } from '@/components/page-container'
import { Box, Center } from '@/styled-system/jsx'
import { Text } from '@/ui/core'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORY_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { css } from '@/styled-system/css'
import { searchProducts } from '@/lib/sfcc'
import SearchResults from '@/components/product-layouts/search-results'
import { Suspense } from 'react'
import { getLocalizedValue } from '@/lib/i18n'
import { parseParamsFromUrl } from '@/lib/sfcc/product-helpers'

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string }>
}) {
  const { slug } = await params

  const productSearchParams = parseParamsFromUrl(await searchParams)

  const { data: category } = await sanityFetch({
    query: CATEGORY_QUERY,
    params: { slug },
  })

  // Get localized title and alt text
  const categoryTitle = getLocalizedValue(category?.title)
  const bannerAlt = getLocalizedValue(category?.bannerImage?.alt)

  return (
    <PageContainer>
      <Center
        pos="relative"
        bg="{gradients.PeachTree}"
        w="100vw"
        h={{ base: '192px', md: '192px' }}
        position="sticky"
        top="0"
        zIndex="docked"
      >
        {category?.bannerImage ? (
          <Image
            src={urlFor(category.bannerImage).width(1400).height(192).quality(100).url()}
            alt={bannerAlt || categoryTitle || ''}
            priority={true}
            quality={100}
            width="1400"
            height="192"
            className={css({
              w: 'full',
              h: 'full',
              objectFit: 'cover',
              objectPosition: 'center',
              mixBlendMode: 'multiply',
              filter: 'grayscale(100%)',
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
            {categoryTitle || 'Category'}
          </Text>
        </Center>
      </Center>

      <PageContainer zIndex="grid" flex="1">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults category={slug} params={searchParams} />
        </Suspense>
      </PageContainer>
    </PageContainer>
  )
}

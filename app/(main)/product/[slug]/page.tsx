import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GridTileImage } from 'components/grid/tile'
import Footer from 'components/layout/footer'
import { Gallery } from 'components/product/gallery'
import { ProductDescription } from 'components/product/product-description'
import { HIDDEN_PRODUCT_TAG } from 'lib/constants'
import { getProduct, getProductRecommendations } from 'lib/sfcc'
import Link from 'next/link'
import { Suspense } from 'react'
import { PageContainer } from '@/components/page-container'
import { Box, Center, Flex, HStack, Stack, styled } from '@/styled-system/jsx'
import { Text } from '@/ui/core'
import Image from 'next/image'
import { formatPrice } from '@/lib/helpers'
import { css } from '@/styled-system/css'
import { PlusIcon } from 'lucide-react'
import { VariantSelector } from '@/components/product/variant-selector'
import { ProductProvider } from '@/components/product/product-context'
import { getDefaultProductColor } from '@/lib/sfcc/product-helpers'
import { AddToCart } from '@/components/cart/add-to-cart'
import ChildrenWrapper from '../../search/children-wrapper'

// export async function generateMetadata(props: {
//   params: Promise<{ handle: string }>
// }): Promise<Metadata> {
//   const params = await props.params
//   const product = await getProduct(params.handle)

//   if (!product) return notFound()

//   const { url, width, height, altText: alt } = product.featuredImage || {}
//   const indexable = false

//   return {
//     title: product.seo.title || product.title,
//     description: product.seo.description || product.description,
//     robots: {
//       index: indexable,
//       follow: indexable,
//       googleBot: {
//         index: indexable,
//         follow: indexable,
//       },
//     },
//     openGraph: url
//       ? {
//           images: [
//             {
//               url,
//               width,
//               height,
//               alt,
//             },
//           ],
//         }
//       : null,
//   }
// }

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const product = await getProduct(params.slug)

  if (!product) return notFound()

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    // image: product.featuredImage.url,
    // offers: {
    //   '@type': 'AggregateOffer',
    //   availability: product.availableForSale
    //     ? 'https://schema.org/InStock'
    //     : 'https://schema.org/OutOfStock',
    //   priceCurrency: product.currencyCode,
    //   highPrice: product.priceRange.maxVariantPrice.amount,
    //   lowPrice: product.priceRange.minVariantPrice.amount,
    // },
  }

  const productImages = product.imageGroups?.filter((group) => group.viewType === 'large')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <PageContainer
        position="relative"
        bg="var(--bg)"
        className={css({
          '--bg': '{colors.stone.300}',
        })}
      >
        <ProductProvider defaultColor={getDefaultProductColor(product.variants)}>
          <Stack gap={{ base: '8', lg: '0' }}>
            <Box
              pt={{ base: '12', md: '0' }}
              borderBottom="1px solid {colors.stone.400/50}"
            >
              <Suspense>
                <Gallery imageGroups={productImages}></Gallery>
              </Suspense>
            </Box>

            <Center
              position={{ base: 'relative', lg: 'absolute' }}
              top="0"
              right="0"
              flexDirection={{ base: 'column' }}
              alignItems={{ lgDown: 'flex-start' }}
              gap={{ lgDown: '11' }}
              w={{ base: '100vw', lg: '36vw' }}
              h={{ base: 'auto', lg: '640px' }}
              maxW={{ lgDown: '425px' }}
              mx={{ lgDown: 'auto' }}
              pr={{ base: '6', lg: '89px' }}
              pl={{ base: '6', lg: '24px' }}
              bg="var(--bg)/60"
              borderLeft={{ lg: '1px solid {colors.stone.400/50}' }}
              zIndex="1"
              style={{
                backdropFilter: 'blur(8px)',
              }}
            >
              <Box w="100%">
                <Stack gap="6">
                  <styled.h1
                    color="neutral.800"
                    fontSize="3xl"
                    lineHeight="1.1"
                    fontWeight="light"
                  >
                    {product.name}
                  </styled.h1>

                  <styled.p
                    color="neutral.800"
                    fontSize="sm"
                    lineHeight="1"
                    textWrap="pretty"
                  >
                    {formatPrice(product.price!.toString(), product.currency!)}
                  </styled.p>

                  <styled.p color="neutral.600" fontSize="sm" lineHeight="1.4">
                    {product.shortDescription}
                  </styled.p>
                </Stack>

                <Box h="8" />

                <Suspense>
                  <VariantSelector
                    attributes={product.variationAttributes}
                    variants={product.variants}
                  />
                </Suspense>
              </Box>

              <Box
                position={{ lg: 'absolute' }}
                left={{ lg: '-45px' }}
                bottom={{ lg: '11' }}
              >
                <Suspense fallback={null}>
                  <AddToCart
                    variants={product.variants}
                    productName={product.name!}
                    productImages={productImages}
                    currency={product.currency!}
                  />
                </Suspense>
              </Box>
            </Center>
          </Stack>
        </ProductProvider>

        <Box h="400px" />
      </PageContainer>
    </>
  )
}

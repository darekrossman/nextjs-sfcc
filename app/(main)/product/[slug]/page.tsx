import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GridTileImage } from 'components/grid/tile'
import Footer from 'components/layout/footer'
import { Gallery } from 'components/product/gallery'
import { ProductProvider } from 'components/product/product-context'
import { ProductDescription } from 'components/product/product-description'
import { HIDDEN_PRODUCT_TAG } from 'lib/constants'
import { getProduct, getProductRecommendations } from 'lib/sfcc'
import Link from 'next/link'
import { Suspense } from 'react'
import { PageContainer } from '@/components/page-container'
import { Box, Center, Flex, Stack, styled } from '@/styled-system/jsx'
import { Text } from '@/ui/core'
import Image from 'next/image'
import { formatPrice } from '@/lib/helpers'
import { css } from '@/styled-system/css'
import { PlusIcon } from 'lucide-react'

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

  console.log(product)

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

  const imageGroup = product.imageGroups?.[0]?.images

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
        <Box
          pt={{ base: '60px', md: '0' }}
          borderBottom="1px solid {colors.stone.400/50}"
        >
          <Gallery images={imageGroup}></Gallery>
        </Box>

        <Center
          position={{ base: 'relative', lg: 'absolute' }}
          top="0"
          right="0"
          flexDirection={{ base: 'column' }}
          w={{ base: '100vw', lg: '36vw' }}
          h={{ base: 'auto', lg: '640px' }}
          pr={{ base: '0', lg: '89px' }}
          pl={{ lg: '24px' }}
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
                textWrap="balance"
                textBoxEdge="cap alphabetic"
                textBoxTrim="trim-both"
              >
                {product.name}
              </styled.h1>

              <styled.p
                color="neutral.800"
                fontSize="sm"
                lineHeight="1"
                textBoxEdge="cap alphabetic"
                textBoxTrim="trim-both"
              >
                {formatPrice(product.price!.toString(), product.currency!)}
              </styled.p>

              <styled.p
                color="neutral.600"
                fontSize="sm"
                lineHeight="1.4"
                textBoxEdge="cap alphabetic"
                textBoxTrim="trim-both"
                textWrap="balance"
              >
                {product.shortDescription}
              </styled.p>
            </Stack>
          </Box>

          <styled.button
            position={{ lg: 'absolute' }}
            left="-45px"
            bottom="11"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            h="11"
            gap="2"
            fontSize="sm"
            bg="neutral.800"
            color="neutral.100"
            lineHeight="1"
            textBoxEdge="cap alphabetic"
            textBoxTrim="trim-both"
            cursor="pointer"
            _hover={{
              '--accent': '{colors.green.500}',
            }}
            className={css({
              '--accent': '{colors.neutral.600}',
            })}
          >
            <Center w="11" h="11" bg="var(--accent)" transition="all 0.2s ease-in-out">
              <PlusIcon
                size={16}
                strokeWidth={1}
                className={css({ y: '-0.5px', x: '0.5px' })}
              />
            </Center>
            <Box pr="4" pl="3">
              Add to Cart
            </Box>
          </styled.button>
        </Center>
      </PageContainer>
    </>
  )
}

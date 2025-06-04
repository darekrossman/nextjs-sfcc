import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Gallery } from '@/components/product/gallery'
import { getPersonalizedProduct, getProduct } from '@/lib/sfcc'
import { Suspense } from 'react'
import { PageContainer } from '@/components/page-container'
import { Box, Center, Divider, Flex, Stack, styled } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import { VariantSelector } from '@/components/product/variant-selector'
import {
  InitProductSelections,
  ProductProvider,
} from '@/components/product/product-context'
import { AddToCart } from '@/components/cart/add-to-cart'
import { ProductPrice } from '@/components/product/product-price'
import { HeartPlus } from 'lucide-react'
import { UnknownSearchParams } from '@/lib/constants'

type PageProps = {
  params: Promise<{ productId: string; locale: string }>
  searchParams: Promise<UnknownSearchParams>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const product = await getProduct({ id: params.productId, locale: params.locale })

  if (!product) return notFound()

  const { url, width, height, altText: alt } = product.featuredImage || {}
  const indexable = false

  const metadata = {
    title: product.pageTitle || product.name,
    description: product.pageDescription || product.shortDescription,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  }

  return metadata
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params
  const product = await getProduct({ id: params.productId, locale: params.locale })

  if (!product) return notFound()

  const personalizedProductPromise = getPersonalizedProduct({
    id: params.productId,
    locale: params.locale,
  })

  const productImages = product.imageGroups?.filter((group) => group.viewType === 'large')
  const priceRanges = product.priceRanges || []

  return (
    <PageContainer
      position="relative"
      bg="var(--bg)"
      className={css({
        '--bg': '{colors.stone.300}',
        '--border': '{colors.stone.400/50}',
      })}
    >
      <ProductProvider personalizedProductPromise={personalizedProductPromise}>
        <Suspense>
          <InitProductSelections searchParams={props.searchParams} />
        </Suspense>

        <Stack gap={{ base: '11', lg: '0' }}>
          <Box
            pt={{ base: '12', md: '0' }}
            borderBottom="1px solid {colors.stone.400/50}"
          >
            <Suspense>
              <Gallery imageGroups={productImages} searchParams={props.searchParams} />
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
            pt={{ lg: '11' }}
            bg="var(--bg)/60"
            borderLeft={{ lg: '1px solid var(--border)' }}
            zIndex="1"
            style={{
              backdropFilter: 'blur(8px)',
            }}
          >
            <Flex
              w="100%"
              direction="column"
              justify="center"
              flex="1"
              maxW={{ lgDown: '425px' }}
              mx={{ lgDown: 'auto' }}
              py={{ lg: '6' }}
              pr={{ base: '6', lg: '89px' }}
              pl={{ base: '6', lg: '6' }}
            >
              <Stack gap="6">
                <styled.h1
                  fontSize="3xl"
                  lineHeight="1.1"
                  fontWeight="light"
                  color="neutral.800"
                >
                  {product.name}
                </styled.h1>

                <Flex alignItems="center" h="12px">
                  <Suspense>
                    <ProductPrice
                      price={product.price!}
                      priceRanges={priceRanges}
                      variants={product.variants}
                      searchParams={props.searchParams}
                    />
                  </Suspense>
                </Flex>

                <styled.p color="neutral.600" fontSize="sm" lineHeight="1.4">
                  {product.shortDescription}
                </styled.p>
              </Stack>

              <Box h="8" />

              <Suspense>
                <VariantSelector
                  attributes={product.variationAttributes}
                  variants={product.variants}
                  searchParams={props.searchParams}
                />
              </Suspense>
            </Flex>

            <Flex
              w="full"
              borderTop="1px solid var(--border)"
              borderBottom={{ lgDown: '1px solid var(--border)' }}
              justifyContent="center"
            >
              <Flex w="full" maxW={{ lgDown: '425px' }} px={{ lgDown: '6' }}>
                <Divider
                  hideFrom="lg"
                  orientation="vertical"
                  h="auto"
                  color="var(--border)"
                />

                <Suspense fallback={<AddToCart />}>
                  <AddToCart
                    variants={product.variants}
                    productName={product.name!}
                    productImages={productImages}
                    searchParams={props.searchParams}
                    variationAttributes={product.variationAttributes}
                  />
                </Suspense>

                <Divider orientation="vertical" h="auto" color="var(--border)" />

                <styled.button
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  w="11"
                  h="11"
                >
                  <HeartPlus strokeWidth={1} size={16} />
                </styled.button>

                <Divider orientation="vertical" h="auto" color="var(--border)" />
              </Flex>
            </Flex>
          </Center>
        </Stack>

        <Box h="400px" />
      </ProductProvider>
    </PageContainer>
  )
}

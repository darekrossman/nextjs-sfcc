import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import * as motion from 'motion/react-client'
import { Gallery } from '@/components/product/gallery'
import { getProduct } from '@/lib/sfcc'
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
import { ProductPromotion } from '@/components/product/product-promotion'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { getDictionary } from '@/lib/dictionaries/dictionaries'
import { getProductImagesForColor } from '@/lib/sfcc/product-helpers'

type PageProps = {
  params: Promise<{ productId: string; locale: 'en' | 'fr' }>
  searchParams: Promise<UnknownSearchParams>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const product = await getProduct(params.productId, params.locale)

  if (!product) return notFound()

  const image = getProductImagesForColor(product.imageGroups)?.[0]

  const metadata = {
    title: product.name,
    description: product.pageDescription || product.shortDescription,

    openGraph: image
      ? {
          images: [
            {
              url: image.link,
              width: 320,
              height: 320,
              alt: image.alt || '',
            },
          ],
        }
      : null,
  }

  return metadata
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params
  const dict = await getDictionary(params.locale)
  const product = await getProduct(params.productId, params.locale)

  if (!product) return notFound()

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
      <ProductProvider>
        <Suspense>
          <InitProductSelections searchParams={props.searchParams} />
        </Suspense>

        <Stack gap="0">
          <Box
            pt={{ base: '12', md: '0' }}
            borderBottom="1px solid {colors.stone.400/50}"
          >
            <Suspense fallback={<Gallery />}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <Gallery imageGroups={productImages} searchParams={props.searchParams} />
              </motion.div>
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
            overflow={{ lg: 'hidden' }}
            style={{
              backdropFilter: 'blur(8px)',
            }}
          >
            <Flex
              position="relative"
              w="100%"
              direction="column"
              justify="center"
              flex="1"
              maxW={{ lgDown: '425px' }}
              mx={{ lgDown: 'auto' }}
              py={{ lg: '6' }}
              pt={{ lgDown: '11' }}
              pr={{ base: '6', lg: '89px' }}
              pl={{ base: '6', lg: '6' }}
            >
              <Stack gap="6" position="relative">
                <Suspense>
                  <Box position="absolute" top="-60px" left={{ base: '0', lg: '-24px' }}>
                    <ProductPromotion
                      productId={params.productId}
                      locale={params.locale}
                    />
                  </Box>
                </Suspense>

                <styled.h1
                  fontSize="3xl"
                  lineHeight="1.2"
                  fontWeight="light"
                  color="neutral.800"
                  textWrap="balance"
                >
                  {product.name}
                </styled.h1>

                <Flex alignItems="center" h="12px">
                  <Suspense>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ProductPrice
                        price={product.price!}
                        priceRanges={priceRanges}
                        variants={product.variants}
                        searchParams={props.searchParams}
                      />
                    </motion.div>
                  </Suspense>
                </Flex>

                <styled.p
                  color="neutral.600"
                  fontSize="sm"
                  lineHeight="1.4"
                  textWrap="balance"
                >
                  {product.shortDescription}
                </styled.p>
              </Stack>

              <Box h="8" />

              <Suspense
                fallback={
                  <VariantSelector
                    attributes={product.variationAttributes}
                    variants={product.variants}
                  />
                }
              >
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

                <Box hideFrom="lg" flex="1" />
                <Divider orientation="vertical" h="auto" color="var(--border)" />

                <styled.button
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  w="11"
                  h="11"
                  color="stone.600"
                >
                  <HeartPlus strokeWidth={2} size={16} />
                </styled.button>

                <Divider orientation="vertical" h="auto" color="var(--border)" />
              </Flex>
            </Flex>
          </Center>
        </Stack>

        <PageContainer
          maxW={{ base: '768px' }}
          w="full"
          mx="auto"
          px={{ base: '6', md: '6' }}
          py="16"
        >
          <Stack minH="400px" gap="6">
            <styled.h2 fontSize="2xl" fontWeight="light" color="stone.700">
              {dict.productDetails}
            </styled.h2>
            <Divider color="stone.400/50" borderStyle="dashed" />
            <MarkdownRenderer content={product.longDescription || ''} />
          </Stack>
        </PageContainer>
      </ProductProvider>
    </PageContainer>
  )
}

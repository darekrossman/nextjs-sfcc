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
  // const products = await getCollectionProducts({ collection: 'root' })
  const products: Product[] = []

  return (
    <PageContainer>
      <Box
        position="relative"
        w="100vw"
        h={{ base: '375px', md: '460px' }}
        bgGradient="to-b"
        gradientFrom="neutral.300"
        gradientTo="neutral.500"
        borderBottom="1px solid"
        borderColor="neutral.600"
      >
        {/* <Box
          h="512px"
          aspectRatio={1}
          position="absolute"
          bottom="-100px"
          left="50%"
          transform="translateX(-50%)"
        >
          <Image
            src="/cms/10000052M_Black_1.webp"
            alt="logo"
            width={1024}
            height={1024}
          />
        </Box> */}
      </Box>

      <Box bg="neutral.100" flex="1">
        <Box h="120px" />

        <Container maxW="4xl">
          <Grid
            gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
            gap="4"
          >
            {products.map((product) => {
              return (
                <Stack key={product.id} gap="0" bg="neutral.600/50">
                  <Box p="5">
                    <Box pos="relative" w="full" aspectRatio={1}>
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText}
                        fill
                      />
                    </Box>
                  </Box>
                  <Stack px="5" pb="4" gap="0" flex="1" textWrap="balance">
                    <Text color="neutral.300" variant="static14">
                      {product.title}
                    </Text>
                    <Text color="neutral.400" variant="static14">
                      {product.priceRange.maxVariantPrice.amount}
                    </Text>
                  </Stack>
                </Stack>
              )
            })}
          </Grid>
        </Container>
      </Box>
    </PageContainer>
  )
}

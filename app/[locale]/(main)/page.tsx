import { FadeImage } from '@/components/fade-image'
import { PageBuilder } from '@/components/page-builder'
import { PageContainer } from '@/components/page-container'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/live'
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries'
import { css } from '@/styled-system/css'
import { Box, Container, Flex, Grid, GridItem, Stack, styled } from '@/styled-system/jsx'
import { Center } from '@/styled-system/jsx'
import { Metadata } from 'next'
import { Link } from '@/ui/core'
import { cq } from '@/styled-system/patterns'

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
    query: HOMEPAGE_QUERY,
    params: { locale },
  })

  const image = page?.content?.find((block) => block._type === 'hero')?.image
  const featuredProducts = page?.content?.filter((block) => block._type === 'splitImage')

  console.log(featuredProducts)

  return (
    <PageContainer>
      <styled.section position="relative">
        <Center
          position="relative"
          overflow="hidden"
          bg="white"
          w="100vw"
          h={{ base: '300px', md: '400px' }}
          px={{ base: '4', md: '48px' }}
          pt={{ base: '0', md: '138px' }}
          alignItems={{ base: 'center', md: 'flex-end' }}
          flexDirection="column"
        >
          <Box
            position="absolute"
            inset="0"
            bg="{gradients.PeachTree}"
            zIndex="2"
            mixBlendMode="screen"
          />

          <Box position="absolute" inset="0" zIndex="1" bg="{gradients.PeachTree}">
            {image ? (
              <FadeImage
                src={urlFor(image).width(1600).fit('min').url()}
                width={1600}
                height={800}
                alt=""
                className={css({
                  w: '100%',
                  h: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                })}
              />
            ) : null}
          </Box>

          <styled.h1
            position="relative"
            fontFamily="major"
            fontSize={{ base: '32px', sm: '40px', md: '50px' }}
            lineHeight="1"
            color="white"
            bg="black"
            p="2"
            fontWeight="bold"
            textAlign="center"
            letterSpacing="-0.05em"
            mixBlendMode="multiply"
            zIndex="2"
          >
            neXt.js <styled.span mx="-16px">+</styled.span> sAlesforCe
          </styled.h1>
          <styled.h2
            position="relative"
            fontFamily="major"
            fontSize={{ base: '20px', md: '32px' }}
            lineHeight="1"
            color="black"
            bg="white"
            p="2"
            fontWeight="bold"
            textAlign="center"
            letterSpacing="-0.05em"
            mixBlendMode="lighten"
            zIndex="2"
          >
            Built by Me for Vercel
          </styled.h2>
        </Center>
      </styled.section>

      <Container maxW="6xl" py={{ base: '12', md: '16' }}>
        <Grid
          gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={{ base: '6', md: '1px' }}
        >
          {featuredProducts?.map((block, i) => (
            <GridItem
              key={block._key}
              className={cq()}
              colSpan={{ base: 1, md: i === 0 ? 2 : 1 }}
            >
              <Flex
                key={block._key}
                flexDirection={{ base: 'column', '@/md': 'row' }}
                flex="1"
                h="full"
                bg="stone.400/30"
              >
                <Box flex="1 1 50%">
                  {block.image ? (
                    <Link href={block.ctaUrl!} display="flex" aspectRatio="1">
                      <FadeImage
                        src={urlFor(block.image).width(600).height(600).fit('crop').url()}
                        width={600}
                        height={600}
                        alt={block.title || ''}
                        className={css({
                          w: '100%',
                          h: '100%',
                          objectFit: 'cover',
                        })}
                      />
                    </Link>
                  ) : (
                    <Box flex="1" aspectRatio="1" />
                  )}
                </Box>

                <Stack
                  flex="1 1 50%"
                  alignItems="flex-start"
                  justifyContent={{ base: 'flex-start', '@/md': 'center' }}
                  px={{ base: '6', md: '12' }}
                  py={{ base: '8', md: '12' }}
                  gap={{ base: '5', md: '6' }}
                  color="stone.800"
                >
                  <styled.h3
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontWeight={{ base: 'normal', md: 'light' }}
                    lineHeight="1.2"
                    textWrap="balance"
                  >
                    {block.title}
                  </styled.h3>
                  <styled.p
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight="1.5"
                    maxW={{ base: 'full', '@/md': '400px' }}
                    textWrap="pretty"
                  >
                    {block.content}
                  </styled.p>

                  <Box flex={{ base: '1', '@/md': '0' }} />

                  {block.ctaLabel && block.ctaUrl ? (
                    <Link
                      href={block.ctaUrl}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      h={{ base: '11', md: '12' }}
                      px="6"
                      minW="180px"
                      fontSize="sm"
                      fontFamily="mono"
                      textTransform="uppercase"
                      fontWeight="bold"
                      bg="stone.700"
                      color="stone.100"
                      transition="all 0.15s ease-out"
                      _hover={{
                        bg: 'stone.500',
                      }}
                    >
                      {block.ctaLabel}
                    </Link>
                  ) : null}
                </Stack>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </PageContainer>
  )
}

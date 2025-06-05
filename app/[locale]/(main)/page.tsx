import { FadeImage } from '@/components/fade-image'
import { PageBuilder } from '@/components/page-builder'
import { PageContainer } from '@/components/page-container'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/live'
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries'
import { css } from '@/styled-system/css'
import { Box, styled } from '@/styled-system/jsx'
import { Center } from '@/styled-system/jsx'
import { Metadata } from 'next'

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
    </PageContainer>
  )
}

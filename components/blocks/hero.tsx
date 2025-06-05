import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { PAGE_QUERYResult } from '@/sanity/types'
import { Box, Center, styled } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import { filter } from 'motion/dist/react-client'

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['content']>[number],
  { _type: 'hero' }
>

export function Hero({ title, text, image }: HeroProps) {
  return (
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

        <Box position="absolute" inset="0" zIndex="1">
          {image ? (
            <Image
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
  )
}

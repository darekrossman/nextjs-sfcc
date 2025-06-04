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
      <Box position="relative" overflow="hidden" bg="white">
        {image ? (
          <Image
            src={urlFor(image).width(1600).height(800).url()}
            width={1600}
            height={800}
            alt=""
            className={css({
              mixBlendMode: 'exclusion',
              // filter: 'grayscale(100%)',
            })}
          />
        ) : null}
      </Box>

      <Box position="absolute" top="0" left="50%" bottom="0" right="0" bg="brand.1"></Box>

      <Center position="absolute" bottom="0" left="50%" flexDirection="column">
        <styled.h1
          // position="absolute"
          // top="50%"
          // left="50%"
          // transform="translate(calc(-50%), calc(-50% - 50px))"
          fontFamily="major"
          fontSize="140px"
          lineHeight="1"
          color="white"
          fontWeight="bold"
          letterSpacing="-0.05em"
          mixBlendMode="overlay"
          zIndex="1"
          textTransform="lowercase"
        >
          {title}
        </styled.h1>
        <styled.h1
          position="relative"
          fontFamily="major"
          fontSize="140px"
          lineHeight="1"
          color="white"
          fontWeight="bold"
          letterSpacing="-0.05em"
          // mixBlendMode="multiply"
        >
          {title}
        </styled.h1>
      </Center>
    </styled.section>
  )
}

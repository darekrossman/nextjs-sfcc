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
      <Box position="relative" overflow="hidden">
        {image ? (
          <Image
            src={urlFor(image).width(1600).height(800).url()}
            width={1600}
            height={800}
            alt=""
            className={css({
              filter: 'grayscale(100%)',
            })}
          />
        ) : null}
      </Box>

      <Center position="absolute" inset="0">
        <styled.h1
          // fontFamily="major"
          fontSize="140px"
          lineHeight="1"
          color="#04eb59"
          fontWeight="bold"
          letterSpacing="-0.05em"
          mixBlendMode="overlay"
        >
          {title}
        </styled.h1>
      </Center>
    </styled.section>
  )
}

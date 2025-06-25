import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { PAGE_QUERYResult } from '@/sanity/types'
import { Box, Flex, styled } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['content']>[number],
  { _type: 'hero' }
>

export function Hero({ title, image }: HeroProps) {
  return (
    <styled.section position="relative">
      <Flex
        position="relative"
        overflow="hidden"
        bg="white"
        w="100vw"
        h={{ base: '176px', md: '300px' }}
        px={{ base: '4', md: '48px' }}
        pt={{ base: '60px', md: '161px' }}
        alignItems={{ base: 'flex-start', sm: 'center' }}
        justifyContent="center"
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

        <Flex
          alignItems="center"
          position="relative"
          zIndex="2"
          flex="1"
          mixBlendMode="multiply"
          opacity="0.9"
        >
          <styled.h1
            position="relative"
            fontSize={{ base: '32px', sm: '40px', md: '50px' }}
            lineHeight="1"
            color="black"
            fontWeight="bold"
            textAlign="left"
            letterSpacing="-0.03em"
            mixBlendMode="multiply"
            zIndex="2"
          >
            {title}
          </styled.h1>
          {/* {text && (
          <Box
            position="relative"
            fontSize={{ base: '20px', md: '32px' }}
            lineHeight="1"
            color="black"
            bg="white"
            p="2"
            fontWeight="medium"
            textAlign="right"
            // letterSpacing="-0.05em"
            // mixBlendMode="lighten"
            zIndex="2"
          >
            <RichText content={text} />
          </Box>
        )} */}
        </Flex>
      </Flex>
    </styled.section>
  )
}

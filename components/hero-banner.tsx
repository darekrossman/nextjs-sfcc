import { Box, Center, styled } from '@/styled-system/jsx'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { css } from '@/styled-system/css'
import type { SanityImageHotspot, SanityImageCrop } from '@/sanity/types'

type BannerImage =
  | {
      asset: {
        _id: string
        url: string | null
      } | null
      alt?: string | null
      hotspot?: SanityImageHotspot | null
      crop?: SanityImageCrop | null
    }
  | null
  | undefined

type HeroBannerProps = {
  bannerImage?: BannerImage
  text?: string | null
}

export const HeroBanner = ({ bannerImage, text }: HeroBannerProps) => {
  return (
    <Center
      position="relative"
      justifyContent={{ base: 'flex-start', md: 'center' }}
      h={{ base: 'auto', md: '192px' }}
      pt={{ base: '88px', md: '0' }}
      pb={{ base: '6', md: '0' }}
      w="full"
      pl={{ base: '4', md: '8' }}
      pr={{ base: '8', md: '8' }}
      bg="stone.400"
      zIndex="1"
    >
      {bannerImage ? (
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bg="{gradients.PeachTree}"
          overflow="hidden"
        >
          <Image
            src={urlFor(bannerImage).width(1400).height(192).quality(100).url()}
            alt={bannerImage?.alt || ''}
            priority={true}
            quality={100}
            width="1400"
            height="192"
            className={css({
              w: 'auto',
              h: 'full',
              objectFit: 'cover',
              objectPosition: 'center',
              mixBlendMode: 'lighten',
              filter: 'blur(6px)',
              scale: 1.2,
            })}
          />
        </Box>
      ) : null}

      {text && (
        <Box position="relative" zIndex="1">
          <styled.h1
            color="white"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight={{ base: 'medium', md: 'light' }}
            lineHeight="1.2"
          >
            {text}
          </styled.h1>
        </Box>
      )}
    </Center>
  )
}

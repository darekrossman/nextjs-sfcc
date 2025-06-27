'use client'

import { type ProductSearchHit } from '@/lib/sfcc/types'
import { Box, Flex, styled } from '@/styled-system/jsx'
import { Stack } from '@/styled-system/jsx'
import Link from '@/components/link'
import { Price } from './price'
import Image from 'next/image'
import { token } from '@/styled-system/tokens'

export function ProductSearchHit({
  hit,
  imagePriority = false,
}: {
  hit: ProductSearchHit
  imagePriority: boolean
}) {
  const defaultVariant =
    hit.variants?.find((v) => v.productId === hit.representedProduct?.id) ||
    hit.variants?.[0]
  const defaultColor = defaultVariant?.variationValues?.color
  const defaultImageGroup =
    hit.imageGroups?.find((g) =>
      g.variationAttributes?.find(
        (attr) =>
          attr.id === 'color' && attr.values?.some((val) => val.value === defaultColor),
      ),
    ) || hit.imageGroups?.[0]

  return (
    <Link
      href={`/product/${hit.productId}?color=${defaultColor}`}
      display="flex"
      flexDirection="column"
      borderRight="1px solid var(--borderBase)"
      borderBottom="1px dotted var(--borderBase)"
      position="relative"
      overflow="hidden"
    >
      <Box p="5">
        <Box pos="relative" w="full" aspectRatio={1}>
          <Image
            src={defaultImageGroup?.images?.[0]?.link || ''}
            alt={defaultImageGroup?.images?.[0]?.alt || ''}
            fill
            sizes={[
              `(max-width: ${token('breakpoints.md')}px) 50vw`,
              `(max-width: ${token('breakpoints.xl')}px) 33vw`,
              `25vw`,
            ].join(',')}
            priority={imagePriority}
          />
        </Box>
      </Box>

      <Stack
        position="relative"
        zIndex="1"
        px={{ base: '5', md: '5' }}
        pb={{ base: '5', md: '5' }}
        gap="3"
        flex="1"
        textWrap="balance"
      >
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          justify="space-between"
          gap={{ base: '3', md: '3' }}
        >
          <styled.p color="neutral.600" fontSize="sm" fontWeight="medium" leading="1.2">
            {hit.productName}
          </styled.p>
          <Price amount={hit.price} color="neutral.500" fontSize="sm" leading="1" />
        </Flex>
      </Stack>
    </Link>
  )
}

'use client'

import { formatPrice } from '@/lib/helpers'
import { type ProductSearchHit } from '@/lib/sfcc/types'
import { css } from '@/styled-system/css'
import { Box, Flex, HStack } from '@/styled-system/jsx'
import { Stack } from '@/styled-system/jsx'
import { Link, Text } from '@/ui/core'
import Image from 'next/image'

export function ProductSearchHit({
  hit,
  imagePriority = false,
}: {
  hit: ProductSearchHit
  imagePriority: boolean
}) {
  return (
    <Link
      href={`/product/${hit.productId}`}
      display="flex"
      flexDirection="column"
      borderRight="1px solid var(--borderBase)"
      borderBottom="1px dotted {colors.neutral.400/40}"
      position="relative"
      overflow="hidden"
    >
      <Box p="5">
        <Box pos="relative" w="full" aspectRatio={1}>
          <Image
            src={hit.imageGroups?.[0]?.images?.[0]?.link || ''}
            alt={hit.imageGroups?.[0]?.images?.[0]?.alt || ''}
            fill
            sizes="var(--img-sizes, 100vw)"
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
          <Text color="neutral.600" fontSize="sm" fontWeight="medium" leading="1.2">
            {hit.productName}
          </Text>
          <Text color="neutral.500" fontSize="sm" leading="1">
            {formatPrice(hit.price!, hit.currency!)}
          </Text>
        </Flex>
      </Stack>
    </Link>
  )
}

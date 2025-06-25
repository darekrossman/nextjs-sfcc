'use client'

import { Price } from '@/components/price'
import { findVariant } from '@/lib/sfcc/product-helpers'
import { Product } from '@/lib/sfcc/types'
import { useProduct } from './product-context'
import { HTMLStyledProps } from '@/styled-system/types'
import { HStack, styled } from '@/styled-system/jsx'
import { use, useEffect } from 'react'
import { UnknownSearchParams } from '@/lib/constants'

const StyledPrice = styled(Price, {
  base: {
    color: 'neutral.800',
    fontSize: 'sm',
    lineHeight: '1',
  },
})

function ProductPriceBase({
  price,
  priceRanges,
  variants,
  searchParams,
}: {
  price: number
  priceRanges: Product['priceRanges']
  variants: Product['variants']
  searchParams?: Promise<UnknownSearchParams>
}) {
  const params = searchParams ? use(searchParams) : {}
  const { selections } = useProduct()

  const selectedVariant = findVariant(variants, { ...params, ...selections })

  if (selectedVariant) {
    return <StyledPrice amount={selectedVariant.price} />
  }

  const listRange = priceRanges?.find((range) => range.pricebook?.includes('list'))

  const minPrice = listRange?.minPrice || price
  const maxPrice = listRange?.maxPrice || price

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return (
      <HStack gap="1">
        <StyledPrice amount={minPrice} />
        <styled.span fontSize="sm" lineHeight="1">
          -
        </styled.span>
        <StyledPrice amount={maxPrice} />
      </HStack>
    )
  }

  return <StyledPrice amount={minPrice || maxPrice} />
}

export const ProductPrice = styled(ProductPriceBase)

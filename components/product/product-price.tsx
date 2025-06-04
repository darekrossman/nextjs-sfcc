'use client'

import { Price } from '@/components/price'
import { findVariant } from '@/lib/sfcc/product-helpers'
import { Product } from '@/lib/sfcc/types'
import { useProduct } from './product-context'
import { HTMLStyledProps } from '@/styled-system/types'
import { HStack, styled } from '@/styled-system/jsx'
import { use, useEffect } from 'react'

function ProductPriceBase({
  price,
  priceRanges,
  variants,
  ...props
}: {
  price: number
  priceRanges: Product['priceRanges']
  variants: Product['variants']
}) {
  const { selections, personalizedProductPromise } = useProduct()

  // const personalizedProduct = use(personalizedProductPromise)

  // useEffect(() => {
  //   console.log('personalizedProduct', personalizedProduct)
  // }, [])

  const selectedVariant = findVariant(variants, selections)

  if (selectedVariant) {
    return <Price amount={selectedVariant.price} {...props} />
  }

  const listRange = priceRanges?.find((range) => range.pricebook?.includes('list'))
  const saleRange = priceRanges?.find((range) => range.pricebook?.includes('sale'))

  const minPrice = listRange?.minPrice || price
  const maxPrice = listRange?.maxPrice || price

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return (
      <HStack gap="1">
        <Price amount={minPrice} {...props} />
        <styled.span fontSize="sm" lineHeight="1">
          -
        </styled.span>
        <Price amount={maxPrice} {...props} />
      </HStack>
    )
  }

  return <Price amount={minPrice || maxPrice} {...props} />
}

export const ProductPrice = styled(ProductPriceBase)

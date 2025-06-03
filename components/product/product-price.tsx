'use client'

import { Price } from '@/components/price'
import { findVariant } from '@/lib/sfcc/product-helpers'
import { Product } from '@/lib/sfcc/types'
import { useProduct } from './product-context'
import { HTMLStyledProps } from '@/styled-system/types'
import { styled } from '@/styled-system/jsx'

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
  const { selections } = useProduct()

  const selectedVariant = findVariant(variants, selections)

  if (selectedVariant) {
    return <Price amount={selectedVariant.price} {...props} />
  }

  const listRange = priceRanges?.find((range) => range.priceType === 'list')

  return <Price amount={price} {...props} />
}

export const ProductPrice = styled(ProductPriceBase)

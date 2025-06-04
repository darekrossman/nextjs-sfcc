'use client'

import { useProduct } from 'components/product/product-context'
import { Product } from 'lib/sfcc/types'
import { use } from 'react'
import { useCart } from './cart-context'
import { Center } from '@/styled-system/jsx'
import { styled } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import { findVariant, getProductImagesForColor } from '@/lib/sfcc/product-helpers'
import { useLocale } from '@/components/locale-context'
import { UnknownSearchParams } from '@/lib/constants'

// Helper function to create display names for selections
function createSelectionDisplayNames(
  selections: Record<string, string | number | undefined>,
  variationAttributes?: Product['variationAttributes'],
): Record<string, string | number | undefined> {
  if (!variationAttributes) {
    return selections
  }

  const displayNames: Record<string, string | number | undefined> = {}

  Object.entries(selections).forEach(([attributeId, value]) => {
    const attribute = variationAttributes.find((attr) => attr.id === attributeId)

    if (attribute && value !== undefined) {
      // Find the corresponding value in the attribute to get its display name
      const attributeValue = attribute.values?.find((v) => v.value === value)
      displayNames[attributeId] = attributeValue?.name || value
    } else {
      // Fallback to original value if no attribute or value found
      displayNames[attributeId] = value
    }
  })

  return displayNames
}

export function AddToCart({
  variants,
  productName,
  productImages,
  searchParams,
  variationAttributes,
}: {
  variationAttributes?: Product['variationAttributes']
  variants?: Product['variants']
  productName?: string
  productImages?: Product['imageGroups']
  searchParams?: Promise<UnknownSearchParams>
}) {
  const params = searchParams ? use(searchParams) : {}
  const { addCartItem } = useCart()
  const { currency } = useLocale()
  const { selections: optimisticSelections } = useProduct()

  const selections = { ...params, ...optimisticSelections }

  const variant = findVariant(variants, selections)

  const addItemToCart = () => {
    const images = getProductImagesForColor(
      productImages,
      selections.color as string | undefined,
    )

    if (!variant) {
      return
    }

    addCartItem(variant, {
      id: variant.productId,
      values: createSelectionDisplayNames(selections, variationAttributes),
      name: productName || '',
      image: images[0],
      currency,
    })
  }

  const disabled = !variant
  const unavailable = variant && !variant.orderable

  return (
    <styled.button
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      h="11"
      fontSize="sm"
      color="neutral.100"
      lineHeight="1"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      disabled={disabled}
      // border={disabled ? '1px solid {colors.stone.400/50}' : 'none'}
      _hover={
        {
          // '--accent': '{gradients.PeachTree}',
        }
      }
      className={css({
        '--bg': disabled ? 'transparent' : '{colors.stone.800}',
        '--accentBg': disabled ? 'transparent' : '{colors.stone.600}',
        '--fg': disabled ? '{colors.stone.400}' : '{colors.stone.100}',
        '--accentFg': disabled ? '{colors.stone.400}' : '{colors.stone.100}',
      })}
      onClick={addItemToCart}
    >
      <Center
        h="full"
        px="6"
        boxShadow="0 0 0 1px var(--bg)"
        bg="var(--bg)"
        color="var(--fg)"
        fontSize="xs"
        fontFamily="mono"
        fontWeight="bold"
        textTransform="uppercase"
      >
        Add to cart
      </Center>
    </styled.button>
  )
}

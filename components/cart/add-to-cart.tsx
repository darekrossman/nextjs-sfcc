'use client'

import { addItem } from 'components/cart/actions'
import { useProduct } from 'components/product/product-context'
import { Product, ProductVariant } from 'lib/sfcc/types'
import { startTransition, useActionState } from 'react'
import { useCart } from './cart-context'
import { Center } from '@/styled-system/jsx'
import { styled } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import { PlusIcon } from 'lucide-react'
import { findVariant, getProductImagesForColor } from '@/lib/sfcc/product-helpers'

function SubmitButton({
  variant,
}: {
  variant?: ProductVariant
}) {}

export function AddToCart({
  variants,
  productName,
  productImages,
  currency,
}: {
  variants?: NonNullable<Product['variants']>
  productName: string
  productImages?: NonNullable<Product['imageGroups']>
  currency: string
}) {
  const { addCartItemAction } = useCart()
  const { state } = useProduct()

  // const [message, formAction] = useActionState(addItemAction, null)

  const variant = findVariant(variants, state)

  const addItemToCart = () => {
    const images = getProductImagesForColor(
      productImages,
      state.color as string | undefined,
    )

    if (!variant) {
      return
    }

    addCartItemAction(variant, {
      id: variant.productId,
      values: state,
      name: productName,
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
      border={disabled ? '1px solid {colors.stone.400/50}' : 'none'}
      _hover={
        {
          // '--accent': '{gradients.PeachTree}',
        }
      }
      className={css({
        '--bg': disabled ? 'transparent' : '{colors.neutral.800}',
        '--accentBg': disabled ? 'transparent' : '{colors.stone.600}',
        '--fg': disabled ? '{colors.neutral.400}' : '{colors.neutral.100}',
        '--accentFg': disabled ? '{colors.neutral.400}' : '{colors.stone.100}',
      })}
      onClick={addItemToCart}
    >
      <Center
        w="11"
        h="11"
        bg="var(--accentBg)"
        color="var(--accentFg)"
        transition="all 0.2s ease-in-out"
      >
        <PlusIcon
          size={16}
          strokeWidth={1}
          className={css({ y: '-0.5px', x: '0.5px' })}
        />
      </Center>
      <Center h="full" px="6" bg="var(--bg)" color="var(--fg)">
        Add to Cart
      </Center>
    </styled.button>
  )
}

'use client'

import { addItem } from 'components/cart/actions'
import { useProduct } from 'components/product/product-context'
import { Product, ProductVariant } from 'lib/sfcc/types'
import { startTransition, use, useActionState } from 'react'
import { CartContext, useCart } from './cart-context'
import { Center } from '@/styled-system/jsx'
import { styled } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import { PlusIcon } from 'lucide-react'
import { findVariant, getProductImagesForColor } from '@/lib/sfcc/product-helpers'
import { useLocale } from '@/components/locale-context'

export function AddToCart({
  variants,
  productName,
  productImages,
}: {
  variants?: NonNullable<Product['variants']>
  productName: string
  productImages?: NonNullable<Product['imageGroups']>
}) {
  const { addCartItem } = useCart()
  const { locale, currency } = useLocale()
  const { selections } = useProduct()

  const variant = findVariant(variants, selections)

  const addItemToCart = () => {
    const images = getProductImagesForColor(
      productImages,
      selections.color as string | undefined,
    )

    if (!variant) {
      return
    }

    addCartItem(
      variant,
      {
        id: variant.productId,
        values: selections,
        name: productName,
        image: images[0],
        currency,
      },
      locale,
    )
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
      {/* <Center
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
      </Center> */}
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
        Add_to_cart
      </Center>
    </styled.button>
  )
}

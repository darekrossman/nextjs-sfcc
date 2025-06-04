'use server'

import { ShopperBaskets } from 'commerce-sdk-isomorphic'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { getGuestUserConfig, getValidGuestUserConfig, isTokenValid } from './auth'
import { ensureSDKResponseError } from './type-guards'

// =====================================================================
// CREATE CART
// =====================================================================

export async function createCart(locale?: string) {
  const config = await getValidGuestUserConfig()
  const basketClient = new ShopperBaskets(config)

  const basket = await basketClient.createBasket({
    parameters: {
      locale: locale === 'fr' ? 'fr-FR' : 'default',
    },
    body: { currency: locale === 'fr' ? 'EUR' : 'USD' },
  })

  return basket
}

// =====================================================================
// GET CART
// =====================================================================

export const getCart = cache(async (locale?: string) => {
  const cartId = (await cookies()).get('cartId')?.value!

  if (!cartId) {
    return
  }

  const guestToken = (await cookies()).get('guest_token')?.value

  if (!guestToken) {
    /** @todo refresh token if possible */
    return
  }

  if (!isTokenValid(guestToken)) {
    /** @todo refresh token if possible */
    console.log('invalid guest token')
    return
  }

  const config = await getGuestUserConfig(guestToken)

  try {
    const basketClient = new ShopperBaskets(config)
    console.log(`fetching basket with ${locale}`)
    const basket = await basketClient.getBasket({
      parameters: {
        basketId: cartId,
        locale: locale === 'fr' ? 'fr-FR' : 'default',
      },
    })

    if (!basket?.basketId) return
    console.log('fetched basket', basket.basketId)
    return basket
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error getting basket')
    console.warn(error)
    return
  }
})

// =====================================================================
// ADD TO CART
// =====================================================================

export async function addToCart(
  items: {
    productId: string
    quantity: number
    [key: string]: string | number
  }[],
  locale?: string,
) {
  let cartId = (await cookies()).get('cartId')?.value

  const config = await getValidGuestUserConfig()

  try {
    const basketClient = new ShopperBaskets(config)
    console.log(`adding item to cart with ${locale}`, items)
    const basket = await basketClient.addItemToBasket({
      parameters: {
        basketId: cartId!,
        locale: locale === 'fr' ? 'fr-FR' : 'default',
      },
      body: items,
    })

    return basket
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error adding item to cart')
    console.warn(error)
    return
  }
}

// =====================================================================
// REMOVE FROM CART
// =====================================================================

export async function removeFromCart(itemIds: string[], locale?: string) {
  const cartId = (await cookies()).get('cartId')?.value!
  // Next Commerce only sends one lineId at a time
  if (itemIds.length !== 1) throw new Error('Invalid number of line items provided')

  // get the guest token to get the correct guest cart
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  const basketClient = new ShopperBaskets(config)

  const basket = await basketClient.removeItemFromBasket({
    parameters: {
      basketId: cartId,
      itemId: itemIds[0]!,
      locale: locale === 'fr' ? 'fr-FR' : 'default',
    },
  })

  return basket
}

// =====================================================================
// UPDATE CART ITEM
// =====================================================================

export async function updateCartItem(itemId: string, quantity: number, locale?: string) {
  const cartId = (await cookies()).get('cartId')?.value!
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  const basketClient = new ShopperBaskets(config)

  const basket = await basketClient.updateItemInBasket({
    parameters: {
      basketId: cartId,
      itemId: itemId,
      locale: locale === 'fr' ? 'fr-FR' : 'default',
    },
    body: {
      quantity,
    },
  })

  return basket
}

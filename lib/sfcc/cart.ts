'use server'

import { ShopperBaskets } from 'commerce-sdk-isomorphic'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { getGuestUserConfig, getValidGuestUserConfig, isTokenValid } from './auth'
import { ensureSDKResponseError } from './type-guards'

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
    await new Promise((resolve) => setTimeout(resolve, 5000))
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

export async function removeFromCart(lineIds: string[]) {
  const cartId = (await cookies()).get('cartId')?.value!
  // Next Commerce only sends one lineId at a time
  if (lineIds.length !== 1) throw new Error('Invalid number of line items provided')

  // get the guest token to get the correct guest cart
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  const basketClient = new ShopperBaskets(config)

  const basket = await basketClient.removeItemFromBasket({
    parameters: {
      basketId: cartId,
      itemId: lineIds[0]!,
    },
  })

  return basket
}

export async function updateCart(
  lines: { id: string; itemId: string; quantity: number }[],
) {
  const cartId = (await cookies()).get('cartId')?.value!
  // get the guest token to get the correct guest cart
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  const basketClient = new ShopperBaskets(config)

  // ProductItem quantity can not be updated through the API
  // Quantity updates need to remove all items from the cart and add them back with updated quantities
  // See: https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-baskets?meta=updateBasket

  // create removePromises for each line
  const removePromises = lines.map((line) =>
    basketClient.removeItemFromBasket({
      parameters: {
        basketId: cartId,
        itemId: line.id,
      },
    }),
  )

  // wait for all removals to resolve
  await Promise.all(removePromises)

  // create addPromises for each line
  const addPromises = lines.map((line) =>
    basketClient.addItemToBasket({
      parameters: {
        basketId: cartId,
      },
      body: [
        {
          productId: line.itemId,
          quantity: line.quantity,
        },
      ],
    }),
  )

  // wait for all additions to resolve
  await Promise.all(addPromises)

  // all updates are done, get the updated basket
  const updatedBasket = await basketClient.getBasket({
    parameters: {
      basketId: cartId,
    },
  })

  return updatedBasket
}

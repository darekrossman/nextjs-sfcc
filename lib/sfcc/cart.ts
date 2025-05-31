import { ShopperBaskets, ShopperBasketsTypes } from 'commerce-sdk-isomorphic'
import { cookies } from 'next/headers'
import {
  getGuestUserAuthToken,
  getGuestUserConfig,
  getValidGuestUserConfig,
  isTokenValid,
} from './auth'
import { reshapeBasket } from './reshape'
import { CartItem, Product } from './types'
import { getProduct } from './products'
import { ensureSDKResponseError } from './type-guards'

export async function createCart() {
  // get the guest config
  const config = await getValidGuestUserConfig()

  // initialize the basket client
  const basketClient = new ShopperBaskets(config)

  // create an empty ShopperBaskets.Basket
  const basket = await basketClient.createBasket({ body: {} })

  return basket
}

export async function getCart() {
  console.log('getCart')
  const cartId = (await cookies()).get('cartId')?.value!

  if (!cartId) {
    return
  }

  // get the guest token to get the correct guest cart
  const guestToken = (await cookies()).get('guest_token')?.value

  if (!guestToken || !isTokenValid(guestToken)) {
    console.log('Existing guest token is invalid or expired')
    return
  }

  const config = await getGuestUserConfig(guestToken)

  if (!cartId) return

  try {
    const basketClient = new ShopperBaskets(config)

    const basket = await basketClient.getBasket({
      parameters: {
        basketId: cartId,
      },
    })

    if (!basket?.basketId) return

    return basket
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error getting basket')
    console.warn(error)
    return
  }
}

export async function addToCart(
  items: {
    productId: string
    quantity: number
    [key: string]: string | number
  }[],
) {
  let cartId = (await cookies()).get('cartId')?.value

  const config = await getValidGuestUserConfig()

  try {
    const basketClient = new ShopperBaskets(config)

    const basket = await basketClient.addItemToBasket({
      parameters: {
        basketId: cartId!,
      },
      body: items,
    })

    if (!basket?.basketId) {
      return
    }

    console.log('basket', basket.productItems)

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

  const cartItems = await getCartItems(basket)
  return reshapeBasket(basket, cartItems)
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[],
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
          productId: line.merchandiseId,
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

  const cartItems = await getCartItems(updatedBasket)
  return reshapeBasket(updatedBasket, cartItems)
}

export async function getCartItems(createdBasket: ShopperBasketsTypes.Basket) {
  const cartItems: CartItem[] = []

  if (createdBasket.productItems) {
    const productsInCart: Product[] = []

    // Fetch all matching products for items in the cart
    await Promise.all(
      createdBasket.productItems
        .filter((l) => l.productId)
        .map(async (l) => {
          const product = await getProduct(l.productId!)
          productsInCart.push(product)
        }),
    )

    // Reshape the sfcc items and push them onto the cartItems
    // createdBasket.productItems.map((productItem) => {
    //   cartItems.push(
    //     reshapeProductItem(
    //       productItem,
    //       createdBasket.currency || 'USD',
    //       productsInCart.find((p) => p.id === productItem.productId)!,
    //     ),
    //   )
    // })
  }

  return cartItems
}

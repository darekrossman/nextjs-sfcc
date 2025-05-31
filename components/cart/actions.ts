'use server'

import { TAGS } from 'lib/constants'
import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/sfcc'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { startTransition } from 'react'

export async function addItem(item: {
  productId: string
  [key: string]: unknown
}) {
  if (!item.productId) {
    return
  }

  console.log('adding item', item)

  try {
    let cart = await addToCart([{ ...item, quantity: 1 }])
    if (!cart?.basketId) {
      console.log('no cart, creating one')
      const newCart = await createCart()
      if (newCart.basketId) {
        ;(await cookies()).set('cartId', newCart.basketId)
        cart = await addToCart([{ ...item, quantity: 1 }])
      }
    }
    if (cart?.basketId) {
      console.log('added item to cart')
      revalidateTag(TAGS.cart)
      return cart
    }

    return undefined
  } catch (e) {
    console.log(e)
    return
  }
}

export async function removeItem(prevState: unknown, itemId: string) {
  try {
    const cart = await getCart()

    if (!cart) {
      return 'Error fetching cart'
    }

    const lineItem = cart.productItems?.find((line) => line.itemId === itemId)

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id])
      revalidateTag(TAGS.cart)
    } else {
      return 'Item not found in cart'
    }
  } catch (e) {
    return 'Error removing item from cart'
  }
}

export async function updateItemQuantity(
  prevState: unknown,
  payload: {
    itemId: string
    quantity: number
  },
) {
  // const { itemId, quantity } = payload
  // try {
  //   const cart = await getCart()
  //   if (!cart) {
  //     return 'Error fetching cart'
  //   }
  //   const lineItem = cart.productItems?.find((line) => line.itemId === itemId)
  //   if (lineItem && lineItem.id) {
  //     if (quantity === 0) {
  //       await removeFromCart([lineItem.id])
  //     } else {
  //       await updateCart([
  //         {
  //           id: lineItem.id,
  //           itemId,
  //           quantity,
  //         },
  //       ])
  //     }
  //   } else if (quantity > 0) {
  //     // If the item doesn't exist in the cart and quantity > 0, add it
  //     await addToCart([{ itemId, quantity }])
  //   }
  //   revalidateTag(TAGS.cart)
  // } catch (e) {
  //   console.error(e)
  //   return 'Error updating item quantity'
  // }
}

export async function redirectToCheckout() {
  let cart = await getCart()
  redirect(cart!.checkoutUrl)
}

export async function createCartAndSetCookie() {
  let cart = await createCart()
  ;(await cookies()).set('cartId', cart.id!)
}

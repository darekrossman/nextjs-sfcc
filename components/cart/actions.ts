'use server'

import { TAGS } from 'lib/constants'
import { addToCart, createCart, getCart, removeFromCart, updateCartItem } from 'lib/sfcc'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function addItem(
  item: {
    productId: string
    [key: string]: unknown
  },
  locale?: string,
) {
  if (!item.productId) {
    return
  }

  try {
    let cart = await addToCart([{ ...item, quantity: 1 }], locale)
    if (!cart?.basketId) {
      const newCart = await createCart(locale)
      if (newCart.basketId) {
        ;(await cookies()).set('cartId', newCart.basketId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: `/${locale || 'en'}`,
        })
        cart = await addToCart([{ ...item, quantity: 1 }], locale)
      }
    }
    if (cart?.basketId) {
      revalidateTag(TAGS.cart)
      return cart
    }

    return undefined
  } catch (e) {
    console.log(e)
    return
  }
}

export async function removeItem(itemId: string, locale?: string) {
  try {
    const updatedCart = await removeFromCart([itemId], locale)
    revalidateTag(TAGS.cart)
    return updatedCart
  } catch (e) {
    return
  }
}

export async function updateItem(itemId: string, quantity: number, locale?: string) {
  try {
    const updatedCart = await updateCartItem(itemId, quantity, locale)
    revalidateTag(TAGS.cart)
    return updatedCart
  } catch (e) {
    return
  }
}

export async function redirectToCheckout() {
  let cart = await getCart()
  redirect(cart!.checkoutUrl)
}

export async function createCartAndSetCookie() {
  let cart = await createCart()
  ;(await cookies()).set('cartId', cart.id!)
}

'use client'

import { Cart, CartItem, CartProductPartial, ProductVariant } from '@/lib/sfcc/types'
import React, {
  createContext,
  useContext,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from 'react'
import { addItem, removeItem, updateItem } from './actions'
import { useLocale } from '@/components/locale-context'

type CartContextType = {
  cartPromise: Promise<Cart | undefined>
  cart: Cart | undefined
  setCart: (cart: Cart | undefined) => void
  addCartItem: (
    variant: ProductVariant,
    product: CartProductPartial,
    locale?: string,
  ) => Promise<void>
  removeCartItem: (itemId: string) => Promise<void>
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>
  pending: boolean
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode
  cartPromise: Promise<Cart | undefined>
}) {
  const { locale } = useLocale()
  const [pending, startTransition] = useTransition()
  const [cart, setCart] = useState<Cart | undefined>(undefined)

  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    cart,
    (prevCart: Cart | undefined, newCart: Cart) => {
      return {
        ...prevCart,
        ...newCart,
      }
    },
  )

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    if (quantity === 0) {
      return
    }

    const newCart = optimisticUpdateItemQuantity({
      cart: optimisticCart,
      itemId,
      quantity,
    })

    startTransition(async () => {
      updateOptimisticCart(newCart)
      const updatedCart = await updateItem(itemId, quantity, locale)
      if (updatedCart) {
        setCart(updatedCart)
      }
    })
  }

  const addCartItem = async (variant: ProductVariant, product: CartProductPartial) => {
    const newCart = optimisticAdd({
      cart: optimisticCart,
      variant,
      product,
    })

    startTransition(async () => {
      updateOptimisticCart(newCart)

      const updatedCart = await addItem(
        {
          productId: variant.productId,
          c_values: JSON.stringify(product.values),
          c_image: JSON.stringify(product.image),
        },
        locale,
      )
      if (updatedCart) {
        setCart(updatedCart)
      }
    })
  }

  const removeCartItem = async (itemId: string) => {
    const newCart = optimisticRemove({
      cart: optimisticCart,
      itemId,
    })

    startTransition(async () => {
      updateOptimisticCart(newCart)
      const updatedCart = await removeItem(itemId, locale)
      if (updatedCart) {
        setCart(updatedCart)
      }
    })
  }

  const value = useMemo(() => {
    return {
      cartPromise,
      cart: optimisticCart,
      setCart,
      addCartItem,
      removeCartItem,
      updateItemQuantity,
      pending,
    }
  }, [optimisticCart, pending])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

function optimisticRemove({
  cart,
  itemId,
}: {
  cart?: Cart
  itemId: string
}) {
  if (!cart) {
    throw new Error('No cart to remove item from')
  }

  const updatedLines = cart.productItems?.filter((item) => item.itemId !== itemId)
  return {
    ...cart,
    productItems: updatedLines,
  }
}

function optimisticAdd({
  cart,
  variant,
  product,
}: {
  cart?: Cart
  variant: ProductVariant
  product: CartProductPartial
}) {
  const currentCart = cart || createEmptyCart()

  const existingItem = currentCart.productItems?.find(
    (item) => item.productId === variant.productId,
  )

  if (existingItem?.itemId) {
    return optimisticUpdateItemQuantity({
      cart: currentCart,
      itemId: existingItem.itemId,
      quantity: existingItem.quantity! + 1,
    })
  }

  const updatedItem = createOrUpdateCartItem(existingItem, variant, product)

  const updatedLines = existingItem
    ? currentCart.productItems?.map((item) =>
        item.productId === variant.productId ? updatedItem : item,
      )
    : [...(currentCart.productItems || []), updatedItem]

  return {
    ...currentCart,
    // ...updateCartTotals(updatedLines),
    productItems: updatedLines,
  }
}

function optimisticUpdateItemQuantity({
  cart,
  itemId,
  quantity,
}: {
  cart?: Cart
  itemId: string
  quantity: number
}) {
  if (!cart) {
    throw new Error('No cart to update item quantity')
  }
  if (quantity === 0) {
    return cart
  }

  const item = cart.productItems?.find((item) => item.itemId === itemId)

  if (!item) {
    throw new Error('Item not found')
  }

  const newProductItems = cart.productItems?.map((item) => {
    if (item.itemId === itemId) {
      const price = item.basePrice! * quantity
      let priceAfterItemDiscount = price

      item.priceAdjustments?.forEach((adjustment) => {
        if (adjustment.appliedDiscount?.type === 'percentage') {
          priceAfterItemDiscount = price * (1 - (adjustment.appliedDiscount!.amount ?? 0))
        } else {
          priceAfterItemDiscount = price - (adjustment.appliedDiscount?.amount ?? 0)
        }
      })

      return {
        ...item,
        quantity,
        price,
        priceAfterItemDiscount,
      }
    }
    return item
  })

  return {
    ...cart,
    productItems: newProductItems,
  }
}

function calculateItemCost(quantity: number, price?: number) {
  return (price || 9999) * quantity
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: CartProductPartial,
): CartItem {
  const quantity = existingItem ? (existingItem.quantity ?? 1) + 1 : 1
  const totalAmount = calculateItemCost(quantity, variant.price)

  return {
    productId: product.id,
    basePrice: variant.price,
    quantity,
    price: totalAmount,
    itemText: product.name,
    productName: product.name,
    currency: product.currency,
    c_image: JSON.stringify(product.image),
    c_values: JSON.stringify(product.values),
  }
}

function createEmptyCart(): Cart {
  return {}
}

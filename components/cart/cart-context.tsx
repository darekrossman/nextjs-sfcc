'use client'

import {
  Cart,
  CartItem,
  CartProductPartial,
  Product,
  ProductVariant,
} from 'lib/sfcc/types'
import React, {
  createContext,
  startTransition,
  use,
  useContext,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
} from 'react'
import { addItem } from './actions'

type UpdateType = 'plus' | 'minus' | 'delete'

type CartAction =
  | {
      type: 'UPDATE_ITEM'
      payload: { itemId: string; updateType: UpdateType }
    }
  | {
      type: 'ADD_ITEM'
      payload: { variant: ProductVariant; product: CartProductPartial }
    }

type CartContextType = {
  cartPromise: Promise<Cart | undefined>
  cart: Cart | undefined
  setCart: (cart: Cart | undefined) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

function calculateItemCost(quantity: number, price?: number) {
  return (price || 9999) * quantity
}

function updateCartItem(item: CartItem, updateType: UpdateType): CartItem | null {
  if (updateType === 'delete') return null

  const quantity = item.quantity ?? 1

  const newQuantity = updateType === 'plus' ? quantity + 1 : quantity - 1
  if (newQuantity === 0) return null

  const singleItemAmount = item.basePrice
  const newTotalAmount = calculateItemCost(newQuantity, singleItemAmount)

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount,
      },
    },
  }
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
    c_values: JSON.stringify(variant.variationValues),
  }
}

function updateCartTotals(items: CartItem[]) {
  // const totalQuantity = lines.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
  // const totalAmount = lines.reduce(
  //   (sum, item) => sum + Number(item.cost.totalAmount.amount),
  //   0,
  // )
  // const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'USD'
  // return {
  //   totalQuantity,
  //   cost: {
  //     subtotalAmount: { amount: totalAmount.toString(), currencyCode },
  //     totalAmount: { amount: totalAmount.toString(), currencyCode },
  //     totalTaxAmount: { amount: '0', currencyCode },
  //   },
  // }
}

function createEmptyCart(): Cart {
  return {}
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart()

  switch (action.type) {
    case 'UPDATE_ITEM': {
      const { itemId, updateType } = action.payload
      const updatedLines = currentCart.productItems
        ?.map((item) =>
          item.itemId === itemId ? updateCartItem(item, updateType) : item,
        )
        .filter(Boolean) as CartItem[]

      if (updatedLines.length === 0) {
        return {
          ...currentCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...currentCart.cost,
            totalAmount: { ...currentCart.cost.totalAmount, amount: '0' },
          },
        }
      }

      return {}

      // return {
      //   ...currentCart,
      //   ...updateCartTotals(updatedLines),
      //   lines: updatedLines,
      // }
    }

    default:
      return currentCart
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode
  cartPromise: Promise<Cart | undefined>
}) {
  const [cart, setCart] = useState<Cart | undefined>(undefined)

  return (
    <CartContext.Provider value={{ cartPromise, cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  const [didSync, setDidSync] = useState(false)

  const getInitialCart = () => {
    return use(context.cartPromise)
  }

  const initialCart = didSync ? {} : getInitialCart()

  useEffect(() => {
    if (!context.cart) {
      setDidSync(true)
      context.setCart({ ...initialCart })
    }
  }, [])

  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    { ...context.cart, ...initialCart },
    (prevCart: Cart | undefined, newCart: Cart) => {
      return {
        ...prevCart,
        ...newCart,
      }
    },
  )

  const updateCartItem = (itemId: string, updateType: UpdateType) => {
    updateOptimisticCart({
      type: 'UPDATE_ITEM',
      payload: { itemId, updateType },
    })
  }

  const addCartItemAction = async (
    variant: ProductVariant,
    product: CartProductPartial,
  ) => {
    const newCart = addItemOptimistically({ cart: optimisticCart, variant, product })
    context.setCart(newCart)
    startTransition(async () => {
      const updatedCart = await addItem({
        productId: variant.productId,
        c_values: JSON.stringify(variant.variationValues),
        c_image: JSON.stringify(product.image),
      })
      if (updatedCart) {
        context.setCart(updatedCart)
      }
    })
  }

  return useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItemAction,
    }),
    [optimisticCart],
  )
}

function addItemOptimistically({
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

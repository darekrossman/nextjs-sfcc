'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  createContext,
  PropsWithChildren,
  use,
  useOptimistic,
  startTransition,
} from 'react'

type ProductSelections = Record<string, string | number | undefined>

type ProductContextType = {
  selections: ProductSelections
  updateSelections: (values: ProductSelections) => void
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({
  defaultColor,
  children,
}: PropsWithChildren<{ defaultColor?: string | undefined }>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialState = defaultColor ? { color: defaultColor } : {}
  const selectionsFromSearchParams: ProductSelections = {}

  for (const [key, value] of searchParams.entries()) {
    selectionsFromSearchParams[key] = value
  }

  const [optimisticState, setOptimisticState] = useOptimistic(
    { ...initialState, ...selectionsFromSearchParams },
    (prevState, newState: ProductSelections) => ({
      ...prevState,
      ...newState,
    }),
  )

  const updateSelections = (values: ProductSelections) => {
    startTransition(() => {
      setOptimisticState(values)

      const newParams = new URLSearchParams()
      Object.entries({ ...optimisticState, ...values }).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value.toString())
        }
      })
      router.replace(`?${newParams.toString()}`, { scroll: false })
    })
  }

  const value = {
    selections: optimisticState,
    updateSelections,
  }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProduct() {
  const context = use(ProductContext)

  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}

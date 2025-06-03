'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  createContext,
  PropsWithChildren,
  use,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from 'react'

type ProductSelections = Record<string, string | number | undefined>

type ProductContextType = {
  selections: ProductSelections
  updateSelections: (values: ProductSelections) => void
  setState: (values: ProductSelections) => void
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({
  children,
  defaultSelections,
}: PropsWithChildren<{ defaultSelections?: ProductSelections }>) {
  const router = useRouter()

  const [state, setState] = useState<ProductSelections>(defaultSelections || {})

  const updateSelections = (values: ProductSelections) => {
    const newState = { ...state, ...values }
    setState(newState)

    startTransition(() => {
      const newParams = new URLSearchParams()
      Object.entries(newState).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value.toString())
        }
      })
      router.replace(`?${newParams.toString()}`, { scroll: false })
    })
  }

  const value = useMemo(() => {
    return {
      selections: state,
      updateSelections,
      setState,
    }
  }, [state])

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProduct() {
  const context = use(ProductContext)

  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}

export function InitProductSelections() {
  const ctx = use(ProductContext)
  const searchParams = useSearchParams()

  const selectionsFromSearchParams: ProductSelections = {}

  for (const [key, value] of searchParams.entries()) {
    selectionsFromSearchParams[key] = value
  }

  useEffect(() => {
    console.log('selectionsFromSearchParams', selectionsFromSearchParams)

    ctx?.setState(selectionsFromSearchParams)
  }, [])

  return null
}

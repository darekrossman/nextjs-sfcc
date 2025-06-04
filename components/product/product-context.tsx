'use client'

import { UnknownSearchParams } from '@/lib/constants'
import { Product } from '@/lib/sfcc/types'
import { useRouter } from 'next/navigation'
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
  personalizedProductPromise: Promise<Product | undefined>
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({
  children,
  personalizedProductPromise,
}: PropsWithChildren<{
  defaultSelections?: ProductSelections
  personalizedProductPromise: Promise<Product | undefined>
}>) {
  const router = useRouter()

  const [state, setState] = useState<ProductSelections>({})

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
      personalizedProductPromise,
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

export function InitProductSelections({
  searchParams,
}: { searchParams: Promise<UnknownSearchParams> }) {
  const ctx = use(ProductContext)
  const params = use(searchParams)

  useEffect(() => {
    ctx?.setState(params)
  }, [])

  return null
}

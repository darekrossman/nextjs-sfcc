'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  createContext,
  useContext,
  PropsWithChildren,
  use,
  useMemo,
  useOptimistic,
  startTransition,
  useState,
  useEffect,
} from 'react'

type ProductSelections = Record<string, string | number | undefined>

type ProductContextType = {
  state: ProductSelections
  setState: (state: ProductSelections) => void
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({
  defaultColor,
  children,
}: PropsWithChildren<{ defaultColor?: string | undefined }>) {
  const [state, setState] = useState(defaultColor ? { color: defaultColor } : {})

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [state],
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProduct() {
  const context = useContext(ProductContext)
  const updateURL = useUpdateURL()

  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }

  const searchParams = useSearchParams()

  const selectionsFromSearchParams: ProductSelections = {}

  for (const [key, value] of searchParams.entries()) {
    selectionsFromSearchParams[key] = value
  }

  const [optimisticState, setOptimisticState] = useOptimistic(
    { ...context.state, ...selectionsFromSearchParams },
    (prevState, newState: ProductSelections) => ({
      ...prevState,
      ...newState,
    }),
  )

  const updateSelections = (values: ProductSelections) => {
    startTransition(() => {
      setOptimisticState(values)
      updateURL(values)

      const selectionsFromSearchParams: ProductSelections = {}

      for (const [key, value] of searchParams.entries()) {
        selectionsFromSearchParams[key] = value
      }

      context.setState(selectionsFromSearchParams)
    })
  }

  const value = useMemo(
    () => ({
      state: optimisticState,
      updateSelections,
    }),
    [optimisticState],
  )

  return value
}

// Updates the url with given state. Defaults to 'replace' so that changing product
// options does not keep adding to the history stack, forcing the user to press back
// sevral times to get back to the PLP or other entry page.
export function useUpdateURL() {
  const router = useRouter()

  return (state: ProductSelections, useReplace = true) => {
    const newParams = new URLSearchParams(window.location.search)
    Object.entries(state).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value.toString())
      } else {
        newParams.delete(key)
      }
    })

    const url = `?${newParams.toString()}`
    const options = { scroll: false }

    if (useReplace) {
      router.replace(url, options)
    } else {
      router.push(url, options)
    }
  }
}

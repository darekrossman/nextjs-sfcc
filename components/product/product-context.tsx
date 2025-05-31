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
  setState: (values: ProductSelections) => void
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
  const context = use(ProductContext)

  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }

  // This is fairly nuanced way of keeping the UI in sync with the search params
  // while also avoiding having to use `useSearchParams` in the Provider, which in
  // turn means we can use Suspense boundaries only around the components that use
  // this hook. However, it presents a unique challenge and solution...
  //
  // The hook uses optimistic state to capture the default selections from context
  // and the search params. This ensures that the correct selections and images are
  // displayed immediately. However, after the initial sync, it stops passing in the
  // search params to the optimistic state. Instead, it just updates the context state
  // immediately when the user makes a selection, and updates optimistic state in
  // a transition to keep things tidy. Without this, components using this hook would
  // not update immediately when the user makes a selection.

  const [didSync, setDidSync] = useState(false)
  const searchParams = useSearchParams()
  const updateURL = useUpdateURL()

  const selectionsFromSearchParams: ProductSelections = {}

  if (!didSync) {
    for (const [key, value] of searchParams.entries()) {
      selectionsFromSearchParams[key] = value
    }
  }

  useEffect(() => {
    setDidSync(true)
    context.setState({ ...context.state, ...selectionsFromSearchParams })
  }, [])

  const [optimisticState, setOptimisticState] = useOptimistic(
    { ...context.state, ...selectionsFromSearchParams },
    (prevState, newState: ProductSelections) => ({
      ...prevState,
      ...newState,
    }),
  )

  const updateSelections = (values: ProductSelections) => {
    context.setState({ ...optimisticState, ...values })
    startTransition(() => {
      setOptimisticState(values)
      updateURL(values)
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

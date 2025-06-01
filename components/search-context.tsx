'use client'

import { createContext, useContext, useTransition } from 'react'

export const SearchContext = createContext({
  isPending: false,
  startTransition: (fn: () => void) => fn(),
})

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <SearchContext.Provider value={{ isPending, startTransition }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchState = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

export const LocaleContext = createContext<{ locale: string; currency: string }>({
  locale: 'en',
  currency: 'USD',
})

export const LocaleProvider = ({
  locale,
  children,
}: PropsWithChildren<{ locale: string }>) => {
  const currency = locale === 'fr' ? 'EUR' : 'USD'
  return (
    <LocaleContext.Provider value={{ locale, currency }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => {
  const locale = useContext(LocaleContext)
  if (!locale) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return locale
}

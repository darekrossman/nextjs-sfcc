'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

const LocaleContext = createContext<{
  locale: string
  currency: string
  dict: Record<string, string>
}>({
  locale: 'en',
  currency: 'USD',
  dict: {},
})

export const LocaleProvider = ({
  locale,
  dict,
  children,
}: PropsWithChildren<{ locale: string; dict: Record<string, string> }>) => {
  const currency = locale === 'fr' ? 'EUR' : 'USD'

  return (
    <LocaleContext.Provider value={{ locale, currency, dict }}>
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

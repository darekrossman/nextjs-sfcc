/**
 * Utility functions for handling internationalized content from Sanity
 */

export type InternationalizedValue = {
  _key: string
  value: string | null
}

/**
 * Get a localized value from an internationalized array
 * @param array - Array of internationalized values
 * @param locale - Preferred locale (defaults to 'en-US')
 * @param fallbackLocale - Fallback locale if preferred is not found (defaults to 'en')
 * @returns The localized string value or undefined
 */
export const getLocalizedValue = (
  array: InternationalizedValue[] | null | undefined,
  locale = 'en-US',
  fallbackLocale = 'en',
): string | undefined => {
  if (!array || !Array.isArray(array)) return undefined

  // Try preferred locale first
  const preferredValue = array.find((item) => item._key === locale)?.value
  if (preferredValue) return preferredValue

  // Try fallback locale
  const fallbackValue = array.find((item) => item._key === fallbackLocale)?.value
  if (fallbackValue) return fallbackValue

  // Return first available value
  return array[0]?.value || undefined
}

/**
 * Get all available locales from an internationalized array
 * @param array - Array of internationalized values
 * @returns Array of available locale keys
 */
export const getAvailableLocales = (
  array: InternationalizedValue[] | null | undefined,
): string[] => {
  if (!array || !Array.isArray(array)) return []
  return array.map((item) => item._key).filter(Boolean)
}

export function formatPrice({
  amount,
  currency = 'USD',
  locale = 'en',
}: {
  amount: number | string
  currency?: string
  locale?: string
}) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(typeof amount === 'number' ? amount : parseFloat(amount))
}

/**
 * Pluralizes a word based on count
 * @param count - The number to check for pluralization
 * @param singular - The singular form of the word
 * @param plural - Optional custom plural form. If not provided, basic English pluralization rules are applied
 * @returns The correctly pluralized word
 */
const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) {
    return singular
  }

  if (plural) {
    return plural
  }

  // Basic English pluralization rules
  const word = singular.toLowerCase()

  // Words ending in 's', 'ss', 'sh', 'ch', 'x', 'z' add 'es'
  if (/[sxz]$/.test(word) || /[sh]$/.test(word) || /ch$/.test(word)) {
    return singular + 'es'
  }

  // Words ending in consonant + 'y' change 'y' to 'ies'
  if (/[bcdfghjklmnpqrstvwxz]y$/.test(word)) {
    return singular.slice(0, -1) + 'ies'
  }

  // Words ending in 'f' or 'fe' change to 'ves'
  if (/f$/.test(word)) {
    return singular.slice(0, -1) + 'ves'
  }
  if (/fe$/.test(word)) {
    return singular.slice(0, -2) + 'ves'
  }

  // Words ending in consonant + 'o' add 'es' (with some exceptions)
  if (/[bcdfghjklmnpqrstvwxz]o$/.test(word)) {
    const exceptions = ['photo', 'piano', 'halo', 'solo', 'auto', 'memo', 'pro', 'bro']
    if (!exceptions.includes(word)) {
      return singular + 'es'
    }
  }

  // Default: just add 's'
  return singular + 's'
}

/**
 * Returns a pluralized phrase with count
 * @param count - The number to display
 * @param singular - The singular form of the word
 * @param plural - Optional custom plural form
 * @returns A string like "1 item" or "5 items"
 */
const pluralizeWithCount = (
  count: number,
  singular: string,
  plural?: string,
): string => {
  return `${count} ${pluralize(count, singular, plural)}`
}

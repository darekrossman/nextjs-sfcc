export const formatPrice = (amount: string, currencyCode: string) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(parseFloat(amount))
}

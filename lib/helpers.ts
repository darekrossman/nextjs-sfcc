export const formatPrice = (amount: string | number, currencyCode: string) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(typeof amount === 'number' ? amount : parseFloat(amount))
}

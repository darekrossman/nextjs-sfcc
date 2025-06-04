'use client'

import { useLocale } from '@/components/locale-context'
import { formatPrice } from '@/lib/helpers'
import { HTMLStyledProps, styled } from '@/styled-system/jsx'

function PriceBase({
  amount = 9999.99,
  minAmount,
  maxAmount,
  currency,
  ...props
}: {
  amount?: number
  minAmount?: number
  maxAmount?: number
  currency?: string
} & HTMLStyledProps<'p'>) {
  const { locale, currency: appCurrency } = useLocale()

  return (
    <styled.p {...props}>
      {formatPrice({ amount, locale, currency: currency || appCurrency })}
    </styled.p>
  )
  // let priceDisplay: string | null = null

  // if (minAmount && maxAmount && minAmount !== maxAmount) {
  //   priceDisplay = `${formatPrice(minAmount, currencyCode)} - ${formatPrice(maxAmount, currencyCode)}`
  // } else if (amount || minAmount || maxAmount) {
  //   priceDisplay = formatPrice(
  //     amount || minAmount || maxAmount || '9999.99',
  //     currencyCode,
  //   )
  // }

  // if (!priceDisplay) {
  //   return null
  // }

  // return (
  //   <p suppressHydrationWarning={true} className={className}>
  //     {prefix ? `${prefix} ` : ''}
  //     {priceDisplay}
  //     <span
  //       className={clsx('ml-1 inline', currencyCodeClassName)}
  //     >{`${currencyCode}`}</span>
  //   </p>
  // )
}

export const Price = styled(PriceBase)

import { FormattedNumber } from '@/lib/react-intl'
import { type HTMLStyledProps, styled } from '@/styled-system/jsx'
import { price } from '@/styled-system/recipes'
import React, { forwardRef } from 'react'

export type Price = {
  value: number
  formatted: string
}

export type DefaultPriceModel = {
  type: 'default'
  currency: string
  model: {
    sales: Price
    list: Price | null
  }
}

export type RangePriceModel = {
  type: 'range'
  currency: string
  model: {
    min: {
      sales: Price
      list: Price | null
    }
    max: {
      sales: Price
      list: Price | null
    }
  }
}

type PriceModel =
  | {
      price: DefaultPriceModel | RangePriceModel
    }
  | {
      price: number
      currency: string
    }

export type PriceProps = PriceModel & HTMLStyledProps<'div'>

const StyledPrice = styled('div', price)

/**
 * Price component for displaying formatted prices
 * Can work with Product Price Model or a number.
 * If the price is a number, component expects currency to be provided.
 * Uses the price recipe from the preset base for styling
 */
export const Price = forwardRef<HTMLDivElement, PriceProps>(
  ({ price, ...props }, ref) => {
    if (typeof price === 'number') {
      if (!('currency' in props)) return null

      const { currency, ...restProps } = props

      return (
        <StyledPrice ref={ref} {...restProps}>
          <FormattedNumber value={price} currency={currency} style="currency" />
        </StyledPrice>
      )
    }

    const { type, model, currency } = price

    if (type === 'range') {
      const { min, max } = model
      const hasSale = min?.sales !== undefined && min?.sales !== min?.list
      const minPrice = min?.sales ?? min?.list
      const maxPrice = max?.sales ?? max?.list

      if (!minPrice || !maxPrice) {
        return null
      }

      return (
        <StyledPrice
          ref={ref}
          variant={hasSale ? 'sale' : 'list'}
          data-test="product-price-range"
          {...props}
        >
          <FormattedNumber value={minPrice.value} currency={currency} style="currency" />
          {'-'}
          <FormattedNumber value={maxPrice.value} currency={currency} style="currency" />
        </StyledPrice>
      )
    }

    if (!model?.sales && !model?.list) {
      return null
    }

    /** Determine if we should show sale price */
    const hasSale =
      model.sales != null &&
      model.list?.value != null &&
      model.sales.value !== model.list.value

    return (
      <StyledPrice
        ref={ref}
        variant={hasSale ? 'sale' : 'list'}
        data-test="product-price"
        {...props}
      >
        {hasSale ? (
          <>
            <span data-test="product-sale-price">
              <FormattedNumber
                value={model.sales?.value}
                currency={currency}
                style="currency"
              />
            </span>{' '}
            <span data-test="product-list-price">
              <FormattedNumber
                value={model.list!.value}
                currency={currency}
                style="currency"
              />
            </span>{' '}
          </>
        ) : (
          <FormattedNumber
            value={model.sales?.value ?? model.list?.value ?? 0}
            currency={currency}
            style="currency"
          />
        )}
      </StyledPrice>
    )
  },
)

Price.displayName = 'Price'

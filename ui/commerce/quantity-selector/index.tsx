'use client'

import { useIntl } from '@/lib/react-intl'
import { type RecipeVariantProps, cx } from '@/styled-system/css'
import { HStack, type HTMLStyledProps, styled } from '@/styled-system/jsx'
import { quantitySelector } from '@/styled-system/recipes'
import { Button } from '@/ui/core/button'
import { Icon } from '@/ui/core/icon'
import React, { useState } from 'react'

export type QuantitySelectorVariants = RecipeVariantProps<typeof quantitySelector>

type QuantitySelectorBaseProps = {
  /** Default quantity value. Should be used for uncontrolled scenarios. */
  defaultValue?: number
  /** Current quantity value. Should be used for controlled scenarios. */
  value?: number
  /** Callback when quantity changes. Should be used for controlled scenarios, when `value` is provided. */
  onValueChange?: (qty: number) => void
  /** Maximum allowed quantity (if not specified, no upper limit) */
  maxQuantity?: number
  /** Minimum allowed quantity (if not specified, no lower limit) */
  minQuantity?: number
  /** Whether the component is disabled */
  disabled?: boolean
  /** Error state */
  error?: boolean
}

export type QuantitySelectorProps = QuantitySelectorBaseProps & Omit<HTMLStyledProps<'div'>, keyof QuantitySelectorBaseProps>

/**
 * QuantitySelector component for incrementing/decrementing quantity values
 */
const QuantitySelectorBase = ({
  value,
  defaultValue,
  onValueChange,
  maxQuantity,
  minQuantity,
  disabled = false,
  error = false,
  className,
  ...props
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState<number>(defaultValue ?? 1)

  const { formatMessage } = useIntl()

  const updateQuantity = (newValue: number) => {
    /** Controlled state */
    if (typeof onValueChange === 'function') {
      onValueChange(newValue)
    } else {
      setQuantity(newValue)
    }
  }

  const decreaseQuantity = () => {
    const state = value != null ? value : quantity

    if (minQuantity === undefined || state > minQuantity) {
      const newValue = state - 1
      updateQuantity(newValue)
    }
  }

  const increaseQuantity = () => {
    const state = value != null ? value : quantity
    if (maxQuantity === undefined || state < maxQuantity) {
      const newValue = state + 1
      updateQuantity(newValue)
    }
  }

  const classes = quantitySelector({
    variant: disabled ? 'disabled' : error ? 'error' : 'default',
  })

  const currentQuantity = value != null ? value : quantity

  return (
    <HStack className={cx(classes.root, className)} tabIndex={disabled ? -1 : 0} data-test="quantity-selector" {...props}>
      <Button
        variant="unstyled"
        aria-label={formatMessage({ defaultMessage: 'Decrease quantity' })}
        onClick={decreaseQuantity}
        disabled={disabled || (minQuantity !== undefined && currentQuantity <= minQuantity)}
        className={classes.button}
        data-test="quantity-decrease"
      >
        <Icon name="Minus" size="md" />
      </Button>

      <div
        className={classes.input}
        aria-label={formatMessage({ defaultMessage: 'Quantity' })}
        aria-valuemin={minQuantity}
        aria-valuemax={maxQuantity}
        aria-valuenow={currentQuantity}
        data-test="quantity-selector-value"
      >
        {currentQuantity ?? formatMessage({ defaultMessage: 'QTY' })}
      </div>

      <Button
        variant="unstyled"
        aria-label={formatMessage({ defaultMessage: 'Increase quantity' })}
        onClick={increaseQuantity}
        disabled={disabled || (maxQuantity !== undefined && currentQuantity >= maxQuantity)}
        className={classes.button}
        data-test="quantity-increase"
      >
        <Icon name="Plus" size="md" />
      </Button>
    </HStack>
  )
}

QuantitySelectorBase.displayName = 'QuantitySelector'

export const QuantitySelector = styled(QuantitySelectorBase)

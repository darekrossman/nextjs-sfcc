'use client'

import { useIntl } from '@/lib/react-intl'
import type { RecipeVariantProps } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'
import { swatch } from '@/styled-system/recipes'
import type { HTMLStyledProps } from '@/styled-system/types'
import Image from 'next/image'
import React, { forwardRef } from 'react'

const StyledButton = styled('button', swatch)

export interface ColorSwatch {
  id: string
  colorValue?: string
  name?: string
  imageUrl?: string
  disabled?: boolean
  interactiveWhenDisabled?: boolean
}

export type SwatchProps = HTMLStyledProps<'button'> &
  RecipeVariantProps<typeof swatch> &
  ColorSwatch & { selected?: boolean }

export const Swatch = forwardRef<HTMLButtonElement, SwatchProps>(
  (
    {
      colorValue,
      imageUrl,
      name,
      selected = false,
      disabled = false,
      size = 'md',
      style,
      interactiveWhenDisabled = true,
      ...props
    },
    ref,
  ) => {
    const { formatMessage } = useIntl()

    return (
      <StyledButton
        data-test="swatch"
        ref={ref}
        position="relative"
        size={size}
        data-selected={selected}
        data-disabled={disabled}
        disabled={!interactiveWhenDisabled ? disabled : false}
        aria-label={formatMessage(
          { defaultMessage: 'Select {name} color', id: 'swatch.select' },
          { name },
        )}
        aria-disabled={disabled}
        style={{
          backgroundColor: colorValue,
          ...style,
        }}
        {...props}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name || colorValue || ''}
            unoptimized
            loading="lazy"
            fill
          />
        )}
      </StyledButton>
    )
  },
)

Swatch.displayName = 'Swatch'

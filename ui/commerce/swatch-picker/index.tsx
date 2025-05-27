'use client'

import type { RecipeVariantProps } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'
import { swatch, swatchPicker } from '@/styled-system/recipes'
import { ColorSwatch } from '@/ui/core/swatch'
import { Swatch } from '@/ui/core/swatch'
import React, { forwardRef, useState } from 'react'

type SwatchVariants = NonNullable<RecipeVariantProps<typeof swatch>>

export type SwatchPickerProps = {
  colors: ColorSwatch[]
  defaultValue?: string | string[]
  value?: string[]
  onValueChange?: (colorIds: string[]) => void
  size?: SwatchVariants['size']
  multiple?: boolean
  interactiveWhenDisabled?: boolean
}

const SwatchGroup = styled('div', swatchPicker)

export const SwatchPicker = forwardRef<HTMLDivElement, SwatchPickerProps>(
  (
    {
      colors,
      defaultValue,
      value,
      onValueChange,
      size = 'md',
      multiple = false,
      interactiveWhenDisabled = true,
      ...props
    },
    ref,
  ) => {
    /** Initialize state based on whether we're in multiple selection mode or not */
    const [selectedColors, setSelectedColors] = useState<string[]>(() => {
      if (!defaultValue) return []

      if (multiple) {
        /** Handle array default value for multiple mode */
        return Array.isArray(defaultValue)
          ? defaultValue.filter((id) => colors.some((c) => c.id === id))
          : [defaultValue].filter((id) => colors.some((c) => c.id === id))
      }

      /** Handle single default value */
      const defaultId = Array.isArray(defaultValue) ? defaultValue[0] : defaultValue
      return defaultId && colors.some((c) => c.id === defaultId) ? [defaultId] : []
    })

    const handleColorSelect = (color: ColorSwatch) => {
      if (!interactiveWhenDisabled && color.disabled) return

      /** Handle uncontrolled component (internal state) */
      if (value === undefined) {
        let newSelectedColors: string[]

        if (multiple) {
          /** Toggle selection in multiple mode */
          newSelectedColors = selectedColors.includes(color.id)
            ? selectedColors.filter((id) => id !== color.id)
            : [...selectedColors, color.id]
        } else {
          /** Replace selection in single mode */
          newSelectedColors = [color.id]
        }

        setSelectedColors(newSelectedColors)

        /** Always call onValueChange with the new selection */
        if (onValueChange) {
          onValueChange(newSelectedColors)
        }

        return
      }

      /** Handle controlled component (external state) */
      if (onValueChange) {
        if (multiple) {
          /** For controlled component in multiple mode */
          const newValue = value.includes(color.id)
            ? value.filter((id) => id !== color.id)
            : [...value, color.id]
          onValueChange(newValue)
        } else {
          /** For single selection mode, return an array with a single item */
          onValueChange([color.id])
        }
      }
    }

    /** Determine current selection based on controlled or uncontrolled state */
    const currentColorIds = value !== undefined ? value : selectedColors

    return (
      <SwatchGroup ref={ref} {...props} data-test="swatch-picker">
        {colors.map((color) => {
          return (
            <Swatch
              key={color.id}
              {...color}
              selected={currentColorIds.includes(color.id)}
              size={size}
              onClick={() => handleColorSelect(color)}
              interactiveWhenDisabled={interactiveWhenDisabled}
            />
          )
        })}
      </SwatchGroup>
    )
  },
)

SwatchPicker.displayName = 'SwatchPicker'

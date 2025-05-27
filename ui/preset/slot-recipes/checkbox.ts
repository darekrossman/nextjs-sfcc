import { defineSlotRecipe } from '@pandacss/dev'

export const checkbox = defineSlotRecipe({
  className: 'checkbox',
  description: 'Styles for the Checkbox component',
  slots: ['root', 'indicator'],
  base: {
    root: {
      h: '4',
      w: '4',
      flexShrink: '0',
      rounded: 'sm',
      border: 'primary',
      cursor: 'pointer',
      focusRingOffsetColor: 'brand',
      borderColor: 'border.strong',

      _focusVisible: {
        outline: '1px solid transparent',
        outlineOffset: '1px',
        focusRingWidth: '1',
        focusRingColor: 'ring',
        focusRingOffsetWidth: '1',
      },

      '&[data-state="checked"]': {
        borderColor: 'brand',
        bg: 'brand',
        color: 'white',
      },

      _disabled: {
        cursor: 'not-allowed',
        borderColor: 'border.disabled',

        '&[data-state="checked"]': {
          bg: 'background.weak',
          color: 'icon.weak',
        },
      },

      '&[aria-invalid="true"]': {
        borderColor: 'errors.border',
        color: 'errors.text',

        '&[data-state="checked"]': {
          bg: 'errors.bg',
        },
        _focusVisible: {
          focusRingOffsetColor: 'errors.border',
          focusRingColor: 'errors.border',
        },
      },
    },
    indicator: {
      display: 'flex',
      h: 'full',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'currentColor',
    },
  },
})

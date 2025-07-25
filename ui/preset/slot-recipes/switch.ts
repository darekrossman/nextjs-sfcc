import { defineSlotRecipe } from '@pandacss/dev'

export const switchRecipe = defineSlotRecipe({
  className: 'switchRecipe',
  description: 'Styles for the Switch component',
  slots: ['root', 'thumb'],
  base: {
    root: {
      display: 'inline-flex',
      h: '24px',
      w: '44px',
      flexShrink: 0,
      cursor: 'pointer',
      alignItems: 'center',
      rounded: 'full',
      border: '1px solid',
      transition: 'colors',

      _focusVisible: {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        focusRingWidth: '2',
        focusRingColor: 'ring',
        focusRingOffsetWidth: '2',
      },

      _disabled: {
        cursor: 'not-allowed',
        opacity: '0.5',
      },

      '&[data-state=checked]': {
        borderColor: 'brand.400',
        bgColor: 'brand.400',
      },

      '&[data-state=unchecked]': {
        borderColor: 'border.strong',
        bgColor: 'background.moderate',
      },
    },
    thumb: {
      pointerEvents: 'none',
      display: 'block',
      h: '5',
      w: '5',
      rounded: 'full',
      bg: 'background.strong',
      shadow: 'lg',
      focusRingWidth: '0',
      transition: 'transform',

      '&[data-state=checked]': {
        translateX: '21px',
        translateY: '0',
        bg: 'white',
      },

      '&[data-state=unchecked]': {
        translateX: '1px',
        translateY: '0',
      },
    },
  },
})

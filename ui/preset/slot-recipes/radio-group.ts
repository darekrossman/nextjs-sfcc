import { defineSlotRecipe } from '@pandacss/dev'

export const radioGroup = defineSlotRecipe({
  className: 'radioGroup',
  description: 'Styles for the RadioGroup component',
  slots: ['root', 'item', 'indicator', 'icon'],
  base: {
    root: {
      display: 'grid',
      gap: '4',
    },
    item: {
      position: 'relative',
      aspectRatio: 'square',
      h: '4',
      w: '4',
      rounded: 'full',
      border: 'base',
      borderColor: 'border.strong',
      color: 'brand',
      cursor: 'pointer',
      focusRingOffsetColor: 'background',

      _focusVisible: {
        outline: '1px solid transparent',
        outlineOffset: '1px',
        focusRingWidth: '1',
        focusRingColor: 'ring',
        focusRingOffsetWidth: '1',
      },

      _disabled: {
        cursor: 'not-allowed',
        opacity: '0.5',
      },

      _focus: {
        borderColor: 'brand',
      },
      _hover: {
        borderColor: 'brand',
      },
      _peerChecked: {
        borderColor: 'brand',
      },
      '&[data-disabled]:hover': {
        borderColor: 'border.disabled',
      },
      "&[data-state='checked']": {
        borderColor: 'brand',
      },
      "&[data-state='checked'][data-disabled]": {
        borderColor: 'border.disabled',
      },
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      h: '2',
      w: '2',
      fill: 'current',
      color: 'current',
    },
  },
})

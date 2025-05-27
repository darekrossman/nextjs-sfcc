import { defineSlotRecipe } from '@pandacss/dev'

export const quantitySelector = defineSlotRecipe({
  className: 'quantitySelector',
  description: 'Styles for the QuantitySelector component',
  slots: ['root', 'input', 'button'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: '1px',
      borderStyle: 'solid',
      rounded: 'md',
      h: '14',
      borderColor: 'transparent',
      transition: 'border-color 0.2s',
      bg: 'input.bg',
      _hover: {
        bg: 'input.bgHover',
      },
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'brand',
        outlineOffset: '2px',
      },
    },
    input: {
      minW: '44px',
      textAlign: 'center',
      textStyle: 'static16',
      cursor: 'default',
    },
    button: {
      h: 'full!',
      w: '14',
      m: '-1px', // keeps component the size of buttons when wrapper has 1px border

      _disabled: {
        color: 'input.text.disabled',
        _hover: {
          cursor: 'not-allowed',
        },
      },
    },
  },
  variants: {
    variant: {
      default: {},
      error: {
        root: {
          border: 'base',
          borderColor: 'errors.border',
          outline: '2px solid token(colors.errors.bg)',
        },
      },
      disabled: {
        root: {
          cursor: 'not-allowed',
          background: 'input.bg.disabled',
          borderColor: 'input.bg.disabled',
          color: 'input.text.disabled',
        },
        input: {
          pointerEvents: 'none',
          color: 'input.text.disabled',
        },
        button: {
          pointerEvents: 'none',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

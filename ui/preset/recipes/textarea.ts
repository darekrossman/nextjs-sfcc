import { defineRecipe } from '@pandacss/dev'

export const textarea = defineRecipe({
  className: 'textarea',
  description: 'Styles for the Textarea component',
  base: {
    display: 'flex',
    minH: '80px',
    w: 'full',
    rounded: 'md',
    bg: 'input.bg',
    px: '3',
    py: '2',
    textStyle: 'md',
    focusRingOffsetColor: 'background',
    transition: 'colors',
    transitionDuration: 'fast',

    _hover: {
      bg: 'input.bgHover',
    },

    _placeholder: {
      color: 'text.weak',
    },

    _focus: {
      outline: '2px solid',
      outlineColor: 'brand',
      outlineOffset: '2px',
      bg: 'input.bgFocus',
    },

    _disabled: {
      cursor: 'not-allowed',
      bg: 'input.bg.disabled',
      borderColor: 'input.bg.disabled',
      color: 'input.text.disabled',
      _placeholder: {
        color: 'input.text.disabled',
      },
    },

    '&[aria-invalid="true"]': {
      border: 'base',
      borderColor: 'errors.border',
      outline: '2px solid token(colors.errors.bg)',
    },
  },
})

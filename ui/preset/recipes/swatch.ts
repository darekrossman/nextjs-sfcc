import { defineRecipe } from '@pandacss/dev'

export const swatch = defineRecipe({
  className: 'swatch',
  description: 'Styles for the Swatch component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    w: '5',
    h: '5',
    rounded: 'sm',
    cursor: 'pointer',
    transition: 'all',
    _hover: {
      '&:not([data-selected=true]):not([disabled])': {
        // transform: 'scale(1.1)'
      },
    },
    '&:has(img)': {
      backgroundColor: 'gray.100',
    },
    '& img': {
      w: 'full',
      h: 'full',
      rounded: 'inherit',
      objectFit: 'cover',
    },
    '&[data-selected=true]': {
      _before: {
        content: '""',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        border: '1px solid',
        borderColor: 'gray.900/90',
        rounded: '5px',
        pointerEvents: 'none',
      },
    },
    '&#White[data-selected=false]': {
      boxShadow: 'inset 0 0 0 1px token(colors.brand.100)',
    },
    '&[data-disabled=true]': {
      _hover: {
        transform: 'none',
      },
      _after: {
        content: '""',
        position: 'absolute',
        top: 'auto',
        left: '50%',
        width: '1px',
        height: '135%',
        backgroundColor: 'white',
        transform: 'rotate(45deg)',
        transformOrigin: 'center',
        pointerEvents: 'none',
      },
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  variants: {
    size: {
      sm: {
        w: '4',
        h: '4',
      },
      md: {
        w: '5',
        h: '5',
      },
      lg: {
        w: '6',
        h: '6',
      },
      xl: {
        w: '8',
        h: '8',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  jsx: ['Swatch', 'SwatchGroup', 'SwatchPicker'],
})

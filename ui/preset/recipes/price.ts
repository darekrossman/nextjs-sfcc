import { defineRecipe } from '@pandacss/dev'

export const price = defineRecipe({
  className: 'price',
  description: 'Styles for the price component',
  base: {
    textStyle: 'static16',
    fontWeight: 'medium',
  },
  variants: {
    variant: {
      list: {
        color: 'text.strong',
      },
      sale: {
        '& > span:first-of-type': {
          color: 'sale',
        },
        '& > span:last-of-type': {
          fontSize: 'xs',
          textDecoration: 'line-through',
          color: 'text.weak',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'list',
  },
  jsx: ['Price', 'PriceBase', 'ProductTilePrice', 'StyledPrice'],
})

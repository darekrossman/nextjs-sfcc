import { defineRecipe } from '@pandacss/dev'

export const starRating = defineRecipe({
  className: 'star-rating-list',
  description: 'Styles for the StarRatingList component',
  base: {
    w: 'full',
    display: 'flex',
    alignItems: 'center',
    gap: '1',
    fontSize: 'sm',
    lineHeight: 'base',
    fontWeight: 'medium',
    color: 'brand',
    containerType: 'inline-size',

    '& > div > div': {
      '& svg:not(:first-of-type)': {
        display: { base: 'none', '@/3xs': 'block' },
      },
    },
  },
  variants: {
    size: {
      sm: {
        '& svg': {
          w: '4',
          h: '4',
        },
      },
      lg: {
        fontSize: 'md',
        '& svg': {
          w: '6',
          h: '6',
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

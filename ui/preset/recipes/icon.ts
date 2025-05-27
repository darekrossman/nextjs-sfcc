import { defineRecipe } from '@pandacss/dev'

export const icon = defineRecipe({
  className: 'icon',
  description: 'Styles for the icons',
  base: {
    display: 'block',
    flexShrink: 0,
  },
  variants: {
    size: {
      xxl: {
        h: '15',
        w: '15',
      },
      xl: {
        h: '10',
        w: '10',
      },
      lg: {
        h: '8',
        w: '8',
      },
      md: {
        h: '6',
        w: '6',
      },
      sm: {
        h: '5',
        w: '5',
      },
      xs: {
        h: '4',
        w: '4',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

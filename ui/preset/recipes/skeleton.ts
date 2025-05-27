import { defineRecipe } from '@pandacss/dev'

export const skeleton = defineRecipe({
  className: 'skeleton',
  description: 'Styles for the Skeleton component',
  base: {
    rounded: 'md',
    bg: 'muted',
  },
})

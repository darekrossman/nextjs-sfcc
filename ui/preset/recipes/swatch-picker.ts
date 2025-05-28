import { defineRecipe } from '@pandacss/dev'

export const swatchPicker = defineRecipe({
  className: 'swatchGroup',
  description:
    'The styles for the swatch group component that displays multiple swatches in a row',
  base: {
    display: 'flex',
    gap: '1.5',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})

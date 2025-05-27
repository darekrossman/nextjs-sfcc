import { defineRecipe } from '@pandacss/dev'

export const text = defineRecipe({
  className: 'text',
  variants: {
    variant: {
      lead: { textStyle: 'headingLead' },
      heading1: { textStyle: 'heading1' },
      heading2: { textStyle: 'heading2' },
      heading3: { textStyle: 'heading3' },
      heading4: { textStyle: 'heading4' },
      heading5: { textStyle: 'heading5' },
      heading6: { textStyle: 'heading6' },
      static18: { textStyle: 'static18' },
      static16: { textStyle: 'static16' },
      static14: { textStyle: 'static14' },
      static12: { textStyle: 'static12' },
    },
  },
  defaultVariants: {
    variant: 'static16',
  },
})

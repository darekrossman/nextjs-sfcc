import { defineTokens } from '@pandacss/dev'

export const gradients = defineTokens.gradients({
  Top: {
    value: 'linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%)',
  },
  Left: {
    value:
      'linear-gradient(270deg, rgba(0, 0, 0, 0.00) -2.31%, rgba(0, 0, 0, 0.50) 100%)',
  },
  Bottom: {
    value:
      'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.50) 100%)',
  },
  Center: {
    value:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 47.5%, rgba(0, 0, 0, 0.00) 100%)',
  },
  Right: {
    value:
      'linear-gradient(270deg, rgba(0, 0, 0, 0.50) -2.31%, rgba(0, 0, 0, 0.00) 100%)',
  },
  CalendarGradient: {
    value: 'linear-gradient(90deg, #004E96 0%, #FFF 100%)',
  },
})

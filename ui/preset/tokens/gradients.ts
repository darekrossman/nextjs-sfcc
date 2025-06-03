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
  PeachTree: {
    value:
      'linear-gradient(160deg, rgb(152, 158, 203) 0%, rgb(141, 166, 194) 25%, rgb(167, 172, 180) 50%, rgb(210, 175, 163) 75%, rgb(238, 174, 147) 100%)',
  },
  PeachTreeBorder: {
    value:
      'linear-gradient(160deg, rgba(152, 158, 203, 0.5) 0%, rgba(141, 166, 194, 0.5) 25%, rgba(167, 172, 180, 0.5) 50%, rgba(210, 175, 163, 0.5) 75%, rgba(238, 174, 147, 0.5) 100%) 1',
  },
})

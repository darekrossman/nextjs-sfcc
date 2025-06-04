import { defineTokens } from '@pandacss/dev'

export const zIndex = defineTokens.zIndex({
  hide: { value: -1 },
  base: { value: 0 },
  docked: { value: 10 },
  grid: { value: 20 },
  miniCartClosed: { value: 999 },
  sheet: { value: 1000 },
  sticky: { value: 1100 },
  banner: { value: 1200 },
  overlay: { value: 1300 },
  modal: { value: 1400 },
  popover: { value: 1500 },
  miniCartOpen: { value: 1501 },
  skipLink: { value: 1600 },
  toast: { value: 1700 },
  tooltip: { value: 1800 },

  miniCartContent: { value: 2000 },
  miniCartOpenButton: { value: 2001 },
  miniCartCloseButton: { value: 2002 },
  navSheetOverlay: { value: 2009 },
  navSheetOpen: { value: 2010 },
  navSheetOpenHeader: { value: 2011 },
})

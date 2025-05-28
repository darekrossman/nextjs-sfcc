import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  html: {
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    WebkitTextSizeAdjust: '100%',
    overscrollBehavior: 'none',
  },
  body: {
    fontFamily: 'sans',
    overscrollBehavior: 'none',
  },
})

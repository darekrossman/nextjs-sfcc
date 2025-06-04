import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  html: {
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    WebkitTextSizeAdjust: '100%',
    bg: 'neutral.900',
    // overscrollBehavior: 'none',
  },
  body: {
    fontFamily: 'sans',
    bg: 'stone.300',
    // overscrollBehavior: 'none',
  },

  '*:not(#sanity *)': {
    textBoxEdge: 'cap alphabetic',
    textBoxTrim: 'trim-both',
    textWrap: 'balance',
  },
  button: {
    cursor: 'pointer',
  },
})

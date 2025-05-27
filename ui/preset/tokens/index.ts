import { defineTokens } from '@pandacss/dev'
import { colors } from './colors'
import { fonts } from './fonts'
import { gradients } from './gradients'
import { lineHeights } from './line-heights'
import { radii } from './radii'
import { zIndex } from './z-index'

export const tokens = defineTokens({
  colors,
  fonts,
  gradients,
  lineHeights,
  radii,
  zIndex,
})

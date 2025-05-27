import pandaPreset from '@pandacss/preset-panda'
import type { Config } from '@pandacss/types'
import { breakpoints } from './breakpoints'
import { conditions } from './conditions'
import { containerSizes } from './container-sizes'
import { globalCss } from './global-css'
import { keyframes } from './keyframes'
import { layerStyles } from './layer-styles'
import { patterns } from './patterns'
import { recipes } from './recipes'
import { semanticTokens } from './semantic-tokens'
import { slotRecipes } from './slot-recipes'
import { textStyles } from './text-styles'
import { tokens } from './tokens'
import { utilities } from './utilities'

const defineConfig = <T extends Config>(config: T) => config

export const basePreset = defineConfig({
  name: 'base-preset',
  presets: [pandaPreset],
  globalCss,
  conditions,
  utilities,
  patterns,
  theme: {
    extend: {
      tokens,
      semanticTokens,
      breakpoints,
      textStyles,
      keyframes,
      recipes,
      slotRecipes,
      layerStyles,
      containerSizes,
    },
  },
})

export default basePreset

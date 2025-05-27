import type { Config } from '@pandacss/types'

export const conditions: Config['conditions'] = {
  extend: {
    dark: '[data-color-mode=dark] &',

    // Enable hover styles on devices that support hover and pointer fine
    hover: ['@media (hover: hover) and (pointer: fine)', '&:hover'],
  },
}

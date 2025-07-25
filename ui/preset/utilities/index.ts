import type { Config } from '@pandacss/types'
import { animate } from './animate'
import { backdropFilter } from './backdrop-filter'
import { backgroundAlpha } from './background-alpha'
import { borderColorAlpha } from './border-color-alpha'
import { focusRing } from './focus-ring'
import { gradientBorder } from './gradient-border'
import { space } from './space'
import { textAlpha } from './text-alpha'
import { transform } from './transform'
import { typography } from './typography'

export const utilities: Config['utilities'] = {
  extend: {
    ...animate,
    ...backdropFilter,
    ...backgroundAlpha,
    ...borderColorAlpha,
    ...focusRing,
    ...gradientBorder,
    ...space,
    ...transform,
    ...textAlpha,
    ...typography,
  },
}

import type { UtilityConfig } from '@pandacss/types'

export const gradientBorder: UtilityConfig = {
  borderGradient: {
    className: 'border_gradient',
    values: 'gradients',
    transform: (value: string) => ({
      borderColor: 'transparent',
      borderImage: value,
    }),
  },
}

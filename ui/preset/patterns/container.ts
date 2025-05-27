import { PatternConfig, definePattern } from '@pandacss/dev'

export const container = definePattern({
  defaultValues: {
    maxWidth: '8xl',
    paddingX: { base: '5', md: '8' },
  },
  properties: {
    overrideWidthDesktop: { type: 'enum', value: ['100%', '100vw', '80%', '60%'] },
    overrideWidthMobile: { type: 'enum', value: ['100%', '100vw', '80%', '60%'] },
  },
  transform: ({ overrideWidthDesktop, overrideWidthMobile, ...props }) => {
    return {
      ...props,
      mx: 'auto',
      w: 'full',
      maxWidth: { base: overrideWidthMobile ?? '8xl', md: overrideWidthDesktop ?? '8xl' },
      paddingX: { base: '5', md: '8' },
    }
  },
})

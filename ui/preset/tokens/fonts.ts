import { defineTokens } from '@pandacss/dev'

export const fonts = defineTokens.fonts({
  sans: {
    value: [
      'var(--font-geist-sans)',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ]
      // Panda merges array when extending theme, so we need to join it to convert it to a string
      .join(', '),
  },
  mono: {
    value: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
  },
  pixel: {
    value: 'var(--fonts-pixel)',
  },
  major: {
    value: 'var(--fonts-major-mono)',
  },
})

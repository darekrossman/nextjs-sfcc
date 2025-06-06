import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  presets: ['./ui/preset'],

  // Where to look for your css declarations
  include: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './ui/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      containerSizes: {
        xs: '100px',
        sm: '200px',
        md: '600px',
      },
    },
  },

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
})

import { defineSlotRecipe } from '@pandacss/dev'

export const tooltip = defineSlotRecipe({
  className: 'tooltip',
  description: 'Styles for the Tooltip component',
  slots: ['root', 'trigger', 'content', 'arrow'],
  base: {
    content: {
      zIndex: 50,
      maxW: 'xs',
      rounded: 'md',
      px: '3',
      py: '1.5',
      textStyle: 'sm',
      bg: 'background.black',
      color: 'text.white',
      border: 'none',
      shadow: 'none',
      animateIn: true,
      fadeIn: 0,
      zoomIn: 95,

      '&[data-state=closed]': {
        animateOut: true,
        fadeOut: 0,
        zoomOut: 95,
      },

      '&[data-side=top]': {
        slideInFromBottom: '2',
      },

      '&[data-side=bottom]': {
        slideInFromTop: '2',
      },

      '&[data-side=left]': {
        slideInFromRight: '2',
      },

      '&[data-side=right]': {
        slideInFromLeft: '2',
      },
    },
    trigger: {
      cursor: 'pointer',
    },
  },
  variants: {
    variant: {
      light: {
        content: {
          bg: 'background.weak',
          color: 'black',
        },
        arrow: {
          fill: 'background.weak',
        },
      },
      dark: {},
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
})

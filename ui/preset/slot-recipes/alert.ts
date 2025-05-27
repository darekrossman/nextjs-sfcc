import { defineSlotRecipe } from '@pandacss/dev'

export const alert = defineSlotRecipe({
  className: 'alert',
  description: 'Styles for the Alert component',
  slots: ['root', 'title', 'description'],
  base: {
    root: {
      display: 'flex',
      position: 'relative',
      gap: '2',
      rounded: 'lg',
      border: 'base',
      p: '3',
    },
    title: {
      textStyle: 'static16',
      translateY: '1px',
    },
    description: {
      textStyle: 'static14',
    },
  },
  variants: {
    level: {
      error: {
        root: {
          layerStyle: 'error',
        },
      },
      warning: {
        root: {
          layerStyle: 'warning',
        },
      },
      info: {
        root: {
          layerStyle: 'info',
        },
      },
      success: {
        root: {
          layerStyle: 'success',
        },
      },
      neutral: {
        root: {
          layerStyle: 'neutral',
        },
      },
    },
    variant: {
      alert: {},
      callout: {
        root: {
          justifyContent: 'center',
          border: 'none',
        },
        title: {
          textStyle: 'static12',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        description: {
          textStyle: 'static12',
          textAlign: 'center',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'alert',
    level: 'success',
  },
})

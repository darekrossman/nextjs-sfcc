import { defineRecipe } from '@pandacss/dev'

export const toastViewport = defineRecipe({
  className: 'toastViewport',
  description: 'Styles for the ToastViewport component',
  base: {
    position: 'fixed',
    top: '0',
    zIndex: 'toast',
    display: 'flex',
    maxH: 'screen',
    w: 'full',
    flexDirection: 'column-reverse',
    p: '4',
    gap: '4',

    sm: {
      bottom: '0',
      left: '50%',
      top: 'auto',
      transform: 'translateX(-50%)',
      flexDirection: 'column',
    },

    md: {
      maxW: '420px',
    },
  },
})

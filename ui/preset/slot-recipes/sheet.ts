import { defineSlotRecipe } from '@pandacss/dev'

export const sheet = defineSlotRecipe({
  className: 'sheet',
  description: 'Styles for the Sheet component',
  slots: [
    'root',
    'trigger',
    'close',
    'portal',
    'overlay',
    'header',
    'body',
    'footer',
    'title',
    'description',
    'content',
    'contentClose',
  ],
  base: {
    overlay: {
      position: 'fixed',
      inset: '0',
      zIndex: 'overlay',
      backgroundColor: 'black/50',
      backdropBlur: 'sm',

      '&[data-state=open]': {
        animateIn: true,
        fadeIn: 0,
      },

      '&[data-state=closed]': {
        animateOut: true,
        fadeOut: 0,
      },
    },
    content: {
      position: 'fixed',
      zIndex: '50',
      display: 'flex',
      flexDirection: 'column',
      bg: 'background',
      shadow: 'lg',
      transition: 'common',
      transitionTimingFunction: 'ease-in-out',

      '&[data-state=open]': {
        animateIn: true,
        animationDuration: '300ms',
      },

      '&[data-state=closed]': {
        animateOut: true,
        animationDuration: '300ms',
      },
    },
    close: {
      colorPalette: 'button.grayscale',
      mr: '-2.5',
    },
    header: {
      display: 'flex',
      h: '16',
      justifyContent: 'space-between',
      alignItems: 'center',
      px: '4',
      borderBottom: 'base',
    },
    body: {
      flex: '1',
    },
    footer: {
      display: 'flex',
      flexDirection: 'column-reverse',
      sm: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        spaceX: '2',
      },
    },
    title: {
      textStyle: 'lg',
      fontWeight: 'semibold',
      color: 'foreground',
    },
    description: {
      textStyle: 'sm',
      color: 'muted.foreground',
    },
  },
  variants: {
    side: {
      top: {
        content: {
          insetX: '0',
          top: '0',

          '&[data-state=open]': {
            slideInFromTop: '100%',
          },

          '&[data-state=closed]': {
            slideOutToTop: '100%',
          },
        },
      },
      bottom: {
        content: {
          insetX: '0',
          bottom: '0',

          '&[data-state=open]': {
            slideInFromBottom: '100%',
          },

          '&[data-state=closed]': {
            slideOutToBottom: '100%',
          },
        },
      },
      left: {
        content: {
          insetY: '0',
          left: '0',
          h: 'full',
          w: '3/4',
          overflowY: 'auto',

          sm: {
            maxW: 'sm',
          },

          '&[data-state=open]': {
            slideInFromLeft: '100%',
          },

          '&[data-state=closed]': {
            slideOutToLeft: '100%',
          },
        },
      },
      right: {
        content: {
          insetY: '0',
          right: '0',
          h: 'full',
          w: '3/4',
          overflowY: 'auto',

          sm: {
            maxW: 'sm',
          },

          '&[data-state=open]': {
            slideInFromRight: '100%',
          },

          '&[data-state=closed]': {
            slideOutToRight: '100%',
          },
        },
      },
    },
  },
  defaultVariants: {
    side: 'right',
  },
})

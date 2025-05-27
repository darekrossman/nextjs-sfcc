import { defineSlotRecipe } from '@pandacss/dev'

export const dialog = defineSlotRecipe({
  className: 'dialog',
  description: 'Styles for the Dialog component',
  slots: [
    'root',
    'trigger',
    'portal',
    'overlay',
    'close',
    'content',
    'header',
    'footer',
    'title',
    'description',
  ],
  base: {
    overlay: {
      position: 'fixed',
      inset: '0',
      zIndex: 'modal',
      bg: 'background.overlay',
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
    close: {
      position: 'absolute',
      right: '3',
      top: '3',
    },
    content: {
      position: 'fixed',
      bottom: '0',
      minHeight: 'auto',
      maxWidth: {
        base: 'full',
        sm: 'xl',
      },
      translateX: '0',
      translateY: '0',
      display: 'flex',
      flexDirection: 'column',
      w: 'full',
      p: '6',
      gap: '6',

      transitionDuration: 'normal',
      zIndex: 'modal',
      bg: 'background.layout',

      '&[data-state=open]': {
        animateIn: true,
        fadeIn: 0,
        zoomIn: 95,
        slideInFromTop: '48%',
        slideInFromLeft: '0',
        slideInFromBottom: '50%',
      },

      '&[data-state=closed]': {
        animateOut: true,
        fadeOut: 0,
        zoomOut: 95,
        slideOutToTop: '48%',
        slideOutToLeft: '0',
        slideOutToBottom: '50%',
      },

      borderRadius: {
        base: 'token(radii.2xl) token(radii.2xl) 0 0',
        sm: '2xl',
      },

      sm: {
        left: '50%',
        top: '50%',
        bottom: 'auto',
        minHeight: 'auto',
        translateX: '-50%',
        translateY: '-50%',

        '&[data-state=open]': {
          slideInFromLeft: '50%',
          slideInFromTop: '48%',
        },

        '&[data-state=closed]': {
          slideOutToLeft: '50%',
          slideOutToTop: '48%',
        },
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      spaceY: '1.5',
      textAlign: 'center',

      sm: {
        textAlign: 'left',
      },
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
      fontSize: '2xl',
      fontWeight: 'medium',
      leading: 'none',
      tracking: 'tight',
      pr: '16',
    },
    description: {
      textStyle: 'sm',
      color: 'muted.foreground',
    },
  },
})

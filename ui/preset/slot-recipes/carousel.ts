import { defineSlotRecipe } from '@pandacss/dev'

export const carousel = defineSlotRecipe({
  className: 'carousel',
  slots: ['root', 'viewport', 'content', 'navigation', 'slide', 'pipPagination'],
  base: {
    root: {
      width: 'full',
      '--carousel-item-gap': { base: '8px', lg: '8px' },
    },
    viewport: {
      overflow: 'hidden',
    },
    content: {
      touchAction: 'pan-y pinch-zoom',
      display: 'flex',
    },
    navigation: {
      display: { base: 'none', sm: 'block' },
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '10',
      height: '10',
      padding: '0',
      border: '1px solid',
      borderColor: 'border.borderWeak',
      bg: 'white',
      transition: 'border-color 0.2s ease, background-color 0.2s ease',
      _hover: {
        borderColor: 'black',
        bgColor: 'transparent',
      },
      '& > span': {
        position: 'absolute',
        srOnly: true,
      },
      '&[data-inside=true]': {
        border: 'none',
        _hover: {
          bgColor: 'brandScale.200',
        },
      },
      '&[data-prev]': {
        left: {
          base: 'var(--button-position-base)',
          xl: 'var(--button-position-xl)',
        },
      },
      '&[data-next]': {
        right: {
          base: 'var(--button-position-base)',
          xl: 'var(--button-position-xl)',
        },
      },
    },
    pipPagination: {
      position: 'relative',
      mt: '6',
    },
    slide: {
      minWidth: '0',
      transform: 'translate3d(0, 0, 0)',
      flex: '0 0 100%',
      // pl: 'var(--carousel-item-gap)',
    },
  },
})

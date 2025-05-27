import { defineSlotRecipe } from '@pandacss/dev'

export const navigationMenu = defineSlotRecipe({
  className: 'navigationMenu',
  description: 'Styles for the NavigationMenu component',
  slots: [
    'root',
    'list',
    'item',
    'trigger',
    'content',
    'link',
    'viewportWrapper',
    'viewport',
    'indicator',
  ],
  base: {
    root: {
      position: 'relative',
      w: 'full',
      zIndex: 'modal',
      bg: 'background.weak',
    },
    list: {
      display: 'flex',
      w: 'full',
      h: 'full',
      flex: '1',
      listStyleType: 'none',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    item: {
      h: 'full',

      '& > [data-radix-collection-item]': {
        position: 'relative',
        display: 'inline-flex',
        h: '12',
        w: 'max-content',
        alignItems: 'center',
        justifyContent: 'center',
        px: '2',
        textStyle: 'static16',
        fontWeight: 'semibold',
        transition: 'colors',
        cursor: 'pointer',

        _focusVisible: {
          bg: 'input.bg',
          outline: '2px solid',
          outlineColor: 'brand',
        },

        _disabled: {
          pointerEvents: 'none',
          opacity: '50',
        },

        _after: {
          content: '""',
          position: 'absolute',
          bottom: '0px',
          left: '2',
          right: '2',
          h: '3px',
          bg: 'black',
          opacity: 0,
          transition: 'all',
          transitionDuration: 'fast',
          pointerEvents: 'none',
        },

        '&[data-state=open]': {
          _after: {
            opacity: 1,
          },
        },

        '&.navigationMenu__link': {
          _hover: {
            _after: {
              transitionDelay: 200,
              opacity: 1,
            },
          },
        },
      },
    },
    trigger: {},
    content: {
      position: 'relative',
      w: 'full',
      top: 0,
      left: 0,
      zIndex: 1,
      bg: 'white',
      borderTop: 'base',

      '&[data-motion^=from-] ': {
        position: 'absolute',
        animateIn: true,
        fadeIn: 0,
      },

      '&[data-motion^=to-] ': {
        position: 'absolute',
        animateOut: true,
        fadeOut: 0,
      },
      '& li': {
        _first: { mt: '0' },
      },
      '& li:has([data-category="menu-list"])': {
        mt: '7',
        '& + li:not(:has([data-category="menu-list"]))': {
          mt: '7',
        },
      },
    },
    viewportWrapper: {
      position: 'absolute',
      left: '0',
      top: '100%',
      display: 'flex',
      justifyContent: 'center',
      /** This causing a horizontal scrollbar to appear on the page, applying maxW fixes it */
      w: '100vw',
      maxW: 'full',
    },
    viewport: {
      transformOrigin: 'top center',
      position: 'relative',
      h: 'var(--radix-navigation-menu-viewport-height)',
      w: '100vw',
      overflow: 'hidden',
      bg: 'popover',
      color: 'popover.foreground',
      shadow: 'xs',
      transition: 'all 120ms ease-out',

      '&[data-state=open]': {
        animateIn: true,
        fadeIn: 0,
      },

      '&[data-state=closed]': {
        animateOut: true,
        fadeOut: 0,
      },
    },
    indicator: {
      top: '100%',
      zIndex: '1',
      display: 'flex',
      h: '1.5',
      alignItems: 'flex-end',
      justifyContent: 'center',
      overflow: 'hidden',

      '&[data-state=visible]': {
        animateIn: true,
        fadeIn: 0,
      },

      '&[data-state=hidden]': {
        animateOut: true,
        fadeOut: 0,
      },

      '& > div': {
        position: 'relative',
        top: '60%',
        h: '2',
        w: '2',
        transform: 'rotate(45deg)',
        roundedTopLeft: 'sm',
        bg: 'border',
        shadow: 'md',
      },
    },
  },
  jsx: ['NavigationMenu', 'NavRootForPositioning'],
})

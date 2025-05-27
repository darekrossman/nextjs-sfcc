import { defineSlotRecipe } from '@pandacss/dev'
import { button } from '../recipes/button'

export const select = defineSlotRecipe({
  className: 'select',
  description: 'Styles for the Select component',
  slots: [
    'root',
    'group',
    'value',
    'trigger',
    'viewport',
    'content',
    'label',
    'item',
    'itemIndicator',
    'separator',
  ],
  base: {
    trigger: {
      ...button.base,
      ...button.variants?.variant.secondary,
      ...button.variants?.size.md,
      justifyContent: 'space-between',
      px: '4',
      textAlign: 'left',
      minWidth: 0,
      '& > div': {
        flex: '1',
        minWidth: 0,
        '& > span': {
          display: 'block',
          maxWidth: '100%',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
      },
      '& > svg': {
        mr: '-2',
        w: '5',
        h: '5',
        color: 'input.inputBorderHover',
      },
    },
    viewport: {
      p: '1',

      '&[data-position=popper]': {
        h: 'var(--radix-select-trigger-height)',
        w: 'full',
        minW: 'var(--radix-select-trigger-width)',
      },
    },
    content: {
      position: 'relative',
      zIndex: 'tooltip',
      minW: '8rem',
      maxH: 'var(--radix-select-content-available-height)',
      overflowY: 'auto',
      overflowX: 'hidden',
      rounded: 'lg',
      border: 'base',
      bg: 'white',
      color: 'colors.primary',
      shadow: 'lg',

      '&[data-state=open]': {
        animateIn: true,
        fadeIn: 0,
        zoomIn: 95,
      },

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

      '&[data-position=popper]': {
        '&[data-side=top]': {
          translateY: '-1',
        },

        '&[data-side=bottom]': {
          translateY: '1',
        },

        '&[data-side=left]': {
          translateX: '-1',
        },

        '&[data-side=right]': {
          translateX: '1',
        },
      },
    },
    label: {
      py: '1.5',
      pl: '8',
      pr: '2',
      textStyle: 'sm',
      fontWeight: 'semibold',
    },
    item: {
      position: 'relative',
      display: 'flex',
      cursor: 'pointer',
      userSelect: 'none',
      alignItems: 'center',
      rounded: 'md',
      py: '2',
      pl: '4',
      pr: '4',
      textStyle: 'base',
      outline: '2px solid transparent',

      _focus: {
        bg: 'gray.50',
        color: 'gray.900',
      },

      _hover: {
        bg: 'background.backgroundWeak',
      },

      '&[data-disabled]': {
        pointerEvents: 'none',
        opacity: '0.5',
      },
    },
    itemIndicator: {
      position: 'absolute',
      left: '2',
      display: 'none',
      h: '3.5',
      w: '3.5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      mx: '-1',
      my: '1',
      h: '1px',
      bg: 'muted',
    },
  },
  variants: {
    showIndicator: {
      true: {
        itemIndicator: {
          display: 'flex',
        },
      },
    },
  },
})

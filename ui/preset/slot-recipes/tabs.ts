import { defineSlotRecipe } from '@pandacss/dev'

export const tabs = defineSlotRecipe({
  className: 'tabs',
  description: 'Styles for the Tabs component',
  slots: ['root', 'list', 'trigger', 'content'],
  base: {
    list: {
      display: 'flex',
      w: 'full',
      h: '10',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'muted.foreground',
    },
    trigger: {
      display: 'inline-flex',
      w: 'full',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      textStyle: 'sm',
      fontWeight: 'medium',
      transition: 'all',
      cursor: 'pointer',
      focusRingOffsetColor: 'background',

      _focusVisible: {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        focusRingWidth: '2',
        focusRingColor: 'ring',
        focusRingOffsetWidth: '2',
      },

      _disabled: {
        pointerEvents: 'none',
        opacity: '50%',
      },
    },
    content: {
      mt: '2',
      focusRingOffsetColor: 'background',

      _focusVisible: {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        focusRingWidth: '2',
        focusRingColor: 'ring',
        focusRingOffsetWidth: '2',
      },
    },
  },
  variants: {
    variant: {
      default: {
        list: {
          gap: '6',
          borderBottom: 'base',
        },
        trigger: {
          h: '10',
          w: 'auto',
          padding: '0',
          borderBlock: '2px solid transparent',
          '&[data-state=active]': {
            color: 'brand',
            borderBottomColor: 'brand',
          },
          _hover: {
            '&:not([data-state=active])': {
              borderBottomColor: 'border.strong',
            },
          },
        },
      },
      custom: {},
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

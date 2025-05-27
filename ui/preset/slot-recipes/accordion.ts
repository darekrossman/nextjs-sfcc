import { defineSlotRecipe } from '@pandacss/dev'

export const accordion = defineSlotRecipe({
  className: 'accordion',
  description: 'Styles for the Accordion component',
  slots: ['root', 'item', 'header', 'trigger', 'content'],
  base: {
    item: {
      borderBottom: 'base',
    },
    header: {
      display: 'flex',
    },
    trigger: {
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: '5',
      fontWeight: 'medium',
      transition: 'all',
      cursor: 'pointer',

      '& > svg': {
        h: '4',
        w: '4',
        flexShrink: '0',
        transition: 'transform',
        transitionDuration: 'normal',
      },

      '&[data-state=open] > svg': {
        transform: 'rotate(180deg)',
      },
    },
    content: {},
  },
  variants: {
    variant: {
      default: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          width: 'full',
        },
        item: {
          borderBottom: 'base',
          '&:first-child': {
            borderTop: 'base',
          },
        },
      },
      filled: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          gap: '3',
        },
        item: {
          border: 'none',
          bg: 'gray.50',
          rounded: 'md',
        },
        trigger: {
          p: '5',
        },
        content: {
          '& > div': { px: '5' },
        },
      },
      grouped: {
        root: {
          border: 'base',
          rounded: 'md',
        },
        item: {
          borderBottom: 'base',
          '&:last-child': {
            borderBottom: 'none',
          },
        },
        trigger: {
          px: '4',
        },
        content: {
          '& > div': { px: '4' },
        },
      },
    },
    animated: {
      default: {
        content: {
          overflow: 'hidden',
          transition: 'all',

          '& > div': {
            pb: '5',
            pr: '1',
          },

          '&[data-state=closed]': {
            animation: 'accordion-up',
          },

          '&[data-state=open]': {
            animation: 'accordion-down',
          },
        },
      },
      forceMount: {
        content: {
          display: 'grid',
          transition: '250ms grid-template-rows ease!',
          animation: 'none!',
          overflow: 'auto!',

          '& > div': {
            pr: '0',
            pb: '0',
            overflow: 'hidden',
          },

          '&[data-state=closed]': {
            gridTemplateRows: '0fr',
          },

          '&[data-state=open]': {
            gridTemplateRows: '1fr',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    animated: 'default',
  },
})

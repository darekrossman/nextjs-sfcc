import { defineSlotRecipe } from '@pandacss/dev'

export const couponCode = defineSlotRecipe({
  className: 'couponCode',
  slots: ['root', 'accordion', 'input-form', 'error-message', 'list', 'label'],
  base: {
    root: {
      width: 'full',
      gap: '3',
      borderTop: '1px solid token(colors.border.weak)',
      borderBottom: { base: 'none', md: '1px solid token(colors.border.weak)' },
      py: '3',

      '& .coupon-code-toggle': {
        display: 'flex',
        justifyContent: 'space-between',
        width: 'full',
        py: '2',
        rounded: 'md',
      },
      '& .coupon-code-content': {
        pl: '1',
        pt: '1',
        mt: '3',
        '& > div': { pb: '1.5!' },
      },
    },
    'input-form': {
      '& .coupon-code-input-box': {
        position: 'relative',
        minWidth: '215px',
        flexGrow: '999',
        flexBasis: '215px',
        h: '56px',
      },
      '& .coupon-code-input-flex': {
        flexWrap: 'wrap',
        gap: '2',
        width: 'full',
      },
      '& .coupon-code-input': {
        h: 'full',
        pr: '12',
      },
      '& .coupon-code-input-tooltip-button': {
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
      },
      '& .coupon-code-input-button': {
        h: '56px',
        flexGrow: '1',
        flexBasis: '107px',
      },
    },
    'error-message': {
      mt: '1',
    },
    list: {
      gap: '2',
      mt: '4',

      '& .coupon-code-item': {
        w: 'full',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
    },
  },
})

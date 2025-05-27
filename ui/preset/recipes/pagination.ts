import { defineSlotRecipe } from '@pandacss/dev'

export const pagination = defineSlotRecipe({
  className: 'pagination',
  description: 'Styles for the Pagination component',
  slots: ['root', 'items'],
  base: {
    root: {
      width: 'full',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    items: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1',
      gap: { base: '0', md: '1' },
    },
  },
})

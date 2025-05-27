import { defineSlotRecipe } from '@pandacss/dev'

export const productTile = defineSlotRecipe({
  className: 'productTile',
  slots: [
    'root',
    'image',
    'content',
    'title',
    'price',
    'swatches',
    'promos',
    'badges',
    'wishlist',
    'rating',
    'actions',
  ],
  base: {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'lg',
      overflow: 'hidden',
      bg: 'white',
      containerType: 'inline-size',
      height: '100%',
      _hover: {
        '--hover-opacity': '1',
      },
    },
    image: {
      display: 'block',
      position: 'relative',
      aspectRatio: '1/1',
      overflow: 'hidden',
      bg: 'background.weak',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      p: { base: '2', '@/3xs': '4' },
      bg: 'background.weak',
      flex: '1',
    },
    title: {
      fontSize: { base: 'md', '@/3xs': 'lg' },
      lineHeight: 'snug',
      fontWeight: 'semibold',
      color: 'gray.900',
    },
    price: {},
    swatches: {},
    promos: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      fontSize: 'sm',
      lineHeight: '20px',
      color: 'gray.600',

      ml: '-1px', // icon nudge

      '& > div': {
        display: 'flex',
        gap: '1',
      },
    },
    badges: {
      position: 'absolute',
      top: { base: '2', '@/3xs': '3' },
      left: { base: '2', '@/3xs': '3' },
      display: 'flex',
      gap: '1',
      flexWrap: 'wrap',
      pointerEvents: 'none',
    },
    wishlist: {
      position: 'absolute',
      top: { base: '2', '@/3xs': '3' },
      right: { base: '2', '@/3xs': '3' },
      zIndex: '1',
      // '@media (hover: hover)': {
      //   opacity: 'var(--hover-opacity, 0)',
      // },
    },
    rating: {
      py: '0.5',
      fontWeight: 'medium',
    },
    actions: {
      display: 'flex',
      gap: '2',
      mt: 'auto',
      pt: '2',
      '& > *': {
        flex: 1,
      },
    },
  },
})

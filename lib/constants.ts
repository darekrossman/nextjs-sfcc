export const SITE_NAME = 'Acme'

export const TAGS = {
  collections: 'collections',
  products: 'products',
  search: 'search',
  cart: 'cart',
  productRecommendations: 'product-recommendations',
}

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden'
export const DEFAULT_OPTION = 'Default Title'

export const REFINEMENT_COLORS = {
  black: {
    label: 'Black',
    hex: '#000000',
  },
  blue: {
    label: 'Blue',
    hex: '#007BFF',
  },
  green: {
    label: 'Green',
    hex: '#28A745',
  },
  red: {
    label: 'Red',
    hex: '#DC3545',
  },
  orange: {
    label: 'Orange',
    hex: '#FD7E14',
  },
  pink: {
    label: 'Pink',
    hex: '#E91E63',
  },
  purple: {
    label: 'Purple',
    hex: '#6F42C1',
  },
  white: {
    label: 'White',
    hex: '#FFFFFF',
  },
  yellow: {
    label: 'Yellow',
    hex: '#FFC107',
  },
  grey: {
    label: 'Grey',
    hex: '#6C757D',
  },
  beige: {
    label: 'Beige',
    hex: '#F5F5DC',
  },
  miscellaneous: {
    label: 'Miscellaneous',
    hex: '#8E8E93',
  },
  brown: {
    label: 'Brown',
    hex: '#8B4513',
  },
  navy: {
    label: 'Navy',
    hex: '#0D1B2A',
  },
} as const

export type ColorKey = keyof typeof REFINEMENT_COLORS
export type ColorMapping = (typeof REFINEMENT_COLORS)[ColorKey]

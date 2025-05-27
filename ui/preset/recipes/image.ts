import { defineRecipe } from '@pandacss/dev'

export const image = defineRecipe({
  className: 'image',
  description: 'A responsive image component style',
  base: {
    position: 'relative',
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  },
  variants: {
    fit: {
      contain: { objectFit: 'contain' },
      cover: { objectFit: 'cover' },
      fill: { objectFit: 'fill' },
    },
    position: {
      center: { objectPosition: 'center' },
      top: { objectPosition: 'top' },
      bottom: { objectPosition: 'bottom' },
      left: { objectPosition: 'left' },
      right: { objectPosition: 'right' },
    },
    fill: {
      true: {
        position: 'absolute',
        inset: 0,
        h: 'full',
        w: 'full',
      },
      false: {
        w: 'full',
        height: 'auto',
      },
    },
  },
  defaultVariants: {
    fit: 'cover',
    position: 'center',
    fill: false,
  },
})

import { defineRecipe } from '@pandacss/dev'

export const skipLink = defineRecipe({
  className: 'skipLink',
  base: {
    position: 'absolute',
    top: '0',
    left: '0',
    padding: '4',
    backgroundColor: 'white',
    color: 'brand',
    zIndex: 'overlay',
    opacity: '0',
    transform: 'translateY(-100%)',
    transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
    textDecoration: 'none',
    fontWeight: 'medium',
    borderRadius: 'md',
    boxShadow: 'lg',
    _focus: {
      outline: '2px solid',
      outlineColor: 'brand',
      outlineOffset: '2px',
    },
  },
})

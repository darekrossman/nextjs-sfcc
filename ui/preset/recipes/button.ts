import { defineRecipe } from '@pandacss/dev'

export const button = defineRecipe({
  className: 'button',
  description: 'Styles for the Button component',
  base: {
    colorPalette: 'button.brand',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    rounded: 'lg',
    fontWeight: 'medium',
    transition: 'colors',
    cursor: 'pointer',
    gap: '2',

    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'brand',
      outlineOffset: '2px',
    },

    _disabled: {
      pointerEvents: 'none',
    },
  },
  variants: {
    variant: {
      primary: {
        bg: 'colorPalette.primary.bg',
        color: 'colorPalette.primary.fg',
        _hover: { bg: 'colorPalette.primary.bg.hover' },
        _disabled: {
          bg: 'colorPalette.primary.bg.disabled',
          color: 'colorPalette.primary.fg.disabled',
        },
      },
      secondary: {
        bg: 'colorPalette.secondary.bg',
        color: 'colorPalette.secondary.fg',
        _hover: { bg: 'colorPalette.secondary.bg.hover' },
        _disabled: {
          bg: 'colorPalette.secondary.bg.disabled',
          color: 'colorPalette.secondary.fg.disabled',
        },
      },
      outline: {
        border: '1px solid',
        borderColor: 'colorPalette.outline.border',
        bg: 'colorPalette.outline.bg',
        color: 'colorPalette.outline.fg',
        _hover: {
          bg: 'colorPalette.outline.bg.hover',
          borderColor: 'colorPalette.outline.border.hover',
        },
        _disabled: {
          color: 'colorPalette.outline.fg.disabled',
          borderColor: 'colorPalette.outline.border.disabled',
        },
      },
      ghosted: {
        bg: 'colorPalette.ghosted.bg',
        color: 'colorPalette.ghosted.fg',
        _hover: {
          bg: 'colorPalette.ghosted.bg.hover',
          color: 'colorPalette.ghosted.fg.hover',
        },
        _disabled: {
          bg: 'colorPalette.ghosted.bg.disabled',
          color: 'colorPalette.ghosted.fg.disabled',
        },
      },
      link: {
        color: 'black',
        textUnderlineOffset: '4px',
        textDecoration: 'underline',
        fontWeight: 'normal',
        rounded: 'sm',
        _hover: {
          color: 'brand',
          opacity: '1',
        },
        _disabled: {
          color: 'colorPalette.foreground.disabled',
        },
      },
      unstyled: {
        fontWeight: 'normal',
        rounded: '0',
      },
    },
    size: {
      md: {
        textStyle: 'md',
        h: '14',
        px: '8',
      },
      sm: {
        textStyle: 'sm',
        h: '11',
        px: '5',
      },
      xs: {
        textStyle: 'xs',
        h: '8',
        px: '3',
        rounded: 'md',
      },
      'icon-xs': {
        h: '6',
        w: '6',
        flexShrink: 0,
        rounded: 'md',
      },
      'icon-sm': {
        h: '8',
        w: '8',
        flexShrink: 0,
      },
      icon: {
        h: '10',
        w: '10',
        flexShrink: 0,
      },
      'icon-lg': {
        h: '14',
        w: '14',
        flexShrink: 0,
      },
    },
    isLoading: {
      true: {
        position: 'relative',
        cursor: 'not-allowed',
        '& .button-text': {
          visibility: 'hidden',
          opacity: 0,
        },
        '& .button-spinner': {
          position: 'absolute',
          display: 'flex',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(0.6)',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      false: {
        '& .button-spinner': {
          display: 'none',
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: ['link', 'unstyled'],
      size: ['md', 'sm', 'icon-lg', 'icon'],
      css: {
        h: 'auto',
        p: '0',
      },
    },
    {
      variant: 'primary',
      isLoading: true,
      css: {
        '& .button-spinner': {
          color: 'white',
        },
      },
    },
    {
      variant: ['secondary', 'outline', 'ghosted'],
      isLoading: true,
      css: {
        '& .button-spinner': {
          color: 'brand',
        },
      },
    },
    {
      variant: 'link',
      isLoading: true,
      css: {
        '& .button-spinner': {
          display: 'none',
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    isLoading: false,
  },
})

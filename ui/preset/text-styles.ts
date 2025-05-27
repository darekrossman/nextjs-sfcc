import type { TextStyles } from '@pandacss/types'

const defineTextStyles = <T extends TextStyles>(config: T) => config

export const textStyles = defineTextStyles({
  h1: {
    description: 'Heading 1',
    value: {
      fontSize: {
        base: '4xl',
        lg: '5xl',
      },
      leading: {
        base: '10',
        lg: 'none',
      },
      fontWeight: 'extrabold',
      tracking: 'tight',
    },
  },
  h2: {
    description: 'Heading 2',
    value: {
      fontSize: '3xl',
      leading: '9',
      fontWeight: 'semibold',
      tracking: 'tight',
    },
  },
  h3: {
    description: 'Heading 3',
    value: {
      fontSize: '2xl',
      leading: '8',
      fontWeight: 'semibold',
      tracking: 'tight',
    },
  },
  h4: {
    description: 'Heading 4',
    value: {
      fontSize: 'xl',
      leading: '7',
      fontWeight: 'semibold',
      tracking: 'tight',
    },
  },
  p: {
    description: 'Paragraph',
    value: {
      leading: '7',
    },
  },
  lead: {
    description: 'Lead paragraph',
    value: {
      fontSize: 'xl',
      leading: '7',
    },
  },
  large: {
    description: 'Large text',
    value: {
      fontSize: 'lg',
      fontWeight: 'semibold',
      leading: '7',
    },
  },
  small: {
    description: 'Small text',
    value: {
      fontSize: 'sm',
      fontWeight: 'medium',
      leading: 'none',
    },
  },

  // From FIGMA
  headingLead: {
    value: {
      fontSize: '64px',
      lineHeight: 'none',
      fontFamily: 'sans',
      fontWeight: '500',
      md: {
        fontSize: '88px',
      },
    },
  },
  heading1: {
    value: {
      fontSize: '48px',
      lineHeight: 'none',
      fontFamily: 'sans',
      fontWeight: '600',
      md: {
        fontSize: '56px',
      },
    },
  },
  heading2: {
    value: {
      fontSize: '32px',
      lineHeight: 'none',
      fontFamily: 'sans',
      fontWeight: '600',
      md: {
        fontSize: '40px',
      },
    },
  },
  heading3: {
    value: {
      fontSize: '28px',
      lineHeight: 'none',
      fontFamily: 'sans',
      fontWeight: '600',
      md: {
        fontSize: '32px',
      },
    },
  },
  heading4: {
    value: {
      fontSize: '20px',
      lineHeight: 'none',
      fontFamily: 'sans',
      fontWeight: '600',
      md: {
        fontSize: '24px',
      },
    },
  },
  heading5: {
    value: {
      fontSize: '20px',
      lineHeight: 'none',
      fontFamily: 'sans',
      fontWeight: '500',
    },
  },
  heading6: {
    value: {
      fontSize: '18px',
      lineHeight: 'none',
      fontFamily: 'sans',
      fontWeight: '500',
      md: {},
    },
  },
  static18: {
    value: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  static16: {
    value: {
      fontSize: '16px',
      lineHeight: '22px',
    },
  },
  static14: {
    value: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  static12: {
    value: {
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
})

export type TextStylesValues = typeof textStyles

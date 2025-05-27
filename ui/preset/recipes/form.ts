import { defineRecipe } from '@pandacss/dev'

export const formLabel = defineRecipe({
  className: 'formLabel',
  description: 'Styles for the FormLabel component',
  base: {
    lineHeight: '7',
  },
})

export const formItem = defineRecipe({
  className: 'formItem',
  description: 'Styles for the FormItem component',
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
  },
})

export const formControl = defineRecipe({
  className: 'formControl',
  description: 'Styles for the FormControl component',
  base: {},
})

export const formDescription = defineRecipe({
  className: 'formDescription',
  description: 'Styles for the FormDescription component',
  base: {
    textStyle: 'sm',
    color: 'muted.foreground',
  },
})

export const formMessage = defineRecipe({
  className: 'formMessage',
  description: 'Styles for the FormMessage component',
  base: {
    textStyle: 'xs',
    color: 'errors.text',
  },
})

export const formPasswordField = defineRecipe({
  className: 'formPasswordField',
  description: 'Styles for the FormPasswordField component',
  base: {
    '& .form-password-field-button': {
      position: 'absolute',
      right: '2',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
})

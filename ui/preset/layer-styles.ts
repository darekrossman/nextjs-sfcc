import { defineLayerStyles } from '@pandacss/dev'

export const layerStyles = defineLayerStyles({
  error: {
    value: {
      backgroundColor: '{colors.errors.bg}',
      color: '{colors.errors.text}',
      borderColor: '{colors.errors.borderWeak}',
    },
  },
  warning: {
    value: {
      backgroundColor: '{colors.warning.bg}',
      color: '{colors.warning.text}',
      borderColor: '{colors.warning.borderWeak}',
    },
  },
  info: {
    value: {
      backgroundColor: '{colors.info.bg}',
      color: '{colors.info.text}',
      borderColor: '{colors.info.borderWeak}',
    },
  },
  success: {
    value: {
      backgroundColor: '{colors.success.bg}',
      color: '{colors.success.text}',
      borderColor: '{colors.success.borderWeak}',
    },
  },
  neutral: {
    value: {
      backgroundColor: '{colors.background.weak}',
      color: '{colors.text.strong}',
      borderColor: '{colors.border.weak}',
    },
  },
})

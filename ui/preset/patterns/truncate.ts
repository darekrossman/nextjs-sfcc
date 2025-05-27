import { definePattern } from '@pandacss/dev'

export const truncate = definePattern({
  description: 'A utility for truncating text with ellipsis',
  transform(props) {
    return {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...props,
    }
  },
})

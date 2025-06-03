import type { Config } from '@pandacss/types'
import { container } from './container'
import { truncate } from './truncate'

export const patterns = {
  extend: { truncate, container },
} satisfies Config['patterns']

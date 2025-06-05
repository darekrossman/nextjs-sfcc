import type { Config } from '@pandacss/types'
import { truncate } from './truncate'

export const patterns = {
  extend: { truncate },
} satisfies Config['patterns']

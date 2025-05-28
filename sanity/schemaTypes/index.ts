import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { heroBannerType } from './heroBannerType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    categoryType,
    heroBannerType,

    // Reusable types
    blockContentType,
  ],
}

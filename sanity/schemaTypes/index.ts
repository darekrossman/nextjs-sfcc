import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { heroBannerType } from './heroBannerType'
import { localeType } from './localeType'
import { pageType } from './pageType'
import { siteSettingsType } from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    categoryType,
    heroBannerType,
    localeType,
    pageType,
    siteSettingsType,

    // Reusable types
    blockContentType,
  ],
}

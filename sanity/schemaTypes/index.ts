import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { localeType } from './localeType'
import { pageType } from './pageType'
import { pageBuilderType } from './pageBuilderType'
import { faqType } from './faqType'
import { faqsType } from './blocks/faqsType'
import { featuresType } from './blocks/featuresType'
import { heroType } from './blocks/heroType'
import { splitImageType } from './blocks/splitImageType'
import { siteSettingsType } from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    categoryType,
    localeType,
    pageType,
    siteSettingsType,

    // Blocks
    faqsType,
    featuresType,
    heroType,
    splitImageType,

    // Reusable types
    blockContentType,
    faqType,
    pageBuilderType,
  ],
}

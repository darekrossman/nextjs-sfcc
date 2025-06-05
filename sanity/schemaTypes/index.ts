import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { localeType } from './localeType'
import { menuType } from './menuType'
import { pageType } from './pageType'
import { pageBuilderType } from './pageBuilderType'
import { faqType } from './faqType'
import { faqsType } from './blocks/faqsType'
import { featuresType } from './blocks/featuresType'
import { heroType } from './blocks/heroType'
import { richTextType } from './blocks/richTextType'
import { splitImageType } from './blocks/splitImageType'
import { siteSettingsType } from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    categoryType,
    localeType,
    menuType,
    pageType,
    siteSettingsType,

    // Blocks
    faqsType,
    featuresType,
    heroType,
    richTextType,
    splitImageType,

    // Reusable types
    blockContentType,
    faqType,
    pageBuilderType,
  ],
}

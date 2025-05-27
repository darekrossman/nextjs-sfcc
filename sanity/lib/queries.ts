import { defineQuery } from 'next-sanity'

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"]{ _id, categoryId, slug, title }`,
)

export const CATEGORY_QUERY = defineQuery(
  `*[_type == "category" && slug.current == $slug][0]{ _id, categoryId, slug, title }`,
)

import { defineQuery } from 'next-sanity'

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"]{ _id, categoryId, slug, title }`,
)

export const CATEGORY_QUERY = defineQuery(
  `*[
    _type == "category"
    && slug.current == $slug
  ][0]{
    _id,
    categoryId,
    slug,
    title,
    body,
    publishedAt,
    heroBanner->{
      _id,
      title,
      slug,
      landscapeImage{
        asset->{
          _id,
          url
        },
        alt,
        hotspot,
        crop
      },
      portraitImage{
        asset->{
          _id,
          url
        },
        alt,
        hotspot,
        crop
      },
      overlay{
        headline,
        subheadline,
        content,
        textPosition,
        textColor
      },
      callToActions[]{
        label,
        linkType,
        internalLink,
        externalUrl,
        categoryReference->{
          _id,
          slug,
          title
        },
        style,
        priority
      }
    }
  }`,
)

import { defineQuery } from 'next-sanity'

// Site Settings Query - Singleton
// Usage: const siteSettings = await sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale: 'en' } })
export const SITE_SETTINGS_QUERY = defineQuery(
  `*[
    _type == "siteSettings"
    && _id == "siteSettings"
  ][0]{
    _id,
    siteName,
    homePage->{
      _id,
      title,
      slug,
      status
    },
    navigation[]->{
      _id,
      title,
      slug,
      status
    },
    footerNavigation[]->{
      _id,
      title,
      slug,
      status
    }
  }`,
)

// Site Name Query - Get just the site name
// Usage: const siteName = await sanityFetch({ query: SITE_NAME_QUERY })
export const SITE_NAME_QUERY = defineQuery(
  `*[
    _type == "siteSettings"
    && _id == "siteSettings"
  ][0].siteName`,
)

// Homepage Query - Get the homepage reference with full details
// Usage: const homepage = await sanityFetch({ query: HOMEPAGE_QUERY, params: { locale: 'en' } })
export const HOMEPAGE_QUERY = defineQuery(
  `*[
    _type == "siteSettings"
    && _id == "siteSettings"
  ][0].homePage->{
    _id,
    title,
    slug,
    status,
    excerpt,
    seo{
      title,
      description,
      noIndex
    }
  }`,
)

// Site Navigation Query - Get main navigation pages
// Usage: const navigation = await sanityFetch({ query: SITE_NAVIGATION_QUERY, params: { locale: 'en' } })
export const SITE_NAVIGATION_QUERY = defineQuery(
  `*[
    _type == "siteSettings"
    && _id == "siteSettings"
  ][0].navigation[]->{
    _id,
    title,
    slug,
    status,
    excerpt
  }`,
)

// Site Footer Navigation Query - Get footer navigation pages
// Usage: const footerNav = await sanityFetch({ query: SITE_FOOTER_NAVIGATION_QUERY, params: { locale: 'en' } })
export const SITE_FOOTER_NAVIGATION_QUERY = defineQuery(
  `*[
    _type == "siteSettings"
    && _id == "siteSettings"
  ][0].footerNavigation[]->{
    _id,
    title,
    slug,
    status,
    excerpt
  }`,
)

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"]{ 
    _id, 
    categoryId, 
    slug, 
    "title": coalesce(
      title[_key == $locale][0].value,
      title[_key == "en"][0].value,
      title[0].value
    )
  }`,
)

export const CATEGORY_QUERY = defineQuery(
  `*[
    _type == "category"
    && slug.current == $slug
  ][0]{
    _id,
    categoryId,
    slug,
    "title": coalesce(
      title[_key == $locale][0].value,
      title[_key == "en"][0].value,
      title[0].value
    ),
    body,
    bannerImage{
      asset->{
        _id,
        url
      },
      "alt": coalesce(
        alt[_key == $locale][0].value,
        alt[_key == "en"][0].value,
        alt[0].value
      ),
      hotspot,
      crop
    }
  }`,
)

export const PAGE_QUERY = defineQuery(
  `*[
    _type == "page"
    && slug.current == $slug
  ][0]{
    _id,
    title,
    slug,
    content[]{
      _type,
      _key,
      _type == "hero" => {
        title,
        text,
        image{
          asset->{
            _id,
            url
          },
          hotspot,
          crop
        }
      },
      _type == "splitImage" => {
        orientation,
        title,
        image{
          asset->{
            _id,
            url
          },
          hotspot,
          crop
        }
      },
      _type == "features" => {
        title,
        features[]{
          _key,
          title,
          text
        }
      },
      _type == "faqs" => {
        title,
        faqs[]->{
          _id,
          title,
          body
        }
      }
    },
    mainImage{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    }
  }`,
)

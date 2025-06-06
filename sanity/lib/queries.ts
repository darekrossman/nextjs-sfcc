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
      "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == "en"][0].value,
        title[0].value
      ),
      slug,
      status
    },
    navigation[]->{
      _id,
      "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == "en"][0].value,
        title[0].value
      ),
      slug,
      status
    },
    footerNavigation[]->{
      _id,
      "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == "en"][0].value,
        title[0].value
      ),
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
    "title": coalesce(
      title[_key == $locale][0].value,
      title[_key == "en"][0].value,
      title[0].value
    ),
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
      _type == "richText" => {
        content,
        alignment,
        maxWidth
      },
      _type == "splitImage" => {
        orientation,
        "title": coalesce(
          title[_key == $locale][0].value,
          title[_key == "en"][0].value,
          title[0].value
        ),
        "content": coalesce(
          content[_key == $locale][0].value,
          content[_key == "en"][0].value,
          content[0].value
        ),
        "ctaLabel": coalesce(
          ctaLabel[_key == $locale][0].value,
          ctaLabel[_key == "en"][0].value,
          ctaLabel[0].value
        ),
        ctaUrl,
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

// Site Navigation Query - Get main navigation pages
// Usage: const navigation = await sanityFetch({ query: SITE_NAVIGATION_QUERY, params: { locale: 'en' } })
export const SITE_NAVIGATION_QUERY = defineQuery(
  `*[
    _type == "siteSettings"
    && _id == "siteSettings"
  ][0].navigation[]->{
    _id,
    "title": coalesce(
      title[_key == $locale][0].value,
      title[_key == "en"][0].value,
      title[0].value
    ),
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
    "title": coalesce(
      title[_key == $locale][0].value,
      title[_key == "en"][0].value,
      title[0].value
    ),
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

// Page Query - Get a specific page by slug with localized content
// Usage: const page = await sanityFetch({ query: PAGE_QUERY, params: { slug: 'about', locale: 'en' } })
export const PAGE_QUERY = defineQuery(
  `*[
    _type == "page"
    && slug.current == $slug
  ][0]{
    _id,
    "title": coalesce(
      title[_key == $locale][0].value,
      title[_key == "en"][0].value,
      title[0].value
    ),
    slug,
    excerpt,
    metaDescription,
    noIndex,
    includeInSitemap,
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
      _type == "richText" => {
        content,
        alignment,
        maxWidth
      },
      _type == "splitImage" => {
        orientation,
        "title": coalesce(
          title[_key == $locale][0].value,
          title[_key == "en"][0].value,
          title[0].value
        ),
        "content": coalesce(
          content[_key == $locale][0].value,
          content[_key == "en"][0].value,
          content[0].value
        ),
        "ctaLabel": coalesce(
          ctaLabel[_key == $locale][0].value,
          ctaLabel[_key == "en"][0].value,
          ctaLabel[0].value
        ),
        ctaUrl,
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

// Menu Query - Get a specific menu by identifier
// Usage: const menu = await sanityFetch({ query: MENU_QUERY, params: { identifier: 'main-menu', locale: 'en' } })
export const MENU_QUERY = defineQuery(
  `*[
    _type == "menu"
    && identifier.current == $identifier
    && isActive == true
  ][0]{
    _id,
    title,
    identifier,
    isActive,
    sortOrder,
    menuItems[]{
      _key,
      label,
      page->{
        _id,
        _type,
        "title": coalesce(
          title[_key == $locale][0].value,
          title[_key == "en"][0].value,
          title[0].value
        ),
        slug
      },
      externalUrl,
      openInNewTab,
      subItems[]{
        _key,
        label,
        page->{
          _id,
          _type,
          "title": coalesce(
            title[_key == $locale][0].value,
            title[_key == "en"][0].value,
            title[0].value
          ),
          slug
        },
        externalUrl,
        openInNewTab
      }
    }
  }`,
)

// All Menus Query - Get all active menus ordered by sortOrder
// Usage: const menus = await sanityFetch({ query: ALL_MENUS_QUERY, params: { locale: 'en' } })
export const ALL_MENUS_QUERY = defineQuery(
  `*[
    _type == "menu"
    && isActive == true
  ] | order(sortOrder asc, title asc){
    _id,
    title,
    identifier,
    isActive,
    sortOrder,
    menuItems[]{
      _key,
      label,
      page->{
        _id,
        _type,
        "title": coalesce(
          title[_key == $locale][0].value,
          title[_key == "en"][0].value,
          title[0].value
        ),
        slug
      },
      externalUrl,
      openInNewTab,
      subItems[]{
        _key,
        label,
        page->{
          _id,
          _type,
          "title": coalesce(
            title[_key == $locale][0].value,
            title[_key == "en"][0].value,
            title[0].value
          ),
          slug
        },
        externalUrl,
        openInNewTab
      }
    }
  }`,
)

// Menu Items Only Query - Get just the menu items for a specific menu (lighter query)
// Usage: const menuItems = await sanityFetch({ query: MENU_ITEMS_QUERY, params: { identifier: 'main-menu', locale: 'en' } })
export const MENU_ITEMS_QUERY = defineQuery(
  `*[
    _type == "menu"
    && identifier.current == $identifier
    && isActive == true
  ][0].menuItems[]{
    _key,
    label,
    page->{
      _id,
      _type,
      "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == "en"][0].value,
        title[0].value
      ),
      slug
    },
    externalUrl,
    openInNewTab,
    subItems[]{
      _key,
      label,
      page->{
        _id,
        _type,
        "title": coalesce(
          title[_key == $locale][0].value,
          title[_key == "en"][0].value,
          title[0].value
        ),
        slug
      },
      externalUrl,
      openInNewTab
    }
  }`,
)

// Menu Identifiers Query - Get all menu identifiers for selection/validation
// Usage: const menuIds = await sanityFetch({ query: MENU_IDENTIFIERS_QUERY })
export const MENU_IDENTIFIERS_QUERY = defineQuery(
  `*[
    _type == "menu"
    && isActive == true
  ] | order(sortOrder asc, title asc){
    _id,
    title,
    identifier,
    "itemCount": count(menuItems)
  }`,
)

import { BaseEntry } from '@contentstack/delivery-sdk'
import { cacheLife } from 'next/dist/server/use-cache/cache-life'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { TAGS } from './constants'
import { getStack } from './contentstack'
import { getUrlMapping } from './sfcc'

interface ContentstackResponse {
  entries: BaseEntry[]
}

interface EnhancedEntry {
  url?: string
  uid?: string
  category_id?: string
  contentType?: string
  [key: string]: any
}

interface RouteMapping {
  [url: string]: {
    categoryId: string | undefined
    uid: string | undefined
    contentType: string | undefined
  }
}

/**
 * Ensures a URL starts with a forward slash
 */
const normalizeUrl = (url: string): string => {
  if (!url) return '/'
  return url.startsWith('/') ? url : `/${url}`
}

export const generateRouteMapping = async () => {
  'use cache'
  cacheTag(TAGS.routeMapping)
  cacheLife('days')

  /**
   * Returns url -> categoryId mapping
   *
   * {[url]: categoryId}
   *
   * Example:
   *   {
   *    "/mens-clothing": "mens-clothing",
   *    "/womens-clothing": "womens-clothing",
   *    "/kids-clothing": "kids-clothing",
   *   }
   */
  const sfUrlMapping = await getUrlMapping()

  const CONTENT_TYPES_TO_FETCH = [
    'plp',
    'component_guide',
    'content_page',
    'content_page_with_sidenav',
    'landing_page',
  ]

  const stack = getStack()

  /**
   * Array to hold all entries
   *
   * Example:
   *
   * [
   *   {
   *     "uid": "bltebf815d3d4f57b1f",
   *     "url": "/test-3",
   *     "taxonomies": [
   *       {
   *         "taxonomy_uid": "sites",
   *         "term_uid": "refarch"
   *       }
   *     ]
   *   }
   * ]
   */
  const allEntries: EnhancedEntry[] = []

  // Process each content type
  for (const contentType of CONTENT_TYPES_TO_FETCH) {
    // Create query for the content type
    const query = stack
      .contentType(contentType)
      .entry()
      .only(['url', 'uid', 'taxonomies', 'category_id'])
      .paginate()

    // Fetch first page
    let response = (await query.find()) as ContentstackResponse

    // Add entries from first page
    if (response.entries && response.entries.length > 0) {
      allEntries.push(
        ...(response.entries.map((entry) => ({
          ...entry,
          contentType,
        })) as EnhancedEntry[]),
      )
    }

    // Handle pagination - get all remaining pages
    while (response.entries && response.entries.length > 0) {
      response = (await query.next().find()) as ContentstackResponse
      if (response.entries && response.entries.length > 0) {
        allEntries.push(
          ...(response.entries.map((entry) => ({
            ...entry,
            contentType,
          })) as EnhancedEntry[]),
        )
      } else {
        break
      }
    }
  }

  // Create the merged route mapping
  const routeMapping: RouteMapping = {}

  // First, process allEntries
  for (const entry of allEntries) {
    if (entry.url) {
      const normalizedUrl = normalizeUrl(entry.url)
      routeMapping[normalizedUrl] = {
        categoryId: entry.category_id || undefined,
        uid: entry.uid || undefined,
        contentType: entry.contentType || undefined,
      }
    }
  }

  // Then, merge with sfUrlMapping (giving it precedence for categoryId)
  if (sfUrlMapping) {
    Object.entries(sfUrlMapping).forEach(([url, categoryId]) => {
      const normalizedUrl = normalizeUrl(url)
      if (routeMapping[normalizedUrl]) {
        // URL exists in both mappings, update categoryId while preserving uid and contentType
        routeMapping[normalizedUrl] = {
          ...routeMapping[normalizedUrl],
          categoryId,
        }
      } else {
        // URL only exists in sfUrlMapping
        routeMapping[normalizedUrl] = {
          categoryId,
          uid: undefined,
          contentType: 'plp',
        }
      }
    })
  }

  return routeMapping
}

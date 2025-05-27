import { ProductSearchHit } from '@/lib/sfcc/types'
import { ProductTileProduct } from './'
/**
 * Transforms raw product search hit data from the search API into a standardized format
 * for the ProductTile component. This transformer handles:
 * - Basic product information (ID, name, pricing)
 * - Product badges and promotional messaging
 * - Product ratings
 * - Variation attributes (e.g., color swatches)
 * - Product images organized by color variant
 *
 * @param sourceData - Raw product data from the search API response
 * @returns A normalized ProductTileProduct object ready for rendering
 */
export const plpHitTransformer = (sourceData: ProductSearchHit) => {
  /** Default empty product structure used for error cases or missing data */
  const emptyProduct = {
    id: '',
    productName: '',
    badges: [],
    promotions: [],
    attributes: [],
    images: {},
  }

  if (!sourceData) {
    return emptyProduct
  }

  try {
    const transformedProduct: ProductTileProduct = {
      id: sourceData.productId,

      productName: sourceData.productName,
      /**
       * Price model supports both standard and custom pricing structures
       * Falls back to base price if custom pricing model is not available
       */
      price: sourceData.c_custom.price,

      /**
       * Product badges are styled differently based on their type:
       * - 'sale' badges use sale background with white text
       * - all other badges use brandAccent background with black text
       */
      badges:
        sourceData.c_custom?.productBadges
          ?.filter((badge) => badge?.text)
          ?.map((badge) => ({
            text: badge.text,
            variant: 'default',
            bg: badge.type === 'sale' ? 'sale' : 'brandAccent',
            color: badge.type === 'sale' ? 'white' : 'black',
          })) ?? [],

      promotions:
        sourceData.c_custom?.promotions?.map((promo) => ({
          id: promo.id,
          title: promo.name,
          description: promo.calloutMsg,
        })) ?? [],

      rating: sourceData.c_custom?.rating
        ? {
            score: sourceData.c_custom.rating.score,
            count: sourceData.c_custom.rating.count,
          }
        : null,

      /**
       * Transforms variation attributes (like color swatches) and ensures
       * the default color variant is always first in the list for color attributes
       */
      attributes: sourceData.variationAttributes?.map((attr) => {
        const values = attr.values.map((val) => {
          const swatch = sourceData.c_custom?.swatches?.[val.value]
          return {
            id: val.value,
            name: val.name,
            selectable: val.orderable,
            ...(swatch && {
              imageUrl: swatch.swatch.disBaseLink,
            }),
          }
        })

        /** Sort color values to ensure default color appears first */
        if (attr.id === 'color') {
          const defaultColorId = sourceData.c_custom?.variants?.[sourceData.representedProduct?.id]?.variationValues?.find(
            (val) => val.id === 'color',
          )?.value

          if (defaultColorId) {
            values.sort((a, b) => (a.id === defaultColorId ? -1 : b.id === defaultColorId ? 1 : 0))
          }
        }

        return {
          id: attr.id,
          name: attr.name,
          values,
        }
      }),

      /** Track the default color ID for initial product variant display */
      defaultColorId: sourceData.c_custom?.variants?.[sourceData.representedProduct?.id]?.variationValues?.find((val) => val.id === 'color')
        ?.value,

      /**
       * Organizes product images by color variant ID
       * Each color variant contains an array of image URLs and alt text
       * For 'shared' type, creates a single '_default' key
       * For 'grouped' type, uses the color variant IDs as keys
       */
      images: (() => {
        const imageType = sourceData.c_custom?.images?.type

        // For 'shared' type, create a single '_default' entry
        if (imageType === 'shared') {
          const sharedAssets =
            sourceData.c_custom?.images?.type === 'shared'
              ? (sourceData.c_custom?.images?.assets as Array<{
                  alt: string
                  title: string
                  url: string
                }>)
              : []

          return {
            _default: {
              urls: sharedAssets?.map((img) => stripQueryParams(img.url)) ?? [],
              alt: sharedAssets?.[0]?.alt ?? sourceData.productName,
            },
          }
        }

        // For 'grouped' type, organize by color variant ID
        if (imageType === 'grouped') {
          const groupedAssets =
            sourceData.c_custom?.images?.type === 'grouped'
              ? (sourceData.c_custom?.images?.assets as Record<string, Array<{ alt: string; title: string; url: string }>>)
              : {}

          return (
            sourceData.variationAttributes
              ?.find((attr) => attr.id === 'color')
              ?.values.reduce((acc, colorValue) => {
                const colorId = colorValue.value
                const colorAssets = groupedAssets[colorId] ?? []

                return {
                  ...acc,
                  [colorId]: {
                    urls: colorAssets.map((img) => stripQueryParams(img.url)) ?? [],
                    alt: colorAssets[0]?.alt ?? sourceData.productName,
                  },
                }
              }, {}) ?? {}
          )
        }

        // Fallback to empty object if no valid image type
        return {}
      })(),
    }

    return transformedProduct
  } catch (error) {
    /** Log transformation errors and return empty product structure for graceful fallback */
    console.error('Error transforming plp hit data:', error)
    return emptyProduct
  }
}

/**
 * Utility to strip query params from a URL
 */
const stripQueryParams = (url: string) => url.split('?')[0]

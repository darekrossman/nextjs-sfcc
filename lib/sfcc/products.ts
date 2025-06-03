import { ShopperProducts, ShopperSearch } from 'commerce-sdk-isomorphic'
import { TAGS } from 'lib/constants'
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache'
import { getGuestUserConfig } from './auth'
import { defaultSort } from './constants'
import {
  Product,
  ProductSearchResult,
  ProductSearchParams,
  ProductSearchHit,
} from './types'
import { ensureSDKResponseError } from './type-guards'

export async function getProduct({ id, locale }: { id: string; locale: string }) {
  'use cache'
  cacheLife('days')
  cacheTag(TAGS.products)

  console.log('getProduct', id, locale)

  const config = await getGuestUserConfig()
  const productsClient = new ShopperProducts(config)
  try {
    const product = await productsClient.getProduct({
      parameters: {
        id,
        allImages: true,
        perPricebook: true,
        expand: [
          'prices',
          'variations',
          'recommendations',
          'availability',
          'images',
          'promotions',
        ],
        locale: locale === 'fr' ? 'fr-FR' : 'default',
        currency: locale === 'fr' ? 'EUR' : 'USD',
      },
    })

    return product as unknown as Product
  } catch (error) {
    console.log(await ensureSDKResponseError(error, 'Failed to fetch product'))
    return
  }
}

export async function getProductRecommendations({
  productId,
  locale,
}: {
  productId: string
  locale: string
}) {
  'use cache'
  cacheLife('days')
  cacheTag(TAGS.productRecommendations)

  const product = await getProduct({ id: productId, locale })
  const categoryId = product?.categoryId

  if (!categoryId) return []

  const results = await searchProducts({
    refine: [`cgid=${categoryId}`],
    limit: 11,
    locale,
  })

  return (
    results?.hits?.filter(
      (product: ProductSearchHit) => product.productId !== productId,
    ) || []
  )
}

export async function searchProducts({
  locale = 'default',
  q = '',
  refine = [],
  sort = defaultSort.sortKey,
  limit = 24,
  allImages = true,
  perPricebook = true,
  allVariationProperties = true,
}: ProductSearchParams) {
  'use cache'
  cacheLife('days')
  cacheTag(TAGS.search)

  const config = await getGuestUserConfig()
  const searchClient = new ShopperSearch(config)

  try {
    const searchResults = (await searchClient.productSearch({
      parameters: {
        q,
        refine,
        sort,
        limit,
        allImages,
        perPricebook,
        allVariationProperties,
        locale: locale === 'fr' ? 'fr-FR' : 'default',
        currency: locale === 'fr' ? 'EUR' : 'USD',
      },
    })) as unknown as ProductSearchResult

    return searchResults
  } catch (error) {
    console.log(await ensureSDKResponseError(error, 'Failed to search products'))
    return
  }
}

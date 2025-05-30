import { ShopperProducts, ShopperSearch } from 'commerce-sdk-isomorphic'
import { TAGS } from 'lib/constants'
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache'
import { getGuestUserConfig } from './auth'
import { defaultSort, storeCatalog } from './constants'
import { reshapeCategories } from './reshape'
import { Product, ProductSearchResult, SearchProductsParameters } from './types'

export async function getProduct(id: string) {
  // 'use cache'
  // cacheTag(TAGS.products)
  // cacheLife('days')
  console.log('getProduct')
  const config = await getGuestUserConfig()
  const productsClient = new ShopperProducts(config)

  const product = await productsClient.getProduct({
    parameters: {
      id,
      allImages: true,
    },
  })

  return product as unknown as Product
}

export async function getProductRecommendations(productId: string) {
  // The Shopper APIs do not provide a recommendation service. This is typically
  // done through Einstein, which isn't available in this environment.
  // For now, we refetch the product and use the categoryId to get recommendations.
  // This fills the need for now and doesn't require changes to the UI.

  'use cache'
  cacheTag(TAGS.products)
  cacheLife('days')

  const categoryId = (await getProduct(productId)).categoryId

  if (!categoryId) return []

  const results = await searchProducts({
    refine: [`cgid=${categoryId}`],
    limit: 11,
  })

  // Filter out the product we're already looking at.
  return results.hits?.filter((product) => product.id !== productId) || []
}

export async function searchProducts({
  q = '',
  refine = [],
  sort = defaultSort.sortKey,
  limit = 24,
  allImages = true,
  perPricebook = true,
  allVariationProperties = true,
}: SearchProductsParameters): Promise<ProductSearchResult> {
  // 'use cache'
  // cacheTag(TAGS.search)
  // cacheLife('days')
  console.log('searchProducts')
  const config = await getGuestUserConfig()

  const searchClient = new ShopperSearch(config)

  const searchResults = (await searchClient.productSearch({
    parameters: {
      q,
      refine,
      sort,
      limit,
      allImages,
      perPricebook,
      allVariationProperties,
    },
  })) as unknown as ProductSearchResult

  return searchResults
}

async function getSFCCCollections() {
  const config = await getGuestUserConfig()
  const productsClient = new ShopperProducts(config)

  const result = await productsClient.getCategories({
    parameters: {
      ids: storeCatalog.ids,
    },
  })

  return reshapeCategories(result?.data || [])
}

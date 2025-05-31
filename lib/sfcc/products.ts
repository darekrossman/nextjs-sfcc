import { ShopperProducts, ShopperSearch } from 'commerce-sdk-isomorphic'
import { TAGS } from 'lib/constants'
import { unstable_cache as cache } from 'next/cache'
import { getGuestUserConfig } from './auth'
import { defaultSort } from './constants'
import { Product, ProductSearchResult, SearchProductsParameters } from './types'

export const getProduct = cache(
  async (id: string) => {
    const config = await getGuestUserConfig()
    const productsClient = new ShopperProducts(config)

    const product = await productsClient.getProduct({
      parameters: {
        id,
        allImages: true,
      },
    })

    return product as unknown as Product
  },
  ['get-product'],
  { tags: [TAGS.products] },
)

export const getProductRecommendations = cache(
  async (productId: string) => {
    const categoryId = (await getProduct(productId)).categoryId

    if (!categoryId) return []

    const results = await searchProducts({
      refine: [`cgid=${categoryId}`],
      limit: 11,
    })

    return results.hits?.filter((product) => product.id !== productId) || []
  },
  ['get-product-recommendations'],
  { tags: [TAGS.productRecommendations] },
)

export const searchProducts = cache(
  async ({
    q = '',
    refine = [],
    sort = defaultSort.sortKey,
    limit = 24,
    allImages = true,
    perPricebook = true,
    allVariationProperties = true,
  }: SearchProductsParameters) => {
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
  },
  ['search-products'],
  { tags: [TAGS.search] },
)

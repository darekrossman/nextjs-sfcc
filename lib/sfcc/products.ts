import { ShopperProducts, ShopperSearch } from 'commerce-sdk-isomorphic'
import { TAGS } from 'lib/constants'
import { unstable_cache as cache } from 'next/cache'
import { getGuestUserConfig } from './auth'
import { defaultSort } from './constants'
import { Product, ProductSearchResult, ProductSearchParams } from './types'
import { ensureSDKResponseError } from './type-guards'

export const getProduct = cache(
  async ({ id, locale }: { id: string; locale: string }) => {
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
  },
  ['get-product'],
  { tags: [TAGS.products] },
)

export const getProductRecommendations = cache(
  async ({ productId, locale }: { productId: string; locale: string }) => {
    const product = await getProduct({ id: productId, locale })
    const categoryId = product?.categoryId

    if (!categoryId) return []

    const results = await searchProducts({
      refine: [`cgid=${categoryId}`],
      limit: 11,
      locale,
    })

    return results?.hits?.filter((product) => product.id !== productId) || []
  },
  ['get-product-recommendations'],
  { tags: [TAGS.productRecommendations] },
)

export const searchProducts = cache(
  async ({
    locale = 'default',
    q = '',
    refine = [],
    sort = defaultSort.sortKey,
    limit = 24,
    allImages = true,
    perPricebook = true,
    allVariationProperties = true,
  }: ProductSearchParams) => {
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
  },
  ['search-products'],
  { tags: [TAGS.search] },
)

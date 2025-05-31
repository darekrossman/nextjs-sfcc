import {
  ShopperBasketsTypes,
  ShopperProductsTypes,
  ShopperSearchTypes,
} from 'commerce-sdk-isomorphic'
import { OmitFromKnownKeys } from '../type-utils'

export type Connection<T> = {
  edges: Edge<T>[]
}

export type Edge<T> = {
  node: T
}

export type Collection = {
  handle: string
  title: string
  description: string
  seo: SEO
  updatedAt: string
  path: string
}

export type SalesforceProduct = {
  id: string
  title: string
  handle: string
  categoryId?: string
  description: string
  descriptionHtml: string
  featuredImage: Image
  currencyCode: string
  priceRange: {
    maxVariantPrice: Money
    minVariantPrice: Money
  }
  seo: SEO
  options: ProductOption[]
  tags: string[]
  variants: ProductVariant[]
  images: Image[]
  availableForSale: boolean
  updatedAt: string
  variationValues?: Record<string, string>
}

export type Product = ShopperProductsTypes.Product

export type ProductImage = NonNullable<
  NonNullable<Product['imageGroups']>[number]['images']
>[number]

export type ProductVariant = ShopperProductsTypes.Variant

export type ProductOption = {
  id: string
  name: string
  values: {
    id: string
    name: string
  }[]
}

export type Money = {
  amount: string
  currencyCode: string
}

export type Image = {
  url: string
  altText: string
  height: number
  width: number
}

export type SEO = {
  title: string
  description: string
}

export type ShippingMethod = {
  id: string
  name?: string
  description?: string
  price?: Money
  isDefault?: boolean
}

export type SalesforceCart = {
  id: string | undefined
  checkoutUrl: string
  customerEmail?: string
  cost: {
    subtotalAmount: Money
    totalAmount: Money
    totalTaxAmount: Money
    shippingAmount?: Money
  }
  lines: Connection<CartItem>
  totalQuantity: number
  shippingAddress?: Address
  billingAddress?: Address
  shippingMethod?: ShippingMethod
  paymentInstruments?: ShopperBasketsTypes.OrderPaymentInstrument[]
}

export type Address = {
  firstName?: string
  lastName?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  phone?: string
}

export type Cart = ShopperBasketsTypes.Basket

export type Order = Cart & {
  orderNumber: string
}

export type CartItem = ShopperBasketsTypes.ProductItem

export type CartProductPartial = {
  id: string
  name: string
  image?: ProductImage
  values: Record<string, string | number | undefined>
  currency: string
}

export type ProductRecommendations = {
  id: string
  name: string
  recommendations: RecommendedProduct[]
}

export type RecommendedProduct = {
  recommended_item_id: string
  recommendation_type: {
    _type: string
    display_value: string
    value: number
  }
}

export type Menu = {
  title: string
  path: string
}

export type Page = {
  id: string
  title: string
  handle: string
  body: string
  bodySummary: string
  seo?: SEO
  createdAt: string
  updatedAt: string
}

export type SortedProductResult = {
  productResult: ShopperProductsTypes.Product
  index: number
}

export type ProductSearchResult = OmitFromKnownKeys<
  ShopperSearchTypes.ProductSearchResult,
  'hits'
> & {
  hits?: ProductSearchHit[]
}

export type ProductSearchHit = ShopperSearchTypes.ProductSearchHit

export type SearchProductsParameters = {
  select?: string
  q?: string
  refine?: Array<string>
  sort?: string
  currency?: string
  locale?: string
  expand?: Array<string>
  allImages?: boolean
  perPricebook?: boolean
  allVariationProperties?: boolean
  offset?: number
  limit?: number
}

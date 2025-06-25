import {
  ShopperBasketsTypes,
  ShopperOrdersTypes,
  ShopperProductsTypes,
} from 'commerce-sdk-isomorphic'
import {
  Cart,
  CartItem,
  Collection,
  Image,
  Order,
  Product,
  ShippingMethod,
} from './types'

export function reshapeShippingMethods(
  shippingMethods: ShopperBasketsTypes.ShippingMethodResult,
): ShippingMethod[] {
  return (
    shippingMethods.applicableShippingMethods?.map((method) => ({
      id: method.id,
      name: method.name,
      description: method.description,
      price:
        method.price !== undefined
          ? {
              amount: method.price.toString(),
              currencyCode: method.currencyCode || 'USD',
            }
          : undefined,
      isDefault: shippingMethods.defaultShippingMethodId === method.id,
    })) || []
  )
}

function reshapeCategory(
  category: ShopperProductsTypes.Category,
): Collection | undefined {
  if (!category) {
    return undefined
  }

  return {
    handle: category.id,
    title: category.name || '',
    description: category.description || '',
    seo: {
      title: category.pageTitle || '',
      description: category.description || '',
    },
    updatedAt: '',
    path: `/search/${category.id}`,
  }
}

function reshapeProduct(product: ShopperProductsTypes.Product) {
  if (!product.name) {
    throw new Error('Product name is not set')
  }

  const images = reshapeImages(product.imageGroups)

  if (!images[0]) {
    throw new Error('Product image is not set')
  }

  return {
    id: product.id,
    handle: product.id,
    title: product.name,
    description: product.shortDescription || '',
    descriptionHtml: product.longDescription || '',
    categoryId: product.primaryCategoryId,
    tags: product['c_product-tags'] || [],
    featuredImage: images[0],
    availableForSale: true,
    currencyCode: product.currency || 'USD',
    priceRange: {
      // In the unlikely case of a missing price, we set a default of $9999.99 to avoid listing items
      // as $0. This is preferrable for most merchants to avoid having to honor free purchases.
      maxVariantPrice: {
        amount: product.priceMax?.toString() || product.price?.toString() || '9999.99',
        currencyCode: product.currency || 'USD',
      },
      minVariantPrice: {
        amount: product.price?.toString() || '9999.99',
        currencyCode: product.currency || 'USD',
      },
    },
    images: images,
    options:
      product.variationAttributes?.map((attribute) => {
        return {
          id: attribute.id,
          name: attribute.name!,
          values:
            attribute.values
              ?.filter((v) => v.value !== undefined)
              ?.map((v) => ({
                id: v.value!,
                name: v.name!,
              })) || [],
        }
      }) || [],
    seo: {
      title: product.pageTitle || '',
      description: product.pageDescription || '',
    },
    variants: reshapeVariants(product.variants || [], product),
    variationValues: product.variationValues,
    updatedAt: product['c_updated-date'],
  }
}

function reshapeImages(
  imageGroups: ShopperProductsTypes.ImageGroup[] | undefined,
): Image[] {
  if (!imageGroups) return []

  const largeGroup = imageGroups.filter((g) => g.viewType === 'large')

  const images = [...largeGroup].map((group) => group.images).flat()

  return images.map((image) => {
    return {
      altText: image.alt!,
      url: image.disBaseLink || image.link,
      width: image.width || 800,
      height: image.height || 800,
    }
  })
}

function reshapeVariants(
  variants: ShopperProductsTypes.Variant[],
  product: ShopperProductsTypes.Product,
) {
  return variants.map((variant) => reshapeVariant(variant, product))
}

function reshapeVariant(
  variant: ShopperProductsTypes.Variant,
  product: ShopperProductsTypes.Product,
) {
  return {
    id: variant.productId,
    title: product.name || '',
    availableForSale: variant.orderable || false,
    selectedOptions:
      Object.entries(variant.variationValues || {}).map(([key, value]) => ({
        name: product.variationAttributes?.find((attr) => attr.id === key)?.name || key,
        value:
          product.variationAttributes
            ?.find((attr) => attr.id === key)
            ?.values?.find((v) => v.value === value)?.name || '',
      })) || [],
    price: {
      amount: variant.price?.toString() || '0',
      currencyCode: product.currency || 'USD',
    },
  }
}

function reshapeBasket(
  basket: ShopperBasketsTypes.Basket,
  cartItems: CartItem[],
): Cart {
  // For demo purposes, we are assuming there's a single shipment.
  const shipment = basket.shipments?.[0]
  const shippingAddress = shipment?.shippingAddress
  const shippingMethod = shipment?.shippingMethod
  const billingAddress = basket.billingAddress
  const customerEmail = basket.customerInfo?.email

  const { orderTotal, productSubTotal = 0, merchandizeTotalTax = 0 } = basket

  return {
    id: basket.basketId!,
    checkoutUrl: '/checkout/information',
    cost: {
      subtotalAmount: {
        amount: basket.productSubTotal?.toString() || '0',
        currencyCode: basket.currency || 'USD',
      },
      totalAmount: {
        amount:
          orderTotal != null
            ? orderTotal.toString()
            : `${productSubTotal + merchandizeTotalTax}`,
        currencyCode: basket.currency || 'USD',
      },
      totalTaxAmount: {
        amount: basket.merchandizeTotalTax?.toString() || '0',
        currencyCode: basket.currency || 'USD',
      },
      shippingAmount: shippingMethod && {
        amount: shippingMethod?.price?.toString() || '0',
        currencyCode: basket.currency || 'USD',
      },
    },
    totalQuantity: cartItems?.reduce((acc, item) => acc + (item?.quantity ?? 0), 0) ?? 0,
    lines: cartItems,
    shippingMethod: shippingMethod && {
      id: shippingMethod.id,
      name: shippingMethod.name,
      description: shippingMethod.description,
      price:
        shippingMethod.price !== undefined
          ? {
              amount: shippingMethod.price.toString(),
              currencyCode: basket.currency || 'USD',
            }
          : undefined,
    },
    shippingAddress: shippingAddress && {
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      address1: shippingAddress.address1,
      address2: shippingAddress.address2,
      city: shippingAddress.city,
      state: shippingAddress.stateCode,
      zip: shippingAddress.postalCode,
      country: shippingAddress.countryCode || 'US',
      phone: shippingAddress.phone,
    },
    billingAddress: billingAddress && {
      firstName: billingAddress.firstName,
      lastName: billingAddress.lastName,
      address1: billingAddress.address1,
      address2: billingAddress.address2,
      city: billingAddress.city,
      state: billingAddress.stateCode,
      zip: billingAddress.postalCode,
      country: billingAddress.countryCode || 'US',
      phone: billingAddress.phone,
    },
    customerEmail: customerEmail,
    paymentInstruments: basket.paymentInstruments,
  }
}

export function reshapeOrder(
  order: ShopperOrdersTypes.Order,
  cartItems: CartItem[],
): Order {
  const cart = reshapeBasket(order as ShopperBasketsTypes.Basket, cartItems)
  return {
    ...cart,
    id: order.orderNo || '',
    orderNumber: order.orderNo || '',
  }
}

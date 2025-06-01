import {
  ShopperBaskets,
  ShopperBasketsTypes,
  ShopperOrders,
  ShopperOrdersTypes,
} from 'commerce-sdk-isomorphic'
import { cookies } from 'next/headers'
import { getGuestUserConfig } from './auth'
import { reshapeOrder, reshapeShippingMethods } from './reshape'
import { ensureSDKResponseError } from './type-guards'
import { getCardType, maskCardNumber } from './utils'

export async function updateCustomerInfo(email: string) {
  const cartId = (await cookies()).get('cartId')?.value!
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  try {
    const basketClient = new ShopperBaskets(config)

    await basketClient.updateCustomerForBasket({
      parameters: {
        basketId: cartId,
      },
      body: {
        email: email,
      },
    })
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error updating basket email')
    throw new Error(error)
  }
}

export async function updateShippingAddress(
  shippingAddress: ShopperBasketsTypes.OrderAddress,
) {
  const cartId = (await cookies()).get('cartId')?.value!
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  try {
    const basketClient = new ShopperBaskets(config)

    // Use 'me' as the shipment ID, which refers to the current customer's default shipment
    await basketClient.updateShippingAddressForShipment({
      parameters: {
        basketId: cartId,
        shipmentId: 'me',
      },
      body: shippingAddress,
    })
  } catch (e) {
    const error = await ensureSDKResponseError(
      e,
      'Error updating basket shipping address',
    )
    throw new Error(error)
  }
}

export async function updateBillingAddress(
  billingAddress: ShopperBasketsTypes.OrderAddress,
) {
  const cartId = (await cookies()).get('cartId')?.value!
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  try {
    const basketClient = new ShopperBaskets(config)

    await basketClient.updateBillingAddressForBasket({
      parameters: {
        basketId: cartId,
      },
      body: billingAddress,
    })
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error updating basket billing address')
    throw new Error(error)
  }
}

export async function updateShippingMethod(shippingMethodId: string) {
  const cartId = (await cookies()).get('cartId')?.value!
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  try {
    const basketClient = new ShopperBaskets(config)

    // Use 'me' as the shipment ID, which refers to the current customer's default shipment
    await basketClient.updateShippingMethodForShipment({
      parameters: {
        basketId: cartId,
        shipmentId: 'me',
      },
      body: {
        id: shippingMethodId,
      },
    })
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error updating shipping method')
    throw new Error(error)
  }
}

export async function addPaymentMethod(paymentData: {
  cardNumber: string
  cardholderName: string
  expirationMonth: number
  expirationYear: number
  securityCode: string
}) {
  const cartId = (await cookies()).get('cartId')?.value!
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  try {
    const basketClient = new ShopperBaskets(config)

    // Using the simplest example with credit card payment type for demo purposes.
    // Real implementations might also incorporate 3p payment providers as well.
    await basketClient.addPaymentInstrumentToBasket({
      parameters: {
        basketId: cartId,
      },
      body: {
        amount: 0, // Calculated by server based on basket total
        paymentMethodId: 'CREDIT_CARD',
        paymentCard: {
          cardType: getCardType(paymentData.cardNumber),
          maskedNumber: maskCardNumber(paymentData.cardNumber),
          expirationMonth: paymentData.expirationMonth,
          expirationYear: paymentData.expirationYear,
        },
      },
    })

    // In a real implementation, the security code would be handled by the payment processor
    // and not stored in the commerce system
  } catch (e) {
    const error = await ensureSDKResponseError(
      e,
      'Error adding payment instrument to basket',
    )
    throw new Error(error)
  }
}

export async function getShippingMethods() {
  const cartId = (await cookies()).get('cartId')?.value!
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  try {
    const basketClient = new ShopperBaskets(config)

    // Use 'me' as the shipment ID, which refers to the current customer's default shipment
    const shippingMethods = await basketClient.getShippingMethodsForShipment({
      parameters: {
        basketId: cartId,
        shipmentId: 'me',
      },
    })

    return reshapeShippingMethods(shippingMethods)
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error fetching shipping methods')
    throw new Error(error)
  }
}

export async function placeOrder() {
  const cartId = (await cookies()).get('cartId')?.value!
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  try {
    const ordersClient = new ShopperOrders(config)

    // NOTE: Need to cast to the proper type. Looks like a bug in the SDK's typedefs.
    const order = (await ordersClient.createOrder({
      body: { basketId: cartId },
    })) as ShopperOrdersTypes.Order

    return order
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error placing order')
    throw new Error(error)
  }
}

export async function getCheckoutOrder() {
  const orderId = (await cookies()).get('orderId')?.value
  const guestToken = (await cookies()).get('guest_token')?.value
  const config = await getGuestUserConfig(guestToken)

  if (!orderId) {
    return
  }

  try {
    const ordersClient = new ShopperOrders(config)

    // NOTE: Need to cast to the proper type. Looks like a bug in the SDK's typedefs.
    const order = (await ordersClient.getOrder({
      parameters: {
        orderNo: orderId,
      },
    })) as ShopperOrdersTypes.Order

    return order
  } catch (e) {
    const sdkError = await ensureSDKResponseError(e)
    if (sdkError) {
      return
    }
    throw e
  }
}

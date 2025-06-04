import {
  authenticateGuestUser,
  getGuestUserConfig,
  getValidGuestUserConfig,
} from './auth'

import { cookies } from 'next/headers'
import { isTokenValid } from './auth'
import { ShopperContexts, ShopperContextsTypes } from 'commerce-sdk-isomorphic'
import { ensureSDKResponseError } from './type-guards'

// =====================================================================
// GET SHOPPER CONTEXT
// =====================================================================

export const getShopperContext = async () => {
  try {
    const contextConfig = await getShopperContextConfig()
    const client = new ShopperContexts(contextConfig.config)

    const context = await client.getShopperContext({
      parameters: {
        usid: contextConfig.usid,
      },
    })

    return context
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error getting shopper context')
    return
  }
}

// =====================================================================
// CREATE SHOPPER CONTEXT
// =====================================================================

export const createShopperContext = async (
  body: ShopperContextsTypes.ShopperContext | undefined = {},
) => {
  try {
    await authenticateGuestUser()
    const contextConfig = await getShopperContextConfig()
    const client = new ShopperContexts(contextConfig.config)

    await client.createShopperContext({
      parameters: {
        usid: contextConfig.usid,
      },
      body,
    })

    return { success: true, body }
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error creating shopper context')
    throw error || e
  }
}

// =====================================================================
// UPDATE SHOPPER CONTEXT
// =====================================================================

export const updateShopperContext = async (
  body: ShopperContextsTypes.ShopperContext | undefined = {},
) => {
  try {
    const contextConfig = await getShopperContextConfig()
    const client = new ShopperContexts(contextConfig.config)

    const context = await client.updateShopperContext({
      parameters: {
        usid: contextConfig.usid,
      },
      body,
    })

    return context
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Error updating shopper context')
    throw error || e
  }
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

async function getShopperContextConfig() {
  const usid = (await cookies()).get('usid')?.value!

  if (!usid) {
    throw new Error('No usid found.')
  }

  const guestToken = (await cookies()).get('guest_token')?.value

  if (!guestToken) {
    /** @todo refresh token if possible */
    throw new Error('No guest token found.')
  }

  if (!isTokenValid(guestToken)) {
    /** @todo refresh token if possible */
    console.log('invalid guest token')
    throw new Error('Invalid guest token.')
  }

  const config = await getGuestUserConfig(guestToken)

  return {
    config,
    usid,
  }
}

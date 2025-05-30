import { ShopperLogin, helpers } from 'commerce-sdk-isomorphic'
import { ensureSDKResponseError } from './type-guards'

export const apiConfig = {
  throwOnBadResponse: true,
  parameters: {
    clientId: process.env.SFCC_CLIENT_ID || '',
    organizationId: process.env.SFCC_ORGANIZATIONID || '',
    shortCode: process.env.SFCC_SHORTCODE || '',
    siteId: process.env.SFCC_SITEID || '',
  },
}

export async function getGuestUserAuthToken() {
  const loginClient = new ShopperLogin(apiConfig)
  try {
    return await helpers.loginGuestUserPrivate(
      loginClient,
      {},
      { clientSecret: process.env.SFCC_SECRET || '' },
    )
  } catch (e) {
    const error = await ensureSDKResponseError(e, 'Failed to retrieve access token')
    throw new Error(error)
  }
}

export async function getGuestUserConfig(token?: string) {
  const guestToken = token || (await getGuestUserAuthToken()).access_token
  return {
    ...apiConfig,
    headers: {
      authorization: `Bearer ${guestToken}`,
    },
  }
}

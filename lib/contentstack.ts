import contentstack, {
  BaseAsset,
  BaseEntry,
  Region,
  Stack,
  StackConfig,
} from '@contentstack/delivery-sdk'

export const createStack = (): Stack => {
  const config: StackConfig = {
    apiKey: process.env.CONTENTSTACK_API_KEY || '',
    deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN || '',
    environment: process.env.CONTENTSTACK_ENVIRONMENT || 'development',
    region: process.env.CONTENTSTACK_REGION as Region | undefined,
    host: process.env.CONTENTSTACK_HOST,
    timeout: process.env.CONTENTSTACK_TIMEOUT
      ? parseInt(process.env.CONTENTSTACK_TIMEOUT)
      : undefined,
  }

  if (!config.apiKey || !config.deliveryToken) {
    throw new Error('Contentstack API key and delivery token are required')
  }

  return contentstack.stack({
    apiKey: config.apiKey,
    deliveryToken: config.deliveryToken,
    environment: config.environment,
    ...(config.region && { region: config.region }),
    ...(config.host && { host: config.host }),
    ...(config.timeout && { timeout: config.timeout }),
  })
}

// Helper functions for common operations
export const getEntry = async <T extends BaseEntry = BaseEntry>(
  stack: Stack,
  contentTypeUid: string,
  entryUid: string,
): Promise<T> => {
  return await stack.contentType(contentTypeUid).entry(entryUid).fetch<T>()
}

export const getEntries = async <T extends BaseEntry = BaseEntry>(
  stack: Stack,
  contentTypeUid: string,
) => {
  return await stack.contentType(contentTypeUid).entry().find<T>()
}

export const getAsset = async <T extends BaseAsset = BaseAsset>(
  stack: Stack,
  assetUid: string,
): Promise<T> => {
  return await stack.asset(assetUid).fetch<T>()
}

export const getAssets = async <T extends BaseAsset = BaseAsset>(stack: Stack) => {
  return await stack.asset().find<T>()
}

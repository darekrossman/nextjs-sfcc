import { revalidateTag } from 'next/cache'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { TAGS } from 'lib/constants'

export async function revalidate(req: NextRequest) {
  const collectionWebhooks = [
    'collections/create',
    'collections/delete',
    'collections/update',
  ]
  const productWebhooks = ['products/create', 'products/delete', 'products/update']
  const topic = (await headers()).get('x-sfcc-topic') || 'unknown'
  const secret = req.nextUrl.searchParams.get('secret')
  const isCollectionUpdate = collectionWebhooks.includes(topic)
  const isProductUpdate = productWebhooks.includes(topic)

  if (!secret || secret !== process.env.SFCC_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.')
    return NextResponse.json({ status: 200 })
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 })
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections)
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products)
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() })
}

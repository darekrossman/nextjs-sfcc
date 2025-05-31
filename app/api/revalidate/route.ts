import { TAGS } from '@/lib/constants'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get('secret')
  const tag = req.nextUrl.searchParams.get('tag')

  if (!secret || secret !== process.env.SFCC_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.')
    return NextResponse.json({ status: 200 })
  }

  if (tag && tag in TAGS) {
    revalidateTag(tag)
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() })
}

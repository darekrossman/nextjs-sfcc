import {
  createShopperContext,
  getShopperContext,
  updateShopperContext,
} from '@/lib/sfcc/context'
import { ShopperContextsTypes } from 'commerce-sdk-isomorphic'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    let sourceCode = cookieStore.get('sourceCode')?.value

    // If sourceCode not in cookies, try to get it from request body
    if (!sourceCode) {
      const body = await request.json().catch(() => ({}))
      sourceCode = body.sourceCode
    }

    if (!sourceCode) {
      return NextResponse.json({ error: 'sourceCode is required' }, { status: 400 })
    }

    let context: ShopperContextsTypes.ShopperContext | undefined

    try {
      context = await getShopperContext()
    } catch (e) {
      // Context doesn't exist or error getting it
    }

    try {
      // Create context if it doesn't exist
      if (!context) {
        await createShopperContext({ sourceCode })
        context = await getShopperContext()
      }
      // Update context if sourceCode doesn't match
      else if (context.sourceCode !== sourceCode) {
        context = await updateShopperContext({ sourceCode })
      }

      if (!context) {
        throw new Error('Failed to create or update shopper context')
      }

      return NextResponse.json({
        success: true,
        context,
        message: 'Shopper context initialized successfully',
      })
    } catch (e) {
      return NextResponse.json(
        { error: 'Failed to manage shopper context' },
        { status: 500 },
      )
    }
  } catch (e) {
    console.error('Unexpected error in shopper context route:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

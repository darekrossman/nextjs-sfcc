import { ImageResponse } from 'next/og'
import LogoIcon from '@/components/icons/logo-animated'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/sfcc'
import { getProductImagesForColor } from '@/lib/sfcc/product-helpers'

export type Props = {
  params: Promise<{ productId: string; locale: 'en' | 'fr' }>
}

export default async function Image(props: Props): Promise<ImageResponse> {
  const params = await props.params
  const product = await getProduct({ id: params.productId, locale: params.locale })

  if (!product) return notFound()

  const image = getProductImagesForColor(product.imageGroups)?.[0]

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {image && <img src={image.link} alt={image.alt || ''} height="100" />}
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}

'use client'

import Image, { ImageProps } from 'next/image'

export const ProductImage = ({ src, ...props }: ImageProps) => {
  const _src = typeof src === 'string' ? src.replace('.png', '.jpg') : src

  return (
    <Image
      src={_src}
      decoding="sync"
      loader={({ src, width, quality }) => {
        return `${src}?sw=${width}&q=${quality || 75}&sfrm=jpg`
      }}
      {...props}
    />
  )
}

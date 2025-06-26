'use client'

import Image, { type ImageProps } from 'next/image'
import { useState, useRef, useEffect, startTransition } from 'react'

type FadeImageProps = ImageProps & {
  fadeInDuration?: number
}

export const FadeImage = ({
  fadeInDuration = 300,
  style,
  ...imageProps
}: FadeImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  // Check if image is already cached when component mounts
  useEffect(() => {
    const img = imageRef.current
    if (img?.complete && img.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [imageProps.src])

  const handleLoad = () => {
    startTransition(() => {
      console.log('handleLoad')
      setIsLoaded(true)
    })
  }

  return (
    <Image
      ref={imageRef}
      onLoad={handleLoad}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: `opacity ${fadeInDuration}ms ease-out`,
        ...style,
      }}
      {...imageProps}
    />
  )
}

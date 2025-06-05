'use client'

import Image, { type ImageProps } from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import * as motion from 'motion/react-client'
import { Box, type BoxProps } from '@/styled-system/jsx'

type FadeImageProps = Omit<ImageProps, 'onLoad' | 'onError'> & {
  containerProps?: BoxProps
  fadeInDuration?: number
  initialOpacity?: number
}

export const FadeImage = ({
  containerProps,
  fadeInDuration = 0.3,
  initialOpacity = 0,
  ...imageProps
}: FadeImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [skipAnimation, setSkipAnimation] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  // Check if image is already loaded (cached) after component mounts
  useEffect(() => {
    const checkIfLoaded = () => {
      const img = imageRef.current
      if (img && img.complete && img.naturalWidth > 0) {
        setImageLoaded(true)
        setSkipAnimation(true)
      }
    }

    // Check immediately
    checkIfLoaded()

    // Also check after a brief delay to catch cases where the ref wasn't ready
    const timeout = setTimeout(checkIfLoaded, 10)

    return () => clearTimeout(timeout)
  }, [])

  const handleLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  const shouldShow = imageLoaded && !hasError

  return (
    <Box position="relative" w="full" h="full" {...containerProps}>
      <motion.div
        initial={{
          opacity: skipAnimation ? 1 : initialOpacity,
        }}
        animate={{
          opacity: shouldShow ? 1 : initialOpacity,
        }}
        transition={{
          duration: skipAnimation ? 0 : fadeInDuration,
          ease: 'easeOut',
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Image ref={imageRef} onLoad={handleLoad} onError={handleError} {...imageProps} />
      </motion.div>
    </Box>
  )
}

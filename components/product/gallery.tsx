'use client'

import Image from 'next/image'
import { useState, useRef, useEffect, use } from 'react'
import { Box, Flex, HTMLStyledProps, styled } from '@/styled-system/jsx'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { css } from '@/styled-system/css'
import { Product } from '@/lib/sfcc/types'
import { token } from '@/styled-system/tokens'
import { useProduct } from './product-context'
import { getProductImagesForColor } from '@/lib/sfcc/product-helpers'
import { UnknownSearchParams } from '@/lib/constants'

export function Gallery({
  imageGroups,
  searchParams,
}: {
  imageGroups?: Product['imageGroups']
  searchParams?: Promise<UnknownSearchParams>
}) {
  const params = searchParams ? use(searchParams) : {}
  const { selections: optimisticSelections } = useProduct()
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const selections = { ...params, ...optimisticSelections }

  const images = getProductImagesForColor(
    imageGroups,
    selections.color as string | undefined,
  )

  // Add scroll event listener to update currentIndex when manually scrolling
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.scrollWidth / images.length
      const newIndex = Math.round(scrollLeft / containerWidth)

      // Only update if index actually changed to avoid unnecessary re-renders
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        setCurrentIndex(newIndex)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [currentIndex, images.length])

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      scrollToImage(newIndex)
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      scrollToImage(newIndex)
    }
  }

  const scrollToImage = (index: number) => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const imageWidth = container.scrollWidth / images.length
    const scrollPosition = imageWidth * index

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <Box
      position="relative"
      h={{ base: 'auto', md: '640px' }}
      aspectRatio={{ mdDown: 1 }}
    >
      <Box
        ref={scrollContainerRef}
        w="100vw"
        overflow="scroll"
        scrollSnapType="x mandatory"
        scrollbar="hidden"
      >
        <Flex align="center" gap={{ base: '0', md: '36vw' }}>
          {currentIndex > 0 && (
            <GalleryButton
              left="0"
              aria-label="Previous image"
              onClick={handlePrev}
              onKeyDown={(e) => handleKeyDown(e, handlePrev)}
            >
              <ArrowLeft size={20} strokeWidth={1} className={css({ y: '0.5px' })} />
            </GalleryButton>
          )}

          {currentIndex < images.length - 1 && (
            <GalleryButton
              right="0"
              aria-label="Next image"
              onClick={handleNext}
              onKeyDown={(e) => handleKeyDown(e, handleNext)}
            >
              <ArrowRight size={20} strokeWidth={1} className={css({ y: '0.5px' })} />
            </GalleryButton>
          )}

          {images?.map((image, i) => {
            return (
              <Box
                key={image.link}
                position="relative"
                flex="1 0 auto"
                w={{ base: '100vw', lg: '64vw' }}
                scrollSnapAlign="start"
                zIndex="1"
              >
                <Box
                  position="relative"
                  w={{ base: '100vw', md: '640px' }}
                  maxW={{ md: '90%' }}
                  mx="auto"
                  aspectRatio={1}
                >
                  <Image
                    src={image.link}
                    alt={image.alt || ''}
                    fill
                    priority={i === 0}
                    sizes={`(max-width: ${token('breakpoints.md')}) 100vw, 640px`}
                  />
                </Box>
              </Box>
            )
          })}

          <Box
            position="relative"
            flex="1 0 auto"
            hideBelow="md"
            w="640px"
            aspectRatio={1}
          />
        </Flex>
      </Box>
    </Box>
  )
}

function GalleryButton(props: HTMLStyledProps<'button'>) {
  return (
    <styled.button
      hideBelow="md"
      mixBlendMode="multiply"
      cursor="pointer"
      display="inline-flex"
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      w="11"
      h="11"
      alignItems="center"
      justifyContent="center"
      zIndex="2"
      bg="transparent"
      color="gray.500"
      boxShadow={{ md: '0 0 0 1px {colors.gray.300/30}' }}
      _hover={{ color: 'gray.800' }}
      tabIndex={0}
      {...props}
    />
  )
}

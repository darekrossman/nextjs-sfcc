'use client'

import { Flex, styled } from '@/styled-system/jsx'
import { carousel } from '@/styled-system/recipes'
import type { ComponentProps } from '@/styled-system/types'
import { createStyleContext } from '@shadow-panda/style-context'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import * as React from 'react'
import { Button } from '../button'
import { Icon } from '../icon'

export type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  pipPaginationRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  pipPaginationApi: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  scrollToIndex: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedCarouselIndex: number
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const { withProvider, withContext } = createStyleContext(carousel)

const BaseCarousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
      },
      plugins,
    )

    const [pipPaginationRef, pipPaginationApi] = useEmblaCarousel({
      axis: 'x',
      containScroll: 'keepSnaps',
      dragFree: true,
      align: 'center',
      slidesToScroll: 1,
    })

    const [selectedCarouselIndex, setSelectedCarouselIndex] = React.useState(0)
    const [canScrollPrev, setCanScrollPrev] = React.useState(api?.canScrollPrev() ?? false)
    const [canScrollNext, setCanScrollNext] = React.useState(api?.canScrollNext() ?? true)

    const onSelect = React.useCallback(
      (api: CarouselApi) => {
        if (!api) {
          return
        }

        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
        setSelectedCarouselIndex(api.selectedScrollSnap())

        if (pipPaginationApi) {
          pipPaginationApi.scrollTo(api.selectedScrollSnap())
        }
      },
      [api, pipPaginationApi],
    )

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
      pipPaginationApi?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
      pipPaginationApi?.scrollNext()
    }, [api])

    const scrollToIndex = React.useCallback(
      (index: number) => {
        api?.scrollTo(index)
        pipPaginationApi?.scrollTo(index)
      },
      [api, pipPaginationApi],
    )

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext],
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on('reInit', onSelect)
      api.on('select', onSelect)

      return () => {
        api?.off('reInit', onSelect)
        api?.off('select', onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          scrollToIndex,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          pipPaginationRef,
          pipPaginationApi,
          selectedCarouselIndex,
        }}
      >
        <styled.div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          className={className}
          {...props}
        >
          {children}
        </styled.div>
      </CarouselContext.Provider>
    )
  },
)

const Viewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, _ref) => {
  const { carouselRef } = useCarousel()

  return <div ref={carouselRef} {...props} />
})

const Content = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return <div ref={ref} {...props} />
})

const Item = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return <styled.div ref={ref} role="group" aria-roledescription="slide" {...props} />
})

type CarouselNavigationProps = ComponentProps<typeof Button>

const Previous = React.forwardRef<HTMLButtonElement, CarouselNavigationProps>(
  ({ className, variant = 'secondary', size = 'icon', ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel()

    return (
      <Button ref={ref} variant={variant} size={size} data-prev disabled={!canScrollPrev} onClick={scrollPrev} {...props}>
        <Icon name="ChevronLeft" />
        <styled.span srOnly>Previous slide</styled.span>
      </Button>
    )
  },
)

const Next = React.forwardRef<HTMLButtonElement, CarouselNavigationProps>(
  ({ className, variant = 'secondary', size = 'icon', ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel()

    return (
      <Button ref={ref} variant={variant} size={size} data-next disabled={!canScrollNext} onClick={scrollNext} {...props}>
        <Icon name="ChevronRight" />
        <styled.span srOnly>Next slide</styled.span>
      </Button>
    )
  },
)

const DynamicPipPagination = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { pipPaginationRef, selectedCarouselIndex, api, scrollToIndex } = useCarousel()

  const totalSlides = api?.scrollSnapList()?.length || 0

  const getPipSize = (pipIndex: number, currentIndex: number) => {
    let sizeInPx = 4

    if (pipIndex === currentIndex) {
      sizeInPx = 10
    }

    if (pipIndex === currentIndex + 1 || pipIndex === currentIndex - 1) {
      sizeInPx = 8
    }

    return `${sizeInPx}px`
  }

  const mapToPipsWidth = (pipsAmount: number, selectedCarouselIndex: number) => {
    const pipGap = 12

    let total = 0

    for (let i = selectedCarouselIndex; i <= selectedCarouselIndex + pipsAmount; i++) {
      if (i === selectedCarouselIndex) {
        total += 10
      }

      if (i === selectedCarouselIndex + 1 || i === selectedCarouselIndex - 1) {
        total += 8
      }

      total += 4
    }

    total += (pipsAmount - 1) * pipGap

    return `${total}px`
  }

  const getPipsViewportWidth = (selectedCarouselIndex: number) => {
    if (totalSlides <= 5) {
      return mapToPipsWidth(totalSlides, selectedCarouselIndex)
    }

    let pipsAmount = 5

    if (selectedCarouselIndex === 0 || selectedCarouselIndex === totalSlides - 1) {
      pipsAmount = 3
    }

    if (selectedCarouselIndex === 1 || selectedCarouselIndex === totalSlides - 2) {
      pipsAmount = 4
    }

    const pipsWidth = mapToPipsWidth(pipsAmount, selectedCarouselIndex)

    return pipsWidth
  }

  const onPipClick = React.useCallback(
    (index: number) => {
      scrollToIndex(index)
    },
    [scrollToIndex],
  )

  if (!totalSlides || totalSlides === 1) return null

  return (
    <styled.div
      ref={pipPaginationRef}
      overflow="hidden"
      style={{ width: getPipsViewportWidth(selectedCarouselIndex) }}
      mx="auto"
      h="2.5"
      willChange="width, height, transform"
      {...props}
    >
      <Flex gap="3" alignItems="center">
        {Array.from({ length: totalSlides }).map((_, pipIndex) => (
          <styled.button
            key={`carousel-pip-${pipIndex}`}
            aria-label={`Go to slide ${pipIndex + 1}`}
            flexShrink="0"
            rounded="full"
            cursor="pointer"
            transition="width 0.2s ease-in-out 0.05s, height 0.2s ease-in-out 0.05s"
            onClick={() => onPipClick(pipIndex)}
            style={{
              width: getPipSize(pipIndex, selectedCarouselIndex),
              height: getPipSize(pipIndex, selectedCarouselIndex),
            }}
            bg={pipIndex === selectedCarouselIndex ? 'brand' : 'gray.100'}
            _hover={{
              bg: pipIndex === selectedCarouselIndex ? 'brand' : 'gray.300',
            }}
          />
        ))}
      </Flex>
    </styled.div>
  )
}

export const Carousel = withProvider(BaseCarousel, 'root')
export const CarouselViewport = withContext(Viewport, 'viewport')
export const CarouselContent = withContext(Content, 'content')
export const CarouselItem = withContext(Item, 'slide')
export const CarouselPrevious = withContext(Previous, 'navigation')
export const CarouselNext = withContext(Next, 'navigation')
export const CarouselPipPagination = withContext(DynamicPipPagination, 'pipPagination')

Carousel.displayName = 'Carousel'
CarouselViewport.displayName = 'CarouselViewport'
CarouselContent.displayName = 'CarouselContent'
CarouselItem.displayName = 'CarouselItem'
CarouselPrevious.displayName = 'CarouselPrevious'
CarouselNext.displayName = 'CarouselNext'

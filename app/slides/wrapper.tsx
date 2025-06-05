'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { css } from '@/styled-system/css'

interface SlideLayoutProps {
  children: React.ReactNode
}

const SlideLayout = ({ children }: SlideLayoutProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [totalSlides, setTotalSlides] = useState(3) // We'll start with 3 slides

  // Extract current slide number from pathname
  const getCurrentSlideNumber = () => {
    const match = pathname.match(/slide-(\d+)/)
    return match && match[1] ? parseInt(match[1]) : 0
  }

  const currentSlide = getCurrentSlideNumber()

  // Navigation handlers
  const navigateToSlide = (slideNumber: number) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      router.push(`/slides/slide-${slideNumber}`)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 1) {
      navigateToSlide(currentSlide - 1)
    }
  }

  const handleNext = () => {
    if (currentSlide < totalSlides) {
      navigateToSlide(currentSlide + 1)
    }
  }

  const handleEscape = () => {
    router.push('/slides')
  }

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          handlePrevious()
          break
        case 'ArrowRight':
          event.preventDefault()
          handleNext()
          break
        case 'Escape':
          event.preventDefault()
          handleEscape()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSlide])

  return (
    <div
      className={css({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bg: 'gray.900',
        color: 'gray.100',
      })}
    >
      {/* Main content area */}
      <main
        className={css({
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 8,
        })}
      >
        {children}
      </main>

      {/* Navigation indicators and controls */}
      {currentSlide > 0 && (
        <div
          className={css({
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            bg: 'white',
            borderTop: '1px solid',
            borderColor: 'gray.200',
            p: 4,
          })}
        >
          <div
            className={css({
              maxW: '1200px',
              mx: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            {/* Progress dots */}
            <div
              className={css({
                display: 'flex',
                gap: 2,
                alignItems: 'center',
              })}
            >
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => navigateToSlide(i + 1)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={css({
                    w: 2,
                    h: 2,
                    rounded: 'full',
                    bg: currentSlide === i + 1 ? 'blue.600' : 'gray.300',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    border: 'none',
                    _hover: {
                      bg: currentSlide === i + 1 ? 'blue.700' : 'gray.400',
                      transform: 'scale(1.2)',
                    },
                  })}
                />
              ))}
            </div>

            {/* Slide counter */}
            <div
              className={css({
                fontSize: 'sm',
                color: 'gray.600',
                fontWeight: 'medium',
              })}
            >
              Slide {currentSlide} of {totalSlides}
            </div>

            {/* Navigation hints */}
            <div
              className={css({
                fontSize: 'xs',
                color: 'gray.500',
                display: { base: 'none', md: 'block' },
              })}
            >
              Use ← → arrows to navigate • ESC to exit
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SlideLayout

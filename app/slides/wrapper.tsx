'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { css } from '@/styled-system/css'
import Image from 'next/image'
import { Box, Center, Divider } from '@/styled-system/jsx'

interface SlideLayoutProps {
  children: React.ReactNode
}

const SlideLayout = ({ children }: SlideLayoutProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [totalSlides, setTotalSlides] = useState(14) // Updated to match presentation outline

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
        '--bg': '{colors.gray.900}',
        '--fg': 'white',
        '--border': '{colors.gray.700}',

        fontFamily: 'var(--fonts-geist-sans)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'var(--bg)',
        color: 'var(--fg)',
        borderColor: 'var(--border)',

        '& li': {
          listStyleType: 'circle',
          '&::marker': {
            color: 'purple.300',
          },
        },
      })}
    >
      <main
        className={css({
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          m: '72px',
          w: '1030px',
          aspectRatio: 1030 / 900,
          textWrap: 'balance',
        })}
      >
        <Divider
          borderStyle="dashed"
          color="var(--border)"
          position="absolute"
          top="0"
          w="100vw"
        />
        <Divider
          borderStyle="dashed"
          color="var(--border)"
          position="absolute"
          bottom="0"
          w="100vw"
        />
        <Divider
          borderStyle="dashed"
          color="var(--border)"
          position="absolute"
          right="0"
          h="100vh"
          orientation="vertical"
        />
        <Divider
          borderStyle="dashed"
          color="var(--border)"
          position="absolute"
          left="0"
          h="100vh"
          orientation="vertical"
        />

        <Box position="absolute" top="3" right="3" w="90" aspectRatio={2048 / 407}>
          <Image src="/demo/vercel-logotype-dark.png" alt="" fill />
        </Box>

        {children}
      </main>
    </div>
  )
}

export default SlideLayout

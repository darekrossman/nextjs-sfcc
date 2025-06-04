'use client'

import { css, cx } from '@/styled-system/css'
import { Box, BoxProps } from '@/styled-system/jsx'
import { motion } from 'motion/react'

export function ColorSkeleton({ className, ...props }: BoxProps) {
  return (
    <Box position="relative" w="full" h="full" overflow="hidden" {...props}>
      <motion.div
        className={cx(
          css({
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
            90deg,
            rgba(99, 102, 241, 0.7) 0%,
            rgba(168, 85, 247, 0.6) 10%,
            rgba(236, 72, 153, 0.7) 20%,
            rgba(251, 146, 60, 0.6) 30%,
            rgba(147, 51, 234, 0.7) 40%,
            rgba(59, 130, 246, 0.6) 50%,
            rgba(217, 70, 239, 0.7) 60%,
            rgba(244, 114, 182, 0.6) 70%,
            rgba(120, 119, 198, 0.7) 80%,
            rgba(255, 119, 198, 0.6) 90%,
            rgba(99, 102, 241, 0.7) 100%
          )`,
            backgroundSize: '200% 100%',
            filter: 'blur(8px)',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.3) 50%,
              transparent 100%
            )`,
              backgroundSize: '50% 100%',
              animation: 'shimmer 3s ease-in-out infinite',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(
              90deg,
              rgba(120, 219, 255, 0.5) 0%,
              rgba(147, 51, 234, 0.4) 25%,
              rgba(236, 72, 153, 0.5) 50%,
              rgba(251, 146, 60, 0.4) 75%,
              rgba(120, 219, 255, 0.5) 100%
            )`,
              backgroundSize: '300% 100%',
              animation: 'swirl 6s linear infinite reverse',
              mixBlendMode: 'soft-light',
            },
          }),
          className,
        )}
        animate={{
          backgroundPosition: ['0% 0%', '-200% 0%'],
        }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
      <style jsx>{`
        @keyframes swirl {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -300% 0%;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -100% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }
      `}</style>
    </Box>
  )
}

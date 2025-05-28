'use client'

import { VisuallyHidden } from '@/styled-system/jsx'
import { Link } from '@/ui/core'
import { CATEGORIES_QUERYResult } from '@/sanity/types'
import { isCssProperty, styled } from '@/styled-system/jsx'
import { AnimatePresence, isValidMotionProp } from 'motion/react'
import * as motion from 'motion/react-client'
import { Dialog } from 'radix-ui'
import { PropsWithChildren, Suspense, use, useState, useEffect } from 'react'
import { token } from '@/styled-system/tokens'
import { css } from '@/styled-system/css'
import { NavButton } from './nav-button'
import { Menu, X } from 'lucide-react'

type NavSheetProps = PropsWithChildren<{
  navPromise: Promise<CATEGORIES_QUERYResult>
}>

const StyledMotionContent = styled(
  motion.div,
  {
    base: {
      position: 'fixed',
      top: { base: '4', md: '6' },
      left: 0,
      maxWidth: '100vw',
      bg: 'gray.800',
      color: 'gray.100',
      overflow: 'hidden',
    },
  },
  {
    shouldForwardProp: (prop, variantKeys) =>
      isValidMotionProp(prop) || (!variantKeys.includes(prop) && !isCssProperty(prop)),
  },
)

const contentVariants = {
  closed: (sm = false) => ({
    top: sm ? 16 : 24,
    width: '0px',
    height: sm ? '44px' : '143px',
    transition: {
      width: { type: 'spring', bounce: 0, visualDuration: 0.25, delay: 0.25 },
      height: { type: 'spring', bounce: 0, visualDuration: 0.1 },
      top: { type: 'spring', bounce: 0, visualDuration: 0.15 },
    },
  }),
  open: (sm = false) => ({
    width: sm ? '100vw' : '375px',
    height: '100dvh',
    top: 0,
    transition: {
      width: { type: 'spring', bounce: 0, visualDuration: 0.15 },
      height: { type: 'spring', bounce: 0, visualDuration: 0.1, delay: 0.2 },
      top: { type: 'spring', bounce: 0, visualDuration: 0.15, delay: 0.2 },
    },
  }),
}

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { x: { type: 'spring', bounce: 0, visualDuration: 0.1 } },
  },
  closed: {
    opacity: 0,
    x: -15,
    transition: { x: { type: 'spring', bounce: 0, visualDuration: 0.2 } },
  },
}

export function NavSheet({ navPromise, children }: PropsWithChildren<NavSheetProps>) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.classList.add('nav-open')
    } else {
      document.body.classList.remove('nav-open')
    }
    return () => {
      document.body.classList.remove('nav-open')
    }
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Trigger asChild>
        <NavButton>
          <X
            strokeWidth={1}
            className={css({
              position: 'absolute',
              opacity: open ? 1 : 0,
              transition: 'opacity 0.2s',
            })}
          />
          <Menu
            strokeWidth={1}
            className={css({
              w: { base: '5', md: '6' },
              h: { base: '5', md: '6' },
              transform: 'translateY(0.5px)',
              opacity: open ? 0 : 1,
              transition: 'opacity 0.2s',
            })}
          />
        </NavButton>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Suspense fallback={null}>
              <NavContent
                navPromise={navPromise}
                open={open}
                setOpen={setOpen}
                isMobile={isMobile}
              />
            </Suspense>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

function NavContent({
  navPromise,
  open,
  setOpen,
  isMobile,
}: {
  navPromise: NavSheetProps['navPromise']
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
}) {
  const navItems = use(navPromise)

  return (
    <Dialog.Content asChild>
      <StyledMotionContent
        variants={contentVariants}
        initial="closed"
        animate="open"
        exit="closed"
        custom={isMobile}
      >
        <motion.ul
          initial="closed"
          animate="open"
          exit="closed"
          variants={listVariants}
          style={{ y: isMobile ? 100 : 200 }}
          className={css({
            px: '4',
          })}
        >
          {navItems.map((item) => {
            if (!item.slug?.current) return null
            return (
              <motion.li key={item._id} variants={itemVariants}>
                <Link
                  href={`/category/${item.slug.current}`}
                  onClick={() => setOpen(false)}
                  display="inline-block"
                  py="3"
                  fontSize="24px"
                  lineHeight="1"
                  fontWeight="light"
                  textBoxEdge="cap alphabetic"
                  textBoxTrim="trim-both"
                  tabIndex={open ? 0 : -1}
                >
                  {item.title}
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>

        <VisuallyHidden>
          <Dialog.Title>Navigation</Dialog.Title>
        </VisuallyHidden>
      </StyledMotionContent>
    </Dialog.Content>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${token('breakpoints.md')})`)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches)
    }

    // Set initial value
    setIsMobile(!mediaQuery.matches)

    // Add listener
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return isMobile
}

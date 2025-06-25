'use client'

import { Stack, VisuallyHidden, styled, Flex, HStack, Divider } from '@/styled-system/jsx'
import Link from '@/components/link'
import { useBreakpoint } from '@/components/hooks/use-breakpoint'
import { MENU_QUERYResult } from '@/sanity/types'
import { AnimatePresence, type Variants } from 'motion/react'
import * as motion from 'motion/react-client'
import { Dialog } from 'radix-ui'
import { PropsWithChildren, Suspense, use, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { token } from '@/styled-system/tokens'
import { css } from '@/styled-system/css'
import { NavButton } from './nav-button'
import { Menu, X } from 'lucide-react'
import { Search } from './search'
import { DialogOverlay } from '@/components/overlays'

type NavSheetProps = PropsWithChildren<{
  navPromise: Promise<{ data: MENU_QUERYResult }>
}>

// Custom type for menu items that can reference both pages and categories
type MenuItemWithReference = {
  _key: string
  label: string | null
  page: {
    _id: string
    _type: 'page' | 'category'
    title: string | null
    slug: { current: string } | null
  } | null
  externalUrl: string | null
  openInNewTab: boolean | null
}

const contentVariants: Variants = {
  closed: (sm = false) => ({
    top: sm ? 16 : 24,
    width: '0px',
    height: sm ? '44px' : '143px',
    transition: {
      width: { type: 'spring', bounce: 0, visualDuration: 0.2, delay: sm ? 0.25 : 0.15 },
      height: { type: 'spring', bounce: 0, visualDuration: 0.1, when: 'afterChildren' },
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

const listVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.04, delayChildren: 0.3 },
  },
  closed: {
    transition: {},
  },
}

const itemVariants: Variants = {
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

const searchVariants: Variants = {
  initial: {
    opacity: 0,
    x: '100%',
    width: 44,
  },
  open: {
    opacity: 1,
    x: '0%',
    width: 44,
    transition: { type: 'spring', bounce: 0, visualDuration: 0.15, delay: 0.25 },
  },
  focus: {
    opacity: 1,
    x: '0%',
    width: 234 - 44,
    transition: { type: 'spring', bounce: 0, visualDuration: 0.15 },
  },
  closed: {
    opacity: 0,
    x: '50%',
    width: 44,
    transition: { type: 'spring', bounce: 0, visualDuration: 0.1, delay: 0 },
  },
}

function NavContent({
  navPromise,
  setOpen,
  isMobile,
  searchFocused,
  handleSearchFocus,
  handleSearchBlur,
}: {
  navPromise: NavSheetProps['navPromise']
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
  searchFocused: boolean
  handleSearchFocus: () => void
  handleSearchBlur: () => void
}) {
  const { data: menu } = use(navPromise)

  return (
    <Dialog.Content
      asChild
      aria-describedby={undefined}
      onOpenAutoFocus={(e) => e.preventDefault()}
      onCloseAutoFocus={(e) => e.preventDefault()}
      onInteractOutside={(e) => {
        // Check if the clicked element is within the search button in the header
        const searchButton = document.querySelector('[data-search-button]')
        if (searchButton && searchButton.contains(e.target as Node)) {
          e.preventDefault()
        }
      }}
    >
      <motion.div
        variants={contentVariants}
        initial="closed"
        animate="open"
        exit="closed"
        custom={isMobile}
        className={css({
          position: 'fixed',
          top: 0,
          left: 0,
          maxWidth: '100vw',
          bg: 'gray.900',
          color: 'gray.100',
          overflow: 'hidden',
          zIndex: 'navSheetOpen',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <motion.div
          initial="initial"
          animate={searchFocused ? 'focus' : 'open'}
          exit="closed"
          variants={searchVariants}
          className={css({
            hideFrom: 'md',
            position: 'fixed',
            top: '4',
            right: 0,
          })}
        >
          <Search
            id="mobile-search"
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onSubmit={() => setOpen(false)}
          />
        </motion.div>

        <Flex direction="column" flex="1" overflow="hidden">
          <styled.div translateY={{ base: '92px', md: '200px' }} flex="1" pb="12">
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={listVariants}
              className={css({ px: '6' })}
            >
              {menu?.menuItems?.map((item) => {
                const menuItem = item as MenuItemWithReference
                if (!menuItem?.page?.slug?.current) return null

                const href =
                  menuItem.page._type === 'category'
                    ? `/category/${menuItem.page.slug.current}`
                    : `/${menuItem.page.slug.current}`

                return (
                  <motion.li key={menuItem._key} variants={itemVariants}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      display="flex"
                      alignItems="center"
                      h="11"
                      fontSize="24px"
                      fontWeight="light"
                    >
                      {menuItem.page?.title || menuItem.label}
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>
          </styled.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <Flex
              position="sticky"
              bottom="0"
              alignItems="center"
              w="full"
              h="12"
              flexShrink="0"
              borderTop="1px solid"
              borderGradient="PeachTreeBorder"
              bg="gray.900/70"
              className={css({
                backdropBlur: 'blur(10px)',
              })}
            >
              <Link
                href="/en"
                onClick={() => setOpen(false)}
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="full"
                px="6"
                flex="1 1 0%"
                fontFamily="mono"
                fontWeight="bold"
                fontSize="sm"
                textTransform="uppercase"
                color="gray.100"
              >
                <styled.div mb="-1px">EN</styled.div>
              </Link>

              <Divider orientation="vertical" h="full" borderGradient="PeachTreeBorder" />

              <Link
                href="/fr"
                onClick={() => setOpen(false)}
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="full"
                px="6"
                flex="1 1 0%"
                fontFamily="mono"
                fontWeight="bold"
                fontSize="sm"
                textTransform="uppercase"
                color="gray.100"
              >
                <styled.div mb="-1px">FR</styled.div>
              </Link>
            </Flex>
          </motion.div>
        </Flex>

        <VisuallyHidden>
          <Dialog.Title>Main Navigation</Dialog.Title>
        </VisuallyHidden>
      </motion.div>
    </Dialog.Content>
  )
}

export function NavSheet({ navPromise }: NavSheetProps) {
  const isMobile = useBreakpoint(token('breakpoints.md'))
  const [open, setOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const handleSearchFocus = () => {
    console.log('searchFocused')
    setSearchFocused(true)
  }

  const handleSearchBlur = () => {
    console.log('searchBlurred')
    setSearchFocused(false)
  }

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

  useEffect(() => {
    if (searchFocused) {
      document.body.classList.add('search-focused')
    } else {
      document.body.classList.remove('search-focused')
    }
    return () => {
      document.body.classList.remove('search-focused')
    }
  }, [searchFocused])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Trigger asChild>
        <NavButton>
          <X
            strokeWidth={1}
            className={css({
              position: 'absolute',
              opacity: open ? 1 : 0,
              transition: 'opacity 0.1s 0.2s',
            })}
          />
          <Menu
            strokeWidth={1}
            className={css({
              w: { base: '5', md: '6' },
              h: { base: '5', md: '6' },
              transform: 'translateY(0.5px)',
              opacity: open ? 0 : 1,
              transition: 'opacity 0.1s 0.2s',
            })}
          />
        </NavButton>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <DialogOverlay className={css({ zIndex: 'navSheetOverlay' })} />

            <Suspense fallback={null}>
              <NavContent
                navPromise={navPromise}
                open={open}
                setOpen={setOpen}
                isMobile={isMobile}
                searchFocused={searchFocused}
                handleSearchFocus={handleSearchFocus}
                handleSearchBlur={handleSearchBlur}
              />
            </Suspense>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

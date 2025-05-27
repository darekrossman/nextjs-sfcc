'use client'

import { VisuallyHidden } from '@/styled-system/jsx'
import { Link } from '@/ui/core'
import { CATEGORIES_QUERYResult } from '@/sanity/types'
import { isCssProperty, styled } from '@/styled-system/jsx'
import { isValidMotionProp } from 'motion/react'
import * as motion from 'motion/react-client'
import { Dialog } from 'radix-ui'
import { PropsWithChildren, Suspense, use, useState } from 'react'

type NavSheetProps = PropsWithChildren<{
  navPromise: Promise<CATEGORIES_QUERYResult>
}>

const StyledMotionContent = styled(
  motion.div,
  {
    base: {
      position: 'fixed',
      top: 0,
      left: 0,
      bg: 'gray.800',
      color: 'gray.100',
      transformOrigin: '34px 22px',
      overflow: 'hidden',
    },
  },
  {
    shouldForwardProp: (prop, variantKeys) =>
      isValidMotionProp(prop) || (!variantKeys.includes(prop) && !isCssProperty(prop)),
  },
)

const contentVariants = {
  closed: {
    top: 12,
    width: '0px',
    height: '44px',
    transition: {
      width: { type: 'spring', bounce: 0, visualDuration: 0.2, delay: 0.2 },
      height: { type: 'spring', bounce: 0, visualDuration: 0.1 },
      top: { type: 'spring', bounce: 0, visualDuration: 0.15 },
    },
  },
  open: {
    width: '100vw',
    height: '100dvh',
    top: 0,
    transition: {
      width: { type: 'spring', bounce: 0, visualDuration: 0.15 },
      height: { type: 'spring', bounce: 0, visualDuration: 0.1, delay: 0.2 },
      top: { type: 'spring', bounce: 0, visualDuration: 0.15, delay: 0.2 },
    },
  },
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
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal forceMount>
        <Suspense fallback={null}>
          <NavContent navPromise={navPromise} open={open} setOpen={setOpen} />
        </Suspense>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function NavContent({
  navPromise,
  open,
  setOpen,
}: {
  navPromise: NavSheetProps['navPromise']
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const navItems = use(navPromise)

  return (
    <Dialog.Content asChild>
      <StyledMotionContent
        variants={contentVariants}
        initial="closed"
        animate={open ? 'open' : 'closed'}
      >
        <motion.ul
          initial="closed"
          animate={open ? 'open' : 'closed'}
          variants={listVariants}
          style={{ y: 100, paddingInline: 16 }}
        >
          {navItems.map((item) => {
            if (!item.slug?.current) return null
            return (
              <motion.li key={item._id} variants={itemVariants}>
                <Link
                  href={`/category/${item.slug.current}`}
                  onClick={() => setOpen(false)}
                  display="block"
                  py="3"
                  fontSize="24px"
                  lineHeight="1"
                  fontWeight="light"
                  textBoxEdge="cap alphabetic"
                  textBoxTrim="trim-both"
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

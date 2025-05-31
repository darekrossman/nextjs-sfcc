'use client'

import { Dialog } from 'radix-ui'
import LoadingDots from 'components/loading-dots'
import Price from 'components/price'
import { DEFAULT_OPTION } from 'lib/constants'
import { createUrl } from 'lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, Suspense, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createCartAndSetCookie, redirectToCheckout } from './actions'
import { useCart } from './cart-context'
import { DeleteItemButton } from './delete-item-button'
import { EditItemQuantityButton } from './edit-item-quantity-button'
import OpenCart from './open-cart'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import {
  Box,
  Center,
  Flex,
  HStack,
  Stack,
  VisuallyHidden,
  styled,
} from '@/styled-system/jsx'
import { token } from '@/styled-system/tokens'
import { useBreakpoint } from '@/ui/core/hooks/use-breakpoint'
import { NavButton } from '../layout/nav-button'
import { ShoppingCartIcon, X } from 'lucide-react'
import { css } from '@/styled-system/css'
import { ProductImage, type CartItem } from '@/lib/sfcc/types'
import { Text } from '@/ui/core'
import { formatPrice, pluralizeWithCount } from '@/lib/helpers'

const contentVariants = {
  closed: (sm = false) => ({
    top: sm ? 16 : 24,
    width: '0px',
    height: '44px',
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

const listVariants = {
  open: {
    transition: { staggerChildren: 0.04, delayChildren: 0.4 },
  },
  closed: {
    transition: {},
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
    x: 25,
    transition: { x: { type: 'spring', bounce: 0, visualDuration: 0.2 } },
  },
}

function MiniCartContent({
  open,
  setOpen,
  isMobile,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
}) {
  const { cart, updateCartItem } = useCart()

  console.log('cart', cart)

  const cartItems = cart?.productItems || []

  return (
    <Dialog.Content asChild aria-describedby={undefined}>
      <motion.div
        variants={contentVariants}
        initial="closed"
        animate="open"
        exit="closed"
        custom={isMobile}
        className={css({
          position: 'fixed',
          top: 0,
          right: 0,
          maxWidth: '100vw',
          bg: 'gray.900',
          color: 'gray.100',
          overflow: 'hidden',
          zIndex: 'popover',
        })}
      >
        <styled.div translateY={{ base: '4', md: '6' }}>
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { type: 'spring', bounce: 0, visualDuration: 0.1, delay: 0.3 },
            }}
            exit={{
              opacity: 0,
              x: 50,
              transition: { type: 'spring', bounce: 0, visualDuration: 0.05 },
            }}
          >
            <HStack
              h="11"
              pl="5"
              pr="44px"
              alignItems="center"
              justifyContent="space-between"
              w="full"
            >
              <Text fontSize="24px" fontWeight="light" color="gray.100" lineHeight="1">
                Cart
              </Text>
              <Center
                border="1px solid transparent"
                h="11"
                px="4"
                style={{
                  borderImage:
                    'linear-gradient(160deg, rgba(152, 158, 203, 0.5) 0%, rgba(141, 166, 194, 0.5) 25%, rgba(167, 172, 180, 0.5) 50%, rgba(210, 175, 163, 0.5) 75%, rgba(238, 174, 147, 0.5) 100%) 1',
                }}
              >
                <Text fontSize="sm" color="gray.100">
                  {pluralizeWithCount(cartItems.length, 'item')}
                </Text>
              </Center>
            </HStack>
          </motion.div>
        </styled.div>

        <Box h={{ base: '8', md: '12' }} />

        <styled.div>
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            variants={listVariants}
          >
            {cartItems.map((item) => {
              return (
                <motion.li
                  key={item.itemId}
                  variants={itemVariants}
                  className={css({
                    borderTop: '1px solid',
                    borderColor: 'gray.800',
                    // _last: { border: 'none' },
                  })}
                >
                  <CartItem item={item} currency={cart?.currency} />
                </motion.li>
              )
            })}
          </motion.ul>
        </styled.div>

        <VisuallyHidden>
          <Dialog.Title>Mini Cart</Dialog.Title>
        </VisuallyHidden>
      </motion.div>
    </Dialog.Content>
  )
}

export default function MiniCart() {
  const { cart, updateCartItem } = useCart()
  const isMobile = useBreakpoint(token('breakpoints.md'))
  const [open, setOpen] = useState(false)

  const quantity = cart?.productItems?.reduce((acc, item) => acc + item.quantity!, 0) || 0

  const quantityOnMount = useRef(quantity)

  useEffect(() => {
    if (open) {
      document.body.classList.add('minicart-open')
    } else {
      document.body.classList.remove('minicart-open')
    }
    return () => {
      document.body.classList.remove('minicart-open')
    }
  }, [open])

  return (
    <Box
      position="fixed"
      top={{ base: '4', md: '6' }}
      right="0"
      zIndex="miniCartOpen"
      className={css({
        '.nav-open &': {
          zIndex: 'miniCartClosed',
        },
        '.minicart-open &': {
          '--fg': '{colors.gray.800}',
          '--bg': '{colors.gray.100}',
          '--border': '{colors.gray.200}',
          '--logo-fill': '{colors.gray.900}',
        },
      })}
    >
      {quantity > 0 && (
        <motion.div
          initial={{ x: quantityOnMount.current > 0 ? 0 : 44 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', bounce: 0, visualDuration: 0.15 }}
          style={{ display: 'flex' }}
        >
          <Flex pos="relative" zIndex="1" bg="var(--bg)" transition="var(--transition)">
            <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
              <Box
                pos="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                bg="{gradients.PeachTree}"
                zIndex="2"
                mixBlendMode="multiply"
                pointerEvents="none"
              />

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
                  <ShoppingCartIcon
                    strokeWidth={1.5}
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
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', bounce: 0, visualDuration: 0.2 }}
                      className={css({
                        bg: 'stone.500/50',
                        position: 'fixed',
                        inset: 0,
                        width: '100vw',
                        height: '100dvh',
                        zIndex: 'modal',
                      })}
                      style={{
                        backdropFilter: 'blur(5px)',
                      }}
                    />

                    <Suspense fallback={null}>
                      <MiniCartContent
                        open={open}
                        setOpen={setOpen}
                        isMobile={isMobile}
                      />
                    </Suspense>
                  </Dialog.Portal>
                )}
              </AnimatePresence>
            </Dialog.Root>
          </Flex>
        </motion.div>
      )}
    </Box>
  )
}

// function CloseCart({ className }: { className?: string }) {
//   return (
//     <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
//       <XMarkIcon
//         className={clsx('h-6 transition-all ease-in-out hover:scale-110', className)}
//       />
//     </div>
//   )
// }

// function CheckoutButton() {
//   const { pending } = useFormStatus()

//   return (
//     <button
//       className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
//       type="submit"
//       disabled={pending}
//     >
//       {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
//     </button>
//   )
// }

function CartItem({ item, currency }: { item: CartItem; currency?: string }) {
  console.log(item)
  const values: Record<string, unknown> = item.c_values ? JSON.parse(item.c_values) : {}
  const image: ProductImage | undefined = item.c_image
    ? JSON.parse(item.c_image)
    : undefined

  return (
    <Flex
      gap="3"
      alignItems="center"
      pl="3"
      pr="4"
      py="4"
      fontSize="24px"
      fontWeight="light"
    >
      <Box bg="gray.900" flexShrink={0}>
        <Image
          src={image?.link || ''}
          alt={image?.altText || ''}
          width={100}
          height={100}
          // className={css({ display: 'block', w: 'auto', objectFit: 'cover' })}
        />
      </Box>

      <Stack gap="3" flex="1">
        <Flex w="full" justifyContent="space-between" gap="4">
          <Text
            fontSize="sm"
            fontWeight="medium"
            lineHeight="18px"
            color="gray.100"
            flex="1"
            maxW="280px"
          >
            {item.productName}
          </Text>
          <Text fontSize="sm" fontWeight="medium" lineHeight="18px" color="gray.100">
            {formatPrice(item.price!, item.currency || currency || 'USD')}
          </Text>
        </Flex>
        <Text fontSize="xs" color="gray.200">
          {Object.entries(values)
            .map(([key, value]) => value)
            .join(' / ')}
        </Text>
      </Stack>
    </Flex>
  )
}

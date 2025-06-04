'use client'

import { Dialog } from 'radix-ui'
import { Price } from 'components/price'
import Image from 'next/image'
import { startTransition, Suspense, use, useEffect, useRef, useState } from 'react'
import { useCart } from './cart-context'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Stack,
  VisuallyHidden,
  styled,
} from '@/styled-system/jsx'
import { token } from '@/styled-system/tokens'
import { useBreakpoint } from '@/ui/core/hooks/use-breakpoint'
import { NavButton } from '../layout/nav-button'
import { Pencil, X } from 'lucide-react'
import { css } from '@/styled-system/css'
import { ProductImage, type CartItem } from '@/lib/sfcc/types'
import { DialogOverlay } from '@/components/overlays'
import { center } from '@/styled-system/patterns'

const contentVariants = {
  closed: (sm = false) => ({
    top: sm ? 16 : 24,
    width: '0px',
    height: '44px',
    transition: {
      width: { type: 'spring', bounce: 0, visualDuration: 0.2, delay: sm ? 0.25 : 0.15 },
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
  isMobile,
}: {
  isMobile: boolean
}) {
  const { cart } = useCart()

  const cartItems = cart?.productItems || []

  return (
    <Dialog.Content
      asChild
      aria-describedby={undefined}
      className={css({
        position: 'fixed',
        top: 0,
        right: 0,
        bg: 'gray.900',
        color: 'gray.100',
        overflow: 'hidden',
        zIndex: 'miniCartContent',
      })}
    >
      <motion.div
        variants={contentVariants}
        initial="closed"
        animate="open"
        exit="closed"
        custom={isMobile}
        className={css({
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        })}
      >
        <VisuallyHidden>
          <Dialog.Title>
            <styled.p fontSize="xl" fontWeight="light">
              Cart
            </styled.p>
          </Dialog.Title>
        </VisuallyHidden>

        <Dialog.Close asChild>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backgroundColor: token('colors.gray.100'),
              color: token('colors.gray.900'),
              transition: {
                opacity: { duration: 0.2 },
                backgroundColor: { duration: 0.2, delay: 0.2 },
                color: { duration: 0.2, delay: 0.2 },
              },
            }}
            className={css({
              position: 'fixed',
              top: { base: '4', md: '6' },
              right: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              w: '11',
              h: '11',
              bg: 'gray.900',
              color: 'gray.100',
              zIndex: 'miniCartCloseButton',
            })}
          >
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

            <X strokeWidth={1} size={20} />
          </motion.button>
        </Dialog.Close>

        <Flex
          direction="column"
          flex="1"
          overflow="auto"
          pt={{ base: '60px', md: '70px' }}
        >
          <Box flex="1" pb="12">
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={listVariants}
            >
              {cartItems.map((item, i) => {
                return (
                  <motion.li
                    key={`${item.productId}-${i}`}
                    variants={itemVariants}
                    className={css({ mb: 0.5 })}
                  >
                    <CartItem item={item} currency={cart?.currency} />
                  </motion.li>
                )
              })}
            </motion.ul>
          </Box>

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
            <HStack flex="1 0 auto" justifyContent="center" gap="2">
              <styled.p
                fontSize="sm"
                fontFamily="mono"
                fontWeight="bold"
                textTransform="uppercase"
                color="gray.100"
              >
                Subtotal
              </styled.p>
              <Price
                amount={cart?.productTotal}
                currency={cart?.currency}
                fontSize="sm"
                fontWeight="medium"
                color="gray.100"
              />
            </HStack>

            <Divider orientation="vertical" h="full" borderGradient="PeachTreeBorder" />

            <styled.button
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="full"
              px="6"
              flex="1 0 auto"
              fontFamily="mono"
              fontWeight="bold"
              fontSize="sm"
              textTransform="uppercase"
            >
              Checkout
            </styled.button>
          </Flex>
        </Flex>
      </motion.div>
    </Dialog.Content>
  )
}

export default function MiniCart() {
  const { cart, cartPromise, setCart } = useCart()
  const [open, setOpen] = useState(false)
  const isMobile = useBreakpoint(token('breakpoints.md')) // client side only!

  const initialCart = use(cartPromise)
  useEffect(() => {
    if (!cart) {
      startTransition(() => {
        setCart(initialCart)
      })
    }
  }, [])

  const quantity = cart?.productItems?.reduce((acc, item) => acc + item.quantity!, 0) || 0

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {quantity > 0 && (
        <motion.div
          initial={{ x: 44, opacity: 1 }}
          animate={{
            x: 0,
            opacity: open ? 0 : 1,
            transition: {
              x: { type: 'spring', bounce: 0, visualDuration: 0.1 },
              opacity: { duration: 0.2, delay: 0.1 },
            },
          }}
          className={css({
            position: 'fixed',
            top: { base: '4', md: '6' },
            right: '0',
            zIndex: 'miniCartOpenButton',
          })}
        >
          <Dialog.Trigger asChild>
            <NavButton bg="gray.900" color="gray.100">
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

              {quantity}
            </NavButton>
          </Dialog.Trigger>
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay>
              <DialogOverlay />
            </Dialog.Overlay>
            <MiniCartContent isMobile={isMobile} />
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
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
  const values: Record<string, unknown> = item.c_values ? JSON.parse(item.c_values) : {}
  const image: ProductImage | undefined = item.c_image
    ? JSON.parse(item.c_image)
    : undefined

  return (
    <Box
      borderBlock="1px solid"
      borderGradient="PeachTreeBorder"
      w={{ base: '100vw', md: '375px' }}
    >
      <Flex gap="3" alignItems="center" pl="3" pr="4" pt="4" pb="4">
        <Box flexShrink={0}>
          <Image
            src={image?.link || ''}
            alt={image?.altText || ''}
            width={100}
            height={100}
          />
        </Box>

        <Stack gap="4" flex="1">
          <Flex w="full" justifyContent="space-between" gap="4">
            <styled.h4
              fontSize="md"
              fontWeight="medium"
              lineHeight="22px"
              color="gray.100"
              flex="1"
            >
              {item.productName}
            </styled.h4>
          </Flex>
          <styled.p fontSize="sm" color="gray.200">
            {Object.entries(values)
              .map(([key, value]) => value)
              .join(' / ')}
          </styled.p>
        </Stack>
      </Flex>

      <Flex alignItems="center" h="9" borderTop="1px dashed" borderColor="neutral.800">
        <styled.button h="full" aspectRatio="1" className={center()}>
          <styled.p srOnly>edit</styled.p>
          <Pencil strokeWidth={1} size={16} />
        </styled.button>

        <Divider orientation="vertical" h="full" color="neutral.800" />

        <styled.button h="full" aspectRatio="1" className={center()}>
          <styled.p srOnly>remove</styled.p>
          <X strokeWidth={1} size={16} />
        </styled.button>

        <Divider orientation="vertical" h="full" color="neutral.800" />
        <Center justifyContent="flex-end" flex="1" px="5">
          <Price
            amount={item.price}
            currency={currency}
            fontSize="sm"
            fontWeight="medium"
            color="gray.100"
          />
        </Center>
      </Flex>
    </Box>
  )
}

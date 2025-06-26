'use client'

import { Dialog } from 'radix-ui'
import { Price } from 'components/price'
import Image from 'next/image'
import { startTransition, use, useEffect, useRef, useState } from 'react'
import { useCart } from './cart-context'
import { AnimatePresence, type Variants } from 'motion/react'
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
import { useBreakpoint } from '@/components/hooks/use-breakpoint'
import { NavButton } from '../layout/nav-button'
import { Minus, Plus, X } from 'lucide-react'
import { css } from '@/styled-system/css'
import { ProductImage, type CartItem } from '@/lib/sfcc/types'
import { DialogOverlay } from '@/components/overlays'
import { center } from '@/styled-system/patterns'
import { ColorSkeleton } from '../color-skeleton'

const contentVariants: Variants = {
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

const itemVariants: Variants = {
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
  const { cart, pending } = useCart()

  const cartItems = cart?.productItems || []

  return (
    <Dialog.Content
      asChild
      aria-describedby={undefined}
      className={css({
        position: 'fixed',
        top: 0,
        right: 0,
        bg: 'zinc.950',
        color: 'zinc.100',
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
            exit={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backgroundColor: token('colors.zinc.100'),
              color: token('colors.zinc.950'),
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
              bg: 'zinc.950',
              color: 'zinc.100',
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
          pt={{ base: '62px', md: '70px' }}
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
                    className={css({ mb: '0.5' })}
                  >
                    <CartItem item={item} />
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
            bg="zinc.950/70"
            className={css({
              backdropBlur: 'blur(10px)',
            })}
          >
            <HStack
              h="full"
              flex="1 1 0%"
              justifyContent="center"
              gap="0"
              overflow="hidden"
              textOverflow="clip"
              px="6"
            >
              <styled.p
                fontSize="sm"
                fontFamily="mono"
                fontWeight="bold"
                textTransform="uppercase"
                color="zinc.100"
                textOverflow="clip"
                mb="-1px"
              >
                Subtotal
              </styled.p>

              <Center minW="64px" position="relative" h="full" justifyContent="flex-end">
                <AnimatePresence>
                  {!pending && (
                    <motion.div
                      key="subtotal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Price
                        amount={cart?.productTotal}
                        currency={cart?.currency}
                        fontSize="sm"
                        fontWeight="medium"
                        color="zinc.100"
                        textAlign="right"
                      />
                    </motion.div>
                  )}
                  {pending && (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        y: '-50%',
                        right: 0,
                      }}
                    >
                      <ColorSkeleton
                        w="50px"
                        h="12px"
                        borderRadius="full"
                        opacity={0.9}
                        className={css({ filter: 'blur(0px)' })}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Center>
            </HStack>

            <Divider orientation="vertical" h="full" borderGradient="PeachTreeBorder" />

            <styled.button
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
            >
              <styled.div mb="-1px">Checkout</styled.div>
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

  const quantity =
    (cart || initialCart)?.productItems?.reduce((acc, item) => acc + item.quantity!, 0) ||
    0
  const quantityRef = useRef(quantity)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!cart) {
      startTransition(() => {
        setCart(initialCart)
      })
    }
  }, [])

  useEffect(() => {
    if (!quantity && open) {
      setOpen(false)
    }

    if (quantityRef.current < quantity && !open) {
      setOpen(true)
    }

    quantityRef.current = quantity
  }, [quantity])

  useEffect(() => {
    if (open) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      document.body.classList.add('minicart-open')
    } else {
      timeoutRef.current = setTimeout(() => {
        document.body.classList.remove('minicart-open')
        timeoutRef.current = null
      }, 300)
    }
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {quantity > 0 && (
          <motion.div
            initial={{ x: 44, opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{
              x: 0,
              opacity: open ? 0 : 1,
              transition: {
                x: { type: 'spring', bounce: 0, visualDuration: 0.2 },
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
              <NavButton bg="zinc.950" color="zinc.100">
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
      </AnimatePresence>

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

function CartItem({ item }: { item: CartItem }) {
  const { cart, removeCartItem, updateItemQuantity } = useCart()
  const values: Record<string, unknown> = item.c_values ? JSON.parse(item.c_values) : {}
  const image: ProductImage | undefined = item.c_image
    ? JSON.parse(item.c_image)
    : undefined

  const isDiscounted = item.price! > item.priceAfterItemDiscount!
  const appliedDiscountText = item.priceAdjustments?.[0]?.itemText

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
              color="zinc.100"
              flex="1"
            >
              {item.productName}
            </styled.h4>
          </Flex>
          <styled.p fontSize="sm" color="zinc.200/70">
            {Object.entries(values)
              .map(([key, value]) => value)
              .join(' / ')}
          </styled.p>
        </Stack>
      </Flex>

      <Flex alignItems="center" h="9" borderTop="1px dashed" borderColor="zinc.800">
        <Flex h="full" alignItems="center">
          <styled.button
            h="full"
            aspectRatio="1"
            className={center()}
            disabled={item.quantity === 1}
            opacity={item.quantity === 1 ? 0.4 : 1}
            onClick={() => updateItemQuantity(item.itemId!, item.quantity! - 1)}
          >
            <styled.p srOnly>reduce quantity</styled.p>
            <Minus strokeWidth={1} size={16} className={css({ translateY: '-0.5px' })} />
          </styled.button>
          <styled.p fontSize="xs" color="zinc.200" w="4" textAlign="center">
            {item.quantity}
          </styled.p>
          <styled.button
            h="full"
            aspectRatio="1"
            className={center()}
            onClick={() => updateItemQuantity(item.itemId!, item.quantity! + 1)}
          >
            <styled.p srOnly>increase quantity</styled.p>
            <Plus
              strokeWidth={1}
              size={16}
              className={css({ transform: 'translate(0.5px, -0.5px)' })}
            />
          </styled.button>
        </Flex>

        <Divider orientation="vertical" h="full" color="zinc.800" />

        <Flex position="relative" flex="1" h="full" alignItems="center">
          <HStack
            justifyContent="space-between"
            flex="1"
            h="full"
            px="4"
            overflow="hidden"
          >
            <div>
              {appliedDiscountText && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <styled.p fontSize="xs" color="emerald.400" fontWeight="medium">
                    {appliedDiscountText}
                  </styled.p>
                </motion.div>
              )}
            </div>

            <HStack position="relative" gap="2">
              <motion.div layout transition={{ duration: 0.15 }}>
                <Price
                  amount={item.price}
                  currency={cart?.currency}
                  fontWeight="medium"
                  style={{
                    fontSize: token(isDiscounted ? 'fontSizes.xs' : 'fontSizes.sm'),
                    textDecoration: isDiscounted ? 'line-through' : 'none',
                    color: token(isDiscounted ? 'colors.zinc.300' : 'colors.zinc.100'),
                  }}
                />
              </motion.div>
              {isDiscounted && (
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Price
                    amount={item.priceAfterItemDiscount}
                    currency={cart?.currency}
                    fontSize="sm"
                    fontWeight="medium"
                    color="zinc.100"
                  />
                </motion.div>
              )}
            </HStack>
          </HStack>
        </Flex>

        <Divider orientation="vertical" h="full" color="neutral.800" />

        <styled.button
          h="full"
          aspectRatio="1"
          className={center()}
          onClick={() => removeCartItem(item.itemId!)}
        >
          <styled.p srOnly>remove</styled.p>
          <X strokeWidth={1} size={16} />
        </styled.button>
      </Flex>
    </Box>
  )
}

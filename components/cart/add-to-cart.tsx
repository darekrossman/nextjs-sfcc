'use client'

import { addItem } from 'components/cart/actions'
import { useProduct } from 'components/product/product-context'
import { Product, ProductVariant } from 'lib/sfcc/types'
import { useActionState } from 'react'
import { useCart } from './cart-context'
import { Center } from '@/styled-system/jsx'
import { styled } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import { PlusIcon } from 'lucide-react'
import { findVariant } from '@/lib/sfcc/product-helpers'

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean
  selectedVariantId: string | undefined
}) {
  // const buttonClasses =
  //   'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white'
  // const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  // if (!availableForSale) {
  //   return (
  //     <button disabled className={clsx(buttonClasses, disabledClasses)}>
  //       Out Of Stock
  //     </button>
  //   )
  // }

  // if (!selectedVariantId) {
  //   return (
  //     <button
  //       aria-label="Please select an option"
  //       disabled
  //       className={clsx(buttonClasses, disabledClasses)}
  //     >
  //       <div className="absolute left-0 ml-4">
  //         <PlusIcon className="h-5" />
  //       </div>
  //       Add To Cart
  //     </button>
  //   )
  // }

  // return (
  //   <button
  //     aria-label="Add to cart"
  //     className={clsx(buttonClasses, {
  //       'hover:opacity-90': true,
  //     })}
  //   >
  //     <div className="absolute left-0 ml-4">
  //       <PlusIcon className="h-5" />
  //     </div>
  //     Add To Cart
  //   </button>
  // )

  return (
    <styled.button
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      h="11"
      fontSize="sm"
      // bg="neutral.900"
      color="neutral.100"
      lineHeight="1"
      cursor="pointer"
      _hover={
        {
          // '--accent': '{gradients.PeachTree}',
        }
      }
      className={css({
        '--accent': '{colors.stone.600}',
      })}
    >
      <Center
        w="11"
        h="11"
        bg="var(--accent)"
        // color="{colors.neutral.800}"
        transition="all 0.2s ease-in-out"
      >
        <PlusIcon
          size={16}
          strokeWidth={1}
          className={css({ y: '-0.5px', x: '0.5px' })}
        />
      </Center>
      <Center h="full" px="6" bg="neutral.800">
        Add to Cart
      </Center>
    </styled.button>
  )
}

export function AddToCart({ variants }: { variants?: NonNullable<Product['variants']> }) {
  // const { addCartItem } = useCart()
  const { state } = useProduct()
  const [message, formAction] = useActionState(addItem, null)

  const variant = findVariant(variants, state)
  const defaultVariant = variants?.[0]?.id
  const selectedVariant = variant || defaultVariant
  const addItemAction = formAction.bind(null, selectedVariant?.id)

  return (
    <styled.form
      display="flex"
      // action={async () => {
      //   addCartItem(finalVariant, product)
      //   addItemAction()
      // }}
    >
      <SubmitButton
        availableForSale={Boolean(variant?.orderable)}
        selectedVariantId={selectedVariant?.id}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </styled.form>
  )
}

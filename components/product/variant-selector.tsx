'use client'

import { findVariants } from '@/lib/sfcc/product-helpers'
import { Stack, styled } from '@/styled-system/jsx'
import { stack } from '@/styled-system/patterns'
import { useProduct } from 'components/product/product-context'
import { Product } from 'lib/sfcc/types'
import { startTransition, use, useEffect } from 'react'

export function VariantSelector({
  attributes = [],
  variants = [],
}: {
  attributes?: Product['variationAttributes']
  variants?: Product['variants']
}) {
  const { state, updateSelections } = useProduct()

  const hasNoOptionsOrJustOneOption =
    !attributes.length || (attributes.length === 1 && attributes[0]?.values?.length === 1)

  if (hasNoOptionsOrJustOneOption) {
    return null
  }

  return (
    <Stack gap="6">
      {attributes.map((attr) => (
        <styled.dl key={attr.id} className={stack({ gap: '3' })}>
          <styled.dt color="neutral.600" fontSize="xs" fontWeight="medium" lineHeight="1">
            {attr.name}
          </styled.dt>
          <styled.dd display="flex" flexWrap="wrap" gap="2">
            {attr.values?.map((attrValue) => {
              const isActive = state[attr.id] === attrValue.value

              // Potential matching variants for current selections with this attribute value.
              const matchingVariants =
                findVariants(variants, {
                  ...state,
                  [attr.id]: attrValue.value,
                }) || []

              // Attribute value is selectable if it has matching variants and is orderable.
              const selectable = matchingVariants.length > 0 && attrValue.orderable

              return (
                <styled.button
                  key={attrValue.value}
                  aria-disabled={!selectable}
                  disabled={!selectable}
                  title={`${attr.name} ${attrValue.name}${!selectable ? ' (Out of Stock)' : ''}`}
                  position="relative"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  h="9"
                  px="4"
                  fontSize="xs"
                  lineHeight="1"
                  color="neutral.800"
                  border="1px solid"
                  borderColor={isActive ? 'stone.500' : 'stone.400/50'}
                  _after={{
                    content: isActive ? '""' : '',
                    position: 'absolute',
                    top: '-1px',
                    right: '-1px',
                    width: '0',
                    height: '0',
                    borderLeft: '8px solid transparent',
                    borderTop: '8px solid {colors.stone.500}',
                  }}
                  onClick={() => {
                    updateSelections({ [attr.id]: attrValue.value })
                  }}
                >
                  {attrValue.name}
                </styled.button>
              )
            })}
          </styled.dd>
        </styled.dl>
      ))}
    </Stack>
  )
}

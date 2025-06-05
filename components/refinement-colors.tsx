'use client'

import { REFINEMENT_COLORS } from '@/lib/constants'
import { toggleRefinementForQuery } from '@/lib/sfcc/product-helpers'
import { ProductSearchResult, ProductSearchParams } from '@/lib/sfcc/types'
import { css } from '@/styled-system/css'
import { Center, Stack } from '@/styled-system/jsx'
import { Link } from '@/ui/core'
import { startTransition, useOptimistic, useState, useTransition } from 'react'
import { useSearchState } from './search-context'
import { usePathname } from 'next/navigation'

export function RefinementColors({
  refinement,
  selectedColors = [],
  searchParams,
}: {
  refinement: ProductSearchResult['refinements'][number]
  selectedColors: string[]
  searchParams: ProductSearchParams
}) {
  const pathname = usePathname()
  const { startTransition } = useSearchState()
  const [optimisticColors, setOptimisticColors] = useOptimistic(
    selectedColors,
    (state: string[], update: string[]) => {
      return update
    },
  )

  const updateColors = (color: string) => {
    const updatedColors = optimisticColors.includes(color)
      ? optimisticColors.filter((c) => c !== color)
      : [...optimisticColors, color]

    startTransition(() => {
      setOptimisticColors(updatedColors)
    })
  }

  return (
    <Stack gap="0.5" alignItems="flex-start" pt="8">
      {refinement.values?.map((value, j) => {
        if (value.hitCount === 0) {
          return null
        }
        const isSelected = optimisticColors.includes(value.label)

        const query = toggleRefinementForQuery({
          params: searchParams,
          attributeId: 'c_refinementColor',
          value: value.label,
        })

        const hasQuery = Object.values(query).some(Boolean)

        return (
          <Center key={`${refinement.attributeId}-${value.label}-${j}`}>
            <Link
              href={hasQuery ? { query } : { pathname }}
              position="relative"
              prefetch={false}
              display="block"
              w={isSelected ? '16' : '8'}
              h="8"
              bg="var(--refinement-color)"
              transition="width 0.15s ease-out"
              _hover={{
                w: isSelected ? '16' : '9',
              }}
              onClick={() => {
                updateColors(value.label)
              }}
              className={css({
                _after: {
                  content: '""',
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '0',
                  height: '0',
                  borderLeft: '6px solid transparent',
                  borderBottom: '6px solid var(--bg)',
                  // borderBottomColor: isSelected ? 'black/30' : 'var(--bg)',
                },
              })}
              style={
                {
                  '--refinement-color':
                    REFINEMENT_COLORS[
                      value.presentationId as keyof typeof REFINEMENT_COLORS
                    ].hex,
                } as React.CSSProperties
              }
            >
              <span className={css({ srOnly: true })}>{value.label}</span>
            </Link>
          </Center>
        )
      })}
    </Stack>
  )
}

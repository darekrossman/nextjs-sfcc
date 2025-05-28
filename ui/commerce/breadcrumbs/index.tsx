import { css } from '@/styled-system/css'
import { Box, styled } from '@/styled-system/jsx'
import { flex } from '@/styled-system/patterns'
import { Text } from '@/ui/core'
import Link from 'next/link'
import React from 'react'

/**
 * @todo - this needs to be refactored!
 * - broken down into subcomponents for composability
 * - add a slot recipe
 * - update design and behavior according to figma
 */

export type Breadcrumb = {
  title: string
  categoryId?: string
  href?: string
}

type BreadcrumbsProps = {
  items: Breadcrumb[]
  omitHome?: boolean
  lastActive?: boolean
}

const BreadcrumbItem = ({ item, lastItem }: { item: Breadcrumb; lastItem: boolean }) => {
  const label = (
    <Text
      variant="static14"
      color={lastItem ? 'text.brand' : 'text.weak'}
      data-test="breadcrumb-text"
    >
      {item.title}
    </Text>
  )

  return (
    <styled.li
      h="6"
      display="flex"
      alignItems="center"
      gap="1.5"
      textDecoration="none"
      data-test="breadcrumb-item"
    >
      {item.href ? (
        <Link
          href={item.href}
          data-test="breadcrumb-link"
          className={css({ display: 'block' })}
        >
          {label}
        </Link>
      ) : (
        label
      )}
      {!lastItem && (
        <Text variant="static14" color="text.weak">
          /
        </Text>
      )}
    </styled.li>
  )
}

export const Breadcrumbs = ({
  items = [],
  omitHome = false,
  lastActive = false,
}: BreadcrumbsProps) => {
  const breadcrumbs = items.map((item, index, array) => {
    if (!lastActive && index === array.length - 1) {
      return {
        title: item.title,
      }
    }
    return item
  })

  if (!omitHome) {
    breadcrumbs.unshift({
      title: 'Home',
      href: '/',
    })
  }

  return (
    <nav aria-label="Breadcrumbs" data-test="breadcrumbs" data-info="breadcrumbs">
      <ol className={flex({ flexWrap: 'wrap', gap: '2' })}>
        {breadcrumbs.map((item, i) => (
          <BreadcrumbItem
            key={`bc-${item.title}-${i}`}
            item={item}
            lastItem={i === breadcrumbs.length - 1}
          />
        ))}
      </ol>
    </nav>
  )
}

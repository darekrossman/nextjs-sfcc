'use client'

import { FormattedMessage } from '@/lib/react-intl'
import { styled } from '@/styled-system/jsx'
import { skipLink } from '@/styled-system/recipes'
import React from 'react'

export type SkipLinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  /** The target element's ID to skip to */
  targetId: string
}

/**
 * SkipLink component provides a way for keyboard users to skip repetitive navigation
 * and jump directly to the main content. It's visually hidden by default and becomes
 * visible when focused, following accessibility best practices.
 */
export const SkipLink = React.forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ targetId, ...props }, ref) => {
    return (
      <styled.a
        ref={ref}
        href={`#${targetId}`}
        className={skipLink()}
        onFocus={(e) => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.opacity = '0'
          e.currentTarget.style.transform = 'translateY(-100%)'
        }}
        {...props}
      >
        <FormattedMessage
          id="skipLink.skipToContent"
          defaultMessage="Skip to main content"
        />
      </styled.a>
    )
  },
)

SkipLink.displayName = 'SkipLink'

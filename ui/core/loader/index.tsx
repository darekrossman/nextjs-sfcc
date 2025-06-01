'use client'

import { type HTMLStyledProps, styled } from '@/styled-system/jsx'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

const BaseLoader = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, ...props }, ref) => {
  return (
    <Loader2
      ref={ref}
      size={size}
      {...props}
      style={{
        animation: 'spin 1s linear infinite',
        ...props.style,
      }}
    />
  )
})

export const Loader = styled(BaseLoader, {
  base: {
    animation: 'spin 1s linear infinite',
  },
})

Loader.displayName = 'Loader'
export type LoaderProps = HTMLStyledProps<typeof Loader>

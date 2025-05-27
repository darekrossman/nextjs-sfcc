'use client'

import { Box, type HTMLStyledProps, styled } from '@/styled-system/jsx'
import { button } from '@/styled-system/recipes'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { Loader } from '../loader'

const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    children?: React.ReactNode
    isLoading?: boolean
  }
>(({ asChild = false, type = 'button', children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp ref={ref} type={type} {...props}>
      <Box>
        <div className="button-text">{children}</div>
        <span className="button-spinner">
          <Loader color="currentColor" />
        </span>
      </Box>
    </Comp>
  )
})

export const Button = styled(BaseButton, button)
Button.displayName = 'Button'
export type ButtonProps = HTMLStyledProps<typeof Button>

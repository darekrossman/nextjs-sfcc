'use client'

import { styled } from '@/styled-system/jsx'
import { popover } from '@/styled-system/recipes'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { createStyleContext } from '@shadow-panda/style-context'
import * as React from 'react'

const { withProvider, withContext } = createStyleContext(popover)

const Portal = styled(withContext(PopoverPrimitive.Portal, 'portal'))

const Content = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ align = 'center', side = 'top', sideOffset = 4, children, ...props }, ref) => (
  <Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      side={side}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
      <PopoverArrow />
    </PopoverPrimitive.Content>
  </Portal>
))
Content.displayName = PopoverPrimitive.Content.displayName

export const Popover = styled(withProvider(PopoverPrimitive.Root, 'root'))
export const PopoverTrigger = styled(withContext(PopoverPrimitive.Trigger, 'trigger'))
export const PopoverArrow = styled(withContext(PopoverPrimitive.Arrow, 'arrow'))
export const PopoverContent = styled(withContext(Content, 'content'))

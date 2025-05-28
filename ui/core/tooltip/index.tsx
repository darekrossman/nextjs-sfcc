'use client'

import { styled } from '@/styled-system/jsx'
import { type TooltipVariantProps, tooltip } from '@/styled-system/recipes'
import type { JsxStyleProps } from '@/styled-system/types'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { createStyleContext } from '@shadow-panda/style-context'
import * as React from 'react'

const { withProvider, withContext } = createStyleContext(tooltip)

export const TooltipProvider = TooltipPrimitive.Provider
export const TooltipArrow = styled(withContext(TooltipPrimitive.Arrow, 'arrow'))

const TooltipTriggerBase = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    onFocus?: React.FocusEventHandler<HTMLButtonElement>
    onBlur?: React.FocusEventHandler<HTMLButtonElement>
    onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>
    children: React.ReactNode
    className?: string
    asChild?: boolean
  }
>(
  (
    { onClick, onFocus, onBlur, onKeyUp, onKeyDown, children, asChild = true, className },
    ref,
  ) => {
    const [_open, setOpen] = React.useState(false)

    const handleKeyEvents = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (onKeyUp) onKeyUp(event)
      if (onKeyDown) onKeyDown(event)
      if (event.key === 'Enter' || event.key === ' ') {
        setOpen((prevOpen) => !prevOpen)
      }
    }

    return (
      <TooltipPrimitive.Trigger
        ref={ref}
        asChild={asChild}
        tabIndex={0}
        onClick={(e) => {
          setOpen((prevOpen) => !prevOpen)
          if (onClick) onClick(e)
        }}
        onFocus={(e) => {
          setTimeout(() => setOpen(true), 0)
          if (onFocus) onFocus(e)
        }}
        onBlur={(e) => {
          setOpen(false)
          if (onBlur) onBlur(e)
        }}
        onKeyUp={handleKeyEvents}
        onKeyDown={handleKeyEvents}
        className={className}
      >
        {children}
      </TooltipPrimitive.Trigger>
    )
  },
)

export const TooltipTrigger = styled(withContext(TooltipTriggerBase, 'trigger'))

export type TooltipBaseProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipContent> & {
    text?: React.ReactNode
    alwaysOpen?: boolean
  }

const TooltipBase = ({
  children,
  text,
  defaultOpen,
  alwaysOpen,
  onOpenChange,
  delayDuration = 200,
  disableHoverableContent,
  ...props
}: TooltipBaseProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <TooltipPrimitive.Root
      defaultOpen={defaultOpen}
      open={alwaysOpen || open}
      onOpenChange={setOpen}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <styled.div
        display="contents"
        onClick={(_e) => {
          setOpen(true)
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setOpen(true)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setOpen(true)
          }
        }}
      >
        <TooltipTrigger>{children}</TooltipTrigger>
      </styled.div>
      <TooltipContent data-test="tooltip-content" {...props}>
        {text}
      </TooltipContent>
    </TooltipPrimitive.Root>
  )
}
TooltipBase.displayName = TooltipPrimitive.Root.displayName

export const Tooltip: React.FC<JsxStyleProps & TooltipBaseProps & TooltipVariantProps> =
  styled(withProvider(TooltipBase, 'root'))

const Content = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ children, ...props }, ref) => (
  <TooltipPrimitive.Content ref={ref} {...props}>
    {children}
    <TooltipArrow />
  </TooltipPrimitive.Content>
))
Content.displayName = TooltipPrimitive.Content.displayName

export const TooltipContent = styled(withContext(Content, 'content', { sideOffset: 1 }))

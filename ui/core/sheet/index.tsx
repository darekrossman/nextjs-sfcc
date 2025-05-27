'use client'

import { useIntl } from '@/lib/react-intl'
import { css } from '@/styled-system/css'
import { type HTMLStyledProps, styled } from '@/styled-system/jsx'
import { sheet } from '@/styled-system/recipes'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { createStyleContext } from '@shadow-panda/style-context'
import * as React from 'react'
import { Button } from '../button'
import { Icon } from '../icon'

const { withProvider, withContext } = createStyleContext(sheet)

const Content = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={className} {...props}>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
Content.displayName = SheetPrimitive.Content.displayName

const Body = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
Body.displayName = 'SheetBody'

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    customClose?: React.ReactNode
  }
>(({ className, children, customClose = null, ...props }, ref) => {
  const { formatMessage } = useIntl()
  return (
    <div ref={ref} className={className} {...props}>
      {children}
      {customClose || (
        <SheetClose asChild>
          <Button
            variant="ghosted"
            size="icon"
            aria-label={formatMessage({ id: 'sheet.close', defaultMessage: 'Close' })}
            data-test="dialog-close"
          >
            <Icon name="Close" size="sm" />
            <span className={css({ srOnly: true })}>Close</span>
          </Button>
        </SheetClose>
      )}
    </div>
  )
})
Header.displayName = 'SheetHeader'

type StyledDiv = React.FC<HTMLStyledProps<'div'>>

export const Sheet = styled(withProvider(SheetPrimitive.Root, 'root'))
export const SheetTrigger = styled(withContext(SheetPrimitive.Trigger, 'trigger'))
export const SheetClose = styled(withContext(SheetPrimitive.Close, 'close'))
export const SheetPortal = styled(withContext(SheetPrimitive.Portal, 'portal'))
export const SheetOverlay = styled(withContext(SheetPrimitive.Overlay, 'overlay'))
export const SheetContent = styled(withContext(Content, 'content'))
export const SheetBody = styled(withContext(Body, 'body'))
export const SheetHeader = styled(withContext(Header, 'header'))
export const SheetFooter = withContext(styled.div, 'footer') as StyledDiv
export const SheetTitle = styled(withContext(SheetPrimitive.Title, 'title'))
export const SheetDescription = styled(withContext(SheetPrimitive.Description, 'description'))

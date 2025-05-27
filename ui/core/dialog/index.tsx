'use client'

import { css } from '@/styled-system/css'
import { type HTMLStyledProps, styled } from '@/styled-system/jsx'
import { dialog } from '@/styled-system/recipes'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { createStyleContext } from '@shadow-panda/style-context'
import * as React from 'react'
import { Button } from '../button'
import { Icon } from '../icon'

const { withProvider, withContext } = createStyleContext(dialog)

const DialogPortal = styled(withContext(DialogPrimitive.Portal, 'portal'))
const DialogOverlay = styled(withContext(DialogPrimitive.Overlay, 'overlay'))
export const DialogClose = styled(withContext(DialogPrimitive.Close, 'close'))

const Content = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    customClose?: React.ReactNode
  }
>(({ children, customClose = null, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} {...props}>
      {children}
      {customClose || (
        <DialogClose asChild>
          <Button variant="ghosted" size="icon" data-test="dialog-close">
            <Icon name="Close" size="sm" />
            <span className={css({ srOnly: true })}>Close</span>
          </Button>
        </DialogClose>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
))
Content.displayName = DialogPrimitive.Content.displayName

export const Dialog = styled(withProvider(DialogPrimitive.Root, 'root'))
export const DialogTrigger = styled(withContext(DialogPrimitive.Trigger, 'trigger'))
export const DialogContent = styled(withContext(Content, 'content'))
export const DialogHeader = withContext(styled.div, 'header') as React.FC<HTMLStyledProps<'div'>>
export const DialogFooter = withContext(styled.div, 'footer') as React.FC<HTMLStyledProps<'div'>>
export const DialogTitle = styled(withContext(DialogPrimitive.Title, 'title'))
export const DialogDescription = styled(withContext(DialogPrimitive.Description, 'description'))

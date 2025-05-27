'use client'

import { css, cx } from '@/styled-system/css'
import { type StyledComponent, styled } from '@/styled-system/jsx'
import { dropdownMenu, icon } from '@/styled-system/recipes'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { createStyleContext } from '@shadow-panda/style-context'
import { Check, ChevronRight, Circle } from 'lucide-react'
import * as React from 'react'

const { withProvider, withContext } = createStyleContext(dropdownMenu)

const SubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    insetLeft?: boolean
  }
>(({ className, insetLeft, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cx(insetLeft && css({ pl: '8' }), className)}
    {...props}
  >
    {children}
    <ChevronRight className={icon()} />
  </DropdownMenuPrimitive.SubTrigger>
))
SubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const Content = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} {...props} />
  </DropdownMenuPrimitive.Portal>
))
Content.displayName = DropdownMenuPrimitive.Content.displayName

const Item = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    insetLeft?: boolean
  }
>(({ className, insetLeft, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cx(insetLeft && css({ pl: '8' }), className)}
    {...props}
  />
))
Item.displayName = DropdownMenuPrimitive.Item.displayName

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem ref={ref} {...props}>
    <DropdownMenuItemIndicator>
      <Check className={icon()} />
    </DropdownMenuItemIndicator>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
CheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const RadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} {...props}>
    <DropdownMenuItemIndicator>
      <Circle className={icon({ size: 'xs' })} />
    </DropdownMenuItemIndicator>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
RadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const Label = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    insetLeft?: boolean
  }
>(({ className, insetLeft, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cx(insetLeft && css({ pl: '8' }), className)}
    {...props}
  />
))
Label.displayName = DropdownMenuPrimitive.Label.displayName

export const DropdownMenu = styled(withProvider(DropdownMenuPrimitive.Root, 'root'))
export const DropdownMenuTrigger = styled(withContext(DropdownMenuPrimitive.Trigger, 'trigger'))
export const DropdownMenuGroup = styled(withContext(DropdownMenuPrimitive.Group, 'group'))
export const DropdownMenuPortal = styled(withContext(DropdownMenuPrimitive.Portal, 'portal'))
export const DropdownMenuSub = styled(withContext(DropdownMenuPrimitive.Sub, 'sub'))
export const DropdownMenuRadioGroup = styled(
  withContext(DropdownMenuPrimitive.RadioGroup, 'radioGroup'),
)
export const DropdownMenuSubTrigger = styled(withContext(SubTrigger, 'subTrigger'))
export const DropdownMenuSubContent = styled(
  withContext(DropdownMenuPrimitive.SubContent, 'subContent'),
)
export const DropdownMenuContent = styled(withContext(Content, 'content'))
export const DropdownMenuItem = styled(withContext(Item, 'item'))
export const DropdownMenuCheckboxItem = styled(withContext(CheckboxItem, 'checkboxItem'))
export const DropdownMenuRadioItem = styled(withContext(RadioItem, 'radioItem'))
export const DropdownMenuArrow = styled(withContext(DropdownMenuPrimitive.Arrow, 'arrow'))
export const DropdownMenuLabel = styled(withContext(Label, 'label'))
export const DropdownMenuSeparator = styled(
  withContext(DropdownMenuPrimitive.Separator, 'separator'),
)
export const DropdownMenuItemIndicator = styled(
  withContext(DropdownMenuPrimitive.ItemIndicator, 'itemIndicator'),
)
export const DropdownMenuShortcut = withContext(
  styled('span'),
  'shortcut',
) as StyledComponent<'span'>

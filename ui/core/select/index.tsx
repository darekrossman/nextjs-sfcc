'use client'

import { css } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'
import { icon, select } from '@/styled-system/recipes'
import * as SelectPrimitive from '@radix-ui/react-select'
import { createStyleContext } from '@shadow-panda/style-context'
import { Check } from 'lucide-react'
import * as React from 'react'
import { Icon } from '../icon'

const { withProvider, withContext } = createStyleContext(select)

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    <div>{children}</div>
    <SelectPrimitive.Icon asChild>
      <Icon name="ChevronDown" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
Trigger.displayName = SelectPrimitive.Trigger.displayName

const Viewport = withContext(SelectPrimitive.Viewport, 'viewport')

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref} position={position} data-position={position} {...props}>
      <SelectPrimitive.ScrollUpButton
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          w: 'full',
        })}
      >
        <Icon name="ChevronUp" size="sm" />
      </SelectPrimitive.ScrollUpButton>
      <Viewport data-position={position}>{children}</Viewport>
      <SelectPrimitive.ScrollDownButton
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          w: 'full',
        })}
      >
        <Icon name="ChevronDown" size="sm" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
Content.displayName = SelectPrimitive.Content.displayName

const ItemIndicator = styled(withContext(SelectPrimitive.ItemIndicator, 'itemIndicator'))

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    <ItemIndicator>
      <Check className={icon()} />
    </ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
Item.displayName = SelectPrimitive.Item.displayName

export const Select = styled(
  withProvider(
    SelectPrimitive.Root as React.ForwardRefExoticComponent<
      React.ComponentProps<typeof SelectPrimitive.Root>
    >,
    'root',
  ),
)
export const SelectGroup = styled(withContext(SelectPrimitive.Group, 'group'))
export const SelectValue = styled(withContext(SelectPrimitive.Value, 'value'))
export const SelectTrigger = styled(withContext(Trigger, 'trigger'))
export const SelectContent = styled(withContext(Content, 'content'))
export const SelectLabel = styled(withContext(SelectPrimitive.Label, 'label'))
export const SelectItem = styled(withContext(Item, 'item'))
export const SelectSeparator = styled(withContext(SelectPrimitive.Separator, 'separator'))

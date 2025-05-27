'use client'

import { styled } from '@/styled-system/jsx'
import { radioGroup } from '@/styled-system/recipes'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { createStyleContext } from '@shadow-panda/style-context'
import { Circle } from 'lucide-react'
import * as React from 'react'

const { withProvider, withContext } = createStyleContext(radioGroup)

const Indicator = withContext(RadioGroupPrimitive.Indicator, 'indicator')
const Icon = withContext(Circle, 'icon')

const Item = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ children: _children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item ref={ref} {...props}>
      <Indicator>
        <Icon />
      </Indicator>
    </RadioGroupPrimitive.Item>
  )
})
Item.displayName = RadioGroupPrimitive.Item.displayName

export const RadioGroup = styled(withProvider(RadioGroupPrimitive.Root, 'root'))
export const RadioGroupItem = styled(withContext(Item, 'item'))

'use client'

import { styled } from '@/styled-system/jsx'
import { collapsible } from '@/styled-system/recipes'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { createStyleContext } from '@shadow-panda/style-context'

const { withProvider, withContext } = createStyleContext(collapsible)

export const Collapsible = styled(withProvider(CollapsiblePrimitive.Root, 'root'))
export const CollapsibleTrigger = styled(
  withContext(CollapsiblePrimitive.CollapsibleTrigger, 'trigger'),
)
export const CollapsibleContent = styled(
  withContext(CollapsiblePrimitive.CollapsibleContent, 'content'),
)

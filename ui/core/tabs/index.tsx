'use client'

import { styled } from '@/styled-system/jsx'
import { tabs } from '@/styled-system/recipes'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { createStyleContext } from '@shadow-panda/style-context'

const { withProvider, withContext } = createStyleContext(tabs)

export const Tabs = styled(withProvider(TabsPrimitive.Root, 'root'))
export const TabsList = styled(withContext(TabsPrimitive.List, 'list'))
export const TabsTrigger = styled(withContext(TabsPrimitive.Trigger, 'trigger'))
export const TabsContent = styled(withContext(TabsPrimitive.Content, 'content'))

'use client'

import { styled } from '@/styled-system/jsx'
import { toggle } from '@/styled-system/recipes'
import * as TogglePrimitive from '@radix-ui/react-toggle'

export const Toggle = styled(TogglePrimitive.Root, toggle)

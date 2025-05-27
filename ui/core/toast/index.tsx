'use client'

import { styled } from '@/styled-system/jsx'
import { toast, toastViewport } from '@/styled-system/recipes'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { createStyleContext } from '@shadow-panda/style-context'
import type React from 'react'
import { Icon } from '../icon'

const { withProvider, withContext } = createStyleContext(toast)

export const ToastProvider = ToastPrimitive.Provider
export const ToastViewport = styled(ToastPrimitive.Viewport, toastViewport)
export const Toast = styled(withProvider(ToastPrimitive.Root, 'root', { className: 'group' }))
export const ToastAction = styled(withContext(ToastPrimitive.Action, 'action'))
export const ToastClose = styled(
  withContext(ToastPrimitive.Close, 'close', {
    children: <Icon name="Close" />,
  }),
)
export const ToastTitle = styled(withContext(ToastPrimitive.Title, 'title'))
export const ToastDescription = styled(withContext(ToastPrimitive.Description, 'description'))

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
export type ToastActionElement = React.ReactElement<typeof ToastAction>

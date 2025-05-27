'use client'

import { cx } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'
import { navigationMenu } from '@/styled-system/recipes'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { createStyleContext } from '@shadow-panda/style-context'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

const { withProvider, withContext } = createStyleContext(navigationMenu)

const BaseNavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
    showOverlay?: boolean
  }
>(({ children, showOverlay, ...props }, ref) => {
  const [value, setValue] = React.useState('')
  return (
    <NavigationMenuPrimitive.Root ref={ref} value={value} onValueChange={setValue} {...props}>
      {children}
      <NavigationMenuViewport isOpen={!!value} showOverlay />
    </NavigationMenuPrimitive.Root>
  )
})
BaseNavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const BaseNavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger ref={ref} {...props}>
    {children}
  </NavigationMenuPrimitive.Trigger>
))
BaseNavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const ViewportWrapper = withContext(styled.div, 'viewportWrapper')

const BaseNavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> & {
    isOpen?: boolean
    showOverlay?: boolean
  }
>(({ className, isOpen, showOverlay, ...props }, ref) => (
  <ViewportWrapper>
    {/* {showOverlay && (
      <styled.div
        pos="absolute"
        inset="0"
        h="100vh"
        bg="black"
        zIndex="-1"
        opacity={isOpen ? '0.5' : '0'}
        transition="opacity 180ms"
        pointerEvents={isOpen ? 'auto' : 'none'}
      />
    )} */}
    <NavigationMenuPrimitive.Viewport className={cx(className)} ref={ref} {...props} />
  </ViewportWrapper>
))
BaseNavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

const BaseNavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Content className={cx(className)} ref={ref} {...props}>
    {children}
  </NavigationMenuPrimitive.Content>
))
BaseNavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

export const NavigationMenu = styled(withProvider(BaseNavigationMenu, 'root'))
export const NavigationMenuList = styled(withContext(NavigationMenuPrimitive.List, 'list'))
export const NavigationMenuItem = styled(withContext(NavigationMenuPrimitive.Item, 'item'))
export const NavigationMenuTrigger = styled(withContext(BaseNavigationMenuTrigger, 'trigger'))
export const NavigationMenuContent = styled(withContext(BaseNavigationMenuContent, 'content'))
export const NavigationMenuLink = styled(withContext(NavigationMenuPrimitive.Link, 'link'))
export const NavigationMenuViewport = styled(withContext(BaseNavigationMenuViewport, 'viewport'))
export const NavigationMenuIndicator = styled(
  withContext(NavigationMenuPrimitive.Indicator, 'indicator', {
    children: <div />,
  }),
)

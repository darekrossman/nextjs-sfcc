'use client'

import { cx } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'
import { accordion } from '@/styled-system/recipes'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { createStyleContext } from '@shadow-panda/style-context'
import * as React from 'react'

// const { withProvider, withContext } = createStyleContext(accordion)

// const Header = styled(withContext(AccordionPrimitive.Header, 'header'))

// const Trigger = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
//     iconNameClosed?: React.ComponentProps<typeof Icon>['name']
//     iconNameOpen?: React.ComponentProps<typeof Icon>['name']
//     showDefaultIcon?: boolean
//   }
// >(
//   (
//     {
//       children,
//       className,
//       iconNameClosed = 'Plus',
//       iconNameOpen = 'Minus',
//       showDefaultIcon = true,
//       ...props
//     },
//     ref,
//   ) => (
//     <Header>
//       <AccordionPrimitive.Trigger ref={ref} className={cx('group', className)} {...props}>
//         {children}
//         {showDefaultIcon ? (
//           <>
//             <Icon name={iconNameOpen} display={{ _groupExpanded: 'block', base: 'none' }} />
//             <Icon name={iconNameClosed} display={{ _groupExpanded: 'none', base: 'block' }} />
//           </>
//         ) : null}
//       </AccordionPrimitive.Trigger>
//     </Header>
//   ),
// )

// Trigger.displayName = AccordionPrimitive.Trigger.displayName

// const Content = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
// >(({ children, ...props }, ref) => (
//   <AccordionPrimitive.Content ref={ref} {...props}>
//     <div>{children}</div>
//   </AccordionPrimitive.Content>
// ))
// Content.displayName = AccordionPrimitive.Content.displayName

// export const Accordion = styled(withProvider(AccordionPrimitive.Root, 'root'))
// export const AccordionItem = styled(withContext(AccordionPrimitive.Item, 'item'))
// export const AccordionTrigger = styled(withContext(Trigger, 'trigger'))
// export const AccordionContent = styled(withContext(Content, 'content'))

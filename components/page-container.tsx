import { Flex, FlexProps } from '@/styled-system/jsx'
import { PropsWithChildren } from 'react'

export function PageContainer({ children, ...props }: PropsWithChildren<FlexProps>) {
  return (
    <Flex flexDir="column" flex="1" {...props}>
      {children}
    </Flex>
  )
}

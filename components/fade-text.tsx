import { ReactNode } from 'react'
import { Box, styled } from '@/styled-system/jsx'

export const FadeText = ({
  isPending,
  pendingText,
  children,
}: {
  isPending: boolean
  pendingText: string
  children: ReactNode
}) => {
  return (
    <Box position="relative" display="inline-block">
      <styled.span
        opacity={isPending ? 1 : 0}
        transition="opacity 0.2s ease-in-out"
        position={isPending ? 'static' : 'absolute'}
        top="0"
        left="0"
      >
        {pendingText}
      </styled.span>
      <styled.span
        opacity={isPending ? 0 : 1}
        transition="opacity 0.2s ease-in-out"
        visibility={isPending ? 'hidden' : 'visible'}
      >
        {children}
      </styled.span>
    </Box>
  )
}

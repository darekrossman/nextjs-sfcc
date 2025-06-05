'use client'

import { styled } from '@/styled-system/jsx'
import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment()

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== 'live' && environment !== 'unknown') {
    return null
  }

  return (
    <styled.a
      href="/api/draft-mode/disable"
      position="fixed"
      top="0"
      left="50%"
      transform="translateX(-50%)"
      zIndex="999999"
      fontSize="xs"
      fontFamily="mono"
      textTransform="uppercase"
      bg="red"
      w="auto"
      fontWeight="bold"
      px="4"
      py="2"
      color="white"
    >
      Disable Draft Mode
    </styled.a>
  )
}

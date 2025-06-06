import LogoIcon from '@/components/icons/logo-animated'
import { Box, Divider, HStack, Stack, styled } from '@/styled-system/jsx'
import Link from 'next/link'

export default function Slide8() {
  return (
    <Stack alignItems="center" textAlign="center" w="full" p="72px">
      <styled.h1
        flex="1"
        fontSize="7xl"
        fontWeight="bold"
        lineHeight="1.1"
        textWrap="balance"
      >
        the massive thanks!
      </styled.h1>

      <Box h="16" />
      <Box fontSize="7xl">🙏</Box>
      <Box h="16" />

      <styled.p color="gray.400">See you in New York</styled.p>
    </Stack>
  )
}

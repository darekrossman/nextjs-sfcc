import LogoIcon from '@/components/icons/logo-animated'
import { Box, Divider, HStack, Stack, styled } from '@/styled-system/jsx'
import Link from 'next/link'

export default function Slide8() {
  return (
    <Stack alignItems="center" textAlign="center" w="full" p="72px">
      <Link href="/en">
        <LogoIcon w="220px" fill="white" />
      </Link>

      <Box h="16" />
      <Divider borderStyle="dashed" color="var(--border)" w="200px" />
      <Box h="16" />

      <styled.h1
        flex="1"
        fontSize="7xl"
        fontWeight="bold"
        lineHeight="1.1"
        textWrap="balance"
      >
        the big giant thanks!
      </styled.h1>
    </Stack>
  )
}

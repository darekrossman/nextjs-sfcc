import LogoIcon from '@/components/icons/logo-animated'
import { Box, Divider, HStack, Stack, styled } from '@/styled-system/jsx'
import Link from 'next/link'

export default function Slide7() {
  return (
    <Stack alignItems="center" textAlign="center" w="full" p="72px">
      <styled.h1
        flex="1"
        fontSize="7xl"
        fontWeight="bold"
        lineHeight="1.1"
        textWrap="balance"
      >
        the wrap
      </styled.h1>
    </Stack>
  )
}

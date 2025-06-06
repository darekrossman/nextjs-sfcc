import { css } from '@/styled-system/css'
import { Box, HStack, Stack, styled } from '@/styled-system/jsx'
import { stack } from '@/styled-system/patterns'

export default function Slide5() {
  return (
    <HStack alignItems="flex-start" textAlign="left" w="full" p="72px">
      <styled.h1
        flex="1"
        fontSize="7xl"
        fontWeight="bold"
        lineHeight="1.1"
        textWrap="balance"
      >
        the goods
      </styled.h1>

      <styled.ul
        flex="1"
        listStyleType="circle"
        pl="1.1em"
        fontSize="3xl"
        className={stack({ gap: '7' })}
      >
        <styled.li>Personalization</styled.li>
        <styled.li>i18n & l10n</styled.li>
        <styled.li>Dynamic UX, static speed</styled.li>
        <styled.li>Proper optimistic state</styled.li>
        <styled.li>Self-hosted CMS</styled.li>
      </styled.ul>
    </HStack>
  )
}

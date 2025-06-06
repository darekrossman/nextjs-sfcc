import { HStack, styled } from '@/styled-system/jsx'
import { stack } from '@/styled-system/patterns'

export default function Slide1() {
  return (
    <HStack alignItems="flex-start" textAlign="left" w="full" p="72px">
      <styled.h1
        flex="1"
        fontSize="7xl"
        fontWeight="bold"
        lineHeight="1.1"
        textWrap="balance"
      >
        the plan
      </styled.h1>

      <styled.ul
        flex="1"
        listStyleType="circle"
        pl="1.1em"
        fontSize="3xl"
        className={stack({ gap: '7' })}
      >
        <styled.li>About me</styled.li>
        <styled.li>Project motivation</styled.li>
        <styled.li>Technical overview</styled.li>
        <styled.li>Live demonstration</styled.li>
        <styled.li>Q&A</styled.li>
      </styled.ul>
    </HStack>
  )
}

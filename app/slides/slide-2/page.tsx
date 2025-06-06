import { css } from '@/styled-system/css'
import { Box, HStack, Stack, styled } from '@/styled-system/jsx'
import { stack } from '@/styled-system/patterns'
import Image from 'next/image'

export default function Slide2() {
  return (
    <Stack alignItems="flex-start" textAlign="left" w="full" p="72px">
      <HStack flex="1" justifyContent="space-between" w="full">
        <styled.h1 fontSize="7xl" fontWeight="bold" lineHeight="1.1">
          the person
        </styled.h1>

        <Box>
          <Image src="/demo/pixel-face.png" alt="me" width={200} height={200} />
        </Box>
      </HStack>

      <Box>
        <styled.ul
          listStyleType="disc"
          pl="1.1em"
          fontSize="3xl"
          className={stack({ gap: '7' })}
        >
          <styled.li>Based in St. Pete, Florida</styled.li>
          <styled.li>
            Married with 8 children{' '}
            <styled.span fontSize="2xl" opacity="0.5">
              (2 dogs, 2 cats, 4 chickens)
            </styled.span>
          </styled.li>
          <styled.li>20+ years of tinkering with the web</styled.li>
          <styled.li>Likes building synthesizers and sim racing</styled.li>
          <styled.li>Currently on season 9 of E.R.</styled.li>
        </styled.ul>
      </Box>
    </Stack>
  )
}

import { css } from '@/styled-system/css'
import { Box, Stack, styled } from '@/styled-system/jsx'
import { stack } from '@/styled-system/patterns'

export default function Slide3() {
  return (
    <Stack alignItems="flex-start" textAlign="left" w="full" p="72px">
      <h1
        className={css({
          fontSize: '7xl',
          fontWeight: 'bold',
          lineHeight: '1.1',
          textWrap: 'balance',
        })}
      >
        the reasons
      </h1>

      <Box h="16" />

      <styled.ul
        listStyleType="disc"
        pl="1.1em"
        fontSize="3xl"
        className={stack({ gap: '7' })}
      >
        <styled.li>
          Salesforce lacks a clear path to headless
          <br />
          <styled.p
            fontSize="xl"
            lineHeight="1.5"
            mt="2"
            maxW="60vw"
            textWrap="pretty"
            color="gray.400"
          >
            Limited resources and tooling for businesses and developers, leaves teams to
            struggle for years.
          </styled.p>
        </styled.li>
        <styled.li>
          Existing storefront templates skip real-world complexity
          <br />
          <styled.p
            fontSize="xl"
            lineHeight="1.5"
            mt="2"
            maxW="60vw"
            textWrap="pretty"
            color="gray.400"
          >
            Not enough focus on localization, personalization, live pricing, or common
            merchandising challenges.
          </styled.p>
        </styled.li>
        <styled.li>
          Dynamic experiences are often at odds with performance
          <br />
          <styled.p
            fontSize="xl"
            lineHeight="1.5"
            mt="2"
            maxW="60vw"
            textWrap="pretty"
            color="gray.400"
          >
            Inflexible systems and technical compromises lead to a culture of workarounds.
          </styled.p>
        </styled.li>
        <styled.li>
          Composable architecture makes inefficiency easy
          <br />
          <styled.p
            fontSize="xl"
            lineHeight="1.5"
            mt="2"
            maxW="60vw"
            textWrap="pretty"
            color="gray.400"
          >
            Poor collaboration and planning increases complexity, confusion, and costs.
          </styled.p>
        </styled.li>
      </styled.ul>
    </Stack>
  )
}

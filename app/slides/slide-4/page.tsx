import { css } from '@/styled-system/css'
import { Box, Flex, Grid, GridItem, Stack, styled } from '@/styled-system/jsx'
import { stack } from '@/styled-system/patterns'

export default function Slide4() {
  return (
    <Stack alignItems="flex-start" textAlign="left" w="full" h="full" flex="1">
      <Flex flex="1" alignItems="center" justifyContent="center" w="full" pt="160px">
        <styled.h1 fontSize="7xl" fontWeight="bold" lineHeight="1.1" textWrap="balance">
          the stack
        </styled.h1>
      </Flex>

      <Box h="12" />

      <Grid
        w="full"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="0"
        borderTop="1px dashed var(--border)"
      >
        <GridItem>
          <Stack gap="6" p="12">
            <styled.h2 fontSize="2xl" fontWeight="bold">
              Salesforce
            </styled.h2>
            <styled.ul
              opacity="0.65"
              flex="1"
              listStyleType="circle"
              pl="1.1em"
              fontSize="lg"
              className={stack({ gap: '4' })}
            >
              <styled.li>Product catalog</styled.li>
              <styled.li>Pricing & promotions</styled.li>
              <styled.li>Inventory management</styled.li>
              <styled.li>Order processing</styled.li>
            </styled.ul>
          </Stack>
        </GridItem>

        <GridItem borderLeft="1px dashed var(--border)">
          <Stack gap="6" p="12">
            <styled.h2 fontSize="2xl" fontWeight="bold">
              Sanity
            </styled.h2>
            <styled.ul
              opacity="0.65"
              flex="1"
              listStyleType="circle"
              pl="1.1em"
              fontSize="lg"
              className={stack({ gap: '4' })}
            >
              <styled.li>Content management</styled.li>
              <styled.li>Bundled studio</styled.li>
              <styled.li>Live editing</styled.li>
              <styled.li>Developer-friendly</styled.li>
            </styled.ul>
          </Stack>
        </GridItem>

        <GridItem borderLeft="1px dashed var(--border)">
          <Stack gap="6" p="12">
            <styled.h2 fontSize="2xl" fontWeight="bold">
              Vercel
            </styled.h2>
            <styled.ul
              opacity="0.65"
              flex="1"
              listStyleType="circle"
              pl="1.1em"
              fontSize="lg"
              className={stack({ gap: '4' })}
            >
              <styled.li>Global caching</styled.li>
              <styled.li>Fluid compute</styled.li>
              <styled.li>Edge middleware</styled.li>
              <styled.li>Observability</styled.li>
            </styled.ul>
          </Stack>
        </GridItem>

        <GridItem borderTop="1px dashed var(--border)">
          <Stack gap="6" p="12">
            <styled.h2 fontSize="2xl" fontWeight="bold">
              Next.js
            </styled.h2>
            <styled.ul
              opacity="0.65"
              flex="1"
              listStyleType="circle"
              pl="1.1em"
              fontSize="lg"
              className={stack({ gap: '4' })}
            >
              <styled.li>Partial pre-rendering</styled.li>
              <styled.li>ISR, on-demand revalidation</styled.li>
              <styled.li>Latest React features</styled.li>
              <styled.li>DX & ecosystem</styled.li>
            </styled.ul>
          </Stack>
        </GridItem>

        <GridItem
          borderLeft="1px dashed var(--border)"
          borderTop="1px dashed var(--border)"
        >
          <Stack gap="6" p="12">
            <styled.h2 fontSize="2xl" fontWeight="bold">
              PandaCSS
            </styled.h2>
            <styled.ul
              opacity="0.65"
              flex="1"
              listStyleType="circle"
              pl="1.1em"
              fontSize="lg"
              className={stack({ gap: '4' })}
            >
              <styled.li>Great developer experience</styled.li>
              <styled.li>Static CSS generation</styled.li>
              <styled.li>JSX component patterns</styled.li>
              <styled.li>High performance</styled.li>
            </styled.ul>
          </Stack>
        </GridItem>

        <GridItem
          borderLeft="1px dashed var(--border)"
          borderTop="1px dashed var(--border)"
        >
          <Stack gap="6" p="12">
            <styled.h2 fontSize="2xl" fontWeight="bold">
              AI Tooling
            </styled.h2>
            <styled.ul
              opacity="0.65"
              flex="1"
              listStyleType="circle"
              pl="1.1em"
              fontSize="lg"
              className={stack({ gap: '4' })}
            >
              <styled.li>Catalog generation</styled.li>
              <styled.li>Image generation</styled.li>
              <styled.li>French translations</styled.li>
              <styled.li>Friendship</styled.li>
            </styled.ul>
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  )
}

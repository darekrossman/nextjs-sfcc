import { HStack, Stack, Box, Flex, styled } from '@/styled-system/jsx'

export function SearchMasthead({ heading }: { heading?: string | null }) {
  return (
    <Box position="sticky" top="0">
      <Flex
        alignItems="center"
        h={{ base: 'auto', md: '168px' }}
        pt={{ base: '60px', md: '6' }}
        pl={{ md: '88px' }}
        zIndex="1"
      >
        <Flex
          position="relative"
          alignItems="flex-end"
          zIndex="1"
          py={{ base: '5', md: '0' }}
          pl={{ base: '5', md: '12' }}
          mt={{ md: '-1px' }}
        >
          <Stack gap="5">
            <styled.h1
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight={{ base: 'medium', md: 'light' }}
              lineHeight="1.2"
              color="var(--fg)"
            >
              {heading}
            </styled.h1>

            <Stack>
              <HStack>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="neutral.500"
                >
                  results:
                </styled.p>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.200"
                >
                  11
                </styled.p>
              </HStack>

              <HStack>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="neutral.500"
                >
                  filters:
                </styled.p>
                <styled.p
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="medium"
                  color="neutral.500"
                  opacity="0.5"
                >
                  none applied
                </styled.p>
              </HStack>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}

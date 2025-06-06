import { css } from '@/styled-system/css'
import { Box, Divider, HStack, Stack, styled } from '@/styled-system/jsx'
import Image from 'next/image'
import { SanityLogo } from '@sanity/logos'
import { PlusIcon } from 'lucide-react'

export default function Slide1() {
  return (
    <Stack align="center" justify="center" textAlign="center" p="72px">
      <h1
        className={css({
          fontSize: '7xl',
          fontWeight: 'bold',
          lineHeight: '1.1',
          textWrap: 'balance',
        })}
      >
        Next.js Headless <span className={css({ whiteSpace: 'nowrap' })}>E-Commerce</span>{' '}
        Demo
      </h1>

      <Box h="12" />
      <Divider w="280px" borderStyle="dashed" color="var(--border)" />
      <Box h="12" />

      <HStack gap="6">
        <Box position="relative" w="200px" aspectRatio={1576 / 318}>
          <Image src="/demo/nextjs-logotype-dark-background.svg" alt="" fill />
        </Box>
        <PlusIcon className={css({ color: 'purple.500' })} />
        <Box position="relative" w="140px" aspectRatio={1868 / 1315} flexShrink={0}>
          <Image src="/demo/salesforce-logo-crop.png" alt="" fill />
        </Box>
        <PlusIcon className={css({ color: 'purple.500' })} />
        <SanityLogo dark={true} className={css({ fontSize: '58px', mb: '-6px' })} />
      </HStack>

      <Box
        position="absolute"
        bottom="6"
        left="50%"
        transform="translateX(-50%)"
        textAlign="center"
      >
        <styled.p fontSize="md" color="gray.500">
          Presented by{' '}
          <styled.span fontWeight="bold" color="gray.300">
            Darek Rossman
          </styled.span>{' '}
          for your consideration.
        </styled.p>
      </Box>
    </Stack>
  )
}

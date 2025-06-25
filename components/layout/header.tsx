import { SITE_NAME } from '@/lib/constants'

import { css } from '@/styled-system/css'
import { Box, Divider, Flex, styled } from '@/styled-system/jsx'
import Link from '@/components/link'
import LogoIcon from '../icons/logo'
import { Nav } from './nav'

export function Header({ locale }: { locale: string }) {
  return (
    <Box
      position="fixed"
      top={{ base: '4', md: '6' }}
      left={{ base: '0', md: '0' }}
      zIndex="99999"
      className={css({
        '--transition': 'all 0.4s 0.1s',
        '--fg': '{colors.gray.100}',
        '--bg': '{colors.gray.900}',
        '--border': '{colors.gray.700}',
        '--logo-fill': 'white',

        '.minicart-open &': {
          zIndex: 'modal',
        },

        '.nav-open &': {
          '--fg': '{colors.gray.800}',
          '--bg': '{colors.gray.100}',
          '--border': '{colors.gray.200}',
          '--logo-fill': '{colors.gray.900}',
        },
      })}
    >
      <Box
        pos="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bg="{gradients.PeachTree}"
        zIndex="2"
        mixBlendMode="multiply"
        pointerEvents="none"
      />

      <Flex
        pos="relative"
        zIndex="1"
        direction={{ md: 'column' }}
        alignItems={{ mdDown: 'center' }}
        bg="var(--bg)"
        transition="var(--transition)"
      >
        <Nav locale={locale} />

        <Divider
          orientation="vertical"
          h="5"
          color="var(--border)"
          hideFrom="md"
          transition="var(--transition)"
        />

        <Divider color="var(--border)" hideBelow="md" transition="var(--transition)" />

        <Link
          href="/"
          prefetch={true}
          display="flex"
          flexDirection={{ md: 'column' }}
          alignItems="center"
          justifyContent="center"
          w={{ base: 'auto', md: '89px' }}
          h={{ base: '11', md: '98px' }}
          px={{ mdDown: '3.5' }}
          gap="2"
        >
          <LogoIcon
            w={{ base: '5', md: '12' }}
            fill="var(--logo-fill)"
            transition="var(--transition)"
          />
          <styled.div
            w="40px"
            mb={{ md: '-2px' }}
            textAlign="center"
            fontSize="13px"
            lineHeight="1"
            fontFamily="major"
            fontWeight="bold"
            color="var(--fg)"
            transition="var(--transition)"
          >
            {SITE_NAME}
          </styled.div>
        </Link>
      </Flex>
    </Box>
  )
}

import { SITE_NAME } from '@/lib/constants'
import { css } from '@/styled-system/css'
import { Box, Divider, Flex } from '@/styled-system/jsx'
import { Link, Text } from '@/ui/core'
import LogoIcon from '../icons/logo'
import { Nav } from './nav'
import { client } from '@/lib/sanity/client'
import { SanityDocument } from 'next-sanity'
import { Suspense } from 'react'

const NAV_QUERY = `*[_type == "category"]{ _id, categoryId, slug, title }`
const options = { next: { revalidate: 30 } }

export function Header() {
  const navPromise = client.fetch<SanityDocument[]>(NAV_QUERY, {}, options)

  return (
    <Box
      position="fixed"
      top={{ base: '3', md: '8' }}
      left={{ base: '0', md: '0' }}
      zIndex="sticky"
      className={css({
        '--fg': '{colors.gray.100}',
        '--bg': '{colors.gray.800}',
        '--border': '{colors.gray.600}',
      })}
    >
      <Flex
        direction={{ md: 'column' }}
        alignItems={{ mdDown: 'center' }}
        gap={{ md: '1' }}
        bg={{ mdDown: 'var(--bg)' }}
      >
        <Nav navPromise={navPromise} />

        <Divider orientation="vertical" h="5" color="var(--border)" hideFrom="md" />

        <Link
          href="/"
          prefetch={true}
          display="flex"
          flexDirection={{ md: 'column' }}
          alignItems="center"
          justifyContent="center"
          w={{ base: 'auto', md: '89px' }}
          h={{ mdDown: '11' }}
          px={{ mdDown: '3.5' }}
          aspectRatio={{ base: 'auto', md: '1/1.1' }}
          gap="2"
          bg="var(--bg)"
        >
          <LogoIcon w={{ base: '5', md: '12' }} fill="white" />
          <Text
            color="var(--fg)"
            fontSize="13px"
            lineHeight="1"
            fontFamily="major"
            fontWeight="bold"
            mb={{ md: '-2px' }}
          >
            {SITE_NAME}
          </Text>
        </Link>
      </Flex>
    </Box>
  )
}

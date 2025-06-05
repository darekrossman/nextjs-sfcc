import { Box, Flex, HStack, Stack, styled } from '@/styled-system/jsx'
import { sanityFetch } from '@/sanity/lib/live'
import { MENU_QUERY } from '@/sanity/lib/queries'
import { Link } from '@/ui/core'

export default async function Footer({ locale }: { locale: string }) {
  const { data: menu } = await sanityFetch({
    query: MENU_QUERY,
    params: { identifier: 'footer-menu', locale },
  })

  return (
    <Box borderTop="1px solid" borderColor="stone.400/50" py="6" px="6">
      <Flex
        gap={{ base: '8', md: '4' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack gap="2" order={{ base: 2, md: 1 }}>
          <styled.p fontSize="xs" color="gray.700">
            &copy; 2025 Darek Rossman, Future PSE
          </styled.p>
          <styled.p fontSize="xs" color="gray.500">
            <styled.a href="https://vercel.com">Created for ▲ Vercel</styled.a>
          </styled.p>
        </Stack>

        <Flex
          gap="4"
          direction={{ base: 'column', md: 'row' }}
          order={{ base: 1, md: 2 }}
        >
          {menu?.menuItems?.map((item) => (
            <Link
              key={item._key}
              href={`/${item.page?.slug?.current ?? '/'}`}
              fontSize="xs"
            >
              {item.page?.title}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

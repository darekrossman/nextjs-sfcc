import { Box, Flex, HStack, Stack, styled } from '@/styled-system/jsx'
import { sanityFetch } from '@/sanity/lib/live'
import { MENU_QUERY } from '@/sanity/lib/queries'
import Link from '@/components/link'
import { MENU_QUERYResult } from '@/sanity/types'

// Custom type for menu items that can reference both pages and categories
type MenuItemWithReference = {
  _key: string
  label: string | null
  page: {
    _id: string
    _type: 'page' | 'category'
    title: string | null
    slug: { current: string } | null
  } | null
  externalUrl: string | null
  openInNewTab: boolean | null
}

export default async function Footer({ locale }: { locale: string }) {
  const { data: menu } = await sanityFetch({
    query: MENU_QUERY,
    params: { identifier: 'footer-menu', locale },
  })

  return (
    <Box
      borderTop="1px solid"
      borderColor="stone.400/50"
      py={{ base: '8', md: '6' }}
      px="6"
    >
      <Flex
        gap={{ base: '9', md: '4' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack gap="2.5" order={{ base: 2, md: 1 }}>
          <styled.p fontSize="xs" color="gray.700">
            &copy; 2025 Darek Rossman, Future Vercel Team Member.
          </styled.p>
          <styled.p fontSize="xs" color="gray.500">
            <styled.a href="https://vercel.com">Created for ▲ Vercel</styled.a>
          </styled.p>
        </Stack>

        <Flex
          gap={{ base: '5', md: '4' }}
          direction={{ base: 'column', md: 'row' }}
          order={{ base: 1, md: 2 }}
          color="gray.700"
        >
          {menu?.menuItems?.map((item) => {
            const menuItem = item as MenuItemWithReference

            if (menuItem.externalUrl) {
              return (
                <Link
                  prefetch={false}
                  target="_self"
                  key={menuItem._key}
                  href={menuItem.externalUrl}
                  fontSize="xs"
                  color="green.800"
                >
                  {menuItem.label}
                </Link>
              )
            }

            if (!menuItem?.page?.slug?.current) return null

            const href =
              menuItem.page._type === 'category'
                ? `/category/${menuItem.page.slug.current}`
                : `/${menuItem.page.slug.current}`

            return (
              <Link key={menuItem._key} href={href} fontSize="xs">
                {menuItem.page?.title}
              </Link>
            )
          })}
        </Flex>
      </Flex>
    </Box>
  )
}

import Link from 'next/link'
import { PageContainer } from '@/components/page-container'
import { Center } from '@/styled-system/jsx'
import { Text } from '@/ui/core'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORY_QUERY } from '@/sanity/lib/queries'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: category } = await sanityFetch({
    query: CATEGORY_QUERY,
    params: { slug },
  })

  return (
    <PageContainer bg="zinc.300">
      <Center bg="zinc.400" h={{ base: '375px', md: '460px' }}>
        <Text as="h1" fontWeight="light" variant="heading2" color="white">
          {category?.title}
        </Text>
      </Center>
    </PageContainer>
  )
}

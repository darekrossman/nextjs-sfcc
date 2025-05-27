import Link from 'next/link'
import { PageContainer } from '@/components/page-container'
import { Center } from '@/styled-system/jsx'
import { Text } from '@/ui/core'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <PageContainer bg="zinc.300">
      <Center bg="zinc.400" h={{ base: '375px', md: '460px' }}>
        <Text as="h1" fontWeight="light" variant="heading2" color="white">
          Category Page
        </Text>
      </Center>
    </PageContainer>
  )
}

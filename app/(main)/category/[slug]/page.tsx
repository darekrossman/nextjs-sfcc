import { PortableText, type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { PageContainer } from '@/components/page-container'
import { Center } from '@/styled-system/jsx'
import { Text } from '@/ui/core'

const POST_QUERY = `*[_type == "category" && slug.current == $slug][0]`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null

const options = { next: { revalidate: 30 } }

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const category = await client.fetch<SanityDocument>(POST_QUERY, await params, options)
  console.log(category)
  return (
    <PageContainer bg="zinc.300">
      <Center bg="zinc.400" h={{ base: '375px', md: '460px' }}>
        <Text as="h1" fontWeight="light" variant="heading2" color="white">
          {category.title}
        </Text>
      </Center>
    </PageContainer>
  )
}

import { Hero } from '@/components/blocks/hero'
import { Features } from '@/components/blocks/features'
import { SplitImage } from '@/components/blocks/split-image'
import { FAQs } from '@/components/blocks/faqs'
import RichText from '@/components/blocks/rich-text'
import { PAGE_QUERYResult } from '@/sanity/types'

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>['content']
}

// Base type for content blocks to handle the default case
type BaseBlock = {
  _type: string
  _key: string
}

export function PageBuilder({ content }: PageBuilderProps) {
  if (!Array.isArray(content)) {
    return null
  }

  return (
    <>
      {content.map((block) => {
        switch (block._type) {
          // case 'hero':
          //   return <Hero key={block._key} {...block} />
          case 'richText':
            return <RichText key={block._key} {...block} />
          case 'features':
            return <Features key={block._key} {...block} />
          case 'splitImage':
            return <SplitImage key={block._key} {...block} />
          case 'faqs':
            return <FAQs key={block._key} {...block} />
          default:
            null
        }
      })}
    </>
  )
}

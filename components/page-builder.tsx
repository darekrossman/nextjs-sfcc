import { Hero } from '@/components/blocks/hero'
import { Features } from '@/components/blocks/features'
import { SplitImage } from '@/components/blocks/split-image'
import { FAQs } from '@/components/blocks/faqs'
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
    <main>
      {content.map((block) => {
        switch (block._type) {
          case 'hero':
            return <Hero key={block._key} {...block} />
          case 'features':
            return <Features key={block._key} {...block} />
          case 'splitImage':
            return <SplitImage key={block._key} {...block} />
          case 'faqs':
            return <FAQs key={block._key} {...block} />
          default:
            // This is a fallback for when we don't have a block type
            const unknownBlock = block as BaseBlock
            return (
              <div key={unknownBlock._key}>Block not found: {unknownBlock._type}</div>
            )
        }
      })}
    </main>
  )
}

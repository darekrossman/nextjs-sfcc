import { TextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const richTextType = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) =>
        rule.required().error('Content is required for rich text blocks'),
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Maximum Width',
      type: 'string',
      description: 'Constrain the text width for better readability',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Large (1200px)', value: 'large' },
          { title: 'Medium (800px)', value: 'medium' },
          { title: 'Small (600px)', value: 'small' },
        ],
        layout: 'radio',
      },
      initialValue: 'full',
    }),
  ],
  preview: {
    select: {
      content: 'content',
      alignment: 'alignment',
      maxWidth: 'maxWidth',
    },
    prepare(selection) {
      const { content, alignment, maxWidth } = selection
      const block = (content || []).find((block: any) => block._type === 'block')
      const title = block
        ? block.children
            ?.filter((child: any) => child._type === 'span')
            ?.map((span: any) => span.text)
            ?.join('')
        : 'Rich Text Block'

      return {
        title: title || 'Rich Text Block',
        subtitle: `${alignment} aligned, ${maxWidth} width`,
        media: TextIcon,
      }
    },
  },
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'styling',
      title: 'Styling',
    },
  ],
})

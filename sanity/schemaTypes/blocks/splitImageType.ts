import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const splitImageType = defineType({
  name: 'splitImage',
  type: 'object',
  fields: [
    defineField({
      name: 'orientation',
      type: 'string',
      options: {
        list: [
          { value: 'imageLeft', title: 'Image Left' },
          { value: 'imageRight', title: 'Image Right' },
        ],
      },
    }),
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'content',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Call to Action Label',
      type: 'internationalizedArrayString',
      description: 'Text displayed on the call to action button',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Call to Action URL',
      type: 'string',
      description: 'Destination URL for the call to action button',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  icon: BlockContentIcon,
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      let titleText = 'Split Image'

      if (Array.isArray(title) && title.length > 0) {
        // Try to find English locale first
        const enTitle = title.find((item) => item._key === 'en')?.value
        if (enTitle) {
          titleText = enTitle
        } else {
          // Fall back to first available title
          titleText = title[0]?.value || 'Split Image'
        }
      }

      return {
        title: titleText,
        subtitle: 'Split Image',
        media: media ?? BlockContentIcon,
      }
    },
  },
})

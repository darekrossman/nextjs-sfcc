import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const heroBannerType = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'The title for this hero banner',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'internationalizedArrayString',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (rule) => rule.required().error('Alt text is required for images'),
        }),
      ],
    }),
  ],
})

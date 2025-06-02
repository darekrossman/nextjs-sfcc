import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      description: 'The display name for this category',
      validation: (rule) =>
        rule
          .required()
          .error('Title is required for category display')
          .min(2)
          .warning('Title should be at least 2 characters')
          .max(100)
          .warning('Title should be under 100 characters for better SEO'),
    }),
    defineField({
      name: 'categoryId',
      type: 'string',
      description: 'Unique identifier for this category, used for API integration',
      validation: (rule) =>
        rule
          .required()
          .error('Category ID is required for system integration')
          .regex(/^[a-z0-9-_]+$/)
          .error(
            'Category ID must contain only lowercase letters, numbers, hyphens, and underscores',
          ),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'URL-friendly version of the category name',
      options: {
        source: (doc) => {
          const title = doc.title
          if (Array.isArray(title)) {
            // Try English first, then fall back to the first available language
            return (
              title.find((item) => item._key === 'en')?.value ||
              title[0]?.value ||
              'untitled'
            )
          }
          return title || 'untitled'
        },
      },
      validation: (rule) => rule.required().error('Slug is required for URL generation'),
    }),
    defineField({
      name: 'bannerImage',
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
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      description: 'Rich text content describing this category',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      categoryId: 'categoryId',
    },
    prepare({ title, categoryId }) {
      // Extract the title from the internationalized array
      // Try English first, then fall back to the first available language
      const displayTitle = Array.isArray(title)
        ? title.find((item) => item._key === 'en')?.value ||
          title[0]?.value ||
          'Untitled Category'
        : title || 'Untitled Category'

      return {
        title: displayTitle,
        subtitle: categoryId || 'No ID',
        media: TagIcon,
      }
    },
  },
})

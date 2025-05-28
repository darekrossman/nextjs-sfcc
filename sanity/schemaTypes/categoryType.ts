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
      type: 'string',
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
      options: { source: 'title' },
      validation: (rule) => rule.required().error('Slug is required for URL generation'),
    }),
    defineField({
      name: 'heroBanner',
      type: 'reference',
      to: [{ type: 'heroBanner' }],
      description: 'Hero banner to display for this category',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      description: 'Rich text content describing this category',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      description: 'When this category was first published',
      initialValue: () => new Date().toISOString(),
      validation: (rule) =>
        rule.required().error('Published date is required for content organization'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      categoryId: 'categoryId',
      heroBannerTitle: 'heroBanner.title',
      publishedAt: 'publishedAt',
    },
    prepare({ title, categoryId, heroBannerTitle, publishedAt }) {
      const publishedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : 'Not published'

      return {
        title: title || 'Untitled Category',
        subtitle: `ID: ${categoryId || 'No ID'} • Hero: ${heroBannerTitle || 'None'} • Published: ${publishedDate}`,
        media: TagIcon,
      }
    },
  },
})

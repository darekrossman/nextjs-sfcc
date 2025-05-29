import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) =>
        rule
          .required()
          .error('Title is required for the page')
          .max(100)
          .warning('Title should be under 100 characters for better SEO'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug is required for the page URL'),
    }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Page Excerpt',
      group: 'content',
      description: 'Short description of the page content',
      rows: 3,
      validation: (rule) =>
        rule.max(200).warning('Excerpts work best when under 200 characters'),
    }),
    defineField({
      name: 'heroBanner',
      title: 'Hero Banner',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: { type: 'heroBanner' } }],
      validation: (rule) => rule.max(1).error('Only one hero banner is allowed per page'),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'blockContent',
      group: 'content',
      description: 'Main content of the page',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines (if different from page title)',
          validation: (rule) =>
            rule.max(60).warning('Meta titles should be under 60 characters'),
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines and social media',
          validation: (rule) =>
            rule
              .max(160)
              .warning('Meta descriptions should be under 160 characters')
              .min(120)
              .warning('Meta descriptions should be at least 120 characters'),
        }),
        defineField({
          name: 'noIndex',
          title: 'Hide from Search Engines',
          type: 'boolean',
          description: 'Prevent search engines from indexing this page',
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      status: 'status',
      slug: 'slug.current',
    },
    prepare({ title, subtitle, status, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: subtitle || `/${slug || 'no-slug'} • ${status || 'draft'}`,
        media: DocumentIcon,
      }
    },
  },
})

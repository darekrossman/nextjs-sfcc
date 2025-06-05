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
      type: 'internationalizedArrayString',
      group: 'content',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
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
      validation: (rule) => rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      description: 'A brief description of the page content',
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning('Excerpts should be under 160 characters for better SEO'),
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      description: 'Description that appears in search engine results',
      rows: 3,
      validation: (rule) =>
        rule
          .max(160)
          .warning('Meta descriptions should be under 160 characters')
          .min(120)
          .warning('Meta descriptions should be at least 120 characters'),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      group: 'seo',
      description: 'Prevent this page from appearing in search engine results',
      initialValue: false,
    }),
    defineField({
      name: 'includeInSitemap',
      title: 'Include in sitemap',
      type: 'boolean',
      group: 'settings',
      description: 'Whether this page should be included in the XML sitemap',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection

      // Extract the title from the internationalized array
      // Try English first, then fall back to the first available language
      const displayTitle = Array.isArray(title)
        ? title.find((item) => item._key === 'en')?.value ||
          title[0]?.value ||
          'Untitled Page'
        : title || 'Untitled Page'

      return {
        title: displayTitle,
        subtitle: subtitle ? `/${subtitle}` : 'No slug set',
        media: media || DocumentIcon,
      }
    },
  },
})

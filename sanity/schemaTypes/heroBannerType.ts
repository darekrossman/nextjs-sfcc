import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const heroBannerType = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  icon: ImageIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'images',
      title: 'Images',
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
        rule.required().error('Title is required for the hero banner'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug is required for the hero banner'),
    }),
    defineField({
      name: 'landscapeImage',
      title: 'Landscape Image',
      type: 'image',
      group: 'images',
      description: 'Main image for desktop and tablet views (recommended: 1920x1080)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (rule) => rule.required().error('Alt text is required for images'),
        }),
      ],
      validation: (rule) => rule.required().error('Landscape image is required'),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      group: 'images',
      description: 'Image for mobile views (recommended: 768x1024)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (rule) => rule.required().error('Alt text is required for images'),
        }),
      ],
      validation: (rule) => rule.required().error('Portrait image is required'),
    }),
    defineField({
      name: 'overlay',
      title: 'Text Overlay',
      type: 'object',
      group: 'content',
      description: 'Rich text content displayed over the hero image',
      fields: [
        defineField({
          name: 'headline',
          type: 'string',
          title: 'Headline',
          description: 'Main headline text',
          validation: (rule) =>
            rule.max(100).warning('Headlines work best when under 100 characters'),
        }),
        defineField({
          name: 'subheadline',
          type: 'text',
          title: 'Subheadline',
          description: 'Supporting text below the headline',
          rows: 3,
          validation: (rule) =>
            rule.max(200).warning('Subheadlines work best when under 200 characters'),
        }),
        defineField({
          name: 'content',
          title: 'Rich Text Content',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
              ],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                ],
              },
            }),
          ],
        }),
        defineField({
          name: 'textPosition',
          title: 'Text Position',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
            layout: 'radio',
          },
          initialValue: 'center',
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Black', value: 'black' },
              { title: 'Brand Primary', value: 'primary' },
              { title: 'Brand Secondary', value: 'secondary' },
            ],
            layout: 'radio',
          },
          initialValue: 'white',
        }),
      ],
    }),
    defineField({
      name: 'callToActions',
      title: 'Call to Action Buttons',
      type: 'array',
      group: 'content',
      description: 'Action buttons displayed in the hero banner',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'ctaButton',
          title: 'CTA Button',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Button Label',
              validation: (rule) => rule.required().error('Button label is required'),
            }),
            defineField({
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' },
                  { title: 'Product Category', value: 'category' },
                ],
                layout: 'radio',
              },
              initialValue: 'internal',
            }),
            defineField({
              name: 'internalLink',
              title: 'Internal Link',
              type: 'string',
              description: 'Path to internal page (e.g., /products, /about)',
              hidden: ({ parent }) => parent?.linkType !== 'internal',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as { linkType?: string }
                  if (parent?.linkType === 'internal' && !value) {
                    return 'Internal link is required when link type is internal'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              description: 'Full URL including https://',
              hidden: ({ parent }) => parent?.linkType !== 'external',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as { linkType?: string }
                  if (parent?.linkType === 'external' && !value) {
                    return 'External URL is required when link type is external'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'categoryReference',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'category' }],
              hidden: ({ parent }) => parent?.linkType !== 'category',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as { linkType?: string }
                  if (parent?.linkType === 'category' && !value) {
                    return 'Category reference is required when link type is category'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                  { title: 'Ghost', value: 'ghost' },
                ],
                layout: 'radio',
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              description: 'Only applies to external URLs',
              hidden: ({ parent }) => parent?.linkType !== 'external',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'linkType',
              style: 'style',
            },
            prepare({ title, subtitle, style }) {
              return {
                title: title || 'Untitled Button',
                subtitle: `${subtitle || 'No link type'} • ${style || 'primary'} style`,
              }
            },
          },
        }),
      ],
      validation: (rule) =>
        rule.max(3).warning('Consider limiting to 3 buttons for better UX'),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Active', value: 'active' },
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Inactive', value: 'inactive' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      group: 'settings',
      description: 'Higher numbers display first (1-100)',
      validation: (rule) => rule.min(1).max(100).integer(),
      initialValue: 50,
    }),
    defineField({
      name: 'scheduledStart',
      title: 'Scheduled Start Date',
      type: 'datetime',
      group: 'settings',
      description: 'When this banner should start displaying',
      hidden: ({ parent }) => parent?.status !== 'scheduled',
    }),
    defineField({
      name: 'scheduledEnd',
      title: 'Scheduled End Date',
      type: 'datetime',
      group: 'settings',
      description: 'When this banner should stop displaying',
      hidden: ({ parent }) => parent?.status !== 'scheduled',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'landscapeImage',
      priority: 'priority',
    },
    prepare({ title, subtitle, media, priority }) {
      return {
        title: title || 'Untitled Hero Banner',
        subtitle: `${subtitle || 'draft'} • Priority: ${priority || 50}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})

import { defineField, defineType } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export const localeType = defineType({
  name: 'locale',
  title: 'Locale',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'id',
      title: 'Language ID',
      type: 'string',
      description: 'Language identifier (e.g., "en", "es", "fr")',
      validation: (rule) =>
        rule
          .required()
          .error('Language ID is required')
          .regex(/^[a-z]{2}(-[A-Z]{2})?$/)
          .error('Language ID must be in format "en" or "en-US"'),
    }),
    defineField({
      name: 'isDefault',
      title: 'Default language',
      type: 'boolean',
      description: 'Mark this as the default language for the site',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      id: 'id',
      isDefault: 'isDefault',
    },
    prepare({ title, id, isDefault }) {
      return {
        title: title || id,
        subtitle: `${id}${isDefault ? ' (default)' : ''}`,
        media: EarthGlobeIcon,
      }
    },
  },
})

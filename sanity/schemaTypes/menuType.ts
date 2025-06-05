import { MenuIcon, ChevronDownIcon, DocumentIcon } from '@sanity/icons'
import { defineField, defineType, defineArrayMember } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: MenuIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: MenuIcon,
      default: true,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: MenuIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Internal name for this menu (not displayed to users)',
      validation: (rule) =>
        rule.required().error('Menu title is required for organization'),
      group: 'content',
    }),
    defineField({
      name: 'identifier',
      type: 'slug',
      description: 'Unique identifier for this menu (used in code)',
      options: {
        source: 'title',
        maxLength: 50,
      },
      validation: (rule) =>
        rule.required().error('Menu identifier is required to reference this menu'),
      group: 'content',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      description: 'Pages and links that appear in this menu',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              description: 'Text displayed for this menu item',
              validation: (rule) => rule.required().error('Menu item label is required'),
            }),
            defineField({
              name: 'page',
              type: 'reference',
              to: [{ type: 'page' }, { type: 'category' }],
              description: 'Page or category this menu item links to',
            }),
            defineField({
              name: 'externalUrl',
              type: 'url',
              description: 'External URL (used instead of page reference)',
            }),
            defineField({
              name: 'openInNewTab',
              type: 'boolean',
              description: 'Open link in new tab/window',
              initialValue: false,
            }),
            defineField({
              name: 'subItems',
              title: 'Sub Menu Items',
              type: 'array',
              description: 'Nested menu items under this item',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'subMenuItem',
                  title: 'Sub Menu Item',
                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                      validation: (rule) =>
                        rule.required().error('Sub menu item label is required'),
                    }),
                    defineField({
                      name: 'page',
                      type: 'reference',
                      to: [{ type: 'page' }, { type: 'category' }],
                    }),
                    defineField({
                      name: 'externalUrl',
                      type: 'url',
                    }),
                    defineField({
                      name: 'openInNewTab',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'page.title',
                      url: 'externalUrl',
                      pageType: 'page._type',
                    },
                    prepare({ title, subtitle, url, pageType }) {
                      // Handle internationalized title properly
                      let displaySubtitle = url || 'No link configured'
                      if (subtitle && Array.isArray(subtitle)) {
                        // Extract title from internationalized array
                        const englishTitle = subtitle.find(
                          (item: any) => item._key === 'en',
                        )?.value
                        const fallbackTitle = subtitle[0]?.value
                        displaySubtitle = englishTitle || fallbackTitle || displaySubtitle
                      } else if (subtitle) {
                        displaySubtitle = subtitle
                      }

                      // Add page type indicator
                      if (pageType) {
                        displaySubtitle = `${displaySubtitle} (${pageType})`
                      }

                      return {
                        title,
                        subtitle: displaySubtitle,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'page.title',
              url: 'externalUrl',
              hasSubItems: 'subItems',
              pageType: 'page._type',
            },
            prepare({ title, subtitle, url, hasSubItems, pageType }) {
              const hasChildren = hasSubItems && hasSubItems.length > 0

              // Handle internationalized title properly
              let displaySubtitle = url || 'No link configured'
              if (subtitle && Array.isArray(subtitle)) {
                // Extract title from internationalized array
                const englishTitle = subtitle.find(
                  (item: any) => item._key === 'en',
                )?.value
                const fallbackTitle = subtitle[0]?.value
                displaySubtitle = englishTitle || fallbackTitle || displaySubtitle
              } else if (subtitle) {
                displaySubtitle = subtitle
              }

              // Add page type indicator
              if (pageType) {
                displaySubtitle = `${displaySubtitle} (${pageType})`
              }

              return {
                title,
                subtitle: displaySubtitle,
                media: hasChildren ? ChevronDownIcon : DocumentIcon,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).warning('Consider adding at least one menu item'),
      group: 'content',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this menu is currently active/published',
      initialValue: true,
      group: 'settings',
    }),
    defineField({
      name: 'sortOrder',
      type: 'number',
      description: 'Used to order menus when multiple exist',
      initialValue: 0,
      group: 'settings',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      identifier: 'identifier.current',
      itemCount: 'menuItems.length',
      isActive: 'isActive',
    },
    prepare({ title, identifier, itemCount = 0, isActive }) {
      return {
        title,
        subtitle: `${identifier} • ${itemCount} items ${isActive ? '• Active' : '• Inactive'}`,
        media: MenuIcon,
      }
    },
  },
})

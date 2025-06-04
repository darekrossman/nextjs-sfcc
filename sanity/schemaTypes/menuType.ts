import { MenuIcon } from '@sanity/icons'
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
              to: [{ type: 'page' }],
              description: 'Page this menu item links to',
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
                      to: [{ type: 'page' }],
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
                    },
                    prepare({ title, subtitle, url }) {
                      return {
                        title,
                        subtitle: subtitle || url || 'No link configured',
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
            },
            prepare({ title, subtitle, url, hasSubItems }) {
              const hasChildren = hasSubItems && hasSubItems.length > 0
              return {
                title,
                subtitle: subtitle || url || 'No link configured',
                media: hasChildren ? 'ChevronDownIcon' : 'FileIcon',
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

import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'navigation',
      title: 'Navigation',
    },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      description: 'The name of your website',
      validation: (rule) =>
        rule
          .required()
          .error('Site name is required')
          .max(100)
          .warning('Site name should be under 100 characters'),
    }),
    defineField({
      name: 'homePage',
      title: 'Home Page',
      type: 'reference',
      to: [{ type: 'page' }],
      group: 'general',
      description: 'Select the page to use as your homepage',
      validation: (rule) => rule.required().error('Home page reference is required'),
    }),
    defineField({
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      group: 'navigation',
      description: 'Pages to display in the main navigation menu',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'page' }],
        }),
      ],
      validation: (rule) =>
        rule.max(10).warning('Consider limiting navigation to 10 items for better UX'),
    }),
    defineField({
      name: 'footerNavigation',
      title: 'Footer Navigation',
      type: 'array',
      group: 'navigation',
      description: 'Pages to display in the footer navigation',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'page' }],
        }),
      ],
      validation: (rule) =>
        rule.max(15).warning('Consider limiting footer navigation to 15 items'),
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      homePageTitle: 'homePage.title',
    },
    prepare({ title, homePageTitle }) {
      // Handle internationalized home page title properly
      let displayHomeTitle = 'No home page set'
      if (homePageTitle) {
        if (Array.isArray(homePageTitle)) {
          // Extract title from internationalized array
          const englishTitle = homePageTitle.find(
            (item: any) => item._key === 'en',
          )?.value
          const fallbackTitle = homePageTitle[0]?.value
          displayHomeTitle = englishTitle || fallbackTitle || 'No home page set'
        } else {
          displayHomeTitle = homePageTitle
        }
      }

      return {
        title: title || 'Site Settings',
        subtitle: `Home: ${displayHomeTitle}`,
        media: CogIcon,
      }
    },
  },
})

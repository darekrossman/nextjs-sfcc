import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    page: defineLocations({
      select: {
        title: 'title.en',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        // Handle internationalized title array
        let displayTitle = 'Untitled'

        if (doc?.title) {
          if (Array.isArray(doc.title)) {
            // Try English first, then fall back to the first available language
            const enTitle = doc.title.find((item) => item._key === 'en')?.value
            const fallbackTitle = doc.title[0]?.value
            displayTitle = enTitle || fallbackTitle || 'Untitled'
          } else {
            // Handle case where title might be a string (fallback)
            displayTitle = doc.title
          }
        }

        return {
          locations: [
            {
              title: displayTitle,
              href: doc?.slug === 'home' ? '/en' : `/en/${doc?.slug}`,
            },
          ],
        }
      },
    }),
  },
}

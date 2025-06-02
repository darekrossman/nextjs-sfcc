'use client'

// import { assist } from '@sanity/assist'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// import { presentationTool } from 'sanity/presentation'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure.config'
// import { resolve } from './sanity/presentation/resolve'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    // assist({
    //   translate: {
    //     field: {
    //       languages: (client) =>
    //         client.fetch(`*[_type == "locale"]{"id":tag, "title":name}`),
    //       documentTypes: ['siteSettings', 'page', 'category'],
    //     },
    //   },
    // }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    internationalizedArray({
      languages: (client) => client.fetch(`*[_type == "locale"]{"id":tag, "title":name}`),
      fieldTypes: ['string'],
    }),
    // presentationTool({
    //   resolve,
    //   previewUrl: {
    //     previewMode: {
    //       enable: '/api/draft-mode/enable',
    //     },
    //   },
    // }),
  ],
})

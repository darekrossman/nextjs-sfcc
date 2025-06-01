import { defineLive } from 'next-sanity'
import { client } from './client'
import { token } from './token'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: 'vX',
  }),
  serverToken: token,
  browserToken: token,
})

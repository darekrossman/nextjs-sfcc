import { config } from 'dotenv'

config({ path: '.env.local' })

import { TAGS } from '../lib/constants'

interface RevalidateConfig {
  baseUrl?: string
  tag: keyof typeof TAGS
}

const revalidateCache = async (config: RevalidateConfig) => {
  const { baseUrl = 'http://localhost:3000', tag } = config

  const url = new URL('/api/revalidate', baseUrl)
  url.searchParams.set('secret', process.env.SFCC_REVALIDATION_SECRET || '')
  url.searchParams.set('tag', tag)

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()

  console.log(result)
}

revalidateCache({ tag: 'products' })

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export { metadata, viewport } from 'next-sanity/studio'

export default async function StudioPage() {
  return <NextStudio config={config} />
}

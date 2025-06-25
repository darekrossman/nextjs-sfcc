import 'server-only'
import { cache } from 'react'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  fr: () => import('./fr.json').then((module) => module.default),
}

export const getDictionary = cache(async (locale: 'en' | 'fr') => dictionaries[locale]())

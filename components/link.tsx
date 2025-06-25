'use client'

import { useLocale } from '@/components/locale-context'
import { styled } from '@/styled-system/jsx'
import NextLink from 'next/link'
import { ComponentProps } from 'react'
import { UrlObject } from 'url'

const StyledLink = styled(NextLink)

const isExternalLink = (href: string | UrlObject): boolean => {
  if (typeof href === 'string') {
    return (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('ftp://') ||
      href.startsWith('//')
    )
  }

  // UrlObject case
  return !!(href.protocol || href.hostname || href.host)
}

const prependLocaleToHref = (
  href: string | UrlObject,
  locale: string,
): string | UrlObject => {
  if (isExternalLink(href)) {
    return href
  }

  if (typeof href === 'string') {
    // Don't modify query-only URLs
    if (href.startsWith('?')) {
      return href
    }
    // Don't modify if already starts with /en or /fr
    if (href.startsWith('/en') || href.startsWith('/fr')) {
      return href
    }
    return `/${locale}${href}`
  }

  // UrlObject case - don't modify if it has query but no pathname
  if (href.query && !href.pathname) {
    return href
  }

  // Don't modify if pathname already starts with /en or /fr
  if (href.pathname?.startsWith('/en') || href.pathname?.startsWith('/fr')) {
    return href
  }

  // UrlObject case - prepend locale to pathname
  return {
    ...href,
    pathname: `/${locale}${href.pathname || ''}`,
  }
}

const Link = ({ href, ...props }: ComponentProps<typeof StyledLink>) => {
  const { locale } = useLocale()

  const localizedHref = prependLocaleToHref(href, locale)

  return <StyledLink href={localizedHref} {...props} />
}

export default Link

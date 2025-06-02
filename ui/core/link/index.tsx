'use client'

import { useLocale } from '@/components/locale-context'
import { HTMLStyledProps, styled } from '@/styled-system/jsx'
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
    return `/${locale}${href}`
  }

  // UrlObject case - prepend locale to pathname
  return {
    ...href,
    pathname: `/${locale}${href.pathname || ''}`,
  }
}

export const Link = ({ href, ...props }: ComponentProps<typeof StyledLink>) => {
  const { locale } = useLocale()

  const localizedHref = prependLocaleToHref(href, locale)

  return <StyledLink href={localizedHref} {...props} />
}

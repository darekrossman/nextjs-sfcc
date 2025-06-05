import { PAGE_QUERYResult } from '@/sanity/types'
import { PortableText } from '@portabletext/react'
import { css } from '@/styled-system/css'
import { Stack, styled } from '@/styled-system/jsx'

type RichTextBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['content']>[number],
  { _type: 'richText' }
>

const alignmentStyles = {
  left: css({ textAlign: 'left' }),
  center: css({ textAlign: 'center' }),
  right: css({ textAlign: 'right' }),
}

const maxWidthStyles = {
  full: css({ maxWidth: '100%' }),
  large: css({ maxWidth: '1200px', margin: '0 auto' }),
  medium: css({ maxWidth: '800px', margin: '0 auto' }),
  small: css({ maxWidth: '600px', margin: '0 auto' }),
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const sizeStyles = {
        small: css({ maxWidth: '400px' }),
        medium: css({ maxWidth: '600px' }),
        large: css({ maxWidth: '800px' }),
        full: css({ maxWidth: '100%' }),
      }

      // Handle both direct asset URLs and asset references
      const imageUrl = value.asset?.url || value._sanityAsset

      return (
        <figure className={css({ margin: '2rem 0' })}>
          <img
            src={imageUrl}
            alt={value.alt || ''}
            className={`${sizeStyles[value.size as keyof typeof sizeStyles] || sizeStyles.medium} ${css(
              {
                width: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              },
            )}`}
          />
          {value.caption && (
            <figcaption
              className={css({
                fontSize: 'sm',
                color: 'gray.600',
                textAlign: 'center',
                marginTop: '0.5rem',
              })}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const href = value.href || (value.reference && `/${value.reference.slug?.current}`)
      return (
        <a
          href={href}
          target={value.blank ? '_blank' : undefined}
          rel={value.blank ? 'noopener noreferrer' : undefined}
          className={css({
            color: 'blue.600',
            textDecoration: 'underline',
            _hover: { color: 'blue.800' },
          })}
        >
          {children}
        </a>
      )
    },
    internalLink: ({ children, value }: any) => {
      const href = value.reference?.slug?.current
        ? `/${value.reference.slug.current}`
        : '#'
      return (
        <a
          href={href}
          className={css({
            color: 'blue.600',
            textDecoration: 'underline',
            _hover: { color: 'blue.800' },
          })}
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1
        className={css({
          fontSize: '3xl',
          fontWeight: 'bold',
          lineHeight: 'tight',
        })}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        className={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          lineHeight: 'tight',
          mt: '6',
        })}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        className={css({
          fontSize: 'xl',
          fontWeight: 'bold',
          lineHeight: 'tight',
        })}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4
        className={css({
          fontSize: 'lg',
          fontWeight: 'bold',
          lineHeight: 'tight',
        })}
      >
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5
        className={css({
          fontSize: 'md',
          fontWeight: 'bold',
          lineHeight: 'tight',
        })}
      >
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6
        className={css({
          fontSize: 'sm',
          fontWeight: 'bold',
          lineHeight: 'tight',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
        })}
      >
        {children}
      </h6>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        className={css({
          borderLeft: '4px solid',
          borderLeftColor: 'gray.300',
          paddingLeft: '1rem',
          fontStyle: 'italic',
          fontSize: 'lg',
        })}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p
        className={css({
          lineHeight: 'relaxed',
        })}
      >
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul
        className={css({
          listStyleType: 'disc',
          paddingLeft: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '3',
          '& li': {},
        })}
      >
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol
        className={css({
          listStyleType: 'decimal',
          paddingLeft: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '3',
          '& li': {},
        })}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
}

export default function RichText(props: RichTextBlockProps) {
  const { content, alignment = 'left', maxWidth = 'full' } = props

  // Handle null content
  if (!content) {
    return null
  }

  // Safely get alignment and maxWidth styles with fallbacks
  const alignmentClass = alignmentStyles[alignment || 'left'] || alignmentStyles.left
  const maxWidthClass = maxWidthStyles[maxWidth || 'full'] || maxWidthStyles.full

  return (
    <Stack gap="6">
      <PortableText value={content} components={portableTextComponents} />
    </Stack>
  )
}

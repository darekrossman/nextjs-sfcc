import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Stack, styled } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
  className?: string
}

const markdownStyles = css({
  color: 'stone.700',
  fontSize: 'sm',

  '& h1': {
    fontSize: 'xl',
    fontWeight: 'light',
    mb: '6',
    lineHeight: '1.2',
  },
  '& h2': {
    fontSize: 'xl',
    fontWeight: 'medium',
    lineHeight: '1.3',
    mb: '2',
  },
  '& h3': {
    fontSize: 'lg',
    fontWeight: 'semibold',
    mb: '3',
    lineHeight: '1.4',
  },
  '& h4': {
    fontWeight: 'semibold',
    mb: '2',
    lineHeight: '1.4',
  },
  '& h5': {
    fontWeight: 'semibold',
    mb: '2',
    lineHeight: '1.5',
  },
  '& h6': {
    fontWeight: 'semibold',
    mb: '2',
    lineHeight: '1.5',
  },
  '& p': {
    mb: '4',
    lineHeight: '1.6',
  },
  '& ul': {
    mb: '3',
    ml: '6',
    listStyleType: 'disc',
  },
  '& ol': {
    mb: '3',
    ml: '6',
    listStyleType: 'decimal',
  },
  '& li:not(:last-child)': {
    lineHeight: '1.6',
    mb: '4',
  },
  '& li > p': {},
  '& blockquote': {
    borderLeft: '4px solid {colors.neutral.300}',
    pl: '4',
    py: '2',
    mb: '4',
    fontStyle: 'italic',
    bg: 'neutral.50',
  },
  '& code': {
    bg: 'neutral.100',
    px: '1',
    py: '0.5',
    borderRadius: 'sm',
    fontFamily: 'mono',
  },
  '& pre': {
    bg: 'neutral.100',
    p: '4',
    borderRadius: 'md',
    mb: '4',
    overflow: 'auto',
  },
  '& pre code': {
    bg: 'transparent',
    p: '0',
  },
  '& table': {
    w: 'full',
    mb: '4',
    borderCollapse: 'collapse',
    border: '1px solid {colors.neutral.300}',
  },
  '& th': {
    border: '1px solid {colors.neutral.300}',
    px: '3',
    py: '2',
    bg: 'neutral.100',
    fontWeight: 'semibold',
    textAlign: 'left',
  },
  '& td': {
    border: '1px solid {colors.neutral.300}',
    px: '3',
    py: '2',
  },
  '& a': {
    color: 'blue.600',
    textDecoration: 'underline',
  },
  '& strong': {
    fontWeight: 'bold',
  },
  '& em': {
    fontStyle: 'italic',
  },
  '& hr': {
    border: 'none',
    borderTop: '1px solid {colors.neutral.300}',
    my: '6',
  },
})

const components: Components = {
  h1: ({ children, }) => <styled.h1>{children}</styled.h1>,
  h2: ({ children, }) => <styled.h2>{children}</styled.h2>,
  h3: ({ children, }) => <styled.h3>{children}</styled.h3>,
  h4: ({ children, }) => <styled.h4>{children}</styled.h4>,
  h5: ({ children, }) => <styled.h5>{children}</styled.h5>,
  h6: ({ children, }) => <styled.h6>{children}</styled.h6>,
  p: ({ children, }) => <styled.p>{children}</styled.p>,
  ul: ({ children, }) => <styled.ul>{children}</styled.ul>,
  ol: ({ children, }) => <styled.ol>{children}</styled.ol>,
  li: ({ children, }) => <styled.li>{children}</styled.li>,
  blockquote: ({ children, }) => (
    <styled.blockquote>{children}</styled.blockquote>
  ),
  code: ({ children, }) => <styled.code>{children}</styled.code>,
  pre: ({ children, }) => <styled.pre>{children}</styled.pre>,
  table: ({ children, }) => <styled.table>{children}</styled.table>,
  th: ({ children, }) => <styled.th>{children}</styled.th>,
  td: ({ children, }) => <styled.td>{children}</styled.td>,
  a: ({ children, }) => <styled.a>{children}</styled.a>,
  strong: ({ children, }) => <styled.strong>{children}</styled.strong>,
  em: ({ children, }) => <styled.em>{children}</styled.em>,
  hr: ({ }) => <styled.hr />,
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  if (!content) return null

  return (
    <Stack className={`${markdownStyles} ${className || ''}`} gap="4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </Stack>
  )
}

import { css } from '@/styled-system/css'
import { Box, Center, HTMLStyledProps, styled } from '@/styled-system/jsx'
import { SearchIcon } from 'lucide-react'
import Form from 'next/form'
import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'

type SearchProps = {
  id: string
  onSubmit?: () => void
} & HTMLStyledProps<'input'>

const GradientSearchIcon = ({
  id = 'searchIconGradient',
  size = 24,
}: {
  id?: string
  size?: number
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgb(152, 158, 203)" />
        <stop offset="25%" stopColor="rgb(141, 166, 194)" />
        <stop offset="50%" stopColor="rgb(167, 172, 180)" />
        <stop offset="75%" stopColor="rgb(210, 175, 163)" />
        <stop offset="100%" stopColor="rgb(238, 174, 147)" />
      </linearGradient>
    </defs>
    <circle cx="11" cy="11" r="8" stroke={`url(#${id})`} strokeWidth="1" fill="none" />
    <path
      d="m21 21-4.35-4.35"
      stroke={`url(#${id})`}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Search({ id, onSubmit, ...props }: SearchProps) {
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const value = inputRef.current?.value
    if (!value || value.length < 3) {
      e.preventDefault()
      return
    }

    onSubmit?.()
  }

  return (
    <Form
      action="/search"
      prefetch={false}
      onSubmit={handleSubmit}
      className={css({
        position: 'relative',
        display: 'flex',
        w: 'full',
        maxW: '550px',
      })}
    >
      <styled.input
        ref={inputRef}
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder="Search..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        {...props}
        className={css({
          w: 'full',
          h: '11',
          pl: '11',
          color: 'neutral.400',
          borderBlock: { mdDown: '1px solid' },
          borderLeft: { mdDown: '1px solid' },
          borderGradient: 'PeachTreeBorder',
          outline: 'none',
          _focus: {
            // outline: 'none',
          },
          _focusVisible: {
            // outline: '2px solid',
            // outlineColor: 'blue.500',
            // outlineOffset: '2px',
          },
          '@media (pointer: coarse)': {
            _focusVisible: {
              outline: 'none',
            },
          },
        })}
      />
      <Center
        pointerEvents="none"
        className={css({
          position: 'absolute',
          left: 0,
          top: 0,
          w: '11',
          h: '11',
        })}
      >
        <GradientSearchIcon id={id} />
      </Center>
    </Form>
  )
}

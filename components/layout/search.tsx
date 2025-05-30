import { css } from '@/styled-system/css'
import { Box, Center, HTMLStyledProps, styled } from '@/styled-system/jsx'
import { SearchIcon } from 'lucide-react'
import Form from 'next/form'
import { useSearchParams } from 'next/navigation'

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

  const handleSubmit = () => {
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
          // border: '1px solid transparent',
          borderRight: 'none',
          borderImage:
            'linear-gradient(160deg, rgba(152, 158, 203, 0.5) 0%, rgba(141, 166, 194, 0.5) 25%, rgba(167, 172, 180, 0.5) 50%, rgba(210, 175, 163, 0.5) 75%, rgba(238, 174, 147, 0.5) 100%) 1',
          outline: 'none',
          _focus: {
            outline: 'none',
            borderImage:
              'linear-gradient(160deg, rgba(152, 158, 203, 0.8) 0%, rgba(141, 166, 194, 0.8) 25%, rgba(167, 172, 180, 0.8) 50%, rgba(210, 175, 163, 0.8) 75%, rgba(238, 174, 147, 0.8) 100%) 1',
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

// export function SearchSkeleton() {
//   return (
//     <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
//       <input
//         placeholder="Search for products..."
//         className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
//       />
//       <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
//         <GradientSearchIcon />
//       </div>
//     </form>
//   )
// }

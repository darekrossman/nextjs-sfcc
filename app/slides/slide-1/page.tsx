import { css } from '@/styled-system/css'

const Slide1 = () => {
  return (
    <div
      className={css({
        textAlign: 'center',
        maxW: '1000px',
        mx: 'auto',
      })}
    >
      <h1
        className={css({
          fontSize: { base: '4xl', md: '6xl' },
          fontWeight: 'bold',
          mb: 6,
          color: 'gray.900',
          lineHeight: '1.2',
        })}
      >
        Welcome to Our Presentation
      </h1>

      <p
        className={css({
          fontSize: { base: 'lg', md: '2xl' },
          color: 'gray.600',
          mb: 8,
          maxW: '800px',
          mx: 'auto',
        })}
      >
        An interactive slide presentation built with Next.js
      </p>

      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          flexWrap: 'wrap',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'gray.500',
            fontSize: 'sm',
          })}
        >
          <span>Press</span>
          <kbd
            className={css({
              px: 2,
              py: 1,
              bg: 'gray.100',
              border: '1px solid',
              borderColor: 'gray.300',
              rounded: 'md',
              fontSize: 'xs',
              fontFamily: 'mono',
            })}
          >
            →
          </kbd>
          <span>to continue</span>
        </div>
      </div>

      <div
        className={css({
          mt: 12,
          p: 6,
          bg: 'blue.50',
          rounded: 'lg',
          border: '1px solid',
          borderColor: 'blue.200',
        })}
      >
        <h2
          className={css({
            fontSize: 'lg',
            fontWeight: 'semibold',
            color: 'blue.900',
            mb: 2,
          })}
        >
          Navigation Tips
        </h2>
        <ul
          className={css({
            listStyle: 'none',
            p: 0,
            m: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            fontSize: 'sm',
            color: 'blue.800',
          })}
        >
          <li>• Use arrow keys (← →) to navigate</li>
          <li>• Press ESC to return to the index</li>
          <li>• Click the progress dots to jump to any slide</li>
        </ul>
      </div>
    </div>
  )
}

export default Slide1

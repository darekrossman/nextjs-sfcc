import Link from 'next/link'
import { css } from '@/styled-system/css'

const SlidesIndexPage = () => {
  const slides = [
    { id: 1, title: 'Introduction', description: 'Welcome to our presentation' },
    { id: 2, title: 'Main Content', description: 'The core of our discussion' },
    { id: 3, title: 'Conclusion', description: 'Wrapping up and next steps' },
  ]

  return (
    <div
      className={css({
        maxW: '800px',
        mx: 'auto',
        p: 8,
      })}
    >
      <h1
        className={css({
          fontSize: '3xl',
          fontWeight: 'bold',
          mb: 2,
        })}
      >
        Presentation Slides
      </h1>

      <p
        className={css({
          color: 'gray.600',
          mb: 8,
        })}
      >
        Select a slide to view or start from the beginning
      </p>

      {/* Start presentation button */}
      <Link
        href="/slides/slide-1"
        className={css({
          display: 'inline-flex',
          alignItems: 'center',
          gap: 2,
          bg: 'blue.600',
          color: 'white',
          px: 6,
          py: 3,
          rounded: 'lg',
          fontWeight: 'medium',
          transition: 'all 0.2s',
          textDecoration: 'none',
          mb: 8,
          _hover: {
            bg: 'blue.700',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
        })}
      >
        Start Presentation
        <span aria-hidden="true">→</span>
      </Link>

      {/* Slide list */}
      <div
        className={css({
          borderTop: '1px solid',
          borderColor: 'gray.200',
          pt: 8,
        })}
      >
        <h2
          className={css({
            fontSize: 'xl',
            fontWeight: 'semibold',
            mb: 4,
          })}
        >
          Table of Contents
        </h2>

        <ul
          className={css({
            listStyle: 'none',
            p: 0,
            m: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          })}
        >
          {slides.map((slide) => (
            <li key={slide.id}>
              <Link
                href={`/slides/slide-${slide.id}`}
                className={css({
                  display: 'block',
                  p: 4,
                  border: '1px solid',
                  borderColor: 'gray.200',
                  rounded: 'md',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  _hover: {
                    borderColor: 'blue.400',
                    bg: 'blue.50',
                    transform: 'translateX(4px)',
                  },
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  })}
                >
                  <div>
                    <h3
                      className={css({
                        fontWeight: 'semibold',
                        color: 'gray.900',
                        mb: 1,
                      })}
                    >
                      Slide {slide.id}: {slide.title}
                    </h3>
                    <p
                      className={css({
                        fontSize: 'sm',
                        color: 'gray.600',
                      })}
                    >
                      {slide.description}
                    </p>
                  </div>
                  <span
                    className={css({
                      color: 'gray.400',
                      fontSize: 'xl',
                    })}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Keyboard navigation hint */}
      <div
        className={css({
          mt: 8,
          p: 4,
          bg: 'gray.100',
          rounded: 'md',
          fontSize: 'sm',
          color: 'gray.700',
        })}
      >
        <strong>Tip:</strong> Use arrow keys (← →) to navigate between slides and ESC to
        return here
      </div>
    </div>
  )
}

export default SlidesIndexPage

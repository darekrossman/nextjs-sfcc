import { css } from '@/styled-system/css'

const Slide2 = () => {
  return (
    <div
      className={css({
        maxW: '1200px',
        mx: 'auto',
      })}
    >
      <h1
        className={css({
          fontSize: { base: '3xl', md: '5xl' },
          fontWeight: 'bold',
          mb: 8,
          color: 'gray.900',
        })}
      >
        Main Content
      </h1>

      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
          gap: 8,
          mb: 8,
        })}
      >
        {/* Left column */}
        <div>
          <h2
            className={css({
              fontSize: '2xl',
              fontWeight: 'semibold',
              mb: 4,
              color: 'gray.800',
            })}
          >
            Key Features
          </h2>

          <ul
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              listStyle: 'none',
              p: 0,
            })}
          >
            {[
              'Keyboard navigation with arrow keys',
              'Visual progress indicators',
              'Responsive design for all devices',
              'Clean and modern interface',
              'Easy to extend and customize',
            ].map((feature, index) => (
              <li
                key={index}
                className={css({
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 3,
                })}
              >
                <span
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    w: 6,
                    h: 6,
                    bg: 'green.500',
                    color: 'white',
                    rounded: 'full',
                    fontSize: 'sm',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    mt: 0.5,
                  })}
                >
                  ✓
                </span>
                <span
                  className={css({
                    color: 'gray.700',
                    fontSize: 'lg',
                  })}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div>
          <h2
            className={css({
              fontSize: '2xl',
              fontWeight: 'semibold',
              mb: 4,
              color: 'gray.800',
            })}
          >
            Technical Stack
          </h2>

          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 4,
            })}
          >
            {[
              { name: 'Next.js', color: 'blue' },
              { name: 'TypeScript', color: 'purple' },
              { name: 'PandaCSS', color: 'yellow' },
              { name: 'React', color: 'cyan' },
            ].map((tech) => (
              <div
                key={tech.name}
                className={css({
                  p: 4,
                  bg: `${tech.color}.50`,
                  border: '1px solid',
                  borderColor: `${tech.color}.200`,
                  rounded: 'lg',
                  textAlign: 'center',
                  fontWeight: 'semibold',
                  color: `${tech.color}.900`,
                })}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code example */}
      <div
        className={css({
          mt: 8,
          p: 6,
          bg: 'gray.900',
          rounded: 'lg',
          overflow: 'auto',
        })}
      >
        <h3
          className={css({
            fontSize: 'sm',
            fontWeight: 'medium',
            color: 'gray.400',
            mb: 3,
          })}
        >
          Example Code
        </h3>
        <pre
          className={css({
            fontSize: 'sm',
            color: 'gray.100',
            fontFamily: 'mono',
          })}
        >
          {`// Navigate to next slide
const handleNext = () => {
  if (currentSlide < totalSlides) {
    router.push(\`/slides/slide-\${currentSlide + 1}\`)
  }
}`}
        </pre>
      </div>
    </div>
  )
}

export default Slide2

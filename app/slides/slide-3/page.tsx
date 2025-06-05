import Link from 'next/link'
import { css } from '@/styled-system/css'

const Slide3 = () => {
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
        })}
      >
        Thank You!
      </h1>

      <p
        className={css({
          fontSize: { base: 'lg', md: '2xl' },
          color: 'gray.600',
          mb: 8,
          maxW: '700px',
          mx: 'auto',
        })}
      >
        We hope you enjoyed this presentation demonstration
      </p>

      {/* Summary points */}
      <div
        className={css({
          maxW: '600px',
          mx: 'auto',
          mb: 12,
          p: 6,
          bg: 'gray.50',
          rounded: 'lg',
          textAlign: 'left',
        })}
      >
        <h2
          className={css({
            fontSize: 'xl',
            fontWeight: 'semibold',
            mb: 4,
            color: 'gray.800',
          })}
        >
          Key Takeaways
        </h2>
        <ul
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            listStyle: 'none',
            p: 0,
            color: 'gray.700',
          })}
        >
          <li>📱 Fully responsive slide system</li>
          <li>⌨️ Intuitive keyboard navigation</li>
          <li>🎨 Beautiful and customizable design</li>
          <li>🚀 Built with modern web technologies</li>
          <li>♿ Accessible to all users</li>
        </ul>
      </div>

      {/* Call to action buttons */}
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          flexWrap: 'wrap',
          mb: 8,
        })}
      >
        <Link
          href="/slides"
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
            _hover: {
              bg: 'blue.700',
              transform: 'translateY(-1px)',
              boxShadow: 'lg',
            },
          })}
        >
          <span aria-hidden="true">←</span>
          Back to Index
        </Link>

        <Link
          href="/slides/slide-1"
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            bg: 'gray.200',
            color: 'gray.700',
            px: 6,
            py: 3,
            rounded: 'lg',
            fontWeight: 'medium',
            transition: 'all 0.2s',
            textDecoration: 'none',
            _hover: {
              bg: 'gray.300',
              transform: 'translateY(-1px)',
            },
          })}
        >
          ↻ Restart Presentation
        </Link>
      </div>

      {/* Contact/Next steps */}
      <div
        className={css({
          mt: 12,
          p: 6,
          borderTop: '1px solid',
          borderColor: 'gray.200',
        })}
      >
        <p
          className={css({
            fontSize: 'sm',
            color: 'gray.500',
            mb: 2,
          })}
        >
          Want to learn more?
        </p>
        <p
          className={css({
            fontSize: 'lg',
            color: 'gray.700',
          })}
        >
          This slide system is ready to be customized for your needs!
        </p>
      </div>
    </div>
  )
}

export default Slide3

import { css } from '@/styled-system/css'

const Slide4 = () => {
  return (
    <div
      className={css({
        maxW: '1200px',
        mx: 'auto',
      })}
    >
      <h1
        className={css({
          fontSize: { base: '4xl', md: '6xl' },
          fontWeight: 'bold',
          mb: 8,
          color: 'gray.900',
        })}
      >
        Architecture Overview
      </h1>

      {/* Architecture diagram */}
      <div
        className={css({
          p: 8,
          bg: 'blue.50',
          border: '2px solid',
          borderColor: 'blue.200',
          rounded: 'xl',
          mb: 8,
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', md: 'repeat(4, 1fr)' },
            gap: 6,
            alignItems: 'center',
          })}
        >
          {/* SFCC */}
          <div
            className={css({
              textAlign: 'center',
              p: 6,
              bg: 'orange.100',
              border: '2px solid',
              borderColor: 'orange.400',
              rounded: 'lg',
            })}
          >
            <div
              className={css({
                fontSize: '3xl',
                mb: 2,
              })}
            >
              🛒
            </div>
            <h3
              className={css({
                fontSize: 'lg',
                fontWeight: 'bold',
                color: 'orange.800',
              })}
            >
              Salesforce Commerce Cloud
            </h3>
          </div>

          {/* Arrow */}
          <div
            className={css({
              textAlign: 'center',
              fontSize: '2xl',
              color: 'blue.600',
            })}
          >
            →
          </div>

          {/* Next.js */}
          <div
            className={css({
              textAlign: 'center',
              p: 6,
              bg: 'blue.100',
              border: '2px solid',
              borderColor: 'blue.400',
              rounded: 'lg',
            })}
          >
            <div
              className={css({
                fontSize: '3xl',
                mb: 2,
              })}
            >
              ⚛️
            </div>
            <h3
              className={css({
                fontSize: 'lg',
                fontWeight: 'bold',
                color: 'blue.800',
              })}
            >
              Next.js 14 App Router
            </h3>
          </div>

          {/* Arrow */}
          <div
            className={css({
              textAlign: 'center',
              fontSize: '2xl',
              color: 'blue.600',
            })}
          >
            →
          </div>
        </div>

        {/* Second row */}
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', md: 'repeat(4, 1fr)' },
            gap: 6,
            alignItems: 'center',
            mt: 8,
          })}
        >
          {/* Sanity */}
          <div
            className={css({
              textAlign: 'center',
              p: 6,
              bg: 'red.100',
              border: '2px solid',
              borderColor: 'red.400',
              rounded: 'lg',
            })}
          >
            <div
              className={css({
                fontSize: '3xl',
                mb: 2,
              })}
            >
              📝
            </div>
            <h3
              className={css({
                fontSize: 'lg',
                fontWeight: 'bold',
                color: 'red.800',
              })}
            >
              Sanity CMS
            </h3>
          </div>

          {/* Arrow up */}
          <div
            className={css({
              textAlign: 'center',
              fontSize: '2xl',
              color: 'blue.600',
              transform: 'rotate(-45deg)',
            })}
          >
            ↗
          </div>

          {/* Arrow down */}
          <div
            className={css({
              textAlign: 'center',
              fontSize: '2xl',
              color: 'blue.600',
              transform: 'rotate(45deg)',
            })}
          >
            ↘
          </div>

          {/* Vercel */}
          <div
            className={css({
              textAlign: 'center',
              p: 6,
              bg: 'gray.900',
              color: 'white',
              border: '2px solid',
              borderColor: 'gray.700',
              rounded: 'lg',
            })}
          >
            <div
              className={css({
                fontSize: '3xl',
                mb: 2,
              })}
            >
              ▲
            </div>
            <h3
              className={css({
                fontSize: 'lg',
                fontWeight: 'bold',
              })}
            >
              Vercel Edge + Fluid Compute
            </h3>
          </div>
        </div>
      </div>

      {/* Key responsibilities */}
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', lg: 'repeat(2, 1fr)' },
          gap: 6,
        })}
      >
        {[
          {
            title: 'Salesforce',
            items: [
              'Product catalog',
              'Pricing & promotions',
              'Inventory management',
              'Order processing',
            ],
          },
          {
            title: 'Sanity',
            items: [
              'Content management',
              'Marketing campaigns',
              'Merchandising',
              'Site copy',
            ],
          },
          {
            title: 'Next.js',
            items: [
              'Unified rendering',
              'Personalization logic',
              'API orchestration',
              'SEO optimization',
            ],
          },
          {
            title: 'Vercel',
            items: [
              'Edge middleware',
              'Global caching',
              'Fluid compute scaling',
              'Performance optimization',
            ],
          },
        ].map((section) => (
          <div
            key={section.title}
            className={css({
              p: 6,
              bg: 'white',
              border: '1px solid',
              borderColor: 'gray.200',
              rounded: 'lg',
            })}
          >
            <h3
              className={css({
                fontSize: 'xl',
                fontWeight: 'semibold',
                mb: 4,
                color: 'gray.800',
              })}
            >
              {section.title}
            </h3>
            <ul
              className={css({
                listStyle: 'none',
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              })}
            >
              {section.items.map((item, index) => (
                <li
                  key={index}
                  className={css({
                    fontSize: 'sm',
                    color: 'gray.600',
                    _before: {
                      content: '"•"',
                      color: 'blue.500',
                      fontWeight: 'bold',
                      width: '1em',
                      display: 'inline-block',
                    },
                  })}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slide4

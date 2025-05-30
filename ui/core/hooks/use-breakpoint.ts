import { useEffect, useState } from 'react'

export function useBreakpoint(breakpoint: string) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint})`)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches)
    }

    // Set initial value
    setIsMobile(!mediaQuery.matches)

    // Add listener
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return isMobile
}

import { useIntl } from '@/lib/react-intl'
import { Flex, styled } from '@/styled-system/jsx'
import { pagination } from '@/styled-system/recipes'
import { HTMLStyledProps } from '@/styled-system/types'
import { Button } from '@/ui/core/button'
import { Icon } from '@/ui/core/icon'
import { createStyleContext } from '@shadow-panda/style-context'
import React, { forwardRef, createContext, useContext } from 'react'

// Create style context from the slot recipe
const { withProvider, withContext } = createStyleContext(pagination as any)

export interface PaginationProps extends HTMLStyledProps<'nav'> {
  /** Total number of pages */
  totalPages: number
  /** Current active page (1-indexed) */
  currentPage: number
  /** Handler for page change */
  onPageChange?: (page: number) => void
  /** Maximum number of page buttons to show */
  maxVisiblePages?: number
  /** Show the last page button separated by an ellipsis */
  showLastPage?: boolean
  /** Labels for accessibility */
  labels?: {
    previous?: string
    next?: string
    page?: string
    ellipsis?: string
  }
}

interface PaginationContextType {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  maxVisiblePages: number
  showLastPage: boolean
  labels: {
    previous: string
    next: string
    page: string
    ellipsis: string
  }
}

const PaginationContext = createContext<PaginationContextType | null>(null)

const usePagination = () => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error('usePagination must be used within a Pagination component')
  }
  return context
}

const PaginationBase = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      totalPages,
      currentPage,
      onPageChange = () => {},
      maxVisiblePages = 5,
      showLastPage = true,
      labels = {},
      ...props
    },
    ref,
  ) => {
    const { formatMessage } = useIntl()

    const defaultLabels = {
      previous: formatMessage({
        id: 'pagination.previous',
        defaultMessage: 'Previous',
      }),
      next: formatMessage({ id: 'pagination.next', defaultMessage: 'Next' }),
      page: formatMessage({ id: 'pagination.page', defaultMessage: 'Page' }),
      ellipsis: formatMessage({ id: 'pagination.ellipsis', defaultMessage: 'More pages' }),
    }

    const mergedLabels = { ...defaultLabels, ...labels }

    return (
      <PaginationContext.Provider
        value={{
          totalPages,
          currentPage,
          onPageChange,
          maxVisiblePages,
          showLastPage,
          labels: mergedLabels,
        }}
      >
        <styled.nav ref={ref} aria-label="Pagination" {...props} />
      </PaginationContext.Provider>
    )
  },
)

const PaginationItemsBase = forwardRef<HTMLDivElement>((props, ref) => {
  const { totalPages, currentPage, onPageChange, maxVisiblePages, showLastPage, labels } =
    usePagination()

  // Calculate visible page range
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  // If showLastPage is true and we're not already showing the last page,
  // reduce maxVisiblePages by 1 to make room for the ellipsis and last page
  let adjustedMaxVisiblePages = maxVisiblePages
  if (showLastPage && endPage < totalPages) {
    adjustedMaxVisiblePages = Math.max(2, maxVisiblePages - 1)
    endPage = Math.min(totalPages - 1, startPage + adjustedMaxVisiblePages - 1)
  }

  // Create array of pages to display
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  // Determine if we should show the ellipsis and last page
  const showEllipsisAndLastPage = showLastPage && endPage < totalPages

  return (
    <Flex ref={ref} {...props}>
      {/* Previous page button */}
      <Button
        variant="ghosted"
        data-test="pagination-previous"
        size="icon"
        mr={{ base: 'auto', md: '0' }}
        aria-label={`${labels.previous} ${labels.page}`}
        title={`${labels.previous} ${labels.page}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon name="ChevronLeft" />
      </Button>

      {/* Page number buttons */}
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'ghosted'}
          size="icon"
          aria-label={`${labels.page} ${page}`}
          title={`${labels.page} ${page}`}
          data-test="pagination-page"
          aria-current={currentPage === page ? 'page' : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {/* Ellipsis and last page */}
      {showEllipsisAndLastPage && (
        <>
          <span
            data-test="pagination-ellipsis"
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              userSelect: 'none',
            }}
          >
            …
          </span>
          <Button
            key="last-page"
            data-test="pagination-page"
            variant={currentPage === totalPages ? 'primary' : 'ghosted'}
            size="icon"
            aria-label={`${labels.page} ${totalPages}`}
            title={`${labels.page} ${totalPages}`}
            aria-current={currentPage === totalPages ? 'page' : undefined}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next page button */}
      <Button
        variant="ghosted"
        data-test="pagination-next"
        size="icon"
        ml={{ base: 'auto', md: '0' }}
        aria-label={`${labels.next} ${labels.page}`}
        title={`${labels.next} ${labels.page}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon name="ChevronRight" />
      </Button>
    </Flex>
  )
})

export const Pagination = withProvider(PaginationBase, 'root')
export const PaginationItems = withContext(PaginationItemsBase, 'items')

import { useIntl } from '@/lib/react-intl'
import { Flex, styled } from '@/styled-system/jsx'
import { starRating } from '@/styled-system/recipes'
import { Icon } from '@/ui/core/icon'
import React from 'react'

export type StarRatingProps = {
  score: number
  id: string
  showScore?: boolean
  maxCount?: number
  count?: number
  showCount?: boolean
}

const StarRatingBase = React.forwardRef(
  (
    {
      id,
      score,
      maxCount = 5,
      count,
      showScore = true,
      showCount = true,
      ...props
    }: StarRatingProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const { formatMessage } = useIntl()
    const fillPercentage = Math.min(Math.max(0, score), maxCount) / maxCount

    return (
      <div
        data-test="star-rating-list"
        role="presentation"
        aria-label={formatMessage(
          {
            id: 'star-rating-list.rating',
            defaultMessage: 'Rating: {score} out of {maxCount}',
          },
          { score, maxCount, count },
        )}
        ref={ref}
        {...props}
      >
        {showScore && score != null && <span>{score}</span>}

        <Flex position="relative">
          {/* Empty stars as background */}
          <Flex>
            {Array(maxCount)
              .fill(0)
              .map((_, i) => (
                <Icon key={`${id}-star-${i + 1}`} name="StarEmpty" />
              ))}
          </Flex>

          {/* Filled stars with clip path */}
          <Flex
            position="absolute"
            top={0}
            left={0}
            style={{
              clipPath: `inset(0 ${100 - fillPercentage * 100}% 0 0)`,
            }}
          >
            {Array(maxCount)
              .fill(0)
              .map((_, i) => (
                <Icon key={`${id}-filled-star-${i + 1}`} name="Star" />
              ))}
          </Flex>
        </Flex>

        {showCount && count != null && <span>({count})</span>}
      </div>
    )
  },
)

export const StarRating = styled(StarRatingBase, starRating)

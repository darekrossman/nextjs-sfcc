import { css, cx } from '@/styled-system/css'
import { splitCssProps } from '@/styled-system/jsx'
import { type TextVariantProps, text } from '@/styled-system/recipes'
import type { HTMLStyledProps } from '@/styled-system/types'
import type * as React from 'react'

export type TextProps = {
  /** Any valid HTML element */
  as?: React.ElementType
  className?: string
} & TextVariantProps &
  HTMLStyledProps<React.ElementType>

export const Text = ({ as = 'p', children, className, ...props }: TextProps) => {
  const [recipeProps, nonRecipeProps] = text.splitVariantProps(props)
  const [cssProps, restProps] = splitCssProps(nonRecipeProps)
  const { css: cssProp, ...styleProps } = cssProps

  const TextTag = as

  return (
    <TextTag {...restProps} className={cx(text(recipeProps), css(styleProps, cssProp), className)}>
      {children}
    </TextTag>
  )
}

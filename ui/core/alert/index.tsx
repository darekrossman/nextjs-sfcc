'use client'

import { useIntl } from '@/lib/react-intl'
import { type HTMLStyledProps, styled } from '@/styled-system/jsx'
import { type AlertVariantProps, alert } from '@/styled-system/recipes'
import { createStyleContext } from '@shadow-panda/style-context'
import { TriangleAlert } from 'lucide-react'
import * as React from 'react'

const { withProvider, withContext } = createStyleContext(alert)

const BaseAlert = withProvider(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    (
      props: React.HTMLAttributes<HTMLDivElement>,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => <div {...props} ref={ref} />,
  ),
  'root',
)

export const Alert = styled(
  React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & AlertVariantProps & { showIcon?: boolean }
  >(({ children, showIcon = true, ...props }, ref) => {
    const intl = useIntl()

    // const iconMap: Record<string, IconNames> = {
    //   success: 'CheckboxCircle',
    //   warning: 'AlertCircle',
    //   info: 'InfoCircle',
    //   error: 'AlertCircle',
    //   neutral: 'InfoCircle',
    // }

    // const iconName = iconMap[props.level?.toString() || 'success']

    return (
      <BaseAlert
        ref={ref}
        {...props}
        data-foo={intl.formatMessage({ defaultMessage: 'foo' })}
      >
        {showIcon && props.variant !== 'callout' && <TriangleAlert />}
        <styled.div flex="1">{children}</styled.div>
      </BaseAlert>
    )
  }),
)

export const AlertTitle = withContext(
  styled.h5 as React.FC<HTMLStyledProps<'h5'>>,
  'title',
)
export const AlertDescription = withContext(
  styled.div as React.FC<HTMLStyledProps<'div'>>,
  'description',
)

Alert.displayName = 'Alert'
AlertTitle.displayName = 'AlertTitle'
AlertDescription.displayName = 'AlertDescription'

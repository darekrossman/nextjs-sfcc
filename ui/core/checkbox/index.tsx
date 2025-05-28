import { cx } from '@/styled-system/css'
import { styled } from '@/styled-system/jsx'
import { checkbox } from '@/styled-system/recipes'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'
import { Icon } from '../icon'

const BaseCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  const styles = checkbox()

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cx('peer', styles.root, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <Icon name="Checkmark" size="xs" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
BaseCheckbox.displayName = CheckboxPrimitive.Root.displayName

export const Checkbox = styled(BaseCheckbox)
Checkbox.displayName = 'Checkbox'

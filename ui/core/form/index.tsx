'use client'

import { useIntl } from '@/lib/react-intl'
import { cx } from '@/styled-system/css'
import { Box, VisuallyHidden, styled } from '@/styled-system/jsx'
import {
  formControl,
  formDescription,
  formItem,
  formLabel,
  formMessage,
  formPasswordField,
} from '@/styled-system/recipes'
import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'
import { Button } from '../button'
import { Icon } from '../icon'
import { Input } from '../input'
import { Label } from '../label'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

type FormItemContextValue = {
  id: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const BaseFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

const BaseFormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} {...props} />
    </FormItemContext.Provider>
  )
})
BaseFormItem.displayName = 'FormItem'

const BaseFormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cx(formLabel(), className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
BaseFormLabel.displayName = 'FormLabel'

const BaseFormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
BaseFormControl.displayName = 'FormControl'

const BaseFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  const { formDescriptionId } = useFormField()

  return <p ref={ref} id={formDescriptionId} {...props} />
})
BaseFormDescription.displayName = 'FormDescription'

const BaseFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { formatMessage } = useIntl()
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  const formMessages: Record<string, string> = {
    required: 'This field is required',
    minlength: 'This field must be at least 3 characters long',
    maxlength: 'This field must be less than 10 characters long',
    pattern: 'This field must contain only letters and numbers',
  }

  if (!body) {
    return null
  }

  const shouldTranslate = error?.message && formMessages?.[error.message]

  return (
    <p ref={ref} id={formMessageId} role="alert" {...props}>
      {shouldTranslate
        ? formatMessage({ defaultMessage: formMessages[error.message || 'Invalid'] })
        : body}
    </p>
  )
})
BaseFormMessage.displayName = 'FormMessage'

type FormPasswordFieldProps = {
  control: any
  name: string
  label?: React.ReactNode
  placeholder?: string
}

const BaseFormPasswordField = ({
  control,
  name,
  label,
  placeholder,
  ...props
}: FormPasswordFieldProps) => {
  const { formatMessage } = useIntl()
  const [showPassword, setShowPassword] = React.useState(false)

  const defaultPlaceholder = formatMessage({
    defaultMessage: 'Enter password',
  })
  const hideMessageText = formatMessage({
    defaultMessage: 'Hide password',
  })
  const showMessageText = formatMessage({
    defaultMessage: 'Show password',
  })

  const togglePassword = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem {...props}>
          <FormLabel>{label || formatMessage({ defaultMessage: 'Password' })}</FormLabel>
          <FormControl>
            <Box position="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder || defaultPlaceholder}
                {...field}
              />
              <Button
                type="button"
                variant="unstyled"
                size="icon-sm"
                aria-label={showPassword ? hideMessageText : showMessageText}
                onClick={togglePassword}
                className="form-password-field-button"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} />
                <VisuallyHidden>
                  {showPassword ? hideMessageText : showMessageText}
                </VisuallyHidden>
              </Button>
            </Box>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const Form = FormProvider
export const FormField = BaseFormField
export const FormLabel = styled(BaseFormLabel as typeof Label, formLabel)
export const FormItem = styled(BaseFormItem, formItem)
export const FormControl = styled(BaseFormControl, formControl)
export const FormDescription = styled(BaseFormDescription, formDescription)
export const FormMessage = styled(BaseFormMessage, formMessage)
export const FormPasswordField = styled(BaseFormPasswordField, formPasswordField)

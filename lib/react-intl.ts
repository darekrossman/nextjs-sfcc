import type React from 'react'

// Mock implementation for useIntl
export const useIntl = () => {
  return {
    formatMessage: (
      { id, defaultMessage }: { id?: string; defaultMessage?: string },
      values?: Record<string, React.ReactNode | string | number>,
    ): string => {
      let message = defaultMessage || id || ''
      if (values) {
        Object.keys(values).forEach((key) => {
          const value = values[key]
          // Ensure value is converted to string for replacement
          message = message.replace(`{${key}}`, String(value ?? ''))
        })
      }
      return message
    },
    // Add other intl functions as needed, mocking their behavior
    formatDate: (date: Date | string | number): string => new Date(date).toLocaleDateString(),
    formatTime: (date: Date | string | number): string => new Date(date).toLocaleTimeString(),
    formatNumber: (num: number): string => String(num),
    // ... other properties/methods used by your components
  }
}

// Mock implementation for FormattedMessage
interface FormattedMessageProps {
  id?: string
  defaultMessage?: string
  values?: Record<string, React.ReactNode | string | number>
  children?: (message: string) => React.ReactNode
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({
  id,
  defaultMessage,
  values,
  children,
}) => {
  const intl = useIntl()
  const message: string | undefined = intl.formatMessage({ id, defaultMessage }, values)

  if (typeof children === 'function') {
    // children is a function that receives the message and returns React nodes
    return children(message)
  }

  // If children is not a function, render the message string directly.
  // If message is empty and children exist (and are not the function type),
  // render children as fallback (though unusual for FormattedMessage).
  // Use React.Fragment for safety.
  return message || (children ? children : null)
}

// Mock implementation for FormattedNumber
interface FormattedNumberProps {
  value: number
  currency?: string
  style?: string
  children?: (formattedNumber: string) => React.ReactNode
}

export const FormattedNumber: React.FC<FormattedNumberProps> = ({
  value,
  currency,
  style,
  children,
}) => {
  let formattedNumber: string
  if (style) {
    const options: Intl.NumberFormatOptions = { style: style as any }
    if (style === 'currency' && currency) {
      options.currency = currency
    }
    formattedNumber = value.toLocaleString(undefined, options)
  } else if (currency) {
    formattedNumber = value.toLocaleString(undefined, { style: 'currency', currency })
  } else {
    const intl = useIntl()
    formattedNumber = intl.formatNumber(value)
  }

  if (typeof children === 'function') {
    return children(formattedNumber)
  }

  return formattedNumber
}

// Export other components/hooks from react-intl if they are used, e.g.:
// export const defineMessages = (messages: any) => messages;
// export const IntlProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// Add default exports if needed, though named exports are common
// export default { useIntl, FormattedMessage };

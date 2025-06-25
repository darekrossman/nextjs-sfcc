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
    formatDate: (date: Date | string | number): string =>
      new Date(date).toLocaleDateString(),
    formatTime: (date: Date | string | number): string =>
      new Date(date).toLocaleTimeString(),
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

// Mock implementation for FormattedNumber
interface FormattedNumberProps {
  value: number
  currency?: string
  style?: string
  children?: (formattedNumber: string) => React.ReactNode
}

// Export other components/hooks from react-intl if they are used, e.g.:
// export const defineMessages = (messages: any) => messages;
// export const IntlProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// Add default exports if needed, though named exports are common
// export default { useIntl, FormattedMessage };

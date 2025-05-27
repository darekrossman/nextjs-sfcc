import { Box, Flex } from '@/styled-system/jsx'
import React from 'react'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.'
import { Button } from '../button'
import { Icon } from '../icon'
import { Text } from '../text'
import { useToast } from './use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, icon, children, ...props }) => (
        <Toast
          key={id}
          {...props}
          data-test="toast"
          variant={children ? 'unstyled' : props.variant}
        >
          {children || (
            <>
              <Flex gap="2">
                {icon && <Icon name={icon} size="md" />}
                <Box>
                  {title && (
                    <ToastTitle asChild>
                      <Text variant="static16" as="h6">
                        {title}
                      </Text>
                    </ToastTitle>
                  )}
                  {description && (
                    <ToastDescription asChild>
                      <Text variant="static14" as="p">
                        {description}
                      </Text>
                    </ToastDescription>
                  )}
                </Box>
              </Flex>
              {action}
            </>
          )}
          <ToastClose asChild>
            <Button
              variant="link"
              size="icon-sm"
              _hover={{ color: 'black', opacity: '0.75' }}
              aria-label="Close"
            >
              <Icon name="Close" size="sm" />
            </Button>
          </ToastClose>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

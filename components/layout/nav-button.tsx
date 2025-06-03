import { styled } from '@/styled-system/jsx'
import { HTMLStyledProps } from '@/styled-system/jsx'

export function NavButton(props: HTMLStyledProps<'button'>) {
  return (
    <styled.button
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="11"
      h="11"
      bg="var(--bg)"
      color="var(--fg)"
      transition="var(--transition)"
      {...props}
    />
  )
}

import { type HTMLStyledProps, styled } from '@/styled-system/jsx'
import { input } from '@/styled-system/recipes'

export const Input = styled('input', input)
Input.displayName = 'Input'
export type InputProps = HTMLStyledProps<typeof Input>

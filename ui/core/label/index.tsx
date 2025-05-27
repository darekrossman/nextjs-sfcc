import { type HTMLStyledProps, styled } from '@/styled-system/jsx'
import { label } from '@/styled-system/recipes'

export const Label = styled('label', label)
Label.displayName = 'Label'
export type LabelProps = HTMLStyledProps<typeof Label>

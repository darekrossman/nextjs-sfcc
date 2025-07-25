import { SITE_NAME } from '@/lib/constants'
import { HTMLStyledProps, styled } from '@/styled-system/jsx'

export default function LogoIcon(props: HTMLStyledProps<'svg'>) {
  return (
    <styled.svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${SITE_NAME} logo`}
      viewBox="0 0 32 28"
      display="block"
      {...props}
    >
      <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z" />
      <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z" />
    </styled.svg>
  )
}

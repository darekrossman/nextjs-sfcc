'use client'

export type LoaderProps = {
  size?: string
  speed?: string
  color?: string
}

export const Loader = ({ size = '40', speed = '2', color = 'black' }: LoaderProps) => {
  return 'loading...'
}

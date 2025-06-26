import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/constants'

export default async function OpengraphImage(): Promise<ImageResponse> {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        fontSize: 32,
        fontWeight: 300,
        background: 'black',
        color: 'white',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 28"
        width="100"
        fill="currentColor"
      >
        <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z" />
        <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z" />
      </svg>
      <div style={{ marginTop: 16 }}>{SITE_NAME}</div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}

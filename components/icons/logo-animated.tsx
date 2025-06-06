'use client'

import { SITE_NAME } from '@/lib/constants'
import { HTMLStyledProps, styled } from '@/styled-system/jsx'

export default function LogoIcon(props: HTMLStyledProps<'svg'>) {
  return (
    <>
      <styled.svg
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`${SITE_NAME} logo`}
        viewBox="0 0 32 28"
        display="block"
        {...props}
      >
        <defs>
          <linearGradient id="logo-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="gradient-stop-1" />
            <stop offset="50%" className="gradient-stop-2" />
            <stop offset="100%" className="gradient-stop-3" />
          </linearGradient>
          <linearGradient id="logo-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="gradient-stop-3" />
            <stop offset="50%" className="gradient-stop-1" />
            <stop offset="100%" className="gradient-stop-2" />
          </linearGradient>
        </defs>
        <path
          d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"
          fill="url(#logo-gradient-1)"
        />
        <path
          d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"
          fill="url(#logo-gradient-2)"
        />
      </styled.svg>
      <style jsx>{`
        .gradient-stop-1 {
          animation: gradientShift1 12s ease-in-out infinite;
        }
        .gradient-stop-2 {
          animation: gradientShift2 12s ease-in-out infinite;
        }
        .gradient-stop-3 {
          animation: gradientShift3 12s ease-in-out infinite;
        }
        
        @keyframes gradientShift1 {
          0%, 100% {
            stop-color: #6366f1;
            stop-opacity: 0.9;
          }
          25% {
            stop-color: #8b5cf6;
            stop-opacity: 1;
          }
          50% {
            stop-color: #ec4899;
            stop-opacity: 0.85;
          }
          75% {
            stop-color: #f59e0b;
            stop-opacity: 0.95;
          }
        }
        
        @keyframes gradientShift2 {
          0%, 100% {
            stop-color: #8b5cf6;
            stop-opacity: 0.85;
          }
          25% {
            stop-color: #ec4899;
            stop-opacity: 0.95;
          }
          50% {
            stop-color: #f59e0b;
            stop-opacity: 0.9;
          }
          75% {
            stop-color: #6366f1;
            stop-opacity: 1;
          }
        }
        
        @keyframes gradientShift3 {
          0%, 100% {
            stop-color: #ec4899;
            stop-opacity: 0.95;
          }
          25% {
            stop-color: #f59e0b;
            stop-opacity: 0.9;
          }
          50% {
            stop-color: #6366f1;
            stop-opacity: 1;
          }
          75% {
            stop-color: #8b5cf6;
            stop-opacity: 0.85;
          }
        }
      `}</style>
    </>
  )
}

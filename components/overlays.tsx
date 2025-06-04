import { css } from '@/styled-system/css'
import * as motion from 'motion/react-client'
import { ComponentProps } from 'react'

export function DialogOverlay(props: ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        bounce: 0,
        visualDuration: 0.2,
        delay: 0.15,
      }}
      className={css({
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        bg: '{gradients.PeachTree}',
        mixBlendMode: 'overlay',
        zIndex: 'modal',
      })}
      style={{
        backdropFilter: 'grayscale(100%) brightness(0.8) contrast(0.7)',
      }}
      {...props}
    />
  )
}

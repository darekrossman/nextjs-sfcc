import { css } from '@/styled-system/css'
import * as motion from 'motion/react-client'
import { Dialog } from 'radix-ui'

export function DialogOverlay() {
  return (
    <Dialog.Overlay asChild>
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
          mixBlendMode: 'color',
          zIndex: 'modal',
        })}
        style={{
          backdropFilter: 'blur(5px)',
        }}
      />
    </Dialog.Overlay>
  )
}

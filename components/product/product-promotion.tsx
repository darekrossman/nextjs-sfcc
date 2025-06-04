import { getPersonalizedProduct } from '@/lib/sfcc/products'
import { Center, styled } from '@/styled-system/jsx'
import * as motion from 'motion/react-client'

export async function ProductPromotion({
  productId,
  locale,
}: {
  productId: string
  locale: string
}) {
  const personalizedProduct = await getPersonalizedProduct({
    id: productId,
    locale,
  })

  const callout = personalizedProduct?.productPromotions?.[0]?.calloutMsg

  if (!callout) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      <Center
        h="8"
        px="25px"
        bg="lime.600"
        borderColor="lime.800"
        // bg="{gradients.PeachTree}"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <styled.p
            color="white/80"
            fontSize="sm"
            fontFamily="mono"
            textTransform="uppercase"
            fontWeight="bold"
          >
            {callout}
          </styled.p>
        </motion.div>
      </Center>
    </motion.div>
  )
}

import { type ProductSearchHit } from '@/lib/sfcc/types'

export async function ProductSearchHit({ hit }: { hit: ProductSearchHit }) {
  return <div>{hit.productId}</div>
}

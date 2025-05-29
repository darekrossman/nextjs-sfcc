import { Product } from './types'

export function findVariant(
  variants: Product['variants'],
  values: Record<string, string | number | undefined>,
) {
  return variants?.find((variant) => {
    return Object.entries(variant.variationValues || {}).every(([id, value]) => {
      return values[id] === value
    })
  })
}

export function findVariants(
  variants: Product['variants'],
  values: Record<string, string | number | undefined>,
) {
  return variants?.filter((variant) => {
    return Object.entries(variant.variationValues || {}).some(([id, value]) => {
      return values[id] === value
    })
  })
}

export function getProductImagesForColor(
  imageGroups: Product['imageGroups'],
  color: string,
) {
  return (
    imageGroups
      ?.filter((group) => group.viewType === 'large')
      .find(
        (group) =>
          group.variationAttributes?.find((attribute) => attribute.id === 'color')
            ?.values?.[0]?.value === color,
      )?.images || []
  )
}

export function getDefaultProductColor(variants: Product['variants']) {
  return variants?.[0]?.variationValues?.color
}

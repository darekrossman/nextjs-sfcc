import { Product, ProductSearchParams } from './types'

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
  color?: string,
) {
  return (
    imageGroups
      ?.filter((group) => group.viewType === 'large')
      .find(
        (group) =>
          group.variationAttributes?.find((attribute) => attribute.id === 'color')
            ?.values?.[0]?.value === color,
      )?.images ||
    imageGroups?.[0]?.images ||
    []
  )
}

export function toggleRefinementForQuery({
  params,
  attributeId,
  value,
}: {
  params: ProductSearchParams
  attributeId: string
  value: string
}) {
  const existingRefine = params.refine || []
  const attributePattern = `${attributeId}=`

  // Find existing refinement for this attribute
  const existingIndex = existingRefine.findIndex((refinement) =>
    refinement.startsWith(attributePattern),
  )

  let newRefine: string[]

  if (existingIndex >= 0) {
    // Check if the value already exists in this refinement
    const currentRefinement = existingRefine[existingIndex]
    if (!currentRefinement) {
      newRefine = [...existingRefine]
    } else {
      const values = currentRefinement.substring(attributePattern.length).split('|')

      if (values.includes(value)) {
        // Value exists, remove it
        const filteredValues = values.filter((v) => v !== value)

        if (filteredValues.length === 0) {
          // No values left, remove the entire refinement
          newRefine = existingRefine.filter((_, index) => index !== existingIndex)
        } else {
          // Update the refinement with remaining values
          newRefine = [...existingRefine]
          newRefine[existingIndex] = `${attributeId}=${filteredValues.join('|')}`
        }
      } else {
        // Value doesn't exist, add it
        newRefine = [...existingRefine]
        newRefine[existingIndex] = `${currentRefinement}|${value}`
      }
    }
  } else {
    // No existing refinement for this attribute, add new one
    newRefine = [...existingRefine, `${attributeId}=${value}`]
  }

  // Filter out cgid refinements to prevent them from being added to the URL
  const filteredRefine = newRefine.filter((refinement) => !refinement.startsWith('cgid='))

  const { locale, ...paramsWithoutLocale } = params
  return {
    ...paramsWithoutLocale,
    refine: filteredRefine.length > 0 ? filteredRefine : undefined,
  }
}

export function parseParamsFromUrl(
  urlParams: Record<string, string | string[] | undefined>,
): ProductSearchParams {
  const { refine, ...otherParams } = urlParams

  // Parse refine parameter
  const refineArray: string[] = []
  if (refine) {
    const refineValues = Array.isArray(refine) ? refine : [refine]
    refineArray.push(...refineValues.filter((r) => r.trim() !== ''))
  }

  return {
    ...otherParams,
    refine: refineArray.length > 0 ? refineArray : undefined,
  } as ProductSearchParams
}

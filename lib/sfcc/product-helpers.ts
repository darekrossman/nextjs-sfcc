import { Product, SearchProductsParameters } from './types'

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

export function getDefaultProductColor(variants: Product['variants']) {
  return variants?.[0]?.variationValues?.color
}

export function addRefinementToQuery({
  params,
  attributeId,
  value,
}: {
  params: SearchProductsParameters
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
    // Append to existing refinement with '|' separator
    newRefine = [...existingRefine]
    newRefine[existingIndex] = `${existingRefine[existingIndex]}|${value}`
  } else {
    // Add new refinement
    newRefine = [...existingRefine, `${attributeId}=${value}`]
  }

  return { ...params, refine: newRefine }
}

export function parseParamsFromUrl(
  urlParams: Record<string, string | string[] | undefined>,
): SearchProductsParameters {
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
  } as SearchProductsParameters
}

export function formatParamsForUrl(
  searchParams: SearchProductsParameters,
): Record<string, string | string[]> {
  const { refine, ...otherParams } = searchParams

  const urlParams: Record<string, string | string[]> = {}

  // Add all non-refine parameters
  Object.entries(otherParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Convert to string format for URL
      if (Array.isArray(value)) {
        urlParams[key] = value.map(String)
      } else {
        urlParams[key] = String(value)
      }
    }
  })

  // Add refine parameter if it exists
  if (refine && refine.length > 0) {
    urlParams.refine = refine
  }

  return urlParams
}

export function removeRefinementValue(
  searchParams: SearchProductsParameters,
  attributeId: string,
  valueToRemove: string,
): SearchProductsParameters {
  const { refine = [], ...otherParams } = searchParams
  const attributePattern = `${attributeId}=`

  const newRefine = refine
    .map((refinement) => {
      if (!refinement.startsWith(attributePattern)) {
        return refinement
      }

      const values = refinement.substring(attributePattern.length).split('|')
      const filteredValues = values.filter((value) => value !== valueToRemove)

      // If no values left, remove the entire refinement
      if (filteredValues.length === 0) {
        return null
      }

      return `${attributeId}=${filteredValues.join('|')}`
    })
    .filter((refinement): refinement is string => refinement !== null)

  return {
    ...otherParams,
    refine: newRefine.length > 0 ? newRefine : undefined,
  }
}

'use client'

import React, { startTransition } from 'react'
import { ProductTileProduct, ProductTileState } from '.'

interface ProductTileStateOptions {
  onSwatchSelectHandler?: (id: string) => void
  onWishlistHandler?: () => void
  onAtcHandler?: () => void
  onQuickViewHandler?: () => void
  loading?: boolean
  buildProductUrl?: (product: ProductTileProduct, selectedColorId?: string) => string
}

export function useProductTileState(
  data: ProductTileProduct,
  options: ProductTileStateOptions,
): ProductTileState {
  const { images, attributes } = data || {}
  const {
    onSwatchSelectHandler,
    onWishlistHandler,
    onAtcHandler,
    onQuickViewHandler,
    loading = false,
    buildProductUrl,
  } = options

  const [selectedColorIds, setSelectedColorIds] = React.useState<string[]>(() => {
    const initialColorId =
      data?.defaultColorId ||
      attributes?.find((attr) => attr.id === 'color')?.values[0]?.id ||
      '_default'
    return initialColorId ? [initialColorId] : []
  })
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)
  const [mouseOver, setMouseOver] = React.useState(false)
  // For backward compatibility and simplicity, we'll use the first selected color
  const selectedColorId = selectedColorIds[0]

  const colors = attributes?.find((attr) => attr.id === 'color')?.values || []
  const currentImages = selectedColorId ? images?.[selectedColorId] : images?._default

  // Generate the product URL based on product ID and selected color
  const productHref = React.useMemo(() => {
    // If custom URL builder is provided, use it
    if (buildProductUrl) {
      return buildProductUrl(data, selectedColorId)
    }

    // Default URL building logic
    if (!data?.id) return '#'

    const baseUrl = `/product/${data.id}.html`

    // If there's a selected color, add it as a query parameter
    if (selectedColorId && selectedColorId !== '_default') {
      return `${baseUrl}?color=${selectedColorId}`
    }

    return baseUrl
  }, [data, selectedColorId, buildProductUrl])

  const handleColorSelect = (colorIds: string[]) => {
    // startTransition(() => {
    setSelectedColorIds(colorIds)
    setSelectedImageIndex(0)
    // For backward compatibility, pass the first selected color to the handler
    if (colorIds.length > 0) {
      onSwatchSelectHandler?.(colorIds[0])
    }
    // })
  }

  const handleImageChange = (index: number) => {
    if (currentImages && index >= 0 && index < currentImages.urls.length) {
      // startTransition(() => {
      setSelectedImageIndex(index)
      // })
    }
  }

  const handleMouseEnter = () => {
    // startTransition(() => {
    setMouseOver(true)
    handleImageChange(1)
    // })
  }

  const handleMouseLeave = () => {
    // startTransition(() => {
    setMouseOver(false)
    handleImageChange(0)
    // })
  }

  const state = {
    product: data,
    selectedColorIds,
    selectedColorId,
    selectedImageIndex,
    colors,
    currentImages,
    handleColorSelect,
    handleImageChange,
    isLoading: loading,
    onQuickViewHandler,
    onWishlistHandler,
    onAtcHandler,
    href: productHref,
    mouseOver,
    setMouseOver,
    handleMouseEnter,
    handleMouseLeave,
  }

  return state
}

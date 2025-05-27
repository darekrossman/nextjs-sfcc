'use client'

import { useIntl } from '@/lib/react-intl'
import { ProductSearchHit } from '@/lib/sfcc/types'
import { css, cx } from '@/styled-system/css'
import { Box, styled } from '@/styled-system/jsx'
import { productTile } from '@/styled-system/recipes'
import { Token, token } from '@/styled-system/tokens'
import { HTMLStyledProps } from '@/styled-system/types'
import { ProductImage } from '@/ui/commerce'
import { type DefaultPriceModel, Price, type RangePriceModel } from '@/ui/commerce'
import { StarRating } from '@/ui/commerce'
import { SwatchPicker, SwatchPickerProps } from '@/ui/commerce'
import { Text } from '@/ui/core'
import { Badge } from '@/ui/core/badge'
import { Button } from '@/ui/core/button'
import { Icon } from '@/ui/core/icon'
import { Skeleton } from '@/ui/core/skeleton'
import { createStyleContext } from '@shadow-panda/style-context'
import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition, startTransition } from 'react'
import React, { forwardRef, createContext, useContext, PropsWithChildren, useMemo } from 'react'
import { useProductTileState } from './context'
import { plpHitTransformer } from './transformer'

const { withProvider, withContext } = createStyleContext(productTile)

export type ProductTileProps = HTMLStyledProps<'div'> &
  PropsWithChildren<{
    product: ProductSearchHit
    loading?: boolean
    onSwatchSelectHandler?: (id: string) => void
    onWishlistHandler?: () => void
    onAtcHandler?: () => void
    onQuickViewHandler?: () => void
    buildProductUrl?: (product: ProductTileProduct, selectedColorId?: string) => string
  }>

export interface ProductTileState {
  product: ProductTileProduct
  selectedColorId?: string
  selectedColorIds: string[]
  selectedImageIndex: number
  colors: ProductTileAttributeValues[]
  currentImages?: {
    urls: string[]
    alt: string
  }
  handleColorSelect: (colorIds: string[]) => void
  handleImageChange: (index: number) => void
  isLoading: boolean
  onQuickViewHandler?: () => void
  onWishlistHandler?: () => void
  onAtcHandler?: () => void
  href: string
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  mouseOver: boolean
  setMouseOver: (mouseOver: boolean) => void
}

export interface ProductTileAttributeValues {
  id: string
  name: string
  selectable: boolean
  colorValue?: string
  imageUrl?: string
}

export interface ProductTileAttribute {
  id: string
  name: string
  values: ProductTileAttributeValues[]
}

export interface ProductTileProduct {
  id: string
  defaultColorId?: string
  attributes?: ProductTileAttribute[]
  images?: {
    [key: string]: {
      urls: string[]
      alt: string
    }
  }
  badges?: Array<
    {
      text: string
    } & React.ComponentProps<typeof Badge>
  >
  price?: DefaultPriceModel | RangePriceModel
  productName?: string
  promotions?: Array<{
    title: string
    description: string
    id: string
  }>
  tags?: string[]
  swatches?: Array<{
    id: string
    selectable: boolean
    color: string
  }>
  rating?: {
    count: number
    score: number
  } | null
}

const ProductTileContext = createContext<ProductTileState | null>(null)

export const ProductTileBase = forwardRef<HTMLDivElement, ProductTileProps>(
  (
    {
      children,
      product,
      className,
      loading = false,
      onSwatchSelectHandler,
      onWishlistHandler,
      onAtcHandler,
      onQuickViewHandler,
      buildProductUrl,
      ...props
    },
    ref,
  ) => {
    const tile = useMemo(() => plpHitTransformer(product), [product.productId])

    const context = useProductTileState(tile, {
      onSwatchSelectHandler,
      onWishlistHandler,
      onAtcHandler,
      onQuickViewHandler,
      loading,
      buildProductUrl,
    })

    return (
      <ProductTileContext.Provider value={context}>
        <styled.div
          data-test={`product-tile-${tile.id}`}
          ref={ref}
          className={className}
          {...props}
        >
          {children}
        </styled.div>
      </ProductTileContext.Provider>
    )
  },
)

const TitleBase = forwardRef<HTMLHeadingElement>((props, ref) => {
  const { product, href } = useProductTile()

  return (
    <Link href={href} data-test="product-name">
      <Text as="h3" ref={ref} {...props}>
        {product.productName}
      </Text>
    </Link>
  )
})

const PriceBase = forwardRef<HTMLDivElement>((props, ref) => {
  const { product, isLoading } = useProductTile() || {}
  const { price } = product || {}

  if (isLoading) return <Skeleton w="100px" h="23px" {...props} />
  if (!price && !isLoading) return null

  return <Price price={price!} ref={ref} {...props} data-test="product-tile-price" />
})

export type SwatchesProps = Omit<SwatchPickerProps, 'colors'> & {
  maxCount?: number
  hideSingleColor?: boolean
}

const SwatchesBase = forwardRef<HTMLDivElement, SwatchesProps>(
  ({ maxCount = 4, hideSingleColor = false, ...props }, ref) => {
    const state = useProductTile()
    if (!state) return null
    const { colors, handleColorSelect, selectedColorIds } = state

    if (hideSingleColor && colors.length <= 1) {
      return null
    }

    const visibleColors = colors.slice(0, maxCount)

    return (
      <SwatchPicker
        ref={ref}
        {...props}
        colors={visibleColors.map(({ selectable, ...color }) => ({
          ...color,
          disabled: !selectable,
        }))}
        value={selectedColorIds}
        onValueChange={handleColorSelect}
      />
    )
  },
)

const PromosBase = forwardRef<HTMLDivElement>((props, ref) => {
  const { promotions } = useProductTile()?.product || {}

  if (!promotions || !promotions.length) return null

  return (
    <div ref={ref} {...props}>
      {promotions?.map((promo) => (
        <div key={promo.id}>
          <Icon name="Promo" size="sm" />
          <p data-test="promotion-callout">{promo.description}</p>
        </div>
      ))}
    </div>
  )
})

const BadgesBase = forwardRef<HTMLDivElement>((props, ref) => {
  const { id, badges } = useProductTile()?.product || {}
  return (
    <div ref={ref} {...props}>
      {badges?.map((badge) => (
        <Badge
          data-test="product-tile-badge"
          key={`product-tile-badge-${id}-${badge.text}`}
          bg="var(--badge-bg)"
          color="var(--badge-color)"
          style={
            {
              '--badge-bg': token(`colors.${badge.bg}` as Token),
              '--badge-color': token(`colors.${badge.color}` as Token),
            } as React.CSSProperties
          }
        >
          {badge.text}
        </Badge>
      ))}
    </div>
  )
})

const StyledLink = styled(Link)
const ImageBase = ({
  loading,
  sizes,
  ...props
}: {
  loading?: 'eager' | 'lazy'
  sizes?: string
} & HTMLStyledProps<'a'>) => {
  const state = useProductTile()
  const { formatMessage } = useIntl()

  if (!state) return null
  const { currentImages, selectedImageIndex, handleMouseEnter, handleMouseLeave, href } = state

  return (
    <StyledLink
      href={href}
      data-test="product-tile-image"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      {...props}
    >
      {currentImages?.urls[selectedImageIndex] && (
        <ProductImage
          src={currentImages.urls[selectedImageIndex]}
          alt={
            currentImages?.alt ||
            formatMessage({
              defaultMessage: 'Product image',
              id: 'ui.productTile.imageAlt',
            })
          }
          fill
          loading={loading || 'lazy'}
          sizes={sizes}
        />
      )}
    </StyledLink>
  )
}

const ActionsBase = forwardRef<HTMLDivElement>((props, ref) => {
  const state = useProductTile()
  const { formatMessage } = useIntl()
  if (!state) return null
  const { isLoading, onQuickViewHandler, onAtcHandler } = state

  const renderQuickView = typeof onQuickViewHandler === 'function'
  const renderAddToCart = typeof onAtcHandler === 'function'

  return (
    <div ref={ref} {...props}>
      {renderQuickView && (
        <Button
          variant="secondary"
          size="xs"
          onClick={onQuickViewHandler}
          disabled={isLoading}
          data-test="quick-view"
          aria-label={formatMessage({
            defaultMessage: 'Quick View',
            id: 'ui.productTile.quickView',
          })}
        >
          {formatMessage({ defaultMessage: 'Quick View', id: 'ui.productTile.quickView' })}
        </Button>
      )}
      {renderAddToCart && (
        <Button
          variant="primary"
          size="xs"
          onClick={onAtcHandler}
          disabled={isLoading}
          data-test="add-to-cart"
          aria-label={formatMessage({
            defaultMessage: 'Add to Cart',
            id: 'ui.productTile.addToCart',
          })}
        >
          <Icon name="CartAdd" size="sm" />
          {formatMessage({ defaultMessage: 'Add to Cart', id: 'ui.productTile.addToCart' })}
        </Button>
      )}
    </div>
  )
})

const WishlistBase = (props: HTMLStyledProps<'button'>) => {
  const state = useProductTile()
  if (!state) return null
  const { onWishlistHandler, mouseOver, handleMouseEnter, handleMouseLeave } = state
  const { formatMessage } = useIntl()

  return mouseOver ? (
    <Button
      data-test="product-tile-wishlist"
      aria-label={formatMessage({
        defaultMessage: 'Add to Wishlist',
      })}
      variant="primary"
      size="icon-xs"
      onClick={onWishlistHandler}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-color-mode="dark"
      {...props}
    >
      <Icon name="Heart" size="xs" />
    </Button>
  ) : null
}

const RatingBase = (props: HTMLStyledProps<'div'>) => {
  const state = useProductTile()
  if (!state) return null

  const { id, rating } = state?.product || {}
  if (!rating) return null

  return <StarRating id={id} score={rating.score} count={rating.count} {...props} />
}

export const useProductTile = () => {
  return useContext(ProductTileContext)!
}

export const ProductTile = withProvider(ProductTileBase, 'root')
export const ProductTileImage = withContext(ImageBase, 'image')
export const ProductTileContent = withContext(styled.div, 'content')
export const ProductTileTitle = withContext(TitleBase, 'title')
export const ProductTilePrice = withContext(PriceBase, 'price')
export const ProductTileSwatches = withContext(SwatchesBase, 'swatches')
export const ProductTilePromos = withContext(PromosBase, 'promos')
export const ProductTileBadges = withContext(BadgesBase, 'badges')
export const ProductTileActions = withContext(ActionsBase, 'actions')
export const ProductTileWishlist = withContext(WishlistBase, 'wishlist')
export const ProductTileRating = withContext(RatingBase, 'rating')

ProductTile.displayName = 'ProductTile'
ProductTileImage.displayName = 'ProductTileImage'
ProductTileContent.displayName = 'ProductTileContent'
ProductTileTitle.displayName = 'ProductTileTitle'
ProductTilePrice.displayName = 'ProductTilePrice'
ProductTileSwatches.displayName = 'ProductTileSwatches'
ProductTilePromos.displayName = 'ProductTilePromos'
ProductTileBadges.displayName = 'ProductTileBadges'
ProductTileActions.displayName = 'ProductTileActions'
ProductTileWishlist.displayName = 'ProductTileWishlist'
ProductTileRating.displayName = 'ProductTileRating'

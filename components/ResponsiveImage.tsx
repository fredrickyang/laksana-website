/* eslint-disable @next/next/no-img-element */
import { forwardRef, type ImgHTMLAttributes } from 'react'

import {
  getBestMediaUrl,
  getMediaSrcSet,
  getStaticSrcSet,
  isRasterImage,
  type ImageVariantName,
  type ResponsiveMedia,
} from '@/lib/image-variants'

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes' | 'width' | 'height'
> & {
  media?: ResponsiveMedia | null
  src?: string
  variant?: ImageVariantName
  sizes: string
  width?: number
  height?: number
}

export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(function ResponsiveImage(
  {
    media,
    src,
    alt,
    variant = 'content_1200',
    sizes,
    loading = 'lazy',
    decoding = 'async',
    width,
    height,
    ...props
  },
  ref,
) {
  const fallbackSrc = src || media?.url || ''
  const resolvedSrc = media ? getBestMediaUrl(media, variant) : fallbackSrc
  const srcSet = media ? getMediaSrcSet(media) : getStaticSrcSet(fallbackSrc)
  const canUseSrcSet = Boolean(srcSet && isRasterImage(media?.mimeType || fallbackSrc))

  return (
    <img
      {...props}
      ref={ref}
      src={resolvedSrc || fallbackSrc}
      srcSet={canUseSrcSet ? srcSet : undefined}
      sizes={canUseSrcSet ? sizes : undefined}
      alt={alt || media?.alt || ''}
      loading={loading}
      decoding={decoding}
      width={width || media?.width || undefined}
      height={height || media?.height || undefined}
    />
  )
})

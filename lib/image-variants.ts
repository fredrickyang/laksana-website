export const IMAGE_VARIANTS = [
  { name: 'card_480', width: 480, quality: 78 },
  { name: 'card_768', width: 768, quality: 78 },
  { name: 'content_1200', width: 1200, quality: 80 },
  { name: 'hero_1920', width: 1920, quality: 82 },
] as const

export type ImageVariantName = (typeof IMAGE_VARIANTS)[number]['name']

export type ImageSizeData = {
  filename?: string | null
  filesize?: number | null
  height?: number | null
  mimeType?: string | null
  url?: string | null
  width?: number | null
}

export type ResponsiveMedia = {
  alt?: string | null
  filename?: string | null
  height?: number | null
  mimeType?: string | null
  sizes?: Partial<Record<ImageVariantName, ImageSizeData | null>> | null
  url?: string | null
  width?: number | null
}

export const STATIC_IMAGE_WIDTHS = [480, 768, 1200, 1920] as const

export function isRasterImage(srcOrMimeType?: string | null) {
  if (!srcOrMimeType) return false
  const value = srcOrMimeType.toLowerCase()

  if (value.startsWith('image/')) {
    return !value.includes('svg') && !value.includes('gif')
  }

  return /\.(png|jpe?g|webp|avif)$/i.test(value)
}

export function getMediaUrlFromUnknown(media: unknown): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  if (typeof media === 'object' && 'url' in media) {
    return typeof media.url === 'string' ? media.url : ''
  }
  return ''
}

export function getMediaVariant(media: ResponsiveMedia | null | undefined, variant: ImageVariantName) {
  const size = media?.sizes?.[variant]
  return size?.url || ''
}

export function getMediaSrcSet(media: ResponsiveMedia | null | undefined, variants: ImageVariantName[] = ['card_480', 'card_768', 'content_1200', 'hero_1920']) {
  if (!media?.sizes) return ''

  return variants
    .map((variant) => media.sizes?.[variant])
    .filter((size): size is ImageSizeData => Boolean(size?.url && size.width))
    .map((size) => `${size.url} ${size.width}w`)
    .join(', ')
}

export function getBestMediaUrl(media: ResponsiveMedia | null | undefined, preferred: ImageVariantName = 'content_1200') {
  return (
    getMediaVariant(media, preferred) ||
    getMediaVariant(media, 'content_1200') ||
    getMediaVariant(media, 'card_768') ||
    getMediaVariant(media, 'card_480') ||
    media?.url ||
    ''
  )
}

export function getStaticVariantPath(src: string, width: number) {
  const cleanSrc = src.split('?')[0]?.split('#')[0] || src
  const extensionIndex = cleanSrc.lastIndexOf('.')
  const base = extensionIndex >= 0 ? cleanSrc.slice(0, extensionIndex) : cleanSrc
  const normalizedBase = base.startsWith('/') ? base.slice(1) : base
  return `/generated/${normalizedBase}-${width}.webp`
}

export function getStaticSrcSet(src: string, widths: readonly number[] = STATIC_IMAGE_WIDTHS) {
  if (!isRasterImage(src) || src.startsWith('http')) return ''
  return widths.map((width) => `${getStaticVariantPath(src, width)} ${width}w`).join(', ')
}

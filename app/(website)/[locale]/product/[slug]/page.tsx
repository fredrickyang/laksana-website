import { getProductBySlug, getProducts, getSettings, getMediaUrl } from '@/lib/payload'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'
import { locales, type Locale } from '@/i18n.config'

interface ProductDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params
  const [product, settings] = await Promise.all([
    getProductBySlug(slug, locale as Locale),
    getSettings(locale as Locale),
  ])

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} settings={settings} />
}

// Generate static paths for all products and locales
export async function generateStaticParams() {
  const products = await getProducts('id')
  return locales.flatMap((locale) =>
    products.map((product: any) => ({
      locale,
      slug: product.slug,
    }))
  )
}

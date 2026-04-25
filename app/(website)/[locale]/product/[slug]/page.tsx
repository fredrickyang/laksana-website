import { getProductBySlug, getProducts, getSettings, getProductPage } from '@/lib/payload'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'
import { locales, type Locale } from '@/i18n.config'
import type { Product } from '@/payload-types'

export const revalidate = 3600; // Cache for 1 hour (3600 seconds)

interface ProductDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params
  const [product, settings, productPage] = await Promise.all([
    getProductBySlug(slug, locale as Locale),
    getSettings(locale as Locale),
    getProductPage(locale as Locale),
  ])

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} settings={settings} locale={locale} productPage={productPage} />
}

// Generate static paths for all products and locales
export async function generateStaticParams() {
  const products = await getProducts('id')
  return locales.flatMap((locale) =>
    products.map((product: Product) => ({
      locale,
      slug: product.slug,
    }))
  )
}

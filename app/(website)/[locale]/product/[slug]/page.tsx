import { getProductBySlug, getProducts, getSettings, getProductPage } from '@/lib/payload'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'
import { locales, type Locale } from '@/i18n.config'
import type { Product } from '@/payload-types'
import type { Metadata } from 'next'
import { getMediaUrl } from '@/lib/utils'

export const revalidate = 3600; // Cache for 1 hour (3600 seconds)

interface ProductDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const product = await getProductBySlug(slug, locale as Locale)

  if (!product) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  const title = `${product.name} - Laksana Business Park`
  const description = product.highlightSpecs?.description || `Unit gudang dan properti industri tipe ${product.name} di Laksana Business Park.`
  const imageUrl = getMediaUrl(product.thumbnail)

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/product/${slug}`,
      languages: {
        id: `${baseUrl}/id/product/${slug}`,
        en: `${baseUrl}/en/product/${slug}`,
        zh: `${baseUrl}/zh/product/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/product/${slug}`,
      siteName: 'Laksana Business Park',
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
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

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.highlightSpecs?.description || `Unit gudang dan properti industri tipe ${product.name} di Laksana Business Park.`,
    image: getMediaUrl(product.thumbnail),
    brand: {
      '@type': 'Brand',
      name: 'Laksana Business Park',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Land Area',
        value: product.highlightSpecs?.landArea,
      },
      {
        '@type': 'PropertyValue',
        name: 'Building Area',
        value: product.highlightSpecs?.buildingArea,
      },
      {
        '@type': 'PropertyValue',
        name: 'Dimension',
        value: product.highlightSpecs?.dimension,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} settings={settings} locale={locale} productPage={productPage} />
    </>
  )
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

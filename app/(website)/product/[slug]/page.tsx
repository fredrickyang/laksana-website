import { getProductBySlug, getProducts, getSettings, getMediaUrl } from '@/lib/payload'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const [product, settings] = await Promise.all([
    getProductBySlug(slug, 'id'),
    getSettings('id'),
  ])

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} settings={settings} />
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getProducts('id')
  return products.map((product: any) => ({
    slug: product.slug,
  }))
}

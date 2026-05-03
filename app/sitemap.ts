import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  const locales = ['id', 'en', 'zh']

  // 1. Static Pages
  const staticPaths = [
    '',
    '/article',
    '/facilities',
    '/our-company',
    '/privacy-policy',
    '/product',
    '/tnc',
  ]

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  )

  // 2. Fetch Products
  const products = await payload.find({
    collection: 'products',
    limit: 0,
    depth: 0,
  })

  const productEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    products.docs.map((product) => ({
      url: `${baseUrl}/${locale}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  // 3. Fetch Articles
  const articles = await payload.find({
    collection: 'articles',
    limit: 0,
    depth: 0,
  })

  const articleEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    articles.docs.map((article) => ({
      url: `${baseUrl}/${locale}/article/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  )

  return [...staticEntries, ...productEntries, ...articleEntries]
}

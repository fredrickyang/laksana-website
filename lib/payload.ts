import 'server-only'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

type Locale = 'id' | 'en' | 'zh' | 'all'

let cached = (global as any).payload

if (!cached) {
    cached = (global as any).payload = { client: null, promise: null }
}

export async function getPayloadClient() {
    if (cached.client) {
        return cached.client
    }

    if (!cached.promise) {
        cached.promise = getPayload({ config })
    }

    try {
        cached.client = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.client
}

// Cache duration for unstable_cache (seconds)
const CACHE_REVALIDATE = 3600

// ─── Globals ────────────────────────────────────────────────

export const getHomePage = cache(async (locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            return await payload.findGlobal({
                slug: 'home-page',
                locale,
                depth: 1,
                select: {
                    hero: true,
                    mainFeature: true,
                    branding: true,
                    ctaSection: true,
                    articleSection: true,
                    projectSection: true,
                }
            })
        },
        [`home-page-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['home-page', `home-page-${locale}`] }
    )()
})

export const getAboutPage = cache(async (locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            return await payload.findGlobal({
                slug: 'about-page',
                locale,
                depth: 1,
            })
        },
        [`about-page-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['about-page', `about-page-${locale}`] }
    )()
})

export const getFacilitiesPage = cache(async (locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            return await payload.findGlobal({
                slug: 'facilities-page',
                locale,
                depth: 1,
            })
        },
        [`facilities-page-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['facilities-page', `facilities-page-${locale}`] }
    )()
})

export const getSettings = cache(async (locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            if (!payload || typeof payload.findGlobal !== 'function') {
                console.error('Payload client is not initialized correctly or findGlobal missing', payload)
                throw new Error('Payload client is not initialized correctly')
            }
            return await payload.findGlobal({
                slug: 'settings',
                locale,
                depth: 1,
            })
        },
        [`settings-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['settings', `settings-${locale}`] }
    )()
})

export const getPrivacyPolicyPage = cache(async (locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            return await payload.findGlobal({
                slug: 'privacy-policy-page',
                locale,
                depth: 1,
            })
        },
        [`privacy-policy-page-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['privacy-policy-page', `privacy-policy-page-${locale}`] }
    )()
})

export const getTermsConditionsPage = cache(async (locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            return await payload.findGlobal({
                slug: 'terms-conditions-page',
                locale,
                depth: 1,
            })
        },
        [`terms-conditions-page-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['terms-conditions-page', `terms-conditions-page-${locale}`] }
    )()
})

export const getProductPage = cache(async (locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            try {
                const payload = await getPayloadClient()
                return await payload.findGlobal({
                    slug: 'product-page',
                    locale,
                    depth: 1,
                })
            } catch {
                return null
            }
        },
        [`product-page-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['product-page', `product-page-${locale}`] }
    )()
})

export const getArticlePage = cache(async (locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            return await payload.findGlobal({
                slug: 'article-page',
                locale,
                depth: 1,
            })
        },
        [`article-page-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['article-page', `article-page-${locale}`] }
    )()
})

// ─── Collections ────────────────────────────────────────────

export const getCategories = cache(async (locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            const result = await payload.find({
                collection: 'categories',
                locale,
                limit: 100,
                depth: 1,
            })
            return result.docs
        },
        [`categories-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['categories'] }
    )()
})

export const getProducts = cache(async (locale: Locale = 'id', limit: number = 100, featured?: boolean) => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            const result = await payload.find({
                collection: 'products',
                locale,
                limit,
                depth: 1,
                where: featured !== undefined ? {
                    featured: { equals: featured }
                } : undefined,
                select: {
                    name: true,
                    slug: true,
                    thumbnail: true,
                    keySpecs: true,
                    type: true,
                    highlightSpecs: true,
                    shortDescription: true,
                    label: true,
                    phase: true,
                }
            })
            return result.docs
        },
        [`products-${locale}-${limit}-${featured ?? 'all'}`],
        { revalidate: CACHE_REVALIDATE, tags: ['products'] }
    )()
})

export const getProductsByPhase = cache(async (phase: string, locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            const result = await payload.find({
                collection: 'products',
                locale,
                where: {
                    phase: { equals: phase },
                },
                depth: 1,
            })
            return result.docs
        },
        [`products-phase-${phase}-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['products'] }
    )()
})

export const getProductBySlug = cache(async (slug: string, locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            const result = await payload.find({
                collection: 'products',
                locale,
                where: {
                    slug: { equals: slug },
                },
                depth: 1,
                limit: 1,
                select: {
                    name: true,
                    slug: true,
                    gallery: true,
                    highlightSpecs: true,
                    detailedSpecs: true,
                    keySpecs: true,
                    facilities: true,
                    virtualTourUrl: true,
                    fullDescription: true,
                    shortDescription: true,
                    brochure: true,
                }
            })
            return result.docs[0] || null
        },
        [`product-${slug}-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['products', `product-${slug}`] }
    )()
})

export const getArticles = cache(async (locale: Locale = 'id', limit: number = 100) => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            const result = await payload.find({
                collection: 'articles',
                locale,
                limit,
                depth: 1,
                sort: '-publicationDate',
                select: {
                    title: true,
                    slug: true,
                    thumbnail: true,
                    excerpt: true,
                    category: true,
                    publicationDate: true,
                }
            })
            return result.docs
        },
        [`articles-${locale}-${limit}`],
        { revalidate: CACHE_REVALIDATE, tags: ['articles'] }
    )()
})

export const getArticlesByCategory = cache(async (category: string, locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            const result = await payload.find({
                collection: 'articles',
                locale,
                where: {
                    category: { equals: category },
                },
                depth: 1,
                sort: '-publicationDate',
            })
            return result.docs
        },
        [`articles-category-${category}-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['articles'] }
    )()
})

export const getArticleBySlug = cache(async (slug: string, locale: Locale = 'id') => {
    return unstable_cache(
        async () => {
            const payload = await getPayloadClient()
            const result = await payload.find({
                collection: 'articles',
                locale,
                where: {
                    slug: { equals: slug },
                },
                depth: 1,
                limit: 1,
            })
            return result.docs[0] || null
        },
        [`article-${slug}-${locale}`],
        { revalidate: CACHE_REVALIDATE, tags: ['articles', `article-${slug}`] }
    )()
})

// Re-export getMediaUrl for server components
export { getMediaUrl } from './utils'

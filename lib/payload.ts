import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

type Locale = 'id' | 'en' | 'zh' | 'all'

export async function getPayloadClient() {
    return await getPayload({ config })
}

// Fetch HomePage global
export async function getHomePage(locale: Locale = 'id') {
    const payload = await getPayloadClient()
    return await payload.findGlobal({
        slug: 'home-page',
        locale,
        depth: 2,
    })
}

// Fetch AboutPage global
export async function getAboutPage(locale: Locale = 'id') {
    const payload = await getPayloadClient()
    return await payload.findGlobal({
        slug: 'about-page',
        locale,
        depth: 2,
    })
}

// Fetch FacilitiesPage global
export async function getFacilitiesPage(locale: Locale = 'id') {
    const payload = await getPayloadClient()
    return await payload.findGlobal({
        slug: 'facilities-page',
        locale,
        depth: 2,
    })
}

// Fetch Settings global
export async function getSettings(locale: Locale = 'id') {
    const payload = await getPayloadClient()
    return await payload.findGlobal({
        slug: 'settings',
        locale,
        depth: 2,
    })
}

// Fetch PrivacyPolicyPage global
export async function getPrivacyPolicyPage(locale: Locale = 'id') {
    const payload = await getPayloadClient()
    return await payload.findGlobal({
        slug: 'privacy-policy-page',
        locale,
        depth: 2,
    })
}

// Fetch TermsConditionsPage global
export async function getTermsConditionsPage(locale: Locale = 'id') {
    const payload = await getPayloadClient()
    return await payload.findGlobal({
        slug: 'terms-conditions-page',
        locale,
        depth: 2,
    })
}

// Fetch all Products
export async function getProducts(locale: Locale = 'id', limit: number = 100) {
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'products',
        locale,
        limit,
        depth: 2,
    })
    return result.docs
}

// Fetch Products by phase
export async function getProductsByPhase(phase: string, locale: Locale = 'id') {
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'products',
        locale,
        where: {
            phase: { equals: phase },
        },
        depth: 2,
    })
    return result.docs
}

// Fetch single Product by slug
export async function getProductBySlug(slug: string, locale: Locale = 'id') {
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'products',
        locale,
        where: {
            slug: { equals: slug },
        },
        depth: 2,
        limit: 1,
    })
    return result.docs[0] || null
}

// Fetch all Articles
export async function getArticles(locale: Locale = 'id', limit: number = 100) {
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'articles',
        locale,
        limit,
        depth: 2,
        sort: '-publicationDate',
    })
    return result.docs
}

// Fetch Articles by category
export async function getArticlesByCategory(category: string, locale: Locale = 'id') {
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'articles',
        locale,
        where: {
            category: { equals: category },
        },
        depth: 2,
        sort: '-publicationDate',
    })
    return result.docs
}

// Fetch single Article by slug
export async function getArticleBySlug(slug: string, locale: Locale = 'id') {
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'articles',
        locale,
        where: {
            slug: { equals: slug },
        },
        depth: 2,
        limit: 1,
    })
    return result.docs[0] || null
}

// Re-export getMediaUrl for server components
export { getMediaUrl } from './utils'

import type { GlobalConfig } from 'payload'

export const ArticlePage: GlobalConfig = {
    slug: 'article-page',
    hooks: {
        afterChange: [
            async ({ doc }) => {
                try {
                    const { revalidateTag } = await import('next/cache')
                    revalidateTag('article-page', { expire: 0 })
                } catch (err: any) {
                    console.error('Error revalidating article page:', err)
                }
                return doc
            }
        ]
    },
    fields: [
        {
            name: 'hero',
            type: 'group',
            fields: [
                { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
                { name: 'mobileBackgroundImage', type: 'upload', relationTo: 'media' },
                { name: 'title', type: 'text', localized: true },
            ],
        },
        {
            name: 'allArticlesHeading',
            type: 'text',
            localized: true,
        },
        {
            name: 'categoryLabel',
            type: 'text',
            localized: true,
        },
        {
            name: 'allCategoryOption',
            type: 'text',
            localized: true,
        },
        {
            name: 'readMoreButton',
            type: 'text',
            localized: true,
        },
        {
            name: 'previousButton',
            type: 'text',
            localized: true,
        },
        {
            name: 'nextButton',
            type: 'text',
            localized: true,
        },
        {
            name: 'relatedArticlesHeading',
            type: 'text',
            localized: true,
        },
        {
            name: 'backToArticlesText',
            type: 'text',
            localized: true,
        },
    ],
}

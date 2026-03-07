import type { GlobalConfig } from 'payload'

export const ArticlePage: GlobalConfig = {
    slug: 'article-page',
    fields: [
        {
            name: 'heroTitle',
            type: 'text',
            localized: true,
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

import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
    slug: 'articles',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
            localized: true,
        },
        {
            name: 'publicationDate',
            type: 'date',
        },
        {
            name: 'category',
            type: 'select',
            options: ['News', 'Tips & Trick', 'Article'],
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'excerpt',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'content',
            type: 'richText',
            localized: true,
        },
        {
            name: 'authors',
            type: 'relationship',
            relationTo: 'users',
            hasMany: true,
        },
        {
            name: 'relatedArticles',
            type: 'relationship',
            relationTo: 'articles',
            hasMany: true,
        },
    ],
}

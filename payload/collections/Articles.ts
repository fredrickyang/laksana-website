import type { CollectionConfig } from 'payload'
import { lexicalEditor, BlocksFeature, UploadFeature } from '@payloadcms/richtext-lexical'
import { ButtonBlock } from '../blocks/ButtonBlock'

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
            type: 'relationship',
            relationTo: 'categories',
            hasMany: false,
            admin: {
                description: 'Select article category',
            },
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
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    UploadFeature({
                        collections: {
                            media: {
                                fields: [
                                    {
                                        name: 'caption',
                                        type: 'text',
                                    },
                                    {
                                        name: 'alignment',
                                        type: 'select',
                                        defaultValue: 'center',
                                        options: [
                                            { label: 'Left', value: 'left' },
                                            { label: 'Center', value: 'center' },
                                            { label: 'Right', value: 'right' },
                                        ],
                                    },
                                    {
                                        name: 'size',
                                        type: 'select',
                                        defaultValue: 'full',
                                        options: [
                                            { label: 'Small (25%)', value: 'small' },
                                            { label: 'Medium (50%)', value: 'medium' },
                                            { label: 'Large (75%)', value: 'large' },
                                            { label: 'Full Width', value: 'full' },
                                        ],
                                    },
                                ],
                            },
                        },
                    }),
                    BlocksFeature({
                        blocks: [ButtonBlock],
                    }),
                ],
            }),
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

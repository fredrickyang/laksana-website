import type { CollectionConfig } from 'payload'
import { lexicalEditor, BlocksFeature, UploadFeature, LinkFeature } from '@payloadcms/richtext-lexical'
import { ButtonBlock } from '../blocks/ButtonBlock'
import { isArticleCreator } from '../access'

export const Articles: CollectionConfig = {
    slug: 'articles',
    access: {
        read: () => true,
        create: isArticleCreator,
        update: isArticleCreator,
        delete: isArticleCreator,
    },
    admin: {
        useAsTitle: 'title',
    },
    hooks: {
        afterChange: [
            async ({ doc }) => {
                try {
                    const { revalidateTag } = await import('next/cache')
                    revalidateTag('articles', { expire: 0 })
                    if (doc.slug) {
                        revalidateTag(`article-${doc.slug}`, { expire: 0 })
                    }
                } catch (err: any) {
                    console.error('Error revalidating article:', err)
                }
                return doc
            }
        ]
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
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.title) {
                            const titleData = data.title;
                            let title = '';
                            
                            if (typeof titleData === 'string') {
                                title = titleData;
                            } else if (typeof titleData === 'object' && titleData !== null) {
                                // Prefer Indonesian (id), then English (en), then any available locale
                                title = titleData.id || titleData.en || Object.values(titleData).find(v => typeof v === 'string') || '';
                            }
                            
                            if (title) {
                                return title.toLowerCase()
                                    .replace(/ /g, '-')
                                    .replace(/[^\w-]+/g, '')
                                    .replace(/--+/g, '-');
                            }
                        }
                        return value
                    }
                ]
            }
        },
        {
            name: 'publicationDate',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
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
                    LinkFeature({
                        enabledCollections: ['articles', 'products'],
                    }),
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
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'relatedArticles',
            type: 'relationship',
            relationTo: 'articles',
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}

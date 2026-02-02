import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
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
                        // Simple slugify hook or rely on user input for now
                        if (!value && data?.name) {
                            return data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                        }
                        return value
                    }
                ]
            }
        },
        {
            name: 'phase',
            type: 'select',
            options: [
                'Tahap 1',
                'Tahap 2',
                'Luxima',
                'Kavling Industri'
            ]
        },
        {
            name: 'type',
            type: 'text',
            localized: true,
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
        {
            name: 'keySpecs',
            type: 'array',
            fields: [
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                    // Note: Schema said Select/Upload. Upload is safer for custom icons.
                },
                {
                    name: 'label',
                    type: 'text',
                    localized: true,
                },
            ],
        },
        {
            name: 'shortDescription',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'fullDescription',
            type: 'richText',
            localized: true,
        },
        {
            name: 'callToAction',
            type: 'text',
            localized: true,
            // Link field could be complex, keeping simple text/url for now
        },
    ],
}

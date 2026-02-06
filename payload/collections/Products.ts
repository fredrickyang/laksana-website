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
            name: 'label',
            type: 'text',
            localized: true,
            admin: {
                description: 'Product label shown on cards (e.g., "Gudang Siap Pakai", "Kavling Siap Bangun")',
            },
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
            admin: {
                description: 'Key specs shown on product cards (icon + label)',
            },
            fields: [
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'label',
                    type: 'text',
                    localized: true,
                },
            ],
        },
        {
            name: 'highlightSpecs',
            type: 'group',
            admin: {
                description: 'Highlight specifications displayed at the top of product detail page',
            },
            fields: [
                {
                    name: 'dimension',
                    type: 'text',
                    admin: {
                        description: 'e.g., "6 x 24 Meter"',
                    },
                },
                {
                    name: 'landArea',
                    type: 'text',
                    admin: {
                        description: 'e.g., "144 m²"',
                    },
                },
                {
                    name: 'buildingArea',
                    type: 'text',
                    admin: {
                        description: 'e.g., "126 m²"',
                    },
                },
            ],
        },
        {
            name: 'detailedSpecs',
            type: 'array',
            admin: {
                description: 'Full specification list (Key-Value pairs)',
            },
            fields: [
                {
                    name: 'key',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Spec name (e.g., "Pondasi", "Atap", "Lantai 1")',
                    },
                },
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                    localized: true,
                    admin: {
                        description: 'Spec value (e.g., "Tiang Pancang", "UPVC 2 Layer")',
                    },
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
            name: 'virtualTourUrl',
            type: 'text',
            admin: {
                description: 'URL to the 3D virtual tour',
            },
        },
        {
            name: 'facilities',
            type: 'array',
            admin: {
                description: 'Unit-specific facilities (icon + label)',
            },
            fields: [
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'label',
                    type: 'text',
                    localized: true,
                },
            ],
        },
        {
            name: 'callToAction',
            type: 'text',
            localized: true,
        },
    ],
}

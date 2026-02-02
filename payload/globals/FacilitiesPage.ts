import type { GlobalConfig } from 'payload'

export const FacilitiesPage: GlobalConfig = {
    slug: 'facilities-page',
    fields: [
        {
            name: 'hero',
            type: 'group',
            fields: [
                { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
                { name: 'mobileBackgroundImage', type: 'upload', relationTo: 'media' }, // Vertical crop
                { name: 'title', type: 'text', localized: true },
            ],
        },
        {
            name: 'values',
            type: 'group',
            fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'description', type: 'richText', localized: true },
                {
                    name: 'valueCards',
                    type: 'array',
                    fields: [
                        { name: 'title', type: 'text', localized: true },
                        { name: 'description', type: 'textarea', localized: true },
                        { name: 'image', type: 'upload', relationTo: 'media' },
                    ],
                },
            ],
        },
        {
            name: 'mainServices',
            type: 'group',
            fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
                {
                    name: 'services',
                    type: 'array',
                    fields: [
                        { name: 'title', type: 'text', localized: true },
                        { name: 'subtitle', type: 'text', localized: true },
                        { name: 'icon', type: 'upload', relationTo: 'media' },
                        {
                            name: 'featuresList',
                            type: 'array',
                            fields: [
                                { name: 'feature', type: 'text', localized: true },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}

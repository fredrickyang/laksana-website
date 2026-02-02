import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
    slug: 'about-page',
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
            name: 'history',
            type: 'group',
            fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'content', type: 'richText', localized: true },
            ],
        },
        {
            name: 'videoSection',
            type: 'group',
            fields: [
                { name: 'youtubeUrl', type: 'text' },
                { name: 'thumbnail', type: 'upload', relationTo: 'media' },
            ],
        },
        {
            name: 'leadership',
            type: 'group',
            fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
                {
                    name: 'leaders',
                    type: 'array',
                    fields: [
                        { name: 'name', type: 'text' },
                        { name: 'position', type: 'text', localized: true },
                        { name: 'photo', type: 'upload', relationTo: 'media' },
                    ],
                },
            ],
        },
        {
            name: 'timeline',
            type: 'array',
            fields: [
                { name: 'year', type: 'text' },
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
            ],
        },
    ],
}

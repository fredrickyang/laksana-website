import type { GlobalConfig } from 'payload'

export const PrivacyPolicyPage: GlobalConfig = {
    slug: 'privacy-policy-page',
    fields: [
        {
            name: 'hero',
            type: 'group',
            fields: [
                { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
                { name: 'title', type: 'text', localized: true },
            ],
        },
        { name: 'lastUpdated', type: 'date' },
        { name: 'introText', type: 'richText', localized: true },
        { name: 'highlightText', type: 'richText', localized: true },
        {
            name: 'sections',
            type: 'array',
            fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'content', type: 'richText', localized: true },
                {
                    name: 'variant',
                    type: 'select',
                    defaultValue: 'default',
                    options: [
                        { label: 'Default', value: 'default' },
                        { label: 'Blue Highlight', value: 'highlight-blue' },
                        { label: 'Red Highlight', value: 'highlight-red' },
                        { label: 'CTA', value: 'cta' },
                    ],
                },
            ],
        },
        { name: 'contactEmail', type: 'text' },
    ],
}

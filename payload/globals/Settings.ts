import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
    slug: 'settings',
    fields: [
        {
            name: 'siteTitle',
            type: 'text',
            localized: true,
        },
        {
            name: 'topNotification',
            type: 'text',
            localized: true,
        },
        {
            name: 'contactInformation',
            type: 'group',
            fields: [
                {
                    name: 'phoneNumbers',
                    type: 'array',
                    fields: [
                        { name: 'label', type: 'text', localized: true },
                        { name: 'number', type: 'text' },
                    ],
                },
                {
                    name: 'email',
                    type: 'text',
                },
                {
                    name: 'headOfficeAddress',
                    type: 'richText',
                    localized: true,
                },
                {
                    name: 'marketingOfficeAddress',
                    type: 'richText',
                    localized: true,
                },
                {
                    name: 'socialMediaLinks',
                    type: 'array',
                    fields: [
                        { name: 'platformName', type: 'text' },
                        { name: 'url', type: 'text' },
                        // icon could be upload or text, schema says Icon. Use upload for flexibility
                        { name: 'icon', type: 'upload', relationTo: 'media' },
                    ],
                },
            ],
        },
        {
            name: 'brochure',
            type: 'upload',
            relationTo: 'media',
            localized: true, // Different brochures for different languages? Yes probably.
        },
        {
            name: 'navigation',
            type: 'array',
            fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'link', type: 'text' },
            ],
        },
        {
            name: 'footer',
            type: 'group',
            fields: [
                { name: 'companyDescription', type: 'textarea', localized: true },
                { name: 'copyrightText', type: 'text', localized: true },
            ],
        },
    ],
}

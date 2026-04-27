import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
    slug: 'settings',
    access: {
        read: () => true,
    },
    admin: {
        hidden: ({ user }) => user?.role !== 'admin',
    },
    hooks: {
        afterChange: [
            async ({ doc }) => {
                try {
                    const { revalidateTag } = await import('next/cache')
                    revalidateTag('settings', { expire: 0 })
                } catch (err: any) {
                    console.error('Error revalidating settings:', err)
                }
                return doc
            }
        ]
    },
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
            name: 'form',
            type: 'group',
            fields: [
                { name: 'heading', type: 'text', localized: true },
                { name: 'subheading', type: 'text', localized: true },
                { name: 'nameLabel', type: 'text', localized: true },
                { name: 'namePlaceholder', type: 'text', localized: true },
                { name: 'emailLabel', type: 'text', localized: true },
                { name: 'emailPlaceholder', type: 'text', localized: true },
                { name: 'phoneLabel', type: 'text', localized: true },
                { name: 'phonePlaceholder', type: 'text', localized: true },
                { name: 'domicileLabel', type: 'text', localized: true },
                { name: 'domicilePlaceholder', type: 'text', localized: true },
                { name: 'buildingSizeLabel', type: 'text', localized: true },
                { name: 'buildingSizePlaceholder', type: 'text', localized: true },
                {
                    name: 'buildingSizeOptions',
                    type: 'array',
                    fields: [
                        { name: 'label', type: 'text', localized: true },
                        { name: 'value', type: 'text' },
                    ],
                },
                { name: 'serviceTypeLabel', type: 'text', localized: true },
                { name: 'serviceTypePlaceholder', type: 'text', localized: true },
                {
                    name: 'serviceTypeOptions',
                    type: 'array',
                    fields: [
                        { name: 'label', type: 'text', localized: true },
                        { name: 'value', type: 'text' },
                    ],
                },
                { name: 'messageLabel', type: 'text', localized: true },
                { name: 'messagePlaceholder', type: 'text', localized: true },
                { name: 'submitButton', type: 'text', localized: true },
                { name: 'submittingButton', type: 'text', localized: true },
                { name: 'successMessage', type: 'text', localized: true },
                { name: 'errorMessage', type: 'text', localized: true },
                { name: 'networkErrorMessage', type: 'text', localized: true },
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
                { name: 'privacyPolicyLink', type: 'text', admin: { description: 'Path for Privacy Policy page (e.g. /privacy-policy)' } },
                { name: 'termsOfServiceLink', type: 'text', admin: { description: 'Path for Terms of Service page (e.g. /tnc)' } },
            ],
        },
    ],
}

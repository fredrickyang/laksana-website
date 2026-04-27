import type { GlobalConfig } from 'payload'

export const ProductPage: GlobalConfig = {
    slug: 'product-page',
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
                    revalidateTag('product-page', { expire: 0 })
                } catch (err: any) {
                    console.error('Error revalidating product page:', err)
                }
                return doc
            }
        ]
    },
    fields: [
        {
            name: 'hero',
            type: 'group',
            fields: [
                {
                    name: 'backgroundImage',
                    type: 'upload',
                    relationTo: 'media',
                    required: false,
                },
                {
                    name: 'mobileBackgroundImage',
                    type: 'upload',
                    relationTo: 'media',
                    required: false,
                },
                {
                    name: 'title',
                    type: 'text',
                    localized: true,
                },
            ],
        },
        { name: 'pageTitle', type: 'text', localized: true, admin: { description: 'Legacy field - use hero.title instead' } },
        {
            name: 'detailLabels',
            type: 'group',
            fields: [
                { name: 'dimensionLabel', type: 'text', localized: true },
                { name: 'landAreaLabel', type: 'text', localized: true },
                { name: 'buildingAreaLabel', type: 'text', localized: true },
                { name: 'freeConsultationLabel', type: 'text', localized: true },
                { name: 'summaryLabel', type: 'text', localized: true },
                { name: 'facilitiesLabel', type: 'text', localized: true },
                { name: 'specificationsLabel', type: 'text', localized: true },
                { name: 'viewDetailLabel', type: 'text', localized: true },
                { name: 'hideDetailLabel', type: 'text', localized: true },
                { name: 'facilitiesTitle', type: 'text', localized: true },
                { name: 'facilitiesDescription', type: 'text', localized: true },
                { name: 'ctaTitle', type: 'text', localized: true },
                { name: 'ctaDescription', type: 'text', localized: true },
                { name: 'downloadBrochureLabel', type: 'text', localized: true },
                { name: 'virtualTourTitle', type: 'richText', localized: true },
                { name: 'virtualTourDescription', type: 'text', localized: true },
                { name: 'virtualTourButtonLabel', type: 'text', localized: true },
                {
                    name: 'virtualTourReasons',
                    type: 'array',
                    maxRows: 3,
                    fields: [
                        { name: 'title', type: 'text', localized: true },
                        { name: 'description', type: 'text', localized: true },
                    ],
                },
            ],
        },
    ],
}

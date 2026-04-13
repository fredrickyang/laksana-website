import type { CollectionConfig } from 'payload'

export const Phases: CollectionConfig = {
    slug: 'phases',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'name',
    },
    hooks: {
        afterChange: [
            async () => {
                try {
                    const { revalidateTag } = await import('next/cache')
                    revalidateTag('phases', { expire: 0 })
                    revalidateTag('products', { expire: 0 })
                } catch (err: any) {
                    console.error('Error revalidating phases:', err)
                }
            }
        ]
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
            required: true,
            unique: true,
            admin: {
                description: 'Used for URL anchors and internal identification (e.g., "tahap-1")',
            },
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            admin: {
                description: 'Lower numbers appear first on the products page',
                position: 'sidebar',
            },
        },
    ],
}

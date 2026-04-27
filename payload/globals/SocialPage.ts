import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const SocialPage: GlobalConfig = {
    slug: 'social-page',
    label: 'Social Page',
    admin: {
        hidden: ({ user }) => user?.role !== 'admin',
    },
    access: {
        read: () => true, // Publicly readable for the website
        update: isAdmin,
    },
    fields: [
        {
            name: 'socialLinks',
            type: 'array',
            label: 'Social Links',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'altText',
                    type: 'text',
                },
            ],
        },
    ],
}

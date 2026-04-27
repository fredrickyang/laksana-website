import type { GlobalConfig } from 'payload'
import { isManager } from '../access'

export const SocialPage: GlobalConfig = {
    slug: 'social-page',
    label: 'Social Page',
    admin: {
        hidden: ({ user }) => !user || !['admin', 'manager'].includes(user.role),
    },
    access: {
        read: () => true, // Publicly readable for the website
        update: isManager,
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

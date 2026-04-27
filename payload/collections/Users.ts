import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf, isArticleCreator } from '../access'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        useAsTitle: 'email',
        hidden: ({ user }) => user?.role !== 'admin',
    },
    auth: true,
    access: {
        read: isArticleCreator,
        create: isAdmin,
        update: isAdminOrSelf,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'role',
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Article Creator', value: 'article-creator' },
                { label: 'Legal Staff', value: 'legal' },
            ],
            defaultValue: 'admin',
            required: true,
            saveToJWT: true,
        },
    ],
}

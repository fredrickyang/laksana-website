import type { CollectionConfig } from 'payload'
import { isArticleCreator } from '../access'

export const Categories: CollectionConfig = {
    slug: 'categories',
    access: {
        read: () => true,
        create: isArticleCreator,
        update: isArticleCreator,
        delete: isArticleCreator,
    },
    admin: {
        useAsTitle: 'name',
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
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.name) {
                            return data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                        }
                        return value
                    }
                ]
            }
        },
        {
            name: 'description',
            type: 'textarea',
            localized: true,
        },
    ],
}

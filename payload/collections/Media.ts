import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { IMAGE_VARIANTS } from '../../lib/image-variants'
import { isArticleCreator } from '../access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true, // Allow public access to media files
        create: isArticleCreator,
        update: isArticleCreator,
        delete: isArticleCreator,
    },
    admin: {
        hidden: ({ user }) => user?.role === 'legal',
    },
    upload: {
        staticDir: path.resolve(dirname, '../../public/media'),
        adminThumbnail: 'card_480',
        imageSizes: IMAGE_VARIANTS.map(({ name, quality, width }) => ({
            name,
            width,
            formatOptions: {
                format: 'webp',
                options: {
                    quality,
                },
            },
            withoutEnlargement: true,
            admin: {
                disableGroupBy: true,
                disableListColumn: true,
                disableListFilter: true,
            },
        })),
        mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
}

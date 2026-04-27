import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

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
        adminThumbnail: 'thumbnail',
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

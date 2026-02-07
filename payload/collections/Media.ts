import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true, // Allow public access to media files
    },
    upload: {
        staticDir: path.resolve(dirname, '../../public/media'),
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*', 'video/*'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
}

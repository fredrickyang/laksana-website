import type { CollectionConfig } from 'payload'
import { isLegal } from '../access'

export const FormAttachments: CollectionConfig = {
    slug: 'form-attachments',
    labels: {
        singular: 'Form Attachment',
        plural: 'Form Attachments',
    },
    admin: {
        hidden: ({ user }) => !user || !(user.role === 'admin' || user.role === 'legal'),
        group: 'Forms',
    },
    access: {
        read: isLegal,
        create: () => true, // Allow API creation from the form
        update: () => false,
        delete: isLegal,
    },
    upload: {
        disableLocalStorage: true, 
        // This will reuse the same S3 setup from payload.config.ts if added
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
        },
    ],
}

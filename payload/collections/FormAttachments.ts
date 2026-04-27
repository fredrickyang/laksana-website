import type { CollectionConfig } from 'payload'
import { isManagerOrLegal } from '../access'

export const FormAttachments: CollectionConfig = {
    slug: 'form-attachments',
    labels: {
        singular: 'Form Attachment',
        plural: 'Form Attachments',
    },
    admin: {
        hidden: ({ user }) => !user || !['admin', 'manager', 'legal'].includes(user.role),
    },
    access: {
        read: isManagerOrLegal,
        create: () => true, // Allow API creation from the form
        update: () => false,
        delete: isManagerOrLegal,
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

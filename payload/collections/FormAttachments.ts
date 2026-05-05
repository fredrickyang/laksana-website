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
        filesRequiredOnCreate: false,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
        },
    ],
}

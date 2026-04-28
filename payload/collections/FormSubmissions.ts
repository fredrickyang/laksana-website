import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const FormSubmissions: CollectionConfig = {
    slug: 'form-submissions',
    labels: {
        singular: 'Form Submission',
        plural: 'Form Submissions',
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'phone', 'createdAt'],
        hidden: ({ user }) => user?.role !== 'admin',
        group: 'Forms',
    },
    access: {
        read: isAdmin,
        create: () => true, // Allow API creation
        update: () => false, // No editing submissions
        delete: isAdmin,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Nama Lengkap',
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            label: 'Email',
        },
        {
            name: 'phone',
            type: 'text',
            required: true,
            label: 'Nomor Telepon',
        },
        {
            name: 'domicile',
            type: 'text',
            label: 'Domisili',
        },
        {
            name: 'buildingSize',
            type: 'text',
            label: 'Kebutuhan Luas Bangunan',
        },
        {
            name: 'serviceType',
            type: 'text',
            label: 'Pilihan Layanan',
        },
        {
            name: 'message',
            type: 'textarea',
            label: 'Pesan Tambahan',
        },
    ],
    timestamps: true,
}

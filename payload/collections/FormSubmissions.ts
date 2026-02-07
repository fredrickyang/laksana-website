import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
    slug: 'form-submissions',
    labels: {
        singular: 'Form Submission',
        plural: 'Form Submissions',
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    },
    access: {
        read: () => true, // Admin can view
        create: () => true, // Allow API creation
        update: () => false, // No editing submissions
        delete: () => true, // Admin can delete
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
            type: 'select',
            label: 'Kebutuhan Luas Bangunan',
            options: [
                { label: '500 m2', value: 'small' },
                { label: '1000 m2', value: 'medium' },
                { label: 'Lebih dari 1000 m2', value: 'large' },
            ],
        },
        {
            name: 'serviceType',
            type: 'select',
            label: 'Pilihan Layanan',
            options: [
                { label: 'Beli Gudang Baru', value: 'full' },
                { label: 'Beli Kavling Baru', value: 'legal' },
                { label: 'Jual Kavling / Gudang Laksana', value: 'consult' },
            ],
        },
        {
            name: 'message',
            type: 'textarea',
            label: 'Pesan Tambahan',
        },
    ],
    timestamps: true,
}

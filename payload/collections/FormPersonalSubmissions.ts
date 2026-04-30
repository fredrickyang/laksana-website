import type { CollectionConfig } from 'payload'
import { isLegal } from '../access'

export const FormPersonalSubmissions: CollectionConfig = {
    slug: 'form-personal-submissions',
    labels: {
        singular: 'Form Personal',
        plural: 'Form Personals',
    },
    admin: {
        useAsTitle: 'fullname_customer',
        defaultColumns: ['fullname_customer', 'phone_customer', 'expense_date', 'createdAt'],
        hidden: ({ user }) => !user || !(user.role === 'admin' || user.role === 'legal'),
        group: 'Forms',
        components: {
            beforeListTable: [
                '/payload/components/ExportAssetsButton#ExportAssetsButton',
            ],
        },
    },
    access: {
        read: isLegal,
        create: () => true, // Allow API creation
        update: () => false, // No editing submissions
        delete: isLegal,
    },
    fields: [
        {
            name: 'fullname',
            type: 'text',
            required: true,
            label: 'Nama Lengkap (Sales)',
        },
        {
            name: 'employee_id',
            type: 'text',
            label: 'ID Karyawan',
        },
        {
            name: 'fullname_customer',
            type: 'text',
            required: true,
            label: 'Nama Lengkap (Customer)',
        },
        {
            name: 'phone_customer',
            type: 'text',
            required: true,
            label: 'Nomor Telefon Customer',
        },
        {
            name: 'alamat_customer',
            type: 'textarea',
            required: true,
            label: 'Alamat Customer',
        },
        {
            name: 'expense_date',
            type: 'date',
            required: true,
            label: 'Tanggal UTJ',
        },
        {
            name: 'customer_leads',
            type: 'select',
            required: true,
            label: 'Customer Leads',
            options: [
                { label: 'Walk In Customer', value: 'walk-in' },
                { label: 'Social Media / Qontak', value: 'social-media' },
                { label: 'Website', value: 'website' },
                { label: 'Customer Pribadi', value: 'personal' },
                { label: 'Open Table', value: 'open-table' },
            ],
        },
        {
            name: 'catatan_tambahan',
            type: 'textarea',
            label: 'Catatan Tambahan',
        },
        // Document Attachments
        {
            name: 'ktp_kitas',
            type: 'upload',
            relationTo: 'form-attachments',
            required: true,
            label: 'KTP / KITAS',
        },
        {
            name: 'npwp_pribadi',
            type: 'upload',
            relationTo: 'form-attachments',
            required: true,
            label: 'NPWP Pribadi',
        },
        {
            name: 'kartu_keluarga',
            type: 'upload',
            relationTo: 'form-attachments',
            label: 'Kartu Keluarga',
        },
        {
            name: 'akta_kelahiran_pernikahan',
            type: 'upload',
            relationTo: 'form-attachments',
            label: 'Akta Kelahiran / Akta Pernikahan',
        },
        {
            name: 'booking_form',
            type: 'upload',
            relationTo: 'form-attachments',
            label: 'Booking Form',
        },
        {
            name: 'dokumen_tambahan',
            type: 'upload',
            relationTo: 'form-attachments',
            hasMany: true,
            label: 'Dokumen Tambahan',
        },
        {
            name: 'declaration',
            type: 'checkbox',
            label: 'Pernyataan Keaslian Data',
            required: true,
        },
    ],
    timestamps: true,
}

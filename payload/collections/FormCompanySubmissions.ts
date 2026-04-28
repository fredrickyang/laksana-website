import type { CollectionConfig } from 'payload'
import { isLegal } from '../access'

export const FormCompanySubmissions: CollectionConfig = {
    slug: 'form-company-submissions',
    labels: {
        singular: 'Form Company',
        plural: 'Form Companies',
    },
    admin: {
        useAsTitle: 'fullname_company',
        defaultColumns: ['fullname_company', 'phone_company', 'expense_date', 'createdAt'],
        hidden: ({ user }) => !user || !(user.role === 'admin' || user.role === 'legal'),
        group: 'Forms',
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
            name: 'fullname_company',
            type: 'text',
            required: true,
            label: 'Nama Lengkap (Perusahaan)',
        },
        {
            name: 'phone_company',
            type: 'text',
            required: true,
            label: 'Nomor Telefon Perusahaan',
        },
        {
            name: 'phone_direksi',
            type: 'text',
            required: true,
            label: 'Nomor Telefon Direksi/Komisaris',
        },
        {
            name: 'alamat_company',
            type: 'textarea',
            required: true,
            label: 'Alamat Perusahaan',
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
            label: 'KTP / NPWP / Paspor (Direksi)',
        },
        {
            name: 'nib',
            type: 'upload',
            relationTo: 'form-attachments',
            required: true,
            label: 'NIB Berbasis Resiko',
        },
        {
            name: 'akta_perusahaan',
            type: 'upload',
            relationTo: 'form-attachments',
            required: true,
            label: 'Akta Pendirian/Perubahan',
        },
        {
            name: 'surat_pernyataan',
            type: 'upload',
            relationTo: 'form-attachments',
            required: true,
            label: 'Surat Pernyataan Akta Kelahiran',
        },
        {
            name: 'surat_persetujuan',
            type: 'upload',
            relationTo: 'form-attachments',
            label: 'Surat Persetujuan Dewan Komisaris',
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

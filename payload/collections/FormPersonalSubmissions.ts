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
    hooks: {
        afterDelete: [
            async ({ req, doc }) => {
                const attachmentIds: (string | number)[] = [];

                // Single attachment fields
                const fields = ['ktp_kitas', 'npwp_pribadi', 'kartu_keluarga', 'akta_kelahiran_pernikahan', 'booking_form'];
                fields.forEach(field => {
                    if (doc[field]) {
                        const id = typeof doc[field] === 'object' ? doc[field].id : doc[field];
                        if (id) attachmentIds.push(id);
                    }
                });

                // Array attachment field: dokumen_tambahan
                if (Array.isArray(doc.dokumen_tambahan)) {
                    doc.dokumen_tambahan.forEach((item: any) => {
                        if (item) {
                            const id = typeof item === 'object' ? item.id : item;
                            if (id) attachmentIds.push(id);
                        }
                    });
                }

                // Delete all referenced attachments
                for (const attachmentId of attachmentIds) {
                    try {
                        console.log(`Auto-deleting referenced attachment ${attachmentId} for personal submission ${doc.id}...`);
                        await req.payload.delete({
                            collection: 'form-attachments',
                            id: attachmentId,
                            req,
                        });
                    } catch (err) {
                        console.error(`Failed to delete attachment ${attachmentId}:`, err);
                    }
                }
            }
        ]
    }
}

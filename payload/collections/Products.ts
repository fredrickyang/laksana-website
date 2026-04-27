import type { CollectionConfig } from 'payload'
import { isArticleCreator, isAdmin } from '../access'

export const Products: CollectionConfig = {
    slug: 'products',
    access: {
        read: isArticleCreator,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    admin: {
        useAsTitle: 'name',
        hidden: ({ user }) => user?.role === 'article-creator',
    },
    hooks: {
        afterChange: [
            async ({ doc }) => {
                try {
                    const { revalidateTag } = await import('next/cache')
                    revalidateTag('products', { expire: 0 })
                    if (doc.slug) {
                        revalidateTag(`product-${doc.slug}`, { expire: 0 })
                    }
                } catch (err: any) {
                    console.error('Error revalidating product:', err)
                }
                return doc
            }
        ]
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: true,
            admin: {
                position: 'sidebar',
                description: 'Show this product on the home page',
            },
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
            localized: true,
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        // Simple slugify hook or rely on user input for now
                        if (!value && data?.name) {
                            return data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                        }
                        return value
                    }
                ]
            }
        },
        {
            name: 'label',
            type: 'text',
            localized: true,
            admin: {
                description: 'Product label shown on cards (e.g., "Gudang Siap Pakai", "Kavling Siap Bangun")',
            },
        },
        {
            name: 'phase',
            type: 'relationship',
            relationTo: 'phases' as any,
            required: false,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'type',
            type: 'text',
            localized: true,
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
        {
            name: 'keySpecs',
            type: 'array',
            admin: {
                description: 'Key specs shown on product cards (icon + label)',
            },
            fields: [
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'label',
                    type: 'text',
                    localized: true,
                },
            ],
        },
        {
            name: 'highlightSpecs',
            type: 'group',
            admin: {
                description: 'Highlight specifications displayed at the top of product detail page',
            },
            fields: [
                {
                    name: 'dimension',
                    type: 'text',
                    admin: {
                        description: 'e.g., "6 x 24 Meter"',
                    },
                },
                {
                    name: 'landArea',
                    type: 'text',
                    admin: {
                        description: 'e.g., "144 m²"',
                    },
                },
                {
                    name: 'buildingArea',
                    type: 'text',
                    admin: {
                        description: 'e.g., "126 m²"',
                    },
                },
                {
                    name: 'customLink',
                    type: 'text',
                    admin: {
                        description: 'Custom link for "Konsultasi Kami" button. Leave empty to automatically prefill from global WhatsApp settings on save.',
                    },
                    hooks: {
                        beforeValidate: [
                            async ({ value, data, req }) => {
                                // If already has a value, don't override
                                if (value) return value;

                                try {
                                    // Fetch global settings
                                    const settings = await req.payload.findGlobal({
                                        slug: 'settings',
                                    });

                                    // Use global phone number
                                    const rawNumber = settings?.contactInformation?.phoneNumbers?.[0]?.number;
                                    let waUrl = '';
                                    if (rawNumber) {
                                        const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
                                        waUrl = `https://wa.me/${cleanNumber}`;
                                    }

                                    const productName = (data as any)?.name || 'this unit';

                                    if (waUrl) {
                                        // Construct the URL
                                        const message = `[WEB] Halo tim marketing Laksana, saya ingin bertanya lebih lanjut tentang unit ${productName}`;
                                        
                                        return `${waUrl}${waUrl.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
                                    }

                                    // Absolute fallback if no settings found
                                    return `https://api.whatsapp.com/send?phone=6281805886000&text=${encodeURIComponent('[WEB] Halo tim marketing Laksana, saya ingin bertanya lebih lanjut tentang unit ' + productName)}`;
                                } catch (err) {
                                    console.error('Error prefilling customLink:', err);
                                    return value;
                                }
                            }
                        ]
                    }
                },
            ],
        },
        {
            name: 'detailedSpecs',
            type: 'array',
            admin: {
                description: 'Full specification list (Key-Value pairs)',
            },
            fields: [
                {
                    name: 'key',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Spec name (e.g., "Pondasi", "Atap", "Lantai 1")',
                    },
                },
                {
                    name: 'value',
                    type: 'text',
                    localized: true,
                    admin: {
                        description: 'Spec value (e.g., "Tiang Pancang", "UPVC 2 Layer")',
                    },
                },
            ],
        },
        {
            name: 'shortDescription',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'fullDescription',
            type: 'richText',
            localized: true,
        },
        {
            name: 'virtualTourUrl',
            type: 'text',
            admin: {
                description: 'URL to the 3D virtual tour',
            },
        },
        {
            name: 'brochure',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Upload a PDF brochure for this product (Download Brochure button)',
            },
        },
        {
            name: 'facilities',
            type: 'array',
            admin: {
                description: 'Unit-specific facilities (icon + label)',
            },
            fields: [
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'label',
                    type: 'text',
                    localized: true,
                },
            ],
        },
        {
            name: 'ctaTitle',
            type: 'text',
            localized: true,
            admin: {
                description: 'Override global CTA title for only this product',
            },
        },
        {
            name: 'ctaDescription',
            type: 'text',
            localized: true,
            admin: {
                description: 'Override global CTA description for only this product',
            },
        },
        {
            name: 'virtualTourTitle',
            type: 'richText',
            localized: true,
            admin: {
                description: 'Override global Virtual Tour title for only this product',
            },
        },
        {
            name: 'virtualTourDescription',
            type: 'text',
            localized: true,
            admin: {
                description: 'Override global Virtual Tour description for only this product',
            },
        },
        {
            name: 'virtualTourReasons',
            type: 'array',
            maxRows: 3,
            admin: {
                description: 'Override global Virtual Tour reasons for only this product',
            },
            fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'text', localized: true },
            ],
        },
    ],
}

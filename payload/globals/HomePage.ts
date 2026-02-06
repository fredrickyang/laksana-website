import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
    slug: 'home-page',
    fields: [
        {
            name: 'hero',
            type: 'group',
            fields: [
                {
                    type: 'row',
                    fields: [
                        { name: 'backgroundVideo', type: 'upload', relationTo: 'media' },
                        { name: 'mobileBackgroundVideo', type: 'upload', relationTo: 'media' }, // Optimized for vertical
                    ],
                },
                {
                    type: 'row',
                    fields: [
                        { name: 'fallbackImage', type: 'upload', relationTo: 'media' },
                        { name: 'mobileFallbackImage', type: 'upload', relationTo: 'media' }, // Optimized for vertical
                    ],
                },
                { name: 'overlayOpacity', type: 'number', min: 0, max: 100 },
                { name: 'headline', type: 'richText', localized: true },
                { name: 'subheadline', type: 'richText', localized: true },
                {
                    type: 'row',
                    fields: [
                        { name: 'primaryCta', type: 'text', localized: true },
                        { name: 'primaryCtaLink', type: 'text', admin: { description: 'URL for primary CTA button' } },
                    ],
                },
                {
                    type: 'row',
                    fields: [
                        { name: 'secondaryCta', type: 'text', localized: true },
                        { name: 'secondaryCtaLink', type: 'text', admin: { description: 'URL or anchor for secondary CTA button' } },
                    ],
                },
                { name: 'secondaryCtaHelperText', type: 'richText', localized: true }, // e.g. "Klik untuk lihat"
            ],
        },
        {
            name: 'mainFeature',
            type: 'group',
            fields: [
                { name: 'headline', type: 'richText', localized: true },
                { name: 'description', type: 'richText', localized: true },
                // removed mainImage/mobileMainImage from here, they are now inside stats
                {
                    name: 'ctaButtonLabel', // "TENTANG PERUSAHAAN"
                    type: 'text',
                    localized: true,
                },
                {
                    name: 'ctaButtonLink',
                    type: 'text',
                },
                {
                    name: 'stats',
                    type: 'array',
                    maxRows: 4, // 4 stats max
                    fields: [
                        {
                            name: 'number',
                            type: 'select',
                            options: ['01', '02', '03', '04'],
                        },
                        { name: 'title', type: 'richText', localized: true },
                        { name: 'subtitle', type: 'richText', localized: true },
                        // Images change when stat is clicked
                        {
                            type: 'row',
                            fields: [
                                { name: 'image', type: 'upload', relationTo: 'media' },
                                { name: 'mobileImage', type: 'upload', relationTo: 'media' },
                            ],
                        },
                    ],
                },
                {
                    name: 'badges', // For badges like UIKI, etc.
                    type: 'array',
                    fields: [
                        { name: 'icon', type: 'upload', relationTo: 'media' },
                        { name: 'label', type: 'text', localized: true },
                    ],
                },
                {
                    name: 'badgesCaption', // "Akses Mudah ke Bandara Tersertifikasi UIKI"
                    type: 'richText',
                    localized: true,
                },
            ],
        },
        {
            name: 'branding',
            type: 'group',
            fields: [
                { name: 'tag', type: 'richText', localized: true }, // Keep as text for kicker
                { name: 'sectionTitle', type: 'richText', localized: true },
                { name: 'description', type: 'richText', localized: true },
                {
                    name: 'clientLogos',
                    type: 'array',
                    fields: [
                        { name: 'logo', type: 'upload', relationTo: 'media' },
                        { name: 'clientName', type: 'text' },
                    ],
                },
            ],
        },
        {
            name: 'ctaSection',
            type: 'group',
            fields: [
                { name: 'cardTitle', type: 'richText', localized: true },
                { name: 'cardDescription', type: 'richText', localized: true },
                {
                    name: 'backgroundStyle',
                    type: 'select',
                    options: ['Dark Gradient', 'Blue Gradient', 'Simple Black'],
                },
                { name: 'button', type: 'text', localized: true },
                { name: 'buttonLink', type: 'text', admin: { description: 'URL for CTA button' } },
            ],
        },
    ],
}

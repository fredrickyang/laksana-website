import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

// Helper to create richText format from plain text
function createRichText(text: string) {
    return {
        root: {
            type: 'root',
            children: [
                {
                    type: 'paragraph',
                    children: [{ type: 'text', text }],
                    direction: 'ltr' as const,
                    format: '' as const,
                    indent: 0,
                    version: 1,
                },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
        },
    }
}

// Helper to create multi-paragraph richText
function createRichTextMulti(paragraphs: string[]) {
    return {
        root: {
            type: 'root',
            children: paragraphs.map(text => ({
                type: 'paragraph',
                children: [{ type: 'text', text }],
                direction: 'ltr' as const,
                format: '' as const,
                indent: 0,
                version: 1,
            })),
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
        },
    }
}

export async function seed() {
    const payload = await getPayload({ config })

    console.log('Starting seed process...')

    // Get public directory path
    const publicDir = path.resolve(process.cwd(), 'public')

    // Media upload helper
    async function uploadMedia(filePath: string, alt: string): Promise<number | null> {
        const fullPath = path.join(publicDir, filePath)

        if (!fs.existsSync(fullPath)) {
            console.log(`File not found: ${fullPath}`)
            return null
        }

        try {
            // Check if media already exists with same filename
            const filename = path.basename(filePath)
            const existing = await payload.find({
                collection: 'media',
                where: {
                    filename: { equals: filename },
                },
                limit: 1,
            })

            if (existing.docs.length > 0) {
                console.log(`Media already exists: ${filename}`)
                return existing.docs[0].id as number
            }

            const fileBuffer = fs.readFileSync(fullPath)
            const mimeType = filePath.endsWith('.mp4') ? 'video/mp4'
                : filePath.endsWith('.svg') ? 'image/svg+xml'
                : filePath.endsWith('.png') ? 'image/png'
                : filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') ? 'image/jpeg'
                : 'application/octet-stream'

            const media = await payload.create({
                collection: 'media',
                data: {
                    alt,
                },
                file: {
                    data: fileBuffer,
                    name: filename,
                    mimetype: mimeType,
                    size: fileBuffer.length,
                },
            })

            console.log(`Uploaded: ${filename}`)
            return media.id as number
        } catch (error) {
            console.error(`Failed to upload ${filePath}:`, error)
            return null
        }
    }

    // ========================================
    // UPLOAD MEDIA FILES
    // ========================================
    console.log('\n--- Uploading Media Files ---')

    // Hero video
    const heroVideoId = await uploadMedia('videos/hero-video.mp4', 'Hero Background Video')

    // Hero images
    const hero1Id = await uploadMedia('images/hero1.png', 'Hero Image 1 - Quality')
    const hero2Id = await uploadMedia('images/hero2.png', 'Hero Image 2 - Access')
    const img2Id = await uploadMedia('images/img2.png', 'Main Feature Image 2')

    // Background images
    const bgProdukId = await uploadMedia('images/bg-produk.png', 'Product Background')

    // Brand logos
    const cocaColaId = await uploadMedia('brand/coca-cola.svg', 'Coca Cola Logo')
    const googleId = await uploadMedia('brand/google.svg', 'Google Logo')
    const heinekenId = await uploadMedia('brand/heineken.svg', 'Heineken Logo')
    const mastercardId = await uploadMedia('brand/mastercard.svg', 'Mastercard Logo')
    const microsoftId = await uploadMedia('brand/microsoft.svg', 'Microsoft Logo')
    const underarmourId = await uploadMedia('brand/underarmour.svg', 'Under Armour Logo')
    const yamahaId = await uploadMedia('brand/yamaha.svg', 'Yamaha Logo')

    // USP images
    const usp1Id = await uploadMedia('images/usp/usp-1.png', 'USP Badge 1')
    const usp2Id = await uploadMedia('images/usp/usp-2.png', 'USP Badge 2')

    // Facility images
    const facility1Id = await uploadMedia('images/facilities/image1.jpg', 'Facility - Wide Roads')
    const facility2Id = await uploadMedia('images/facilities/image2.jpg', 'Facility - Underground Utilities')
    const facility3Id = await uploadMedia('images/facilities/image3.jpg', 'Facility - 24/7 Security')

    // Product thumbnails
    const luximaId = await uploadMedia('images/card-unit/luxima.png', 'Luxima Bizhub')
    const blokBId = await uploadMedia('images/card-unit/blok-b.png', 'Blok B')
    const blokCId = await uploadMedia('images/card-unit/blok-c.png', 'Blok C')
    const blokLId = await uploadMedia('images/card-unit/blok-l.png', 'Blok L')
    const unitMaximaId = await uploadMedia('images/card-unit/unit-maxima.png', 'Unit Maxima')
    const unitNeximaId = await uploadMedia('images/card-unit/unit-nexima.png', 'Unit Nexima')
    const unitNeximaPlusId = await uploadMedia('images/card-unit/unit-nexima-plus.png', 'Unit Nexima Plus')
    const unitOpximaId = await uploadMedia('images/card-unit/unit-opxima.png', 'Unit Opxima')
    const kavlingIndustriId = await uploadMedia('images/card-unit/kavling-industri.png', 'Kavling Industri')
    const kavlingCardId = await uploadMedia('images/card-unit/kavling-card.png', 'Kavling Card')
    const clusterCardId = await uploadMedia('images/card-unit/cluster-card.png', 'Cluster Card')

    // Blog thumbnails
    const tahap3BlogId = await uploadMedia('images/card-blog/tahap3.png', 'Pengembangan Tahap 3')
    const iukiBlogId = await uploadMedia('images/card-blog/iuki.png', 'IUKI Article')
    const estateBlogId = await uploadMedia('images/card-blog/estate-terbaik.png', 'Estate Management')

    // Leadership photos
    const pimpinan1Id = await uploadMedia('images/pimpinan/pimpinan1.png', 'Francis Cahyadi')
    const pimpinan2Id = await uploadMedia('images/pimpinan/pimpinan2.png', 'Jimmy Widjaja')
    const pimpinan3Id = await uploadMedia('images/pimpinan/pimpinan3.png', 'Paberd Leonard Hutagaol')
    const pimpinan4Id = await uploadMedia('images/pimpinan/pimpinan4.png', 'Netty Rusli')

    // ========================================
    // SEED HOME PAGE GLOBAL
    // ========================================
    console.log('\n--- Seeding Home Page ---')

    try {
        await payload.updateGlobal({
            slug: 'home-page',
            data: {
                hero: {
                    backgroundVideo: heroVideoId || undefined,
                    fallbackImage: hero1Id,
                    overlayOpacity: 40,
                    headline: createRichText('Laksana Business Park'),
                    subheadline: createRichText('Kawasan industri dan komersial terintegrasi di Tangerang Utara, dikembangkan oleh Agung Intiland dengan fasilitas modern dan lokasi strategis.'),
                    primaryCta: 'Hubungi Kami',
                    primaryCtaLink: 'https://api.whatsapp.com/send?phone=6281805886000&text=%5BWEB%5D%20Halo%20tim%20marketing%20Laksana%2C%20saya%20ingin%20bertanya%20lebih%20lanjut%20tentang%20unit%20Laksana%20Business%20Park',
                    secondaryCta: 'Virtual 3D',
                    secondaryCtaLink: '#virtual',
                    secondaryCtaHelperText: createRichText('Klik untuk Lihat'),
                },
                mainFeature: {
                    headline: createRichText('Membangun berkerlanjutan untuk kawasan terpadu'),
                    description: createRichText('Kawasan industri dan komersial terintegrasi di Tangerang Utara dikembangkan oleh Agung Intiland dengan fasilitas modern dan lokasi strategis. Kami memiliki lebih dari 1200 Hektar total kawasan dengan pilihan unit mulai dari Kavling, Gudang Serbaguna dan Ruko untuk menunjang bisnis anda.'),
                    ctaButtonLabel: 'Tentang Perusahaan',
                    ctaButtonLink: '/our-company',
                    stats: [
                        {
                            number: '01',
                            title: createRichText('Menjaga Kualitas Produk'),
                            image: hero1Id,
                        },
                        {
                            number: '02',
                            title: createRichText('Dikembangkan Oleh Manajemen Estate Terbaik'),
                            image: img2Id,
                        },
                        {
                            number: '03',
                            title: createRichText('Akses Mudah ke Bandara Tersertifikasi UIKI'),
                            image: hero2Id,
                        },
                    ],
                    badges: [
                        { icon: usp1Id, label: 'UIKI' },
                        { icon: usp2Id, label: 'Certified' },
                    ],
                    badgesCaption: createRichText('Akses Mudah ke Bandara Tersertifikasi UIKI'),
                },
                branding: {
                    tag: createRichText('Klien Kami'),
                    sectionTitle: createRichText('Dipercaya oleh perusahaan besar'),
                    description: createRichText('Kini mereka dapat fokus mengembangkan bisnis & operasional gudang lebih efisien bersama kami.'),
                    clientLogos: [
                        { logo: cocaColaId, clientName: 'Coca Cola' },
                        { logo: googleId, clientName: 'Google' },
                        { logo: heinekenId, clientName: 'Heineken' },
                        { logo: microsoftId, clientName: 'Microsoft' },
                        { logo: underarmourId, clientName: 'Under Armour' },
                        { logo: yamahaId, clientName: 'Yamaha' },
                        { logo: mastercardId, clientName: 'Mastercard' },
                    ],
                },
                ctaSection: {
                    cardTitle: createRichText('Sekarang giliran anda untuk bergabung dengan komunitas Laksana Business Park'),
                    cardDescription: createRichText('Lebih dari 1000 perusahaan telah mempercayakan kebutuhan industri dan komersialnya bersama kami.'),
                    backgroundStyle: 'Dark Gradient',
                    button: 'Bergabung Sekarang',
                    buttonLink: '/our-company#contact',
                },
            },
        })
        console.log('Home Page seeded successfully')
    } catch (error) {
        console.error('Failed to seed Home Page:', error)
    }

    // ========================================
    // SEED FACILITIES PAGE GLOBAL
    // ========================================
    console.log('\n--- Seeding Facilities Page ---')

    try {
        await payload.updateGlobal({
            slug: 'facilities-page',
            data: {
                hero: {
                    backgroundImage: bgProdukId,
                    title: 'Fasilitas Kami',
                },
                values: {
                    headline: 'Nilai-Nilai Perusahaan Kami',
                    description: createRichTextMulti([
                        'Sebagai perusahaan properti yang berkomitmen menghadirkan kawasan terbaik bagi mitra bisnis maupun penghuni, kami menjunjung tinggi nilai-nilai yang menjadi fondasi dalam setiap pengembangan semua kawasan kami. Nilai-nilai ini kami terapkan secara konsisten untuk memastikan kenyamanan, keamanan, dan keberlanjutan kawasan yang kami bangun.',
                        'Setiap proyek yang kami hadirkan dibangun di atas dasar perencanaan matang, infrastruktur andal, serta fasilitas lengkap yang menunjang kebutuhan bisnis modern. Laksana Business Park, sebagai tonggak pertama kami, telah berkembang menjadi pusat industri dan komersial yang dinamis, didukung oleh komunitas yang dirancang untuk meningkatkan efisiensi sekaligus pertumbuhan.',
                    ]),
                    valueCards: [
                        {
                            title: 'Enterprise Security',
                            description: 'Row jalan Lebar untuk Kenyamanan Akses Operasional',
                            image: facility1Id,
                        },
                        {
                            title: 'Enterprise Security',
                            description: 'Keamanan yang Terjamin dengan Sistem Pengawasan Security 24 Jam',
                            image: facility3Id,
                        },
                        {
                            title: 'Enterprise Security',
                            description: 'Underground Utility System yang menciptakan kawasan Rapih, Bersih dan Elegan',
                            image: facility2Id,
                        },
                    ],
                },
                mainServices: {
                    headline: 'Fasilitas Utama Kami',
                    description: 'Semua solusi dari kami dirancang untuk memberikan pengalaman terbaik bagi pemilik bisnis dan penghuni kami',
                    services: [
                        {
                            title: 'Internet Fiber Optic',
                            subtitle: 'Koneksi Internet Cepat & Stabil',
                            featuresList: [
                                { feature: 'Koneksi Fiber Optic' },
                                { feature: 'Kecepatan Internet Tinggi' },
                                { feature: 'Backup Connection' },
                                { feature: 'Teknologi Terkini' },
                            ],
                        },
                        {
                            title: 'Gudang Serbaguna',
                            subtitle: 'Gudang dengan Konsep 4 in 1',
                            featuresList: [
                                { feature: 'Kantor' },
                                { feature: 'Gudang' },
                                { feature: 'Ruko' },
                                { feature: 'Tempat Tinggal' },
                            ],
                        },
                        {
                            title: 'Parkir Luas',
                            subtitle: 'Area Parkir Luas dan Aman',
                            featuresList: [
                                { feature: 'Area Parkir Luas' },
                                { feature: 'Keamanan Gate System' },
                                { feature: 'Akses Mudah' },
                                { feature: 'Area Loading Barang' },
                            ],
                        },
                        {
                            title: 'Listrik Stabil',
                            subtitle: 'Terdapat pilihan besaran listrik',
                            featuresList: [
                                { feature: 'Generator Backup' },
                                { feature: 'Panel Distribusi' },
                                { feature: 'Listrik Stabil' },
                                { feature: 'Maintenance Rutin' },
                            ],
                        },
                        {
                            title: 'Keamanan 24 Jam',
                            subtitle: 'Sistem Keamanan Terintegrasi CCTV',
                            featuresList: [
                                { feature: 'Pengawasan CCTV 24 Jam' },
                                { feature: 'Penjagaan Security' },
                                { feature: 'Kontrol Akses' },
                                { feature: 'Monitoring Realtime' },
                            ],
                        },
                        {
                            title: 'Lokasi Strategis',
                            subtitle: 'Berada di Lokasi Strategis & Berkembang',
                            featuresList: [
                                { feature: 'Dekat dengan Bandara Soetta' },
                                { feature: 'Akses Tol Baru Kataraja' },
                                { feature: 'Jalan Utama' },
                                { feature: 'Area Berkembang Pesat' },
                            ],
                        },
                    ],
                },
            },
        })
        console.log('Facilities Page seeded successfully')
    } catch (error) {
        console.error('Failed to seed Facilities Page:', error)
    }

    // ========================================
    // SEED ABOUT PAGE GLOBAL
    // ========================================
    console.log('\n--- Seeding About Page ---')

    try {
        await payload.updateGlobal({
            slug: 'about-page',
            data: {
                hero: {
                    backgroundImage: bgProdukId,
                    title: 'Tentang Perusahaan',
                },
                history: {
                    headline: 'Perjalanan Agung Intiland Dimulai 2010',
                    content: createRichTextMulti([
                        'Sejak itu, Agung Intiland telah berkembang menjadi pengembang kawasan industri terbesar di Tangerang Utara, dengan komitmen untuk menciptakan ekosistem produktif yang mendorong pertumbuhan bisnis berkelanjutan. Dimulai dari pengembangan Laksana Business Park, kini kami telah menjadi tolok ukur kawasan industri dan komersial terintegrasi di wilayah ini.',
                        'Setiap proyek yang kami hadirkan dibangun di atas dasar perencanaan matang, infrastruktur andal, serta fasilitas lengkap yang menunjang kebutuhan bisnis modern. Laksana Business Park, sebagai tonggak pertama kami, telah berkembang menjadi pusat industri dan komersial yang dinamis, didukung oleh komunitas yang dirancang untuk meningkatkan efisiensi sekaligus pertumbuhan.',
                        'Dengan dedikasi lebih dari 300 profesional, Agung Intiland terus memperkuat reputasinya melalui konsistensi, inovasi, dan praktik berkelanjutan. Ke depan, kami bersiap untuk mengembangkan proyek residensial, melengkapi visi kami dalam menciptakan kawasan terintegrasi yang menyatukan bisnis dan kehidupan secara harmonis.',
                    ]),
                },
                videoSection: {
                    youtubeUrl: 'https://www.youtube.com/embed/aIA9kDBlJDc?start=1',
                },
                leadership: {
                    headline: 'Pimpinan Perusahaan',
                    description: 'Tim manajemen yang terdiri dari para profesional dengan pengalaman luas di berbagai bidang.',
                    leaders: [
                        { name: 'Francis Cahyadi', position: 'Komisaris Utama', photo: pimpinan1Id },
                        { name: 'Jimmy Widjaja', position: 'Komisaris', photo: pimpinan2Id },
                        { name: 'Paberd Leonard Hutagaol', position: 'Direktur Utama', photo: pimpinan3Id },
                        { name: 'Netty Rusli', position: 'Direktur Keuangan', photo: pimpinan4Id },
                    ],
                },
                timeline: [
                    { year: '2010', title: 'Pendirian Perusahaan', description: 'Agung Intiland didirikan dengan visi menjadi pengembang kawasan industri terkemuka.' },
                    { year: '2012', title: 'Laksana Tahap 1', description: 'Peluncuran Laksana Business Park Tahap 1 dengan unit gudang pertama.' },
                    { year: '2015', title: 'Laksana Tahap 2', description: 'Ekspansi kawasan dengan Laksana Business Park Tahap 2.' },
                    { year: '2018', title: 'Luxima Bizhub', description: 'Peluncuran konsep 4-in-1 dengan Luxima Bizhub.' },
                    { year: '2022', title: 'Laksana Tahap 3', description: 'Pengembangan Laksana Business Park Tahap 3 dengan fasilitas modern.' },
                    { year: '2024', title: 'Township Development', description: 'Rencana pengembangan township terintegrasi.' },
                ],
            },
        })
        console.log('About Page seeded successfully')
    } catch (error) {
        console.error('Failed to seed About Page:', error)
    }

    // ========================================
    // SEED PRODUCTS
    // ========================================
    console.log('\n--- Seeding Products ---')

    const productsData = [
        {
            name: 'Luxima Bizhub 4 in 1',
            slug: 'luxima-bizhub',
            label: 'Gudang Siap Pakai',
            phase: 'Luxima',
            type: 'Commercial',
            thumbnail: luximaId,
            shortDescription: 'Didesain untuk menjawab kebutuhan ruang usaha dan tempat tinggal dalam satu atap yang sama sebagai solusi nyata khususnya bagi start-up business.',
            highlightSpecs: {
                dimension: '6 x 18 Meter',
                landArea: '108 m²',
                buildingArea: '180 m²',
            },
            detailedSpecs: [
                { key: 'Pondasi', value: 'Tiang Pancang' },
                { key: 'Struktur', value: 'Beton Bertulang' },
                { key: 'Atap', value: 'Spandek' },
                { key: 'Lantai', value: 'Floor Hardener' },
            ],
            virtualTourUrl: 'https://www.vr-illustratorasia.xyz/Laksana%20Business%20Park/250831/',
        },
        {
            name: 'Unit Opxima',
            slug: 'unit-opxima',
            label: 'Gudang Siap Pakai',
            phase: 'Tahap 1',
            type: 'Industrial',
            thumbnail: unitOpximaId,
            shortDescription: 'Unit gudang dengan spesifikasi premium untuk kebutuhan industri modern.',
            highlightSpecs: {
                dimension: '6 x 24 Meter',
                landArea: '144 m²',
                buildingArea: '126 m²',
            },
            detailedSpecs: [
                { key: 'Pondasi', value: 'Tiang Pancang' },
                { key: 'Struktur', value: 'Baja Ringan' },
                { key: 'Atap', value: 'UPVC 2 Layer' },
                { key: 'Lantai', value: 'Floor Hardener' },
            ],
            virtualTourUrl: 'https://www.vr-illustratorasia.xyz/Laksana%20Business%20Park/250831/',
        },
        {
            name: 'Unit Nexima',
            slug: 'unit-nexima',
            label: 'Gudang Siap Pakai',
            phase: 'Tahap 2',
            type: 'Industrial',
            thumbnail: unitNeximaId,
            shortDescription: 'Gudang dengan desain efisien untuk operasional bisnis yang optimal.',
            highlightSpecs: {
                dimension: '8 x 20 Meter',
                landArea: '160 m²',
                buildingArea: '140 m²',
            },
            detailedSpecs: [
                { key: 'Pondasi', value: 'Tiang Pancang' },
                { key: 'Struktur', value: 'Baja Ringan' },
                { key: 'Atap', value: 'UPVC 2 Layer' },
                { key: 'Lantai', value: 'Floor Hardener' },
            ],
            virtualTourUrl: 'https://www.vr-illustratorasia.xyz/Laksana%20Business%20Park/250831/',
        },
        {
            name: 'Unit Nexima Plus',
            slug: 'unit-nexima-plus',
            label: 'Gudang Siap Pakai',
            phase: 'Tahap 2',
            type: 'Industrial',
            thumbnail: unitNeximaPlusId,
            shortDescription: 'Versi plus dari Unit Nexima dengan area yang lebih luas.',
            highlightSpecs: {
                dimension: '10 x 24 Meter',
                landArea: '240 m²',
                buildingArea: '210 m²',
            },
            detailedSpecs: [
                { key: 'Pondasi', value: 'Tiang Pancang' },
                { key: 'Struktur', value: 'Baja Ringan' },
                { key: 'Atap', value: 'UPVC 2 Layer' },
                { key: 'Lantai', value: 'Floor Hardener' },
            ],
            virtualTourUrl: 'https://www.vr-illustratorasia.xyz/Laksana%20Business%20Park/250831/',
        },
        {
            name: 'Unit Maxima',
            slug: 'unit-maxima',
            label: 'Gudang Siap Pakai',
            phase: 'Tahap 1',
            type: 'Industrial',
            thumbnail: unitMaximaId,
            shortDescription: 'Unit gudang terbesar dengan kapasitas penyimpanan maksimal.',
            highlightSpecs: {
                dimension: '12 x 30 Meter',
                landArea: '360 m²',
                buildingArea: '320 m²',
            },
            detailedSpecs: [
                { key: 'Pondasi', value: 'Tiang Pancang' },
                { key: 'Struktur', value: 'Baja WF' },
                { key: 'Atap', value: 'UPVC 2 Layer' },
                { key: 'Lantai', value: 'Floor Hardener' },
            ],
            virtualTourUrl: 'https://www.vr-illustratorasia.xyz/Laksana%20Business%20Park/250831/',
        },
        {
            name: 'Kavling Industri',
            slug: 'kavling-industri',
            label: 'Kavling Siap Bangun',
            phase: 'Kavling Industri',
            type: 'Industrial Land',
            thumbnail: kavlingIndustriId || kavlingCardId,
            shortDescription: 'Kavling industri siap bangun dengan infrastruktur lengkap dan izin IUKI.',
            highlightSpecs: {
                dimension: 'Mulai 500 m²',
                landArea: '500 - 5000 m²',
                buildingArea: 'Custom',
            },
            detailedSpecs: [
                { key: 'Infrastruktur', value: 'Lengkap' },
                { key: 'Listrik', value: 'PLN Industri' },
                { key: 'Air', value: 'PDAM & Sumur' },
                { key: 'Izin', value: 'IUKI Ready' },
            ],
            virtualTourUrl: 'https://www.vr-illustratorasia.xyz/Laksana%20Business%20Park/250831/',
        },
    ]

    for (const product of productsData) {
        try {
            // Check if product already exists
            const existing = await payload.find({
                collection: 'products',
                where: {
                    slug: { equals: product.slug },
                },
                limit: 1,
            })

            if (existing.docs.length > 0) {
                console.log(`Product already exists: ${product.name}`)
                continue
            }

            await payload.create({
                collection: 'products',
                data: product as any,
            })
            console.log(`Created product: ${product.name}`)
        } catch (error) {
            console.error(`Failed to create product ${product.name}:`, error)
        }
    }

    // ========================================
    // SEED SETTINGS GLOBAL
    // ========================================
    console.log('\n--- Seeding Settings ---')

    try {
        await payload.updateGlobal({
            slug: 'settings',
            data: {
                siteTitle: 'Laksana Business Park - Solusi Gudang & Properti Strategis',
                topNotification: 'Promo Spesial! Dapatkan diskon hingga 10% untuk pembelian unit gudang bulan ini.',
                contactInformation: {
                    phoneNumbers: [
                        { label: 'Kantor', number: '(021) 588 6000' },
                        { label: 'WhatsApp', number: '0818 588 6000' },
                    ],
                    email: 'info@laksanabusinesspark.id',
                    headOfficeAddress: createRichTextMulti([
                        'Jl. Pantai Indah Selatan No.9',
                        'Blok DC, RT.9/RW.6, Kapuk Muara,',
                        'Penjaringan, North Jakarta 14460',
                    ]),
                    marketingOfficeAddress: createRichTextMulti([
                        'Jl. Raya Kali Baru, Laksana,',
                        'Kecamatan Paku Haji,',
                        'Kabupaten Tangerang, Banten 15570',
                    ]),
                    socialMediaLinks: [
                        { platformName: 'Instagram', url: 'https://www.instagram.com/laksanabusinesspark.id/' },
                        { platformName: 'YouTube', url: 'https://www.youtube.com/@laksanabusinesspark' },
                    ],
                },
                navigation: [
                    { label: 'Home', link: '/' },
                    { label: 'Produk', link: '/product' },
                    { label: 'Tentang Kami', link: '/our-company' },
                    { label: 'Fasilitas', link: '/facilities' },
                    { label: 'Artikel', link: '/article' },
                ],
                footer: {
                    companyDescription: 'Kawasan industri dan komersial terintegrasi di Tangerang Utara, dikembangkan oleh PT. Agung Intiland dengan fasilitas modern dan lokasi strategis.',
                    copyrightText: '© 2025 PT Bangun Laksana Persada. All rights reserved.',
                },
            },
        })
        console.log('Settings seeded successfully')
    } catch (error) {
        console.error('Failed to seed Settings:', error)
    }

    // ========================================
    // SEED CATEGORIES
    // ========================================
    console.log('\n--- Seeding Categories ---')

    const categoriesData = [
        { name: 'News', slug: 'news', description: 'Berita terbaru seputar Laksana Business Park' },
        { name: 'Tips & Trick', slug: 'tips-trick', description: 'Tips dan trik untuk bisnis dan industri' },
        { name: 'Article', slug: 'article', description: 'Artikel informatif tentang properti dan industri' },
        { name: 'Event', slug: 'event', description: 'Acara dan kegiatan di Laksana Business Park' },
        { name: 'Promo', slug: 'promo', description: 'Promo dan penawaran spesial' },
        { name: 'Press Release', slug: 'press-release', description: 'Siaran pers resmi perusahaan' },
    ]

    const categoryIds: Record<string, number> = {}

    for (const category of categoriesData) {
        try {
            const existing = await payload.find({
                collection: 'categories',
                where: { slug: { equals: category.slug } },
                limit: 1,
            })

            if (existing.docs.length > 0) {
                console.log(`Category already exists: ${category.name}`)
                categoryIds[category.slug] = existing.docs[0].id as number
                continue
            }

            const created = await payload.create({
                collection: 'categories',
                data: category,
            })
            console.log(`Created category: ${category.name}`)
            categoryIds[category.slug] = created.id as number
        } catch (error) {
            console.error(`Failed to create category ${category.name}:`, error)
        }
    }

    // ========================================
    // SEED ARTICLES
    // ========================================
    console.log('\n--- Seeding Articles ---')

    const articlesData = [
        {
            title: 'Pengembangan Laksana Tahap 3',
            slug: 'pengembangan-laksana-tahap-3',
            publicationDate: '2024-01-15',
            category: categoryIds['news'],
            thumbnail: tahap3BlogId,
            excerpt: 'Demi pesatnya kebutuhan industri di Indonesia, Laksana Business Park kembali menghadirkan pengembangan tahap 3 dengan berbagai keunggulan.',
            content: createRichTextMulti([
                'Laksana Business Park dengan bangga mengumumkan peluncuran Tahap 3 dari pengembangan kawasan industri terintegrasi kami. Proyek ini merupakan respons terhadap meningkatnya permintaan akan ruang industri berkualitas di kawasan Tangerang Utara.',
                'Tahap 3 akan menawarkan berbagai tipe unit gudang dengan spesifikasi premium, dilengkapi dengan infrastruktur modern dan akses yang lebih baik ke jaringan transportasi utama.',
                'Dengan investasi yang signifikan dalam infrastruktur dan fasilitas pendukung, kami yakin Tahap 3 akan menjadi pilihan utama bagi perusahaan yang mencari lokasi strategis untuk operasional bisnis mereka.',
            ]),
        },
        {
            title: 'Kawasan Industri dengan Izin Lengkap (IUKI)',
            slug: 'kawasan-industri-izin-lengkap',
            publicationDate: '2024-02-10',
            category: categoryIds['tips-trick'],
            thumbnail: iukiBlogId,
            excerpt: 'Memiliki izin lengkap (IUKI) memberikan kemudahan bagi perusahaan dalam menjalankan operasional bisnisnya di kawasan industri.',
            content: createRichTextMulti([
                'Izin Usaha Kawasan Industri (IUKI) adalah salah satu persyaratan penting bagi kawasan industri di Indonesia. Laksana Business Park telah memiliki IUKI yang lengkap, memberikan jaminan legalitas dan kemudahan bagi para tenant.',
                'Dengan IUKI, perusahaan yang beroperasi di Laksana Business Park dapat menjalankan kegiatan industri dengan tenang tanpa khawatir akan masalah perizinan. Hal ini mencakup izin produksi, izin lingkungan, dan berbagai izin operasional lainnya.',
                'Keunggulan memilih kawasan dengan IUKI lengkap termasuk proses perizinan yang lebih cepat, kepastian hukum, dan dukungan dari pengelola kawasan dalam urusan administrasi.',
            ]),
        },
        {
            title: 'Dikelola dengan Manajemen Estate Profesional',
            slug: 'manajemen-estate-profesional',
            publicationDate: '2024-03-05',
            category: categoryIds['article'],
            thumbnail: estateBlogId,
            excerpt: 'Kami menjalankan dengan manajemen estate profesional untuk memastikan operasional kawasan berjalan lancar dan efisien.',
            content: createRichTextMulti([
                'Pengelolaan kawasan industri yang profesional adalah kunci keberhasilan dalam menciptakan lingkungan bisnis yang kondusif. Di Laksana Business Park, kami menerapkan standar manajemen estate tertinggi untuk memastikan kepuasan seluruh penghuni.',
                'Tim manajemen estate kami bertanggung jawab atas berbagai aspek operasional, mulai dari pemeliharaan infrastruktur, keamanan 24 jam, kebersihan kawasan, hingga penanganan keluhan dan permintaan tenant.',
                'Dengan pendekatan proaktif dan responsif, kami memastikan setiap masalah ditangani dengan cepat dan efisien, memungkinkan para tenant untuk fokus pada pengembangan bisnis mereka.',
            ]),
        },
    ]

    for (const article of articlesData) {
        try {
            // Check if article already exists
            const existing = await payload.find({
                collection: 'articles',
                where: {
                    slug: { equals: article.slug },
                },
                limit: 1,
            })

            if (existing.docs.length > 0) {
                // Update existing article with new category
                await payload.update({
                    collection: 'articles',
                    id: existing.docs[0].id,
                    data: { category: article.category },
                })
                console.log(`Updated article category: ${article.title}`)
                continue
            }

            await payload.create({
                collection: 'articles',
                data: article as any,
            })
            console.log(`Created article: ${article.title}`)
        } catch (error) {
            console.error(`Failed to create article ${article.title}:`, error)
        }
    }

    console.log('\n--- Seed Complete ---')
}

// Run if called directly
seed()
    .then(() => {
        console.log('Seed finished')
        process.exit(0)
    })
    .catch((error) => {
        console.error('Seed failed:', error)
        process.exit(1)
    })

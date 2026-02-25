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

// Inline text node helper
type InlineNode = { type: 'text'; text: string; format?: number }
function t(text: string): InlineNode { return { type: 'text', text } }
function bold(text: string): InlineNode { return { type: 'text', text, format: 1 } }

// Helper to create richText with mixed block nodes (paragraphs, headings, lists)
type BlockDef =
    | { kind: 'paragraph'; children: InlineNode[] }
    | { kind: 'heading'; tag: string; children: InlineNode[] }
    | { kind: 'list'; listType: 'bullet' | 'number'; items: InlineNode[][] }

function p(...children: InlineNode[]): BlockDef { return { kind: 'paragraph', children } }
function h4(...children: InlineNode[]): BlockDef { return { kind: 'heading', tag: 'h4', children } }
function h5(...children: InlineNode[]): BlockDef { return { kind: 'heading', tag: 'h5', children } }
function ul(items: InlineNode[][]): BlockDef { return { kind: 'list', listType: 'bullet', items } }

function createRichTextBlocks(blocks: BlockDef[]) {
    return {
        root: {
            type: 'root',
            children: blocks.map(block => {
                if (block.kind === 'paragraph') {
                    return {
                        type: 'paragraph',
                        children: block.children,
                        direction: 'ltr' as const,
                        format: '' as const,
                        indent: 0,
                        version: 1,
                    }
                }
                if (block.kind === 'heading') {
                    return {
                        type: 'heading',
                        tag: block.tag,
                        children: block.children,
                        direction: 'ltr' as const,
                        format: '' as const,
                        indent: 0,
                        version: 1,
                    }
                }
                // list
                return {
                    type: 'list',
                    listType: block.listType,
                    children: block.items.map(item => ({
                        type: 'listitem',
                        children: item,
                        direction: 'ltr' as const,
                        format: '' as const,
                        indent: 0,
                        version: 1,
                    })),
                    direction: 'ltr' as const,
                    format: '' as const,
                    indent: 0,
                    version: 1,
                }
            }),
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

    // Home Page - English
    try {
        await payload.updateGlobal({
            slug: 'home-page',
            locale: 'en',
            data: {
                hero: {
                    headline: createRichText('Laksana Business Park'),
                    subheadline: createRichText('An integrated industrial and commercial estate in North Tangerang, developed by Agung Intiland with modern facilities and a strategic location.'),
                    primaryCta: 'Contact Us',
                    secondaryCta: 'Virtual 3D',
                    secondaryCtaHelperText: createRichText('Click to View'),
                },
                mainFeature: {
                    headline: createRichText('Building sustainability for an integrated estate'),
                    description: createRichText('An integrated industrial and commercial estate in North Tangerang, developed by Agung Intiland with modern facilities and a strategic location. We have over 1,200 hectares of total estate area with unit options ranging from Land Plots, Multipurpose Warehouses, and Shophouses to support your business.'),
                    ctaButtonLabel: 'About the Company',
                    stats: [
                        {
                            number: '01',
                            title: createRichText('Maintaining Product Quality'),
                            image: hero1Id,
                        },
                        {
                            number: '02',
                            title: createRichText('Developed by the Best Estate Management'),
                            image: img2Id,
                        },
                        {
                            number: '03',
                            title: createRichText('Easy Access to IUKI-Certified Airport'),
                            image: hero2Id,
                        },
                    ],
                    badges: [
                        { icon: usp1Id, label: 'IUKI' },
                        { icon: usp2Id, label: 'Certified' },
                    ],
                    badgesCaption: createRichText('Easy Access to IUKI-Certified Airport'),
                },
                branding: {
                    tag: createRichText('Our Clients'),
                    sectionTitle: createRichText('Trusted by leading companies'),
                    description: createRichText('Now they can focus on growing their business & operating their warehouses more efficiently with us.'),
                },
                ctaSection: {
                    cardTitle: createRichText('Now it\'s your turn to join the Laksana Business Park community'),
                    cardDescription: createRichText('More than 1,000 companies have entrusted their industrial and commercial needs with us.'),
                    button: 'Join Now',
                },
            },
        })
        console.log('Home Page (EN) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Home Page (EN):', error)
    }

    // Home Page - Chinese
    try {
        await payload.updateGlobal({
            slug: 'home-page',
            locale: 'zh',
            data: {
                hero: {
                    headline: createRichText('Laksana Business Park'),
                    subheadline: createRichText('位于北丹格朗的综合工业与商业园区，由Agung Intiland开发，拥有现代化设施和战略位置。'),
                    primaryCta: '联系我们',
                    secondaryCta: '虚拟3D',
                    secondaryCtaHelperText: createRichText('点击查看'),
                },
                mainFeature: {
                    headline: createRichText('为综合园区打造可持续发展'),
                    description: createRichText('位于北丹格朗的综合工业与商业园区，由Agung Intiland开发，拥有现代化设施和战略位置。我们拥有超过1200公顷的总园区面积，提供从工业用地、多功能仓库到商铺等多种单元选择，全方位支持您的业务。'),
                    ctaButtonLabel: '关于公司',
                    stats: [
                        {
                            number: '01',
                            title: createRichText('保持产品质量'),
                            image: hero1Id,
                        },
                        {
                            number: '02',
                            title: createRichText('由最佳园区管理团队开发'),
                            image: img2Id,
                        },
                        {
                            number: '03',
                            title: createRichText('便捷通往IUKI认证机场'),
                            image: hero2Id,
                        },
                    ],
                    badges: [
                        { icon: usp1Id, label: 'IUKI' },
                        { icon: usp2Id, label: '认证' },
                    ],
                    badgesCaption: createRichText('便捷通往IUKI认证机场'),
                },
                branding: {
                    tag: createRichText('我们的客户'),
                    sectionTitle: createRichText('受到大型企业的信赖'),
                    description: createRichText('现在他们可以专注于发展业务，与我们一起更高效地运营仓库。'),
                },
                ctaSection: {
                    cardTitle: createRichText('现在轮到您加入Laksana Business Park大家庭了'),
                    cardDescription: createRichText('超过1000家企业已将其工业和商业需求托付给我们。'),
                    button: '立即加入',
                },
            },
        })
        console.log('Home Page (ZH) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Home Page (ZH):', error)
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

    // Facilities Page - English
    try {
        await payload.updateGlobal({
            slug: 'facilities-page',
            locale: 'en',
            data: {
                hero: {
                    title: 'Our Facilities',
                },
                values: {
                    headline: 'Our Company Values',
                    description: createRichTextMulti([
                        'As a property company committed to providing the best estates for business partners and residents, we uphold values that form the foundation of every development across all our estates. We apply these values consistently to ensure the comfort, safety, and sustainability of the estates we build.',
                        'Every project we deliver is built on thorough planning, reliable infrastructure, and comprehensive facilities that support modern business needs. Laksana Business Park, as our first milestone, has grown into a dynamic industrial and commercial hub, supported by a community designed to enhance efficiency and growth.',
                    ]),
                    valueCards: [
                        {
                            title: 'Enterprise Security',
                            description: 'Wide Roads for Comfortable Operational Access',
                            image: facility1Id,
                        },
                        {
                            title: 'Enterprise Security',
                            description: 'Guaranteed Security with 24-Hour Surveillance System',
                            image: facility3Id,
                        },
                        {
                            title: 'Enterprise Security',
                            description: 'Underground Utility System Creating a Neat, Clean, and Elegant Estate',
                            image: facility2Id,
                        },
                    ],
                },
                mainServices: {
                    headline: 'Our Main Facilities',
                    description: 'All our solutions are designed to provide the best experience for business owners and our residents',
                    services: [
                        {
                            title: 'Fiber Optic Internet',
                            subtitle: 'Fast & Stable Internet Connection',
                            featuresList: [
                                { feature: 'Fiber Optic Connection' },
                                { feature: 'High-Speed Internet' },
                                { feature: 'Backup Connection' },
                                { feature: 'Latest Technology' },
                            ],
                        },
                        {
                            title: 'Multipurpose Warehouse',
                            subtitle: 'Warehouse with 4-in-1 Concept',
                            featuresList: [
                                { feature: 'Office' },
                                { feature: 'Warehouse' },
                                { feature: 'Shophouse' },
                                { feature: 'Residence' },
                            ],
                        },
                        {
                            title: 'Spacious Parking',
                            subtitle: 'Spacious and Secure Parking Area',
                            featuresList: [
                                { feature: 'Spacious Parking Area' },
                                { feature: 'Gate Security System' },
                                { feature: 'Easy Access' },
                                { feature: 'Loading Area' },
                            ],
                        },
                        {
                            title: 'Stable Electricity',
                            subtitle: 'Various Electricity Capacity Options',
                            featuresList: [
                                { feature: 'Backup Generator' },
                                { feature: 'Distribution Panel' },
                                { feature: 'Stable Electricity' },
                                { feature: 'Routine Maintenance' },
                            ],
                        },
                        {
                            title: '24-Hour Security',
                            subtitle: 'Integrated CCTV Security System',
                            featuresList: [
                                { feature: '24-Hour CCTV Surveillance' },
                                { feature: 'Security Guards' },
                                { feature: 'Access Control' },
                                { feature: 'Real-time Monitoring' },
                            ],
                        },
                        {
                            title: 'Strategic Location',
                            subtitle: 'Located in a Strategic & Growing Area',
                            featuresList: [
                                { feature: 'Close to Soekarno-Hatta Airport' },
                                { feature: 'Access to Kataraja Toll Road' },
                                { feature: 'Main Road' },
                                { feature: 'Rapidly Growing Area' },
                            ],
                        },
                    ],
                },
            },
        })
        console.log('Facilities Page (EN) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Facilities Page (EN):', error)
    }

    // Facilities Page - Chinese
    try {
        await payload.updateGlobal({
            slug: 'facilities-page',
            locale: 'zh',
            data: {
                hero: {
                    title: '我们的设施',
                },
                values: {
                    headline: '我们的企业价值观',
                    description: createRichTextMulti([
                        '作为一家致力于为商业伙伴和居民打造最佳园区的房地产公司，我们秉持着贯穿每一个园区开发项目的核心价值观。我们始终如一地践行这些价值观，确保我们所建园区的舒适性、安全性和可持续性。',
                        '我们交付的每一个项目都建立在周密的规划、可靠的基础设施和支持现代商业需求的完善设施之上。Laksana Business Park作为我们的第一个里程碑，已经发展成为一个充满活力的工业和商业中心，得益于一个旨在提高效率和促进增长的社区。',
                    ]),
                    valueCards: [
                        {
                            title: '企业安保',
                            description: '宽阔道路，便于运营通行',
                            image: facility1Id,
                        },
                        {
                            title: '企业安保',
                            description: '24小时监控系统，保障安全',
                            image: facility3Id,
                        },
                        {
                            title: '企业安保',
                            description: '地下管线系统，打造整洁、清爽、优雅的园区',
                            image: facility2Id,
                        },
                    ],
                },
                mainServices: {
                    headline: '我们的主要设施',
                    description: '我们的所有解决方案都旨在为业主和居民提供最佳体验',
                    services: [
                        {
                            title: '光纤网络',
                            subtitle: '快速稳定的网络连接',
                            featuresList: [
                                { feature: '光纤连接' },
                                { feature: '高速网络' },
                                { feature: '备用连接' },
                                { feature: '最新技术' },
                            ],
                        },
                        {
                            title: '多功能仓库',
                            subtitle: '4合1概念仓库',
                            featuresList: [
                                { feature: '办公室' },
                                { feature: '仓库' },
                                { feature: '商铺' },
                                { feature: '住宅' },
                            ],
                        },
                        {
                            title: '宽敞停车场',
                            subtitle: '宽敞安全的停车区',
                            featuresList: [
                                { feature: '宽敞停车区' },
                                { feature: '门禁安全系统' },
                                { feature: '便捷通行' },
                                { feature: '货物装卸区' },
                            ],
                        },
                        {
                            title: '稳定电力',
                            subtitle: '多种电力容量选择',
                            featuresList: [
                                { feature: '备用发电机' },
                                { feature: '配电盘' },
                                { feature: '稳定电力' },
                                { feature: '定期维护' },
                            ],
                        },
                        {
                            title: '24小时安保',
                            subtitle: 'CCTV综合安保系统',
                            featuresList: [
                                { feature: '24小时CCTV监控' },
                                { feature: '安保巡逻' },
                                { feature: '门禁控制' },
                                { feature: '实时监控' },
                            ],
                        },
                        {
                            title: '战略位置',
                            subtitle: '位于战略性发展区域',
                            featuresList: [
                                { feature: '靠近苏加诺-哈达机场' },
                                { feature: '连接Kataraja收费公路' },
                                { feature: '主干道' },
                                { feature: '快速发展区域' },
                            ],
                        },
                    ],
                },
            },
        })
        console.log('Facilities Page (ZH) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Facilities Page (ZH):', error)
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

    // About Page - English
    try {
        await payload.updateGlobal({
            slug: 'about-page',
            locale: 'en',
            data: {
                hero: {
                    title: 'About the Company',
                },
                history: {
                    headline: 'The Journey of Agung Intiland Began in 2010',
                    content: createRichTextMulti([
                        'Since then, Agung Intiland has grown into the largest industrial estate developer in North Tangerang, with a commitment to creating a productive ecosystem that drives sustainable business growth. Starting from the development of Laksana Business Park, we have now become the benchmark for integrated industrial and commercial estates in the region.',
                        'Every project we deliver is built on thorough planning, reliable infrastructure, and comprehensive facilities that support modern business needs. Laksana Business Park, as our first milestone, has grown into a dynamic industrial and commercial hub, supported by a community designed to enhance efficiency and growth.',
                        'With the dedication of more than 300 professionals, Agung Intiland continues to strengthen its reputation through consistency, innovation, and sustainable practices. Looking ahead, we are preparing to develop residential projects, completing our vision of creating an integrated estate that harmoniously unites business and living.',
                    ]),
                },
                leadership: {
                    headline: 'Company Leadership',
                    description: 'A management team consisting of professionals with extensive experience in various fields.',
                    leaders: [
                        { name: 'Francis Cahyadi', position: 'President Commissioner', photo: pimpinan1Id },
                        { name: 'Jimmy Widjaja', position: 'Commissioner', photo: pimpinan2Id },
                        { name: 'Paberd Leonard Hutagaol', position: 'President Director', photo: pimpinan3Id },
                        { name: 'Netty Rusli', position: 'Finance Director', photo: pimpinan4Id },
                    ],
                },
                timeline: [
                    { year: '2010', title: 'Company Establishment', description: 'Agung Intiland was established with the vision of becoming a leading industrial estate developer.' },
                    { year: '2012', title: 'Laksana Phase 1', description: 'Launch of Laksana Business Park Phase 1 with the first warehouse units.' },
                    { year: '2015', title: 'Laksana Phase 2', description: 'Estate expansion with Laksana Business Park Phase 2.' },
                    { year: '2018', title: 'Luxima Bizhub', description: 'Launch of the 4-in-1 concept with Luxima Bizhub.' },
                    { year: '2022', title: 'Laksana Phase 3', description: 'Development of Laksana Business Park Phase 3 with modern facilities.' },
                    { year: '2024', title: 'Township Development', description: 'Plans for integrated township development.' },
                ],
            },
        })
        console.log('About Page (EN) seeded successfully')
    } catch (error) {
        console.error('Failed to seed About Page (EN):', error)
    }

    // About Page - Chinese
    try {
        await payload.updateGlobal({
            slug: 'about-page',
            locale: 'zh',
            data: {
                hero: {
                    title: '关于公司',
                },
                history: {
                    headline: 'Agung Intiland的发展始于2010年',
                    content: createRichTextMulti([
                        '自那时起，Agung Intiland已发展成为北丹格朗最大的工业园区开发商，致力于创建推动可持续商业增长的生产性生态系统。从Laksana Business Park的开发开始，我们现已成为该地区综合工业和商业园区的标杆。',
                        '我们交付的每一个项目都建立在周密的规划、可靠的基础设施和支持现代商业需求的完善设施之上。Laksana Business Park作为我们的第一个里程碑，已发展成为一个充满活力的工业和商业中心，得益于一个旨在提高效率和促进增长的社区。',
                        '凭借300多名专业人士的奉献，Agung Intiland通过一致性、创新和可持续实践不断加强其声誉。展望未来，我们正在准备开发住宅项目，完善我们创建将商业与生活和谐统一的综合园区的愿景。',
                    ]),
                },
                leadership: {
                    headline: '公司领导层',
                    description: '由在各领域拥有丰富经验的专业人士组成的管理团队。',
                    leaders: [
                        { name: 'Francis Cahyadi', position: '总监事', photo: pimpinan1Id },
                        { name: 'Jimmy Widjaja', position: '监事', photo: pimpinan2Id },
                        { name: 'Paberd Leonard Hutagaol', position: '总经理', photo: pimpinan3Id },
                        { name: 'Netty Rusli', position: '财务总监', photo: pimpinan4Id },
                    ],
                },
                timeline: [
                    { year: '2010', title: '公司成立', description: 'Agung Intiland以成为领先工业园区开发商的愿景而成立。' },
                    { year: '2012', title: 'Laksana第一期', description: 'Laksana Business Park第一期启动，推出首批仓库单元。' },
                    { year: '2015', title: 'Laksana第二期', description: 'Laksana Business Park第二期园区扩展。' },
                    { year: '2018', title: 'Luxima Bizhub', description: '推出4合1概念的Luxima Bizhub。' },
                    { year: '2022', title: 'Laksana第三期', description: 'Laksana Business Park第三期开发，配备现代化设施。' },
                    { year: '2024', title: '城镇开发', description: '综合城镇开发规划。' },
                ],
            },
        })
        console.log('About Page (ZH) seeded successfully')
    } catch (error) {
        console.error('Failed to seed About Page (ZH):', error)
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
    // SEED PRODUCT TRANSLATIONS (EN & ZH)
    // ========================================
    console.log('\n--- Seeding Product Translations ---')

    const productTranslations = [
        {
            slug: 'luxima-bizhub',
            en: {
                name: 'Luxima Bizhub 4 in 1',
                slug: 'luxima-bizhub',
                label: 'Ready-to-Use Warehouse',
                type: 'Commercial',
                shortDescription: 'Designed to meet the needs of business space and residence under one roof as a real solution especially for start-up businesses.',
                detailedSpecs: [
                    { key: 'Pondasi', value: 'Pile Foundation' },
                    { key: 'Struktur', value: 'Reinforced Concrete' },
                    { key: 'Atap', value: 'Spandek' },
                    { key: 'Lantai', value: 'Floor Hardener' },
                ],
            },
            zh: {
                name: 'Luxima Bizhub 4合1',
                slug: 'luxima-bizhub',
                label: '即用型仓库',
                type: '商业',
                shortDescription: '专为满足在同一屋檐下的商业空间和住所需求而设计，是初创企业的理想解决方案。',
                detailedSpecs: [
                    { key: 'Pondasi', value: '桩基础' },
                    { key: 'Struktur', value: '钢筋混凝土' },
                    { key: 'Atap', value: 'Spandek屋顶' },
                    { key: 'Lantai', value: '地坪硬化剂' },
                ],
            },
        },
        {
            slug: 'unit-opxima',
            en: {
                name: 'Unit Opxima',
                slug: 'unit-opxima',
                label: 'Ready-to-Use Warehouse',
                type: 'Industrial',
                shortDescription: 'Warehouse unit with premium specifications for modern industrial needs.',
                detailedSpecs: [
                    { key: 'Pondasi', value: 'Pile Foundation' },
                    { key: 'Struktur', value: 'Light Steel' },
                    { key: 'Atap', value: 'UPVC 2 Layer' },
                    { key: 'Lantai', value: 'Floor Hardener' },
                ],
            },
            zh: {
                name: 'Opxima单元',
                slug: 'unit-opxima',
                label: '即用型仓库',
                type: '工业',
                shortDescription: '具有高端规格的仓库单元，满足现代工业需求。',
                detailedSpecs: [
                    { key: 'Pondasi', value: '桩基础' },
                    { key: 'Struktur', value: '轻钢结构' },
                    { key: 'Atap', value: 'UPVC双层' },
                    { key: 'Lantai', value: '地坪硬化剂' },
                ],
            },
        },
        {
            slug: 'unit-nexima',
            en: {
                name: 'Unit Nexima',
                slug: 'unit-nexima',
                label: 'Ready-to-Use Warehouse',
                type: 'Industrial',
                shortDescription: 'Warehouse with efficient design for optimal business operations.',
                detailedSpecs: [
                    { key: 'Pondasi', value: 'Pile Foundation' },
                    { key: 'Struktur', value: 'Light Steel' },
                    { key: 'Atap', value: 'UPVC 2 Layer' },
                    { key: 'Lantai', value: 'Floor Hardener' },
                ],
            },
            zh: {
                name: 'Nexima单元',
                slug: 'unit-nexima',
                label: '即用型仓库',
                type: '工业',
                shortDescription: '设计高效的仓库，优化业务运营。',
                detailedSpecs: [
                    { key: 'Pondasi', value: '桩基础' },
                    { key: 'Struktur', value: '轻钢结构' },
                    { key: 'Atap', value: 'UPVC双层' },
                    { key: 'Lantai', value: '地坪硬化剂' },
                ],
            },
        },
        {
            slug: 'unit-nexima-plus',
            en: {
                name: 'Unit Nexima Plus',
                slug: 'unit-nexima-plus',
                label: 'Ready-to-Use Warehouse',
                type: 'Industrial',
                shortDescription: 'The plus version of Unit Nexima with a larger area.',
                detailedSpecs: [
                    { key: 'Pondasi', value: 'Pile Foundation' },
                    { key: 'Struktur', value: 'Light Steel' },
                    { key: 'Atap', value: 'UPVC 2 Layer' },
                    { key: 'Lantai', value: 'Floor Hardener' },
                ],
            },
            zh: {
                name: 'Nexima Plus单元',
                slug: 'unit-nexima-plus',
                label: '即用型仓库',
                type: '工业',
                shortDescription: 'Nexima单元的加大版，面积更宽敞。',
                detailedSpecs: [
                    { key: 'Pondasi', value: '桩基础' },
                    { key: 'Struktur', value: '轻钢结构' },
                    { key: 'Atap', value: 'UPVC双层' },
                    { key: 'Lantai', value: '地坪硬化剂' },
                ],
            },
        },
        {
            slug: 'unit-maxima',
            en: {
                name: 'Unit Maxima',
                slug: 'unit-maxima',
                label: 'Ready-to-Use Warehouse',
                type: 'Industrial',
                shortDescription: 'The largest warehouse unit with maximum storage capacity.',
                detailedSpecs: [
                    { key: 'Pondasi', value: 'Pile Foundation' },
                    { key: 'Struktur', value: 'WF Steel' },
                    { key: 'Atap', value: 'UPVC 2 Layer' },
                    { key: 'Lantai', value: 'Floor Hardener' },
                ],
            },
            zh: {
                name: 'Maxima单元',
                slug: 'unit-maxima',
                label: '即用型仓库',
                type: '工业',
                shortDescription: '最大的仓库单元，存储容量最大化。',
                detailedSpecs: [
                    { key: 'Pondasi', value: '桩基础' },
                    { key: 'Struktur', value: 'WF钢结构' },
                    { key: 'Atap', value: 'UPVC双层' },
                    { key: 'Lantai', value: '地坪硬化剂' },
                ],
            },
        },
        {
            slug: 'kavling-industri',
            en: {
                name: 'Industrial Land Plot',
                slug: 'kavling-industri',
                label: 'Ready-to-Build Land Plot',
                type: 'Industrial Land',
                shortDescription: 'Ready-to-build industrial land plot with complete infrastructure and IUKI permit.',
                detailedSpecs: [
                    { key: 'Infrastruktur', value: 'Complete' },
                    { key: 'Listrik', value: 'Industrial PLN' },
                    { key: 'Air', value: 'PDAM & Well' },
                    { key: 'Izin', value: 'IUKI Ready' },
                ],
            },
            zh: {
                name: '工业用地',
                slug: 'kavling-industri',
                label: '即建型工业用地',
                type: '工业用地',
                shortDescription: '基础设施完善、拥有IUKI许可证的即建型工业用地。',
                detailedSpecs: [
                    { key: 'Infrastruktur', value: '完善' },
                    { key: 'Listrik', value: '工业用电' },
                    { key: 'Air', value: '自来水和井水' },
                    { key: 'Izin', value: 'IUKI就绪' },
                ],
            },
        },
    ]

    for (const pt of productTranslations) {
        try {
            const found = await payload.find({
                collection: 'products',
                where: { slug: { equals: pt.slug } },
                limit: 1,
            })
            if (found.docs.length > 0) {
                const id = found.docs[0].id
                await payload.update({ collection: 'products', id, locale: 'en', data: pt.en as any })
                await payload.update({ collection: 'products', id, locale: 'zh', data: pt.zh as any })
                console.log(`Translated product: ${pt.slug}`)
            }
        } catch (error) {
            console.error(`Failed to translate product ${pt.slug}:`, error)
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

    // Settings - English
    try {
        await payload.updateGlobal({
            slug: 'settings',
            locale: 'en',
            data: {
                siteTitle: 'Laksana Business Park - Strategic Warehouse & Property Solutions',
                topNotification: 'Special Promo! Get up to 10% discount on warehouse unit purchases this month.',
                contactInformation: {
                    phoneNumbers: [
                        { label: 'Office', number: '(021) 588 6000' },
                        { label: 'WhatsApp', number: '0818 588 6000' },
                    ],
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
                },
                navigation: [
                    { label: 'Home', link: '/' },
                    { label: 'Products', link: '/product' },
                    { label: 'About Us', link: '/our-company' },
                    { label: 'Facilities', link: '/facilities' },
                    { label: 'Articles', link: '/article' },
                ],
                footer: {
                    companyDescription: 'An integrated industrial and commercial estate in North Tangerang, developed by PT. Agung Intiland with modern facilities and a strategic location.',
                    copyrightText: '© 2025 PT Bangun Laksana Persada. All rights reserved.',
                },
            },
        })
        console.log('Settings (EN) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Settings (EN):', error)
    }

    // Settings - Chinese
    try {
        await payload.updateGlobal({
            slug: 'settings',
            locale: 'zh',
            data: {
                siteTitle: 'Laksana Business Park - 战略性仓储与物业解决方案',
                topNotification: '特别促销！本月购买仓库单元可享高达10%的折扣。',
                contactInformation: {
                    phoneNumbers: [
                        { label: '办公室', number: '(021) 588 6000' },
                        { label: 'WhatsApp', number: '0818 588 6000' },
                    ],
                    headOfficeAddress: createRichTextMulti([
                        'Jl. Pantai Indah Selatan No.9',
                        'Blok DC, RT.9/RW.6, Kapuk Muara,',
                        'Penjaringan, 北雅加达 14460',
                    ]),
                    marketingOfficeAddress: createRichTextMulti([
                        'Jl. Raya Kali Baru, Laksana,',
                        'Paku Haji镇,',
                        '丹格朗县, 万丹省 15570',
                    ]),
                },
                navigation: [
                    { label: '首页', link: '/' },
                    { label: '产品', link: '/product' },
                    { label: '关于我们', link: '/our-company' },
                    { label: '设施', link: '/facilities' },
                    { label: '文章', link: '/article' },
                ],
                footer: {
                    companyDescription: '位于北丹格朗的综合工业与商业园区，由PT. Agung Intiland开发，拥有现代化设施和战略位置。',
                    copyrightText: '© 2025 PT Bangun Laksana Persada. 版权所有。',
                },
            },
        })
        console.log('Settings (ZH) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Settings (ZH):', error)
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

    // ========================================
    // SEED ARTICLE TRANSLATIONS (EN & ZH)
    // ========================================
    console.log('\n--- Seeding Article Translations ---')

    const articleTranslations = [
        {
            slug: 'pengembangan-laksana-tahap-3',
            en: {
                title: 'Laksana Phase 3 Development',
                slug: 'laksana-phase-3-development',
                excerpt: 'To meet Indonesia\'s rapidly growing industrial needs, Laksana Business Park presents Phase 3 development with various advantages.',
                content: createRichTextMulti([
                    'Laksana Business Park proudly announces the launch of Phase 3 of our integrated industrial estate development. This project is a response to the increasing demand for quality industrial space in the North Tangerang area.',
                    'Phase 3 will offer various types of warehouse units with premium specifications, equipped with modern infrastructure and better access to major transportation networks.',
                    'With significant investment in infrastructure and supporting facilities, we are confident that Phase 3 will be the top choice for companies seeking a strategic location for their business operations.',
                ]),
            },
            zh: {
                title: 'Laksana第三期开发',
                slug: 'laksana-phase-3-development',
                excerpt: '为满足印尼日益增长的工业需求，Laksana Business Park推出第三期开发，具有多项优势。',
                content: createRichTextMulti([
                    'Laksana Business Park自豪地宣布推出综合工业园区第三期开发项目。该项目是对北丹格朗地区日益增长的优质工业空间需求的回应。',
                    '第三期将提供多种类型的仓库单元，配备高端规格、现代化基础设施以及更便捷的主要交通网络连接。',
                    '通过对基础设施和配套设施的大量投资，我们相信第三期将成为寻求战略位置开展业务运营的企业的首选。',
                ]),
            },
        },
        {
            slug: 'kawasan-industri-izin-lengkap',
            en: {
                title: 'Industrial Estate with Complete Permits (IUKI)',
                slug: 'industrial-estate-complete-permits',
                excerpt: 'Having complete permits (IUKI) makes it easier for companies to run their business operations in the industrial estate.',
                content: createRichTextMulti([
                    'The Industrial Estate Business Permit (IUKI) is one of the essential requirements for industrial estates in Indonesia. Laksana Business Park has obtained complete IUKI, providing legal assurance and convenience for all tenants.',
                    'With IUKI, companies operating in Laksana Business Park can carry out industrial activities with peace of mind without worrying about permit issues. This covers production permits, environmental permits, and various other operational permits.',
                    'The advantages of choosing an estate with complete IUKI include faster permit processing, legal certainty, and support from estate management in administrative matters.',
                ]),
            },
            zh: {
                title: '拥有完整许可证的工业园区（IUKI）',
                slug: 'industrial-estate-complete-permits',
                excerpt: '拥有完整许可证（IUKI）使企业在工业园区内更容易开展业务运营。',
                content: createRichTextMulti([
                    '工业园区经营许可证（IUKI）是印尼工业园区的重要要求之一。Laksana Business Park已获得完整的IUKI，为所有租户提供法律保障和便利。',
                    '凭借IUKI，在Laksana Business Park运营的企业可以安心开展工业活动，无需担心许可证问题。这涵盖了生产许可证、环境许可证和各种其他运营许可证。',
                    '选择拥有完整IUKI的园区的优势包括更快的许可证审批流程、法律确定性以及园区管理层在行政事务方面的支持。',
                ]),
            },
        },
        {
            slug: 'manajemen-estate-profesional',
            en: {
                title: 'Managed by Professional Estate Management',
                slug: 'professional-estate-management',
                excerpt: 'We operate with professional estate management to ensure smooth and efficient estate operations.',
                content: createRichTextMulti([
                    'Professional industrial estate management is the key to creating a conducive business environment. At Laksana Business Park, we apply the highest estate management standards to ensure the satisfaction of all residents.',
                    'Our estate management team is responsible for various operational aspects, from infrastructure maintenance, 24-hour security, estate cleanliness, to handling tenant complaints and requests.',
                    'With a proactive and responsive approach, we ensure that every issue is handled quickly and efficiently, allowing tenants to focus on growing their businesses.',
                ]),
            },
            zh: {
                title: '由专业园区管理团队管理',
                slug: 'professional-estate-management',
                excerpt: '我们以专业的园区管理运营，确保园区高效顺畅运行。',
                content: createRichTextMulti([
                    '专业的工业园区管理是创造良好商业环境的关键。在Laksana Business Park，我们采用最高的园区管理标准，确保所有住户的满意度。',
                    '我们的园区管理团队负责各种运营方面，从基础设施维护、24小时安保、园区清洁，到处理租户投诉和请求。',
                    '通过积极主动和快速响应的方式，我们确保每个问题都能得到迅速高效的处理，使租户能够专注于发展业务。',
                ]),
            },
        },
    ]

    for (const at of articleTranslations) {
        try {
            const found = await payload.find({
                collection: 'articles',
                where: { slug: { equals: at.slug } },
                limit: 1,
            })
            if (found.docs.length > 0) {
                const id = found.docs[0].id
                await payload.update({ collection: 'articles', id, locale: 'en', data: at.en as any })
                await payload.update({ collection: 'articles', id, locale: 'zh', data: at.zh as any })
                console.log(`Translated article: ${at.slug}`)
            }
        } catch (error) {
            console.error(`Failed to translate article ${at.slug}:`, error)
        }
    }

    // ========================================
    // SEED PRIVACY POLICY PAGE GLOBAL
    // ========================================
    console.log('\n--- Seeding Privacy Policy Page ---')

    try {
        await payload.updateGlobal({
            slug: 'privacy-policy-page',
            data: {
                hero: {
                    backgroundImage: bgProdukId,
                    title: 'Kebijakan Privasi',
                },
                lastUpdated: '2026-02-09',
                introText: createRichText('Kebijakan Privasi ini menjelaskan kebijakan dan prosedur Kami mengenai pengumpulan, penggunaan, dan pengungkapan informasi Anda ketika Anda menggunakan Layanan dan memberi tahu Anda tentang hak privasi Anda serta bagaimana hukum melindungi Anda.'),
                highlightText: createRichText('Kami menggunakan Data Pribadi Anda untuk menyediakan dan meningkatkan Layanan. Dengan menggunakan Layanan, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan Kebijakan Privasi ini.'),
                sections: [
                    {
                        title: 'Interpretasi dan Definisi',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Interpretasi')),
                            p(t('Kata-kata yang huruf awalnya dikapitalisasi memiliki arti yang didefinisikan di bawah kondisi berikut. Definisi berikut memiliki arti yang sama terlepas dari apakah kata tersebut muncul dalam bentuk tunggal atau jamak.')),
                            h4(t('Definisi')),
                            p(t('Untuk tujuan Kebijakan Privasi ini:')),
                            ul([
                                [bold('Akun'), t(' berarti akun unik yang dibuat untuk Anda untuk mengakses Layanan kami atau bagian dari Layanan kami.')],
                                [bold('Afiliasi'), t(' berarti entitas yang mengendalikan, dikendalikan oleh, atau berada di bawah kendali bersama dengan suatu pihak, di mana "kendali" berarti kepemilikan 50% atau lebih dari saham.')],
                                [bold('Perusahaan'), t(' (disebut sebagai "Perusahaan", "Kami", atau "Milik Kami" dalam Kebijakan Privasi ini) merujuk pada PT Bangun Laksana Persada, Jl. Pantai Indah Selatan No.9 Blok DC, RT.9/RW.6, Kapuk Muara, Penjaringan, Jakarta Utara 14460.')],
                                [bold('Cookie'), t(' adalah file kecil yang ditempatkan di komputer, perangkat seluler, atau perangkat lainnya oleh situs web.')],
                                [bold('Negara'), t(' merujuk pada: Indonesia')],
                                [bold('Perangkat'), t(' berarti perangkat apa pun yang dapat mengakses Layanan seperti komputer, ponsel, atau tablet digital.')],
                                [bold('Data Pribadi'), t(' adalah informasi apa pun yang berkaitan dengan individu yang teridentifikasi atau dapat diidentifikasi.')],
                                [bold('Layanan'), t(' merujuk pada Situs Web.')],
                                [bold('Penyedia Layanan'), t(' berarti setiap orang atau badan hukum yang memproses data atas nama Perusahaan.')],
                                [bold('Data Penggunaan'), t(' merujuk pada data yang dikumpulkan secara otomatis dari penggunaan Layanan.')],
                                [bold('Situs Web'), t(' merujuk pada Laksana Business Park | Solusi Gudang Strategis, dapat diakses dari https://www.laksanabusinesspark.id')],
                                [bold('Anda'), t(' berarti individu yang mengakses atau menggunakan Layanan.')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Mengumpulkan dan Menggunakan Data Pribadi Anda',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Jenis Data yang Dikumpulkan')),
                            h5(t('Data Pribadi')),
                            p(t('Saat menggunakan Layanan Kami, Kami mungkin meminta Anda untuk memberikan informasi pengenal pribadi tertentu yang dapat digunakan untuk menghubungi atau mengidentifikasi Anda. Informasi pengenal pribadi dapat mencakup, tetapi tidak terbatas pada:')),
                            ul([
                                [t('Alamat email')],
                                [t('Nama depan dan nama belakang')],
                                [t('Nomor telepon')],
                                [t('Alamat, Provinsi, Kode Pos, Kota')],
                            ]),
                            h5(t('Data Penggunaan')),
                            p(t('Data Penggunaan dikumpulkan secara otomatis saat menggunakan Layanan. Data ini dapat mencakup informasi seperti alamat Protokol Internet perangkat Anda, jenis browser, versi browser, halaman Layanan yang Anda kunjungi, waktu dan tanggal kunjungan Anda.')),
                            h5(t('Teknologi Pelacakan dan Cookie')),
                            p(t('Kami menggunakan Cookie dan teknologi pelacakan serupa untuk melacak aktivitas di Layanan Kami dan menyimpan informasi tertentu.')),
                        ]),
                    },
                    {
                        title: 'Penggunaan Data Pribadi Anda',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(bold('Perusahaan dapat menggunakan Data Pribadi untuk tujuan berikut:')),
                            ul([
                                [bold('Untuk menyediakan dan memelihara Layanan kami'), t(', termasuk untuk memantau penggunaan Layanan kami.')],
                                [bold('Untuk mengelola Akun Anda:'), t(' untuk mengelola pendaftaran Anda sebagai pengguna Layanan.')],
                                [bold('Untuk pelaksanaan kontrak:'), t(' pengembangan, kepatuhan, dan pelaksanaan kontrak pembelian produk, barang, atau layanan yang telah Anda beli.')],
                                [bold('Untuk menghubungi Anda:'), t(' melalui email, panggilan telepon, SMS, atau bentuk komunikasi elektronik lainnya.')],
                                [bold('Untuk menyediakan informasi'), t(' tentang berita, penawaran khusus, dan informasi umum tentang barang, layanan, dan acara lainnya.')],
                                [bold('Untuk mengelola permintaan Anda:'), t(' untuk menangani dan mengelola permintaan Anda kepada Kami.')],
                                [bold('Untuk transfer bisnis:'), t(' Kami dapat menggunakan Data Pribadi Anda untuk mengevaluasi atau melakukan merger, divestasi, atau restrukturisasi.')],
                                [bold('Untuk tujuan lain'), t(': Kami dapat menggunakan informasi Anda untuk analisis data, mengidentifikasi tren penggunaan, dan untuk mengevaluasi serta meningkatkan Layanan kami.')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Penyimpanan Data Pribadi Anda',
                        variant: 'highlight-blue',
                        content: createRichTextBlocks([
                            p(t('Perusahaan akan menyimpan Data Pribadi Anda hanya selama diperlukan untuk tujuan yang ditetapkan dalam Kebijakan Privasi ini. Kami akan menyimpan dan menggunakan Data Pribadi Anda sejauh diperlukan untuk mematuhi kewajiban hukum kami.')),
                            p(bold('Kami menerapkan periode penyimpanan yang berbeda untuk kategori Data Pribadi yang berbeda:')),
                            ul([
                                [bold('Akun Pengguna:'), t(' disimpan selama durasi hubungan akun Anda ditambah hingga 24 bulan setelah penutupan akun')],
                                [bold('Tiket Dukungan:'), t(' hingga 24 bulan sejak tanggal penutupan tiket')],
                                [bold('Analitik Situs Web:'), t(' hingga 24 bulan sejak tanggal pengumpulan')],
                                [bold('Log Server:'), t(' hingga 24 bulan untuk pemantauan keamanan')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Transfer Data Pribadi Anda',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Informasi Anda, termasuk Data Pribadi, diproses di kantor operasional Perusahaan dan di tempat lain di mana pihak-pihak yang terlibat dalam pemrosesan berada. Ini berarti informasi ini dapat ditransfer ke komputer yang berlokasi di luar yurisdiksi pemerintah Anda di mana undang-undang perlindungan data mungkin berbeda.')),
                            p(t('Jika diwajibkan oleh hukum yang berlaku, Kami akan memastikan bahwa transfer internasional Data Pribadi Anda tunduk pada perlindungan yang tepat. Perusahaan akan mengambil semua langkah yang wajar untuk memastikan bahwa data Anda diperlakukan dengan aman dan sesuai dengan Kebijakan Privasi ini.')),
                        ]),
                    },
                    {
                        title: 'Menghapus Data Pribadi Anda',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Anda memiliki hak untuk menghapus atau meminta Kami membantu menghapus Data Pribadi yang telah Kami kumpulkan tentang Anda.')),
                            p(t('Layanan Kami mungkin memberi Anda kemampuan untuk menghapus informasi tertentu tentang Anda dari dalam Layanan. Anda dapat memperbarui, mengubah, atau menghapus informasi Anda kapan saja dengan masuk ke Akun Anda.')),
                            p(t('Kami mungkin perlu menyimpan informasi tertentu ketika kami memiliki kewajiban hukum atau dasar hukum untuk melakukannya.')),
                        ]),
                    },
                    {
                        title: 'Pengungkapan Data Pribadi Anda',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Transaksi Bisnis')),
                            p(t('Jika Perusahaan terlibat dalam merger, akuisisi, atau penjualan aset, Data Pribadi Anda dapat ditransfer. Kami akan memberikan pemberitahuan sebelum Data Pribadi Anda ditransfer dan menjadi tunduk pada Kebijakan Privasi yang berbeda.')),
                            h4(t('Penegakan Hukum')),
                            p(t('Dalam keadaan tertentu, Perusahaan mungkin diwajibkan untuk mengungkapkan Data Pribadi Anda jika diwajibkan oleh hukum atau sebagai tanggapan atas permintaan yang sah oleh otoritas publik.')),
                            h4(t('Persyaratan Hukum Lainnya')),
                            p(t('Perusahaan dapat mengungkapkan Data Pribadi Anda dengan keyakinan bahwa tindakan tersebut diperlukan untuk:')),
                            ul([
                                [t('Mematuhi kewajiban hukum')],
                                [t('Melindungi dan membela hak atau properti Perusahaan')],
                                [t('Mencegah atau menyelidiki kemungkinan kesalahan sehubungan dengan Layanan')],
                                [t('Melindungi keselamatan pribadi Pengguna Layanan atau publik')],
                                [t('Melindungi dari tanggung jawab hukum')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Keamanan Data Pribadi Anda',
                        variant: 'highlight-red',
                        content: createRichText('Keamanan Data Pribadi Anda penting bagi Kami, tetapi ingat bahwa tidak ada metode transmisi melalui Internet, atau metode penyimpanan elektronik yang 100% aman. Meskipun Kami berusaha menggunakan cara yang wajar secara komersial untuk melindungi Data Pribadi Anda, Kami tidak dapat menjamin keamanan mutlaknya.'),
                    },
                    {
                        title: 'Privasi Anak',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Layanan Kami tidak ditujukan untuk siapa pun yang berusia di bawah 16 tahun. Kami tidak secara sengaja mengumpulkan informasi pengenal pribadi dari siapa pun yang berusia di bawah 16 tahun. Jika Anda adalah orang tua atau wali dan Anda mengetahui bahwa anak Anda telah memberikan Data Pribadi kepada Kami, harap hubungi Kami.')),
                            p(t('Jika Kami mengetahui bahwa Kami telah mengumpulkan Data Pribadi dari siapa pun yang berusia di bawah 16 tahun tanpa verifikasi persetujuan orang tua, Kami mengambil langkah-langkah untuk menghapus informasi tersebut dari server Kami.')),
                        ]),
                    },
                    {
                        title: 'Tautan ke Situs Web Lain',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Layanan Kami mungkin berisi tautan ke situs web lain yang tidak dioperasikan oleh Kami. Jika Anda mengklik tautan pihak ketiga, Anda akan diarahkan ke situs pihak ketiga tersebut. Kami sangat menyarankan Anda untuk meninjau Kebijakan Privasi setiap situs yang Anda kunjungi.')),
                            p(t('Kami tidak memiliki kendali atas dan tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs atau layanan pihak ketiga mana pun.')),
                        ]),
                    },
                    {
                        title: 'Perubahan pada Kebijakan Privasi Ini',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Kami dapat memperbarui Kebijakan Privasi Kami dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini.')),
                            p(t('Kami akan memberi tahu Anda melalui email dan/atau pemberitahuan yang mencolok di Layanan Kami, sebelum perubahan berlaku dan memperbarui tanggal "Terakhir diperbarui" di bagian atas Kebijakan Privasi ini.')),
                            p(t('Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala untuk setiap perubahan. Perubahan pada Kebijakan Privasi ini berlaku saat diposting di halaman ini.')),
                        ]),
                    },
                    {
                        title: 'Hubungi Kami',
                        variant: 'cta',
                        content: createRichText('Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, Anda dapat menghubungi kami:'),
                    },
                ],
                contactEmail: 'contact@agungintiland.com',
            },
        })
        console.log('Privacy Policy Page seeded successfully')
    } catch (error) {
        console.error('Failed to seed Privacy Policy Page:', error)
    }

    // Privacy Policy Page - English
    try {
        await payload.updateGlobal({
            slug: 'privacy-policy-page',
            locale: 'en',
            data: {
                hero: {
                    title: 'Privacy Policy',
                },
                introText: createRichText('This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.'),
                highlightText: createRichText('We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.'),
                sections: [
                    {
                        title: 'Interpretation and Definitions',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Interpretation')),
                            p(t('The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.')),
                            h4(t('Definitions')),
                            p(t('For the purposes of this Privacy Policy:')),
                            ul([
                                [bold('Account'), t(' means a unique account created for You to access our Service or parts of our Service.')],
                                [bold('Affiliate'), t(' means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares.')],
                                [bold('Company'), t(' (referred to as either "the Company", "We", "Us" or "Our" in this Privacy Policy) refers to PT Bangun Laksana Persada, Jl. Pantai Indah Selatan No.9 Blok DC, RT.9/RW.6, Kapuk Muara, Penjaringan, North Jakarta 14460.')],
                                [bold('Cookies'), t(' are small files that are placed on Your computer, mobile device or any other device by a website.')],
                                [bold('Country'), t(' refers to: Indonesia')],
                                [bold('Device'), t(' means any device that can access the Service such as a computer, a cell phone or a digital tablet.')],
                                [bold('Personal Data'), t(' is any information that relates to an identified or identifiable individual.')],
                                [bold('Service'), t(' refers to the Website.')],
                                [bold('Service Provider'), t(' means any natural or legal person who processes the data on behalf of the Company.')],
                                [bold('Usage Data'), t(' refers to data collected automatically from the use of the Service.')],
                                [bold('Website'), t(' refers to Laksana Business Park | Solusi Gudang Strategis, accessible from https://www.laksanabusinesspark.id')],
                                [bold('You'), t(' means the individual accessing or using the Service.')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Collecting and Using Your Personal Data',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Types of Data Collected')),
                            h5(t('Personal Data')),
                            p(t('While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:')),
                            ul([
                                [t('Email address')],
                                [t('First name and last name')],
                                [t('Phone number')],
                                [t('Address, State, Province, ZIP/Postal code, City')],
                            ]),
                            h5(t('Usage Data')),
                            p(t('Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device\'s Internet Protocol address, browser type, browser version, the pages of our Service that You visit, the time and date of Your visit.')),
                            h5(t('Tracking Technologies and Cookies')),
                            p(t('We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information.')),
                        ]),
                    },
                    {
                        title: 'Use of Your Personal Data',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(bold('The Company may use Personal Data for the following purposes:')),
                            ul([
                                [bold('To provide and maintain our Service'), t(', including to monitor the usage of our Service.')],
                                [bold('To manage Your Account:'), t(' to manage Your registration as a user of the Service.')],
                                [bold('For the performance of a contract:'), t(' the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased.')],
                                [bold('To contact You:'), t(' To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.')],
                                [bold('To provide You'), t(' with news, special offers, and general information about other goods, services and events.')],
                                [bold('To manage Your requests:'), t(' To attend and manage Your requests to Us.')],
                                [bold('For business transfers:'), t(' We may use Your Personal Data to evaluate or conduct a merger, divestiture, or restructuring.')],
                                [bold('For other purposes'), t(': We may use Your information for data analysis, identifying usage trends, and to evaluate and improve our Service.')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Retention of Your Personal Data',
                        variant: 'highlight-blue',
                        content: createRichTextBlocks([
                            p(t('The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations.')),
                            p(bold('We apply different retention periods to different categories of Personal Data:')),
                            ul([
                                [bold('User Accounts:'), t(' retained for the duration of your account relationship plus up to 24 months after account closure')],
                                [bold('Support Tickets:'), t(' up to 24 months from the date of ticket closure')],
                                [bold('Website Analytics:'), t(' up to 24 months from the date of collection')],
                                [bold('Server Logs:'), t(' up to 24 months for security monitoring')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Transfer of Your Personal Data',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Your information, including Personal Data, is processed at the Company\'s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from Your jurisdiction.')),
                            p(t('Where required by applicable law, We will ensure that international transfers of Your Personal Data are subject to appropriate safeguards and supplementary measures where appropriate. The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy.')),
                        ]),
                    },
                    {
                        title: 'Delete Your Personal Data',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.')),
                            p(t('Our Service may give You the ability to delete certain information about You from within the Service. You may update, amend, or delete Your information at any time by signing in to Your Account.')),
                            p(t('We may need to retain certain information when we have a legal obligation or lawful basis to do so.')),
                        ]),
                    },
                    {
                        title: 'Disclosure of Your Personal Data',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Business Transactions')),
                            p(t('If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.')),
                            h4(t('Law Enforcement')),
                            p(t('Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities.')),
                            h4(t('Other Legal Requirements')),
                            p(t('The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:')),
                            ul([
                                [t('Comply with a legal obligation')],
                                [t('Protect and defend the rights or property of the Company')],
                                [t('Prevent or investigate possible wrongdoing in connection with the Service')],
                                [t('Protect the personal safety of Users of the Service or the public')],
                                [t('Protect against legal liability')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Security of Your Personal Data',
                        variant: 'highlight-red',
                        content: createRichText('The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.'),
                    },
                    {
                        title: 'Children\'s Privacy',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Our Service does not address anyone under the age of 16. We do not knowingly collect personally identifiable information from anyone under the age of 16. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.')),
                            p(t('If We become aware that We have collected Personal Data from anyone under the age of 16 without verification of parental consent, We take steps to remove that information from Our servers.')),
                        ]),
                    },
                    {
                        title: 'Links to Other Websites',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party\'s site. We strongly advise You to review the Privacy Policy of every site You visit.')),
                            p(t('We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.')),
                        ]),
                    },
                    {
                        title: 'Changes to this Privacy Policy',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.')),
                            p(t('We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.')),
                            p(t('You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.')),
                        ]),
                    },
                    {
                        title: 'Contact Us',
                        variant: 'cta',
                        content: createRichText('If you have any questions about this Privacy Policy, You can contact us:'),
                    },
                ],
            },
        })
        console.log('Privacy Policy Page (EN) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Privacy Policy Page (EN):', error)
    }

    // Privacy Policy Page - Chinese
    try {
        await payload.updateGlobal({
            slug: 'privacy-policy-page',
            locale: 'zh',
            data: {
                hero: {
                    title: '隐私政策',
                },
                introText: createRichText('本隐私政策描述了我们在您使用服务时收集、使用和披露您的信息的政策和程序，并告知您的隐私权利以及法律如何保护您。'),
                highlightText: createRichText('我们使用您的个人数据来提供和改善服务。使用服务即表示您同意按照本隐私政策收集和使用信息。'),
                sections: [
                    {
                        title: '解释和定义',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('解释')),
                            p(t('首字母大写的词语具有以下条件下定义的含义。无论以单数还是复数形式出现，以下定义都具有相同的含义。')),
                            h4(t('定义')),
                            p(t('就本隐私政策而言：')),
                            ul([
                                [bold('账户'), t(' 指为您创建的用于访问我们服务或部分服务的唯一账户。')],
                                [bold('关联公司'), t(' 指控制一方、被一方控制或与一方处于共同控制之下的实体，其中"控制"指拥有50%或以上的股份。')],
                                [bold('公司'), t(' （在本隐私政策中称为"公司"、"我们"）指PT Bangun Laksana Persada，地址：Jl. Pantai Indah Selatan No.9 Blok DC, RT.9/RW.6, Kapuk Muara, Penjaringan, 北雅加达 14460。')],
                                [bold('Cookie'), t(' 是网站放置在您的计算机、移动设备或任何其他设备上的小文件。')],
                                [bold('国家'), t(' 指：印度尼西亚')],
                                [bold('设备'), t(' 指可以访问服务的任何设备，如计算机、手机或数字平板电脑。')],
                                [bold('个人数据'), t(' 是与已识别或可识别的个人相关的任何信息。')],
                                [bold('服务'), t(' 指网站。')],
                                [bold('服务提供商'), t(' 指代表公司处理数据的任何自然人或法人。')],
                                [bold('使用数据'), t(' 指从使用服务中自动收集的数据。')],
                                [bold('网站'), t(' 指Laksana Business Park | 战略仓储解决方案，可从 https://www.laksanabusinesspark.id 访问')],
                                [bold('您'), t(' 指访问或使用服务的个人。')],
                            ]),
                        ]),
                    },
                    {
                        title: '收集和使用您的个人数据',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('收集的数据类型')),
                            h5(t('个人数据')),
                            p(t('在使用我们的服务时，我们可能会要求您提供某些可用于联系或识别您的个人身份信息。个人身份信息可能包括但不限于：')),
                            ul([
                                [t('电子邮件地址')],
                                [t('姓名')],
                                [t('电话号码')],
                                [t('地址、省份、邮政编码、城市')],
                            ]),
                            h5(t('使用数据')),
                            p(t('使用数据在使用服务时自动收集。使用数据可能包括您设备的互联网协议地址、浏览器类型、浏览器版本、您访问的服务页面、访问时间和日期等信息。')),
                            h5(t('跟踪技术和Cookie')),
                            p(t('我们使用Cookie和类似的跟踪技术来跟踪我们服务上的活动并存储某些信息。')),
                        ]),
                    },
                    {
                        title: '您的个人数据的使用',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(bold('公司可能将个人数据用于以下目的：')),
                            ul([
                                [bold('提供和维护我们的服务'), t('，包括监控我们服务的使用情况。')],
                                [bold('管理您的账户：'), t('管理您作为服务用户的注册。')],
                                [bold('履行合同：'), t('您购买的产品、物品或服务的购买合同的开发、合规和执行。')],
                                [bold('联系您：'), t('通过电子邮件、电话、短信或其他等效的电子通信方式联系您。')],
                                [bold('向您提供'), t('有关其他商品、服务和活动的新闻、特别优惠和一般信息。')],
                                [bold('管理您的请求：'), t('处理和管理您向我们提出的请求。')],
                                [bold('业务转让：'), t('我们可能使用您的个人数据来评估或进行合并、剥离或重组。')],
                                [bold('其他目的'), t('：我们可能使用您的信息进行数据分析、识别使用趋势以及评估和改进我们的服务。')],
                            ]),
                        ]),
                    },
                    {
                        title: '您的个人数据的保留',
                        variant: 'highlight-blue',
                        content: createRichTextBlocks([
                            p(t('公司仅在本隐私政策规定的目的所需的时间内保留您的个人数据。我们将在遵守法律义务所需的范围内保留和使用您的个人数据。')),
                            p(bold('我们对不同类别的个人数据应用不同的保留期限：')),
                            ul([
                                [bold('用户账户：'), t('在您的账户关系持续期间保留，加上账户关闭后最多24个月')],
                                [bold('支持工单：'), t('自工单关闭之日起最多24个月')],
                                [bold('网站分析：'), t('自收集之日起最多24个月')],
                                [bold('服务器日志：'), t('用于安全监控最多24个月')],
                            ]),
                        ]),
                    },
                    {
                        title: '您的个人数据的转移',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('您的信息（包括个人数据）在公司的运营办公室和参与处理的各方所在的任何其他地方进行处理。这意味着此信息可能被传输到位于您所在州、省、国家或其他政府管辖区之外的计算机，这些地方的数据保护法律可能与您所在管辖区的法律不同。')),
                            p(t('在适用法律要求的情况下，我们将确保您的个人数据的国际传输受到适当的保障措施的约束。公司将采取所有合理必要的措施，确保您的数据得到安全处理并符合本隐私政策。')),
                        ]),
                    },
                    {
                        title: '删除您的个人数据',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('您有权删除或要求我们协助删除我们收集的关于您的个人数据。')),
                            p(t('我们的服务可能使您能够从服务中删除有关您的某些信息。您可以随时通过登录您的账户来更新、修改或删除您的信息。')),
                            p(t('当我们有法律义务或合法依据时，我们可能需要保留某些信息。')),
                        ]),
                    },
                    {
                        title: '您的个人数据的披露',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('商业交易')),
                            p(t('如果公司参与合并、收购或资产出售，您的个人数据可能会被转移。我们将在您的个人数据被转移并受不同隐私政策约束之前发出通知。')),
                            h4(t('执法')),
                            p(t('在某些情况下，如果法律要求或应公共当局的有效请求，公司可能需要披露您的个人数据。')),
                            h4(t('其他法律要求')),
                            p(t('公司可能在善意相信此类行动是必要的情况下披露您的个人数据：')),
                            ul([
                                [t('遵守法律义务')],
                                [t('保护和捍卫公司的权利或财产')],
                                [t('防止或调查与服务相关的可能违规行为')],
                                [t('保护服务用户或公众的人身安全')],
                                [t('防止法律责任')],
                            ]),
                        ]),
                    },
                    {
                        title: '您的个人数据的安全',
                        variant: 'highlight-red',
                        content: createRichText('您的个人数据的安全对我们很重要，但请记住，没有任何通过互联网传输的方法或电子存储方法是100%安全的。虽然我们努力使用商业上合理的手段来保护您的个人数据，但我们不能保证其绝对安全。'),
                    },
                    {
                        title: '儿童隐私',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('我们的服务不面向16岁以下的任何人。我们不会故意收集16岁以下任何人的个人身份信息。如果您是父母或监护人，并且您知道您的孩子已向我们提供了个人数据，请联系我们。')),
                            p(t('如果我们意识到我们在未经父母同意验证的情况下收集了16岁以下任何人的个人数据，我们将采取措施从我们的服务器中删除该信息。')),
                        ]),
                    },
                    {
                        title: '其他网站的链接',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('我们的服务可能包含指向非我们运营的其他网站的链接。如果您点击第三方链接，您将被定向到该第三方的网站。我们强烈建议您查看您访问的每个网站的隐私政策。')),
                            p(t('我们无法控制任何第三方网站或服务的内容、隐私政策或做法，也不对此承担任何责任。')),
                        ]),
                    },
                    {
                        title: '本隐私政策的变更',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('我们可能会不时更新我们的隐私政策。我们将通过在此页面上发布新的隐私政策来通知您任何更改。')),
                            p(t('我们将在更改生效之前通过电子邮件和/或在我们的服务上发布显著通知来通知您，并更新本隐私政策顶部的"最后更新"日期。')),
                            p(t('建议您定期查看本隐私政策以了解任何更改。本隐私政策的更改在发布到此页面时生效。')),
                        ]),
                    },
                    {
                        title: '联系我们',
                        variant: 'cta',
                        content: createRichText('如果您对本隐私政策有任何疑问，您可以联系我们：'),
                    },
                ],
            },
        })
        console.log('Privacy Policy Page (ZH) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Privacy Policy Page (ZH):', error)
    }

    // ========================================
    // SEED TERMS & CONDITIONS PAGE GLOBAL
    // ========================================
    console.log('\n--- Seeding Terms & Conditions Page ---')

    try {
        await payload.updateGlobal({
            slug: 'terms-conditions-page',
            data: {
                hero: {
                    backgroundImage: bgProdukId,
                    title: 'Syarat dan Ketentuan',
                },
                lastUpdated: '2026-02-09',
                introText: createRichText('Harap baca syarat dan ketentuan ini dengan cermat sebelum menggunakan Layanan Kami.'),
                sections: [
                    {
                        title: 'Interpretasi dan Definisi',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Interpretasi')),
                            p(t('Kata-kata yang huruf awalnya dikapitalisasi memiliki arti yang didefinisikan di bawah kondisi berikut. Definisi berikut memiliki arti yang sama terlepas dari apakah kata tersebut muncul dalam bentuk tunggal atau jamak.')),
                            h4(t('Definisi')),
                            p(t('Untuk tujuan Syarat dan Ketentuan ini:')),
                            ul([
                                [bold('Afiliasi'), t(' berarti entitas yang mengendalikan, dikendalikan oleh, atau berada di bawah kendali bersama dengan suatu pihak, di mana "kendali" berarti kepemilikan 50% atau lebih dari saham.')],
                                [bold('Negara'), t(' merujuk pada: Indonesia')],
                                [bold('Perusahaan'), t(' (disebut sebagai "Perusahaan", "Kami", atau "Milik Kami") merujuk pada PT Bangun Laksana Persada, Jl. Pantai Indah Selatan No.9 Blok DC, RT.9/RW.6, Kapuk Muara, Penjaringan, Jakarta Utara 14460.')],
                                [bold('Perangkat'), t(' berarti perangkat apa pun yang dapat mengakses Layanan seperti komputer, ponsel, atau tablet digital.')],
                                [bold('Layanan'), t(' merujuk pada Situs Web.')],
                                [bold('Syarat dan Ketentuan'), t(' (juga disebut sebagai "Syarat") berarti Syarat dan Ketentuan ini yang mengatur akses dan penggunaan Layanan oleh Anda.')],
                                [bold('Layanan Media Sosial Pihak Ketiga'), t(' berarti layanan atau konten apa pun yang disediakan oleh pihak ketiga yang ditampilkan atau ditautkan melalui Layanan.')],
                                [bold('Situs Web'), t(' merujuk pada Laksana Business Park | Solusi Gudang Strategis, dapat diakses dari https://www.laksanabusinesspark.id')],
                                [bold('Anda'), t(' berarti individu yang mengakses atau menggunakan Layanan.')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Pengakuan',
                        variant: 'highlight-blue',
                        content: createRichTextBlocks([
                            p(t('Ini adalah Syarat dan Ketentuan yang mengatur penggunaan Layanan ini dan perjanjian antara Anda dan Perusahaan. Syarat dan Ketentuan ini menetapkan hak dan kewajiban semua pengguna terkait penggunaan Layanan.')),
                            p(t('Akses dan penggunaan Layanan oleh Anda dikondisikan pada penerimaan dan kepatuhan Anda terhadap Syarat dan Ketentuan ini. Syarat dan Ketentuan ini berlaku untuk semua pengunjung, pengguna, dan pihak lain yang mengakses atau menggunakan Layanan.')),
                            p(t('Dengan mengakses atau menggunakan Layanan, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari Syarat dan Ketentuan ini, Anda tidak boleh mengakses Layanan.')),
                            p(t('Anda menyatakan bahwa Anda berusia di atas 18 tahun. Perusahaan tidak mengizinkan mereka yang berusia di bawah 18 tahun untuk menggunakan Layanan.')),
                            p(t('Akses dan penggunaan Layanan oleh Anda juga tunduk pada Kebijakan Privasi kami. Harap baca Kebijakan Privasi kami dengan cermat sebelum menggunakan Layanan Kami.')),
                        ]),
                    },
                    {
                        title: 'Tautan ke Situs Web Lain',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Layanan Kami mungkin berisi tautan ke situs web atau layanan pihak ketiga yang tidak dimiliki atau dikendalikan oleh Perusahaan.')),
                            p(t('Perusahaan tidak memiliki kendali atas, dan tidak bertanggung jawab atas, konten, kebijakan privasi, atau praktik situs web atau layanan pihak ketiga mana pun. Anda selanjutnya mengakui dan menyetujui bahwa Perusahaan tidak bertanggung jawab, secara langsung atau tidak langsung, atas kerusakan atau kerugian apa pun.')),
                            p(t('Kami sangat menyarankan Anda untuk membaca syarat dan ketentuan serta kebijakan privasi dari situs web atau layanan pihak ketiga mana pun yang Anda kunjungi.')),
                        ]),
                    },
                    {
                        title: 'Pemutusan',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Kami dapat menghentikan atau menangguhkan akses Anda segera, tanpa pemberitahuan atau tanggung jawab sebelumnya, karena alasan apa pun, termasuk tanpa batasan jika Anda melanggar Syarat dan Ketentuan ini.')),
                            p(t('Setelah pemutusan, hak Anda untuk menggunakan Layanan akan segera berakhir.')),
                        ]),
                    },
                    {
                        title: 'Batasan Tanggung Jawab',
                        variant: 'highlight-red',
                        content: createRichTextBlocks([
                            p(t('Terlepas dari kerugian apa pun yang mungkin Anda alami, seluruh tanggung jawab Perusahaan dan pemasoknya berdasarkan ketentuan apa pun dari Syarat ini dan pemulihan eksklusif Anda terbatas pada jumlah yang benar-benar Anda bayarkan melalui Layanan atau 100 USD jika Anda belum membeli apa pun melalui Layanan.')),
                            p(t('Sejauh diizinkan oleh hukum yang berlaku, dalam keadaan apa pun Perusahaan atau pemasoknya tidak bertanggung jawab atas kerusakan khusus, insidental, tidak langsung, atau konsekuensial apa pun.')),
                            p(t('Beberapa yurisdiksi tidak mengizinkan pengecualian jaminan tersirat atau pembatasan tanggung jawab untuk kerusakan insidental atau konsekuensial, yang berarti beberapa batasan di atas mungkin tidak berlaku.')),
                        ]),
                    },
                    {
                        title: 'Penafian "SEBAGAIMANA ADANYA" dan "SEBAGAIMANA TERSEDIA"',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Layanan ini disediakan kepada Anda "SEBAGAIMANA ADANYA" dan "SEBAGAIMANA TERSEDIA" dengan semua kesalahan dan cacat tanpa jaminan apa pun.')),
                            p(t('Tanpa membatasi hal di atas, baik Perusahaan maupun penyedia Perusahaan tidak membuat pernyataan atau jaminan apa pun, tersurat maupun tersirat.')),
                            p(t('Beberapa yurisdiksi tidak mengizinkan pengecualian jenis jaminan tertentu atau pembatasan hak konsumen, sehingga beberapa atau semua pengecualian dan batasan di atas mungkin tidak berlaku untuk Anda.')),
                        ]),
                    },
                    {
                        title: 'Hukum yang Berlaku',
                        variant: 'default',
                        content: createRichText('Hukum Negara ini, tidak termasuk aturan konflik hukumnya, mengatur Syarat ini dan penggunaan Layanan oleh Anda. Penggunaan Aplikasi oleh Anda juga dapat tunduk pada hukum lokal, negara bagian, nasional, atau internasional lainnya.'),
                    },
                    {
                        title: 'Penyelesaian Sengketa',
                        variant: 'default',
                        content: createRichText('Jika Anda memiliki kekhawatiran atau sengketa tentang Layanan, Anda setuju untuk terlebih dahulu mencoba menyelesaikan sengketa secara informal dengan menghubungi Perusahaan.'),
                    },
                    {
                        title: 'Untuk Pengguna Uni Eropa (UE)',
                        variant: 'default',
                        content: createRichText('Jika Anda adalah konsumen Uni Eropa, Anda akan mendapat manfaat dari ketentuan wajib hukum negara tempat Anda tinggal.'),
                    },
                    {
                        title: 'Kepatuhan Hukum Amerika Serikat',
                        variant: 'default',
                        content: createRichText('Anda menyatakan dan menjamin bahwa (i) Anda tidak berada di negara yang dikenakan embargo oleh pemerintah Amerika Serikat, atau yang telah ditetapkan oleh pemerintah Amerika Serikat sebagai negara "pendukung teroris", dan (ii) Anda tidak terdaftar dalam daftar pihak yang dilarang atau dibatasi oleh pemerintah Amerika Serikat.'),
                    },
                    {
                        title: 'Keterpisahan dan Pengabaian',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Keterpisahan')),
                            p(t('Jika ada ketentuan dari Syarat ini yang dianggap tidak dapat dilaksanakan atau tidak valid, ketentuan tersebut akan diubah dan ditafsirkan untuk mencapai tujuan ketentuan tersebut sejauh mungkin berdasarkan hukum yang berlaku.')),
                            h4(t('Pengabaian')),
                            p(t('Kecuali sebagaimana ditentukan di sini, kegagalan untuk melaksanakan hak atau untuk meminta pelaksanaan kewajiban berdasarkan Syarat ini tidak akan memengaruhi kemampuan suatu pihak untuk melaksanakan hak tersebut kapan saja setelahnya.')),
                        ]),
                    },
                    {
                        title: 'Interpretasi Terjemahan',
                        variant: 'default',
                        content: createRichText('Syarat dan Ketentuan ini mungkin telah diterjemahkan jika Kami telah menyediakannya untuk Anda di Layanan kami. Anda setuju bahwa teks asli bahasa Inggris akan berlaku dalam hal terjadi sengketa.'),
                    },
                    {
                        title: 'Perubahan pada Syarat dan Ketentuan Ini',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Kami berhak, atas kebijakan Kami sendiri, untuk memodifikasi atau mengganti Syarat ini kapan saja. Jika revisi bersifat material, Kami akan berusaha memberikan pemberitahuan setidaknya 30 hari sebelum syarat baru berlaku.')),
                            p(t('Dengan terus mengakses atau menggunakan Layanan Kami setelah revisi tersebut berlaku, Anda setuju untuk terikat oleh syarat yang direvisi. Jika Anda tidak setuju dengan syarat baru, secara keseluruhan atau sebagian, harap berhenti menggunakan Layanan.')),
                        ]),
                    },
                    {
                        title: 'Hubungi Kami',
                        variant: 'cta',
                        content: createRichText('Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, Anda dapat menghubungi kami:'),
                    },
                ],
                contactEmail: 'contact@agungintiland.com',
            },
        })
        console.log('Terms & Conditions Page seeded successfully')
    } catch (error) {
        console.error('Failed to seed Terms & Conditions Page:', error)
    }

    // Terms & Conditions Page - English
    try {
        await payload.updateGlobal({
            slug: 'terms-conditions-page',
            locale: 'en',
            data: {
                hero: {
                    title: 'Terms and Conditions',
                },
                introText: createRichText('Please read these terms and conditions carefully before using Our Service.'),
                sections: [
                    {
                        title: 'Interpretation and Definitions',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Interpretation')),
                            p(t('The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.')),
                            h4(t('Definitions')),
                            p(t('For the purposes of these Terms and Conditions:')),
                            ul([
                                [bold('Affiliate'), t(' means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares.')],
                                [bold('Country'), t(' refers to: Indonesia')],
                                [bold('Company'), t(' (referred to as either "the Company", "We", "Us" or "Our") refers to PT Bangun Laksana Persada, Jl. Pantai Indah Selatan No.9 Blok DC, RT.9/RW.6, Kapuk Muara, Penjaringan, North Jakarta 14460.')],
                                [bold('Device'), t(' means any device that can access the Service such as a computer, a cell phone or a digital tablet.')],
                                [bold('Service'), t(' refers to the Website.')],
                                [bold('Terms and Conditions'), t(' (also referred to as "Terms") means these Terms and Conditions that govern Your access to and use of the Service.')],
                                [bold('Third-Party Social Media Service'), t(' means any services or content provided by a third party that is displayed or linked through the Service.')],
                                [bold('Website'), t(' refers to Laksana Business Park | Solusi Gudang Strategis, accessible from https://www.laksanabusinesspark.id')],
                                [bold('You'), t(' means the individual accessing or using the Service.')],
                            ]),
                        ]),
                    },
                    {
                        title: 'Acknowledgment',
                        variant: 'highlight-blue',
                        content: createRichTextBlocks([
                            p(t('These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.')),
                            p(t('Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.')),
                            p(t('By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.')),
                            p(t('You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.')),
                            p(t('Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. Please read Our Privacy Policy carefully before using Our Service.')),
                        ]),
                    },
                    {
                        title: 'Links to Other Websites',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.')),
                            p(t('The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused.')),
                            p(t('We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.')),
                        ]),
                    },
                    {
                        title: 'Termination',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.')),
                            p(t('Upon termination, Your right to use the Service will cease immediately.')),
                        ]),
                    },
                    {
                        title: 'Limitation of Liability',
                        variant: 'highlight-red',
                        content: createRichTextBlocks([
                            p(t('Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven\'t purchased anything through the Service.')),
                            p(t('To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever.')),
                            p(t('Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply.')),
                        ]),
                    },
                    {
                        title: '"AS IS" and "AS AVAILABLE" Disclaimer',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind.')),
                            p(t('Without limiting the foregoing, neither the Company nor any of the company\'s provider makes any representation or warranty of any kind, express or implied.')),
                            p(t('Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You.')),
                        ]),
                    },
                    {
                        title: 'Governing Law',
                        variant: 'default',
                        content: createRichText('The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.'),
                    },
                    {
                        title: 'Disputes Resolution',
                        variant: 'default',
                        content: createRichText('If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.'),
                    },
                    {
                        title: 'For European Union (EU) Users',
                        variant: 'default',
                        content: createRichText('If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.'),
                    },
                    {
                        title: 'United States Legal Compliance',
                        variant: 'default',
                        content: createRichText('You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.'),
                    },
                    {
                        title: 'Severability and Waiver',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('Severability')),
                            p(t('If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.')),
                            h4(t('Waiver')),
                            p(t('Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party\'s ability to exercise such right or require such performance at any time thereafter.')),
                        ]),
                    },
                    {
                        title: 'Translation Interpretation',
                        variant: 'default',
                        content: createRichText('These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.'),
                    },
                    {
                        title: 'Changes to These Terms and Conditions',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days\' notice prior to any new terms taking effect.')),
                            p(t('By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.')),
                        ]),
                    },
                    {
                        title: 'Contact Us',
                        variant: 'cta',
                        content: createRichText('If you have any questions about these Terms and Conditions, You can contact us:'),
                    },
                ],
            },
        })
        console.log('Terms & Conditions Page (EN) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Terms & Conditions Page (EN):', error)
    }

    // Terms & Conditions Page - Chinese
    try {
        await payload.updateGlobal({
            slug: 'terms-conditions-page',
            locale: 'zh',
            data: {
                hero: {
                    title: '条款和条件',
                },
                introText: createRichText('请在使用我们的服务之前仔细阅读这些条款和条件。'),
                sections: [
                    {
                        title: '解释和定义',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('解释')),
                            p(t('首字母大写的词语具有以下条件下定义的含义。无论以单数还是复数形式出现，以下定义都具有相同的含义。')),
                            h4(t('定义')),
                            p(t('就本条款和条件而言：')),
                            ul([
                                [bold('关联公司'), t(' 指控制一方、被一方控制或与一方处于共同控制之下的实体，其中"控制"指拥有50%或以上的股份。')],
                                [bold('国家'), t(' 指：印度尼西亚')],
                                [bold('公司'), t(' （称为"公司"、"我们"）指PT Bangun Laksana Persada，地址：Jl. Pantai Indah Selatan No.9 Blok DC, RT.9/RW.6, Kapuk Muara, Penjaringan, 北雅加达 14460。')],
                                [bold('设备'), t(' 指可以访问服务的任何设备，如计算机、手机或数字平板电脑。')],
                                [bold('服务'), t(' 指网站。')],
                                [bold('条款和条件'), t(' （也称为"条款"）指管辖您访问和使用服务的本条款和条件。')],
                                [bold('第三方社交媒体服务'), t(' 指由第三方提供的通过服务显示或链接的任何服务或内容。')],
                                [bold('网站'), t(' 指Laksana Business Park | 战略仓储解决方案，可从 https://www.laksanabusinesspark.id 访问')],
                                [bold('您'), t(' 指访问或使用服务的个人。')],
                            ]),
                        ]),
                    },
                    {
                        title: '确认',
                        variant: 'highlight-blue',
                        content: createRichTextBlocks([
                            p(t('这些是管辖本服务使用的条款和条件以及您与公司之间的协议。这些条款和条件规定了所有用户关于使用服务的权利和义务。')),
                            p(t('您对服务的访问和使用以您接受并遵守这些条款和条件为条件。这些条款和条件适用于所有访问或使用服务的访客、用户和其他人。')),
                            p(t('通过访问或使用服务，您同意受这些条款和条件的约束。如果您不同意这些条款和条件的任何部分，则您不得访问服务。')),
                            p(t('您声明您已年满18岁。公司不允许18岁以下的人使用服务。')),
                            p(t('您对服务的访问和使用还受我们隐私政策的约束。请在使用我们的服务之前仔细阅读我们的隐私政策。')),
                        ]),
                    },
                    {
                        title: '其他网站的链接',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('我们的服务可能包含指向非公司拥有或控制的第三方网站或服务的链接。')),
                            p(t('公司无法控制任何第三方网站或服务的内容、隐私政策或做法，也不对此承担任何责任。')),
                            p(t('我们强烈建议您阅读您访问的任何第三方网站或服务的条款和条件及隐私政策。')),
                        ]),
                    },
                    {
                        title: '终止',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('我们可能会立即终止或暂停您的访问，无需事先通知或承担责任，原因包括但不限于您违反这些条款和条件。')),
                            p(t('终止后，您使用服务的权利将立即停止。')),
                        ]),
                    },
                    {
                        title: '责任限制',
                        variant: 'highlight-red',
                        content: createRichTextBlocks([
                            p(t('尽管您可能遭受任何损害，公司及其供应商根据本条款任何规定的全部责任以及您对上述所有情况的唯一补救措施仅限于您通过服务实际支付的金额或100美元（如果您未通过服务购买任何东西）。')),
                            p(t('在适用法律允许的最大范围内，公司或其供应商在任何情况下均不对任何特殊、附带、间接或后果性损害承担责任。')),
                            p(t('某些司法管辖区不允许排除默示保证或限制附带或后果性损害的责任，这意味着上述某些限制可能不适用。')),
                        ]),
                    },
                    {
                        title: '"按原样"和"按可用性"免责声明',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('服务按"原样"和"可用性"提供给您，包含所有故障和缺陷，不提供任何形式的保证。')),
                            p(t('在不限制上述内容的情况下，公司及其任何提供商均不作任何明示或暗示的陈述或保证。')),
                            p(t('某些司法管辖区不允许排除某些类型的保证或限制消费者的适用法定权利，因此上述部分或全部排除和限制可能不适用于您。')),
                        ]),
                    },
                    {
                        title: '适用法律',
                        variant: 'default',
                        content: createRichText('本国法律（不包括其法律冲突规则）管辖本条款和您对服务的使用。您对应用程序的使用也可能受到其他地方、州、国家或国际法律的约束。'),
                    },
                    {
                        title: '争议解决',
                        variant: 'default',
                        content: createRichText('如果您对服务有任何顾虑或争议，您同意首先尝试通过联系公司非正式地解决争议。'),
                    },
                    {
                        title: '欧盟（EU）用户',
                        variant: 'default',
                        content: createRichText('如果您是欧盟消费者，您将受益于您居住国法律的任何强制性规定。'),
                    },
                    {
                        title: '美国法律合规',
                        variant: 'default',
                        content: createRichText('您声明并保证(i)您不位于受美国政府禁运的国家，或被美国政府指定为"支持恐怖主义"的国家，(ii)您未被列入美国政府任何禁止或受限方名单。'),
                    },
                    {
                        title: '可分割性和弃权',
                        variant: 'default',
                        content: createRichTextBlocks([
                            h4(t('可分割性')),
                            p(t('如果本条款的任何规定被认为不可执行或无效，该规定将被更改和解释，以在适用法律下尽可能实现该规定的目标，其余规定将继续完全有效。')),
                            h4(t('弃权')),
                            p(t('除本文规定外，未能行使权利或要求履行本条款规定的义务不影响当事方在此后任何时候行使该权利或要求履行该义务的能力。')),
                        ]),
                    },
                    {
                        title: '翻译解释',
                        variant: 'default',
                        content: createRichText('如果我们已在我们的服务上向您提供这些条款和条件的翻译版本，您同意在发生争议时以英文原文为准。'),
                    },
                    {
                        title: '本条款和条件的变更',
                        variant: 'default',
                        content: createRichTextBlocks([
                            p(t('我们保留自行决定随时修改或替换这些条款的权利。如果修订是实质性的，我们将在新条款生效前至少提前30天合理努力通知。')),
                            p(t('在这些修订生效后继续访问或使用我们的服务，即表示您同意受修订条款的约束。如果您不同意新条款的全部或部分内容，请停止使用服务。')),
                        ]),
                    },
                    {
                        title: '联系我们',
                        variant: 'cta',
                        content: createRichText('如果您对这些条款和条件有任何疑问，您可以联系我们：'),
                    },
                ],
            },
        })
        console.log('Terms & Conditions Page (ZH) seeded successfully')
    } catch (error) {
        console.error('Failed to seed Terms & Conditions Page (ZH):', error)
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

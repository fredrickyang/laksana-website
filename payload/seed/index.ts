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

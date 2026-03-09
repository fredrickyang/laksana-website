/**
 * Seed script to fill empty Payload CMS globals with default Indonesian content.
 * 
 * Usage: npx tsx scripts/seed-cms.ts
 * 
 * This script only fills fields that are currently empty/null.
 * It will NOT overwrite existing data.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

// Helper to create richText field value
function richText(text: string) {
    return {
        root: {
            type: 'root',
            children: [
                {
                    type: 'paragraph',
                    children: [
                        { type: 'text', text, version: 1 },
                    ],
                    version: 1,
                },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
        },
    }
}

const locales = ['id', 'en', 'zh'] as const

// Default data per locale for each global
const settingsData: Record<string, any> = {
    id: {
        siteTitle: 'Laksana Business Park - Solusi Gudang & Properti Strategis',
        topNotification: 'Hubungi kami untuk konsultasi gratis!',
        contactInformation: {
            phoneNumbers: [
                { label: 'Sales', number: '+62 21 5960 8888' },
                { label: 'Marketing', number: '+62 811 1888 999' },
            ],
            email: 'info@laksanabusinesspark.com',
            formNotificationEmail: 'marketing@laksanabusinesspark.com',
            headOfficeAddress: richText('Jl. Raya Serang KM 24, Balaraja, Tangerang, Banten 15610'),
            marketingOfficeAddress: richText('Marketing Gallery Laksana Business Park, Jl. Raya Serang KM 24, Balaraja, Tangerang'),
        },
        navigation: [
            { label: 'Beranda', link: '/' },
            { label: 'Produk', link: '/product' },
            { label: 'Tentang Kami', link: '/our-company' },
            { label: 'Fasilitas', link: '/facilities' },
            { label: 'Artikel', link: '/article' },
        ],
        form: {
            heading: 'Konsultasi Gratis',
            subheading: 'Hubungi kami untuk informasi lebih lanjut tentang produk dan layanan kami.',
            nameLabel: 'Nama Lengkap',
            namePlaceholder: 'Masukkan nama lengkap Anda',
            emailLabel: 'Email',
            emailPlaceholder: 'Masukkan email Anda',
            phoneLabel: 'Nomor Telepon',
            phonePlaceholder: 'Masukkan nomor telepon Anda',
            domicileLabel: 'Domisili',
            domicilePlaceholder: 'Masukkan kota domisili Anda',
            buildingSizeLabel: 'Ukuran Bangunan',
            buildingSizePlaceholder: 'Pilih ukuran bangunan',
            buildingSizeOptions: [
                { label: '< 500 m²', value: 'small' },
                { label: '500 - 1000 m²', value: 'medium' },
                { label: '1000 - 2000 m²', value: 'large' },
                { label: '> 2000 m²', value: 'xlarge' },
            ],
            serviceTypeLabel: 'Tipe Layanan',
            serviceTypePlaceholder: 'Pilih tipe layanan',
            serviceTypeOptions: [
                { label: 'Gudang Siap Pakai', value: 'warehouse' },
                { label: 'Kavling Siap Bangun', value: 'land' },
                { label: 'Gudang 4 in 1', value: '4in1' },
                { label: 'Lainnya', value: 'other' },
            ],
            messageLabel: 'Pesan',
            messagePlaceholder: 'Tulis pesan Anda di sini...',
            submitButton: 'Kirim Pesan',
            submittingButton: 'Mengirim...',
            successMessage: 'Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.',
            errorMessage: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
            networkErrorMessage: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
        },
        footer: {
            companyDescription: 'Laksana Business Park adalah kawasan industri dan komersial terintegrasi yang berlokasi strategis di Tangerang Utara, menawarkan solusi gudang dan properti terbaik untuk bisnis Anda.',
            copyrightText: '© 2026 Laksana Business Park. All rights reserved.',
        },
    },
    en: {
        siteTitle: 'Laksana Business Park - Strategic Warehouse & Property Solutions',
        topNotification: 'Contact us for a free consultation!',
        contactInformation: {
            phoneNumbers: [
                { label: 'Sales', number: '+62 21 5960 8888' },
                { label: 'Marketing', number: '+62 811 1888 999' },
            ],
            email: 'info@laksanabusinesspark.com',
            formNotificationEmail: 'marketing@laksanabusinesspark.com',
            headOfficeAddress: richText('Jl. Raya Serang KM 24, Balaraja, Tangerang, Banten 15610'),
            marketingOfficeAddress: richText('Marketing Gallery Laksana Business Park, Jl. Raya Serang KM 24, Balaraja, Tangerang'),
        },
        navigation: [
            { label: 'Home', link: '/' },
            { label: 'Products', link: '/product' },
            { label: 'About Us', link: '/our-company' },
            { label: 'Facilities', link: '/facilities' },
            { label: 'Articles', link: '/article' },
        ],
        form: {
            heading: 'Free Consultation',
            subheading: 'Contact us for more information about our products and services.',
            nameLabel: 'Full Name',
            namePlaceholder: 'Enter your full name',
            emailLabel: 'Email',
            emailPlaceholder: 'Enter your email',
            phoneLabel: 'Phone Number',
            phonePlaceholder: 'Enter your phone number',
            domicileLabel: 'City',
            domicilePlaceholder: 'Enter your city',
            buildingSizeLabel: 'Building Size',
            buildingSizePlaceholder: 'Select building size',
            buildingSizeOptions: [
                { label: '< 500 m²', value: 'small' },
                { label: '500 - 1000 m²', value: 'medium' },
                { label: '1000 - 2000 m²', value: 'large' },
                { label: '> 2000 m²', value: 'xlarge' },
            ],
            serviceTypeLabel: 'Service Type',
            serviceTypePlaceholder: 'Select service type',
            serviceTypeOptions: [
                { label: 'Ready-to-use Warehouse', value: 'warehouse' },
                { label: 'Ready-to-build Land', value: 'land' },
                { label: '4-in-1 Warehouse', value: '4in1' },
                { label: 'Others', value: 'other' },
            ],
            messageLabel: 'Message',
            messagePlaceholder: 'Write your message here...',
            submitButton: 'Send Message',
            submittingButton: 'Sending...',
            successMessage: 'Your message has been sent successfully! We will contact you soon.',
            errorMessage: 'An error occurred while sending your message. Please try again.',
            networkErrorMessage: 'Unable to connect to the server. Please check your internet connection.',
        },
        footer: {
            companyDescription: 'Laksana Business Park is an integrated industrial and commercial area strategically located in North Tangerang, offering the best warehouse and property solutions for your business.',
            copyrightText: '© 2026 Laksana Business Park. All rights reserved.',
        },
    },
    zh: {
        siteTitle: 'Laksana商业园 - 战略仓库与房产解决方案',
        topNotification: '联系我们获取免费咨询！',
        contactInformation: {
            phoneNumbers: [
                { label: '销售', number: '+62 21 5960 8888' },
                { label: '市场营销', number: '+62 811 1888 999' },
            ],
            email: 'info@laksanabusinesspark.com',
            formNotificationEmail: 'marketing@laksanabusinesspark.com',
            headOfficeAddress: richText('Jl. Raya Serang KM 24, Balaraja, Tangerang, Banten 15610'),
            marketingOfficeAddress: richText('Marketing Gallery Laksana Business Park, Jl. Raya Serang KM 24, Balaraja, Tangerang'),
        },
        navigation: [
            { label: '首页', link: '/' },
            { label: '产品', link: '/product' },
            { label: '关于我们', link: '/our-company' },
            { label: '设施', link: '/facilities' },
            { label: '文章', link: '/article' },
        ],
        form: {
            heading: '免费咨询',
            subheading: '联系我们了解更多关于我们产品和服务的信息。',
            nameLabel: '全名',
            namePlaceholder: '输入您的全名',
            emailLabel: '电子邮箱',
            emailPlaceholder: '输入您的电子邮箱',
            phoneLabel: '电话号码',
            phonePlaceholder: '输入您的电话号码',
            domicileLabel: '所在城市',
            domicilePlaceholder: '输入您所在城市',
            buildingSizeLabel: '建筑面积',
            buildingSizePlaceholder: '选择建筑面积',
            buildingSizeOptions: [
                { label: '< 500 m²', value: 'small' },
                { label: '500 - 1000 m²', value: 'medium' },
                { label: '1000 - 2000 m²', value: 'large' },
                { label: '> 2000 m²', value: 'xlarge' },
            ],
            serviceTypeLabel: '服务类型',
            serviceTypePlaceholder: '选择服务类型',
            serviceTypeOptions: [
                { label: '即用型仓库', value: 'warehouse' },
                { label: '可建设用地', value: 'land' },
                { label: '四合一仓库', value: '4in1' },
                { label: '其他', value: 'other' },
            ],
            messageLabel: '留言',
            messagePlaceholder: '在此输入您的留言...',
            submitButton: '发送消息',
            submittingButton: '发送中...',
            successMessage: '您的消息已发送成功！我们将尽快与您联系。',
            errorMessage: '发送消息时出错，请重试。',
            networkErrorMessage: '无法连接到服务器，请检查您的网络连接。',
        },
        footer: {
            companyDescription: 'Laksana商业园是一个综合性工业和商业区域，战略性地位于北丹格朗，为您的业务提供最佳的仓库和房产解决方案。',
            copyrightText: '© 2026 Laksana商业园。保留所有权利。',
        },
    },
}

const homePageData: Record<string, any> = {
    id: {
        hero: {
            overlayOpacity: 40,
            headline: richText('Kawasan Industri & Komersial Terintegrasi'),
            subheadline: richText('Berlokasi strategis di Tangerang Utara dengan akses langsung ke jalan tol dan bandara internasional, Laksana Business Park menawarkan solusi terbaik untuk bisnis Anda.'),
            primaryCta: 'Hubungi Kami',
            primaryCtaLink: '/id/our-company#contact',
            secondaryCta: 'Lihat Video',
            secondaryCtaLink: '#video',
            secondaryCtaHelperText: richText('Klik untuk lihat'),
        },
        mainFeature: {
            headline: richText('Mengapa Memilih Laksana Business Park?'),
            description: richText('Dengan pengembangan lebih dari 550 hektar, Laksana Business Park dilengkapi infrastruktur modern dan dikelola oleh manajemen estate profesional untuk mendukung pertumbuhan bisnis Anda.'),
            ctaButtonLabel: 'TENTANG PERUSAHAAN',
            ctaButtonLink: '/id/our-company',
            stats: [
                {
                    number: '01',
                    title: richText('Menjaga Kualitas Produk'),
                    subtitle: richText('Standar konstruksi terbaik dengan material berkualitas tinggi'),
                },
                {
                    number: '02',
                    title: richText('Dikembangkan Oleh Manajemen Estate Terbaik'),
                    subtitle: richText('Tim profesional berpengalaman lebih dari 20 tahun'),
                },
                {
                    number: '03',
                    title: richText('Akses Mudah ke Bandara'),
                    subtitle: richText('Tersertifikasi UIKI dengan akses langsung ke bandara internasional'),
                },
            ],
        },
        projectSection: {
            headline: 'Proyek Kami',
            ctaLabel: 'Lihat Semua Proyek',
            ctaLink: '/id/product',
        },
        branding: {
            tag: richText('DIPERCAYA OLEH BERBAGAI PERUSAHAAN'),
            sectionTitle: richText('Partner & Klien Kami'),
            description: richText('Laksana Business Park dipercaya oleh berbagai perusahaan nasional dan multinasional sebagai lokasi strategis untuk operasional bisnis mereka.'),
        },
        ctaSection: {
            cardTitle: richText('Siap Untuk Memulai Bisnis Anda?'),
            cardDescription: richText('Konsultasikan kebutuhan properti industri dan komersial Anda bersama tim ahli kami. Dapatkan penawaran terbaik untuk gudang dan kavling di lokasi strategis.'),
            backgroundStyle: 'Dark Gradient',
            button: 'Konsultasi Sekarang',
            buttonLink: '/id/our-company#contact',
        },
        articleSection: {
            headline: 'Artikel',
            ctaLabel: 'Lihat Semua Artikel',
            ctaLink: '/id/article',
            readMoreLabel: 'Baca Berita',
        },
    },
    en: {
        hero: {
            headline: richText('Integrated Industrial & Commercial Area'),
            subheadline: richText('Strategically located in North Tangerang with direct access to toll roads and international airports, Laksana Business Park offers the best solutions for your business.'),
            primaryCta: 'Contact Us',
            secondaryCta: 'Watch Video',
            secondaryCtaHelperText: richText('Click to watch'),
        },
        mainFeature: {
            headline: richText('Why Choose Laksana Business Park?'),
            description: richText('With over 550 hectares of development, Laksana Business Park is equipped with modern infrastructure and managed by professional estate management to support your business growth.'),
            ctaButtonLabel: 'ABOUT COMPANY',
            stats: [
                {
                    number: '01',
                    title: richText('Maintaining Product Quality'),
                    subtitle: richText('Best construction standards with high-quality materials'),
                },
                {
                    number: '02',
                    title: richText('Developed by Best Estate Management'),
                    subtitle: richText('Professional team with over 20 years of experience'),
                },
                {
                    number: '03',
                    title: richText('Easy Airport Access'),
                    subtitle: richText('UIKI certified with direct access to international airports'),
                },
            ],
        },
        projectSection: {
            headline: 'Our Projects',
            ctaLabel: 'View All Projects',
        },
        branding: {
            tag: richText('TRUSTED BY VARIOUS COMPANIES'),
            sectionTitle: richText('Our Partners & Clients'),
            description: richText('Laksana Business Park is trusted by various national and multinational companies as a strategic location for their business operations.'),
        },
        ctaSection: {
            cardTitle: richText('Ready to Start Your Business?'),
            cardDescription: richText('Consult your industrial and commercial property needs with our expert team. Get the best offers for warehouses and land plots in strategic locations.'),
            button: 'Consult Now',
        },
        articleSection: {
            headline: 'Articles',
            ctaLabel: 'View All Articles',
            readMoreLabel: 'Read More',
        },
    },
    zh: {
        hero: {
            headline: richText('综合工业与商业园区'),
            subheadline: richText('战略性地位于北丹格朗，直接连通收费公路和国际机场，Laksana商业园为您的业务提供最佳解决方案。'),
            primaryCta: '联系我们',
            secondaryCta: '观看视频',
            secondaryCtaHelperText: richText('点击观看'),
        },
        mainFeature: {
            headline: richText('为什么选择Laksana商业园？'),
            description: richText('拥有超过550公顷的开发面积，配备现代化基础设施，由专业物业管理团队管理，支持您的业务增长。'),
            ctaButtonLabel: '关于公司',
            stats: [
                {
                    number: '01',
                    title: richText('保持产品质量'),
                    subtitle: richText('采用高质量材料的最佳建设标准'),
                },
                {
                    number: '02',
                    title: richText('由最佳物业管理团队开发'),
                    subtitle: richText('拥有20多年经验的专业团队'),
                },
                {
                    number: '03',
                    title: richText('便捷的机场通道'),
                    subtitle: richText('UIKI认证，直接连通国际机场'),
                },
            ],
        },
        projectSection: {
            headline: '我们的项目',
            ctaLabel: '查看所有项目',
        },
        branding: {
            tag: richText('受到多家企业的信赖'),
            sectionTitle: richText('我们的合作伙伴与客户'),
            description: richText('Laksana商业园受到多家国内外企业的信赖，成为其业务运营的战略位置。'),
        },
        ctaSection: {
            cardTitle: richText('准备好开始您的业务了吗？'),
            cardDescription: richText('与我们的专家团队咨询您的工业和商业房产需求。获取最佳优惠。'),
            button: '立即咨询',
        },
        articleSection: {
            headline: '文章',
            ctaLabel: '查看所有文章',
            readMoreLabel: '阅读更多',
        },
    },
}

const aboutPageData: Record<string, any> = {
    id: {
        hero: { title: 'Tentang Kami' },
        history: {
            headline: 'Sejarah Kami',
            content: richText('Laksana Business Park didirikan dengan visi untuk menyediakan kawasan industri dan komersial terintegrasi yang berkualitas tinggi di Indonesia. Sejak awal berdiri, kami terus berkembang dan berinovasi untuk memberikan solusi terbaik bagi para pelaku bisnis.'),
        },
        leadership: {
            headline: 'Tim Manajemen',
            description: 'Dipimpin oleh profesional berpengalaman yang berdedikasi untuk memberikan layanan terbaik.',
        },
        timelineHeading: 'Perjalanan Kami',
        timelineSubheading: 'Tonggak sejarah penting dalam perjalanan Laksana Business Park',
        timeline: [
            { year: '2010', title: 'Pendirian', description: 'Laksana Business Park resmi didirikan di Tangerang Utara.' },
            { year: '2015', title: 'Pengembangan Tahap 1', description: 'Memulai pembangunan gudang siap pakai Blok B, C, dan L.' },
            { year: '2020', title: 'Pengembangan Tahap 2', description: 'Meluncurkan kavling siap bangun dan cluster perumahan.' },
            { year: '2023', title: 'Luxima Bizhub', description: 'Memperkenalkan konsep gudang 4 in 1 pertama di Indonesia.' },
        ],
    },
    en: {
        hero: { title: 'About Us' },
        history: {
            headline: 'Our History',
            content: richText('Laksana Business Park was founded with a vision to provide a high-quality integrated industrial and commercial area in Indonesia. Since its inception, we have continued to grow and innovate to deliver the best solutions for business operators.'),
        },
        leadership: {
            headline: 'Management Team',
            description: 'Led by experienced professionals dedicated to providing the best service.',
        },
        timelineHeading: 'Our Journey',
        timelineSubheading: 'Important milestones in the journey of Laksana Business Park',
        timeline: [
            { year: '2010', title: 'Establishment', description: 'Laksana Business Park was officially established in North Tangerang.' },
            { year: '2015', title: 'Phase 1 Development', description: 'Started construction of ready-to-use warehouses Block B, C, and L.' },
            { year: '2020', title: 'Phase 2 Development', description: 'Launched ready-to-build land plots and residential clusters.' },
            { year: '2023', title: 'Luxima Bizhub', description: 'Introduced the first 4-in-1 warehouse concept in Indonesia.' },
        ],
    },
    zh: {
        hero: { title: '关于我们' },
        history: {
            headline: '我们的历史',
            content: richText('Laksana商业园的成立旨在为印尼提供高质量的综合工业和商业区域。自创立以来，我们不断发展和创新，为企业经营者提供最佳解决方案。'),
        },
        leadership: {
            headline: '管理团队',
            description: '由经验丰富的专业人士领导，致力于提供最佳服务。',
        },
        timelineHeading: '我们的历程',
        timelineSubheading: 'Laksana商业园历程中的重要里程碑',
        timeline: [
            { year: '2010', title: '成立', description: 'Laksana商业园在北丹格朗正式成立。' },
            { year: '2015', title: '第一期开发', description: '开始建设B、C、L区即用型仓库。' },
            { year: '2020', title: '第二期开发', description: '推出可建设用地和住宅集群。' },
            { year: '2023', title: 'Luxima商务中心', description: '推出印尼首个四合一仓库概念。' },
        ],
    },
}

const facilitiesPageData: Record<string, any> = {
    id: {
        hero: { title: 'Fasilitas' },
        values: {
            headline: 'Keunggulan Kami',
            description: richText('Laksana Business Park menyediakan infrastruktur dan fasilitas berkelas untuk mendukung kelancaran operasional bisnis Anda.'),
            valueCards: [
                { title: 'Keamanan 24/7', description: 'Sistem keamanan terintegrasi dengan CCTV dan petugas keamanan profesional sepanjang waktu.' },
                { title: 'Infrastruktur Modern', description: 'Jalan aspal berkualitas tinggi, drainase baik, dan sistem penerangan LED.' },
                { title: 'Akses Strategis', description: 'Akses langsung ke Jalan Tol Jakarta-Merak dan dekat dengan Bandara Soekarno-Hatta.' },
            ],
        },
        mainServices: {
            headline: 'Layanan Utama',
            description: 'Layanan lengkap untuk mendukung kebutuhan bisnis Anda di kawasan industri kami.',
            services: [
                {
                    title: 'Manajemen Estate',
                    subtitle: 'Pengelolaan kawasan profesional',
                    featuresList: [
                        { feature: 'Perawatan infrastruktur' },
                        { feature: 'Pengelolaan limbah' },
                        { feature: 'Layanan kebersihan kawasan' },
                    ],
                },
                {
                    title: 'Fasilitas Pendukung',
                    subtitle: 'Kemudahan untuk penghuni',
                    featuresList: [
                        { feature: 'ATM Center' },
                        { feature: 'Minimarket' },
                        { feature: 'Kantin & Food Court' },
                    ],
                },
            ],
        },
    },
    en: {
        hero: { title: 'Facilities' },
        values: {
            headline: 'Our Advantages',
            description: richText('Laksana Business Park provides world-class infrastructure and facilities to support smooth business operations.'),
            valueCards: [
                { title: '24/7 Security', description: 'Integrated security system with CCTV and professional security guards around the clock.' },
                { title: 'Modern Infrastructure', description: 'High-quality asphalt roads, proper drainage, and LED lighting system.' },
                { title: 'Strategic Access', description: 'Direct access to Jakarta-Merak toll road and close to Soekarno-Hatta International Airport.' },
            ],
        },
        mainServices: {
            headline: 'Main Services',
            description: 'Complete services to support your business needs in our industrial area.',
            services: [
                {
                    title: 'Estate Management',
                    subtitle: 'Professional area management',
                    featuresList: [
                        { feature: 'Infrastructure maintenance' },
                        { feature: 'Waste management' },
                        { feature: 'Area cleaning services' },
                    ],
                },
                {
                    title: 'Supporting Facilities',
                    subtitle: 'Convenience for tenants',
                    featuresList: [
                        { feature: 'ATM Center' },
                        { feature: 'Minimarket' },
                        { feature: 'Canteen & Food Court' },
                    ],
                },
            ],
        },
    },
    zh: {
        hero: { title: '设施' },
        values: {
            headline: '我们的优势',
            description: richText('Laksana商业园提供世界级的基础设施和设施，支持顺畅的业务运营。'),
            valueCards: [
                { title: '全天候安保', description: '集成安保系统，配备全天候CCTV监控和专业安保人员。' },
                { title: '现代化基础设施', description: '高质量沥青道路、良好的排水系统和LED照明。' },
                { title: '战略位置', description: '直接连通雅加达-万丹收费公路，靠近苏加诺-哈达国际机场。' },
            ],
        },
        mainServices: {
            headline: '主要服务',
            description: '完善的服务支持您在我们工业区的业务需求。',
            services: [
                {
                    title: '物业管理',
                    subtitle: '专业区域管理',
                    featuresList: [
                        { feature: '基础设施维护' },
                        { feature: '废物管理' },
                        { feature: '区域清洁服务' },
                    ],
                },
                {
                    title: '配套设施',
                    subtitle: '租户便利服务',
                    featuresList: [
                        { feature: 'ATM中心' },
                        { feature: '便利店' },
                        { feature: '食堂和美食广场' },
                    ],
                },
            ],
        },
    },
}

const articlePageData: Record<string, any> = {
    id: {
        heroTitle: 'Artikel & Berita',
        allArticlesHeading: 'Semua Artikel',
        categoryLabel: 'Kategori',
        allCategoryOption: 'Semua',
        readMoreButton: 'Baca Selengkapnya',
        previousButton: 'Sebelumnya',
        nextButton: 'Selanjutnya',
        relatedArticlesHeading: 'Artikel Terkait',
        backToArticlesText: 'Kembali ke Artikel',
    },
    en: {
        heroTitle: 'Articles & News',
        allArticlesHeading: 'All Articles',
        categoryLabel: 'Category',
        allCategoryOption: 'All',
        readMoreButton: 'Read More',
        previousButton: 'Previous',
        nextButton: 'Next',
        relatedArticlesHeading: 'Related Articles',
        backToArticlesText: 'Back to Articles',
    },
    zh: {
        heroTitle: '文章与新闻',
        allArticlesHeading: '所有文章',
        categoryLabel: '分类',
        allCategoryOption: '全部',
        readMoreButton: '阅读更多',
        previousButton: '上一页',
        nextButton: '下一页',
        relatedArticlesHeading: '相关文章',
        backToArticlesText: '返回文章列表',
    },
}

const privacyPolicyData: Record<string, any> = {
    id: {
        hero: { title: 'Kebijakan Privasi' },
        lastUpdated: '2026-01-01',
        introText: richText('Laksana Business Park berkomitmen untuk melindungi privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.'),
        contactEmail: 'privacy@laksanabusinesspark.com',
    },
    en: {
        hero: { title: 'Privacy Policy' },
        introText: richText('Laksana Business Park is committed to protecting your privacy. This privacy policy explains how we collect, use, and protect your personal information.'),
    },
    zh: {
        hero: { title: '隐私政策' },
        introText: richText('Laksana商业园致力于保护您的隐私。本隐私政策说明了我们如何收集、使用和保护您的个人信息。'),
    },
}

const termsConditionsData: Record<string, any> = {
    id: {
        hero: { title: 'Syarat & Ketentuan' },
        lastUpdated: '2026-01-01',
        introText: richText('Berikut adalah syarat dan ketentuan yang berlaku untuk penggunaan layanan dan fasilitas Laksana Business Park.'),
        contactEmail: 'legal@laksanabusinesspark.com',
    },
    en: {
        hero: { title: 'Terms & Conditions' },
        introText: richText('The following are the terms and conditions that apply to the use of services and facilities at Laksana Business Park.'),
    },
    zh: {
        hero: { title: '条款与条件' },
        introText: richText('以下是使用Laksana商业园服务和设施的条款与条件。'),
    },
}

// Global slug -> data mapping
const globalSeeds: Record<string, Record<string, any>> = {
    'settings': settingsData,
    'home-page': homePageData,
    'about-page': aboutPageData,
    'facilities-page': facilitiesPageData,
    'article-page': articlePageData,
    'privacy-policy-page': privacyPolicyData,
    'terms-conditions-page': termsConditionsData,
}

async function seed() {
    console.log('🌱 Starting CMS seed...\n')

    const payload = await getPayload({ config })

    for (const [slug, localeData] of Object.entries(globalSeeds)) {
        for (const locale of locales) {
            const data = localeData[locale]
            if (!data) {
                console.log(`⏭️  Skipping ${slug} [${locale}] — no seed data defined`)
                continue
            }

            try {
                console.log(`📝 Updating ${slug} [${locale}]...`)
                await payload.updateGlobal({
                    slug: slug as any,
                    locale,
                    data,
                })
                console.log(`✅ ${slug} [${locale}] updated successfully`)
            } catch (error: any) {
                console.error(`❌ Failed to update ${slug} [${locale}]:`, error.message)
            }
        }
        console.log('')
    }

    console.log('🎉 CMS seed complete!')
    process.exit(0)
}

seed().catch((err) => {
    console.error('Fatal error during seed:', err)
    process.exit(1)
})

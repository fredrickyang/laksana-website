import { getFacilitiesPage, getSettings } from '@/lib/payload'
import FacilitiesClient from './FacilitiesClient'
import { locales, type Locale } from '@/i18n.config'
import type { Metadata } from 'next'

interface FacilitiesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: FacilitiesPageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  
  const titles: Record<string, string> = {
    id: "Fasilitas & Layanan - Laksana Business Park",
    en: "Facilities & Services - Laksana Business Park",
    zh: "设施与服务 - Laksana Business Park"
  }
  
  const descriptions: Record<string, string> = {
    id: "Jelajahi fasilitas unggulan di Laksana Business Park, termasuk keamanan 24 jam, akses jalan luas, dan dukungan izin industri.",
    en: "Explore premium facilities at Laksana Business Park, including 24-hour security, wide road access, and industrial permit support.",
    zh: "探索 Laksana Business Park 的优质设施，包括 24 小时安保、宽敞的道路通路和工业许可证支持。"
  }

  return {
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    alternates: {
      canonical: `${baseUrl}/${locale}/facilities`,
      languages: {
        id: `${baseUrl}/id/facilities`,
        en: `${baseUrl}/en/facilities`,
        zh: `${baseUrl}/zh/facilities`,
      },
    },
  }
}

export default async function Facilities({ params }: FacilitiesPageProps) {
  const { locale } = await params

  const [facilitiesPage, settings] = await Promise.all([
    getFacilitiesPage(locale as Locale),
    getSettings(locale as Locale),
  ])

  return <FacilitiesClient facilitiesPage={facilitiesPage} settings={settings} />
}

// Generate static paths for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

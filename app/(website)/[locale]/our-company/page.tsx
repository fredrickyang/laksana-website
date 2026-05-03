import { getAboutPage, getSettings } from '@/lib/payload'
import OurCompanyClient from './OurCompanyClient'
import { locales, type Locale } from '@/i18n.config'
import type { Metadata } from 'next'
export const revalidate = 3600; // Cache for 1 hour, cleared via Payload webhook
interface OurCompanyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: OurCompanyPageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  
  const titles: Record<string, string> = {
    id: "Tentang Kami - Laksana Business Park",
    en: "About Us - Laksana Business Park",
    zh: "关于我们 - Laksana Business Park"
  }
  
  const descriptions: Record<string, string> = {
    id: "Pelajari visi, misi, dan komitmen Laksana Business Park dalam menghadirkan solusi properti industri terbaik di Indonesia.",
    en: "Learn about the vision, mission, and commitment of Laksana Business Park in providing the best industrial property solutions in Indonesia.",
    zh: "了解 Laksana Business Park 在提供印度尼西亚最佳工业物业解决方案方面的愿景、使命和承诺。"
  }

  return {
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    alternates: {
      canonical: `${baseUrl}/${locale}/our-company`,
      languages: {
        id: `${baseUrl}/id/our-company`,
        en: `${baseUrl}/en/our-company`,
        zh: `${baseUrl}/zh/our-company`,
      },
    },
  }
}

export default async function OurCompany({ params }: OurCompanyPageProps) {
  const { locale } = await params

  const [aboutPage, settings] = await Promise.all([
    getAboutPage(locale as Locale),
    getSettings(locale as Locale),
  ])

  return <OurCompanyClient aboutPage={aboutPage} settings={settings} />
}

// Generate static paths for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

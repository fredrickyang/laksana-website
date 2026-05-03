import { getSettings, getTermsConditionsPage } from '@/lib/payload'
import TncClient from './TncClient'
import { locales, type Locale } from '@/i18n.config'
import type { Metadata } from 'next'

interface TncPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: TncPageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  
  const titles: Record<string, string> = {
    id: "Syarat & Ketentuan - Laksana Business Park",
    en: "Terms & Conditions - Laksana Business Park",
    zh: "条款与条件 - Laksana Business Park"
  }
  
  const descriptions: Record<string, string> = {
    id: "Syarat dan ketentuan penggunaan layanan dan fasilitas di kawasan Laksana Business Park.",
    en: "Terms and conditions for using services and facilities in the Laksana Business Park area.",
    zh: "使用 Laksana Business Park 区域服务和设施的条款和条件。"
  }

  return {
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    alternates: {
      canonical: `${baseUrl}/${locale}/tnc`,
      languages: {
        id: `${baseUrl}/id/tnc`,
        en: `${baseUrl}/en/tnc`,
        zh: `${baseUrl}/zh/tnc`,
      },
    },
  }
}

export default async function Tnc({ params }: TncPageProps) {
  const { locale } = await params

  const [termsPage, settings] = await Promise.all([
    getTermsConditionsPage(locale as Locale),
    getSettings(locale as Locale),
  ])

  return <TncClient termsPage={termsPage} settings={settings} />
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

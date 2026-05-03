import { getSettings, getPrivacyPolicyPage } from '@/lib/payload'
import PrivacyPolicyClient from './PrivacyPolicyClient'
import { locales, type Locale } from '@/i18n.config'
import type { Metadata } from 'next'

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  
  const titles: Record<string, string> = {
    id: "Kebijakan Privasi - Laksana Business Park",
    en: "Privacy Policy - Laksana Business Park",
    zh: "隐私政策 - Laksana Business Park"
  }
  
  const descriptions: Record<string, string> = {
    id: "Kebijakan privasi Laksana Business Park menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.",
    en: "The Laksana Business Park privacy policy explains how we collect, use, and protect your information.",
    zh: "Laksana Business Park 隐私政策说明了我们如何收集、使用和保护您的信息。"
  }

  return {
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy-policy`,
      languages: {
        id: `${baseUrl}/id/privacy-policy`,
        en: `${baseUrl}/en/privacy-policy`,
        zh: `${baseUrl}/zh/privacy-policy`,
      },
    },
  }
}

export default async function PrivacyPolicy({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params

  const [privacyPage, settings] = await Promise.all([
    getPrivacyPolicyPage(locale as Locale),
    getSettings(locale as Locale),
  ])

  return <PrivacyPolicyClient privacyPage={privacyPage} settings={settings} />
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

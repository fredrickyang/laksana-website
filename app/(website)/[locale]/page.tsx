import { getHomePage, getProducts, getArticles, getSettings } from '@/lib/payload'
import HomePageClient from './HomePageClient'
import { locales, type Locale } from '@/i18n.config'
import type { Metadata } from 'next'

export const revalidate = 3600; // Cache for 1 hour

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  
  const titles: Record<string, string> = {
    id: "Laksana Business Park - Solusi Gudang & Properti Strategis",
    en: "Laksana Business Park - Strategic Warehouse & Property Solutions",
    zh: "Laksana Business Park - 战略性仓库和物业解决方案"
  }
  
  const descriptions: Record<string, string> = {
    id: "Kawasan industri dan komersial terintegrasi di Tangerang Utara dengan fasilitas lengkap dan akses strategis.",
    en: "Integrated industrial and commercial area in North Tangerang with complete facilities and strategic access.",
    zh: "位于北唐格朗的综合工业和商业区，设施齐全，交通便利。"
  }

  const title = titles[locale] || titles.id
  const description = descriptions[locale] || descriptions.id

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        id: `${baseUrl}/id`,
        en: `${baseUrl}/en`,
        zh: `${baseUrl}/zh`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Laksana Business Park',
      images: [
        {
          url: `${baseUrl}/images/hero-bg.png`, // Assuming this exists or using a sensible default
        }
      ],
      type: 'website',
    },
  }
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params

  // Fetch data from Payload CMS with locale
  const [homePage, products, articles, settings] = await Promise.all([
    getHomePage(locale as Locale),
    getProducts(locale as Locale, 10, true),
    getArticles(locale as Locale, 3),
    getSettings(locale as Locale),
  ])

  return (
    <HomePageClient
      homePage={homePage}
      products={products}
      articles={articles}
      settings={settings}
      locale={locale}
    />
  )
}

// Generate static paths for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

import { getHomePage, getProducts, getArticles, getSettings, getMediaUrl } from '@/lib/payload'
import HomePageClient from './HomePageClient'
import { locales, type Locale } from '@/i18n.config'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params

  // Fetch data from Payload CMS with locale
  const [homePage, products, articles, settings] = await Promise.all([
    getHomePage(locale as Locale),
    getProducts(locale as Locale, 10),
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

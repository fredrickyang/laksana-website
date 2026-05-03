import { getArticles, getSettings, getArticlePage, getCategories } from '@/lib/payload'
import ArticleClient from './ArticleClient'
import { locales, type Locale } from '@/i18n.config'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  
  const titles: Record<string, string> = {
    id: "Berita & Artikel - Laksana Business Park",
    en: "News & Articles - Laksana Business Park",
    zh: "新闻与文章 - Laksana Business Park"
  }
  
  const descriptions: Record<string, string> = {
    id: "Dapatkan informasi terbaru, tips industri, dan update perkembangan kawasan Laksana Business Park.",
    en: "Get the latest information, industry tips, and development updates of Laksana Business Park.",
    zh: "获取有关 Laksana Business Park 的最新信息、行业提示和发展更新。"
  }

  return {
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    alternates: {
      canonical: `${baseUrl}/${locale}/article`,
      languages: {
        id: `${baseUrl}/id/article`,
        en: `${baseUrl}/en/article`,
        zh: `${baseUrl}/zh/article`,
      },
    },
  }
}

export default async function Article({ params }: ArticlePageProps) {
  const { locale } = await params

  const [articles, settings, articlePage, categories] = await Promise.all([
    getArticles(locale as Locale),
    getSettings(locale as Locale),
    getArticlePage(locale as Locale),
    getCategories(locale as Locale),
  ])

  return <ArticleClient articles={articles} settings={settings} articlePage={articlePage} categories={categories} />
}

// Generate static paths for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

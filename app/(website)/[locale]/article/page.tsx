import { getArticles, getSettings, getArticlePage, getCategories } from '@/lib/payload'
import ArticleClient from './ArticleClient'
import { locales, type Locale } from '@/i18n.config'

interface ArticlePageProps {
  params: Promise<{ locale: string }>
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

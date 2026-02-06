import { getArticles, getSettings, getMediaUrl } from '@/lib/payload'
import ArticleClient from './ArticleClient'

export default async function Article() {
  const [articles, settings] = await Promise.all([
    getArticles('id'),
    getSettings('id'),
  ])

  return <ArticleClient articles={articles} settings={settings} />
}

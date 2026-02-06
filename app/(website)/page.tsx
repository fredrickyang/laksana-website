import { getHomePage, getProducts, getArticles, getSettings, getMediaUrl } from '@/lib/payload'
import HomePageClient from './HomePageClient'

export default async function Home() {
  // Fetch data from Payload CMS
  const [homePage, products, articles, settings] = await Promise.all([
    getHomePage('id'),
    getProducts('id', 10),
    getArticles('id', 3),
    getSettings('id'),
  ])

  return (
    <HomePageClient
      homePage={homePage}
      products={products}
      articles={articles}
      settings={settings}
    />
  )
}

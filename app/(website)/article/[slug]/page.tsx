import { getArticleBySlug, getArticles, getSettings, getMediaUrl } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Footer from '../../components/Footer'

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params
  const [article, settings] = await Promise.all([
    getArticleBySlug(slug, 'id'),
    getSettings('id'),
  ])

  if (!article) {
    notFound()
  }

  // Extract content from richText
  const contentElements = article.content?.root?.children || []

  // Format publication date
  const publicationDate = article.publicationDate
    ? new Date(article.publicationDate).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  // Get author names
  const authors = article.authors?.map((author: any) =>
    typeof author === 'string' ? author : author.email
  ).join(', ')

  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-25vh flex flex-col justify-center px-6 overflow-hidden">
        <title>{article.title} - Laksana Business Park</title>
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover"
            src={getMediaUrl(article.thumbnail) || "/images/bg-produk.png"}
            alt={article.title}
            width={1400}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-20 md:pt-15 lg:pt-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div className="lg:flex-1 fade-in-up mb-[10%] mt-[10%] justify-center text-center">
              <span className="inline-block bg-white/90 text-black/70 text-xs font-medium px-4 py-1 rounded-full uppercase tracking-wide mb-4">
                {(typeof article.category === 'object' ? article.category?.name : article.category) || "ARTICLE"}
              </span>
              <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 leading-tight brand-font max-w-4xl mx-auto">
                {article.title}
              </h1>
              {publicationDate && (
                <p className="text-white/80 text-sm">
                  {publicationDate}
                  {authors && ` • ${authors}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Render excerpt as intro */}
          {article.excerpt && (
            <p className="text-xl text-neutral-600 leading-relaxed mb-8 font-light">
              {article.excerpt}
            </p>
          )}

          {/* Render richText content */}
          {contentElements.map((element: any, index: number) => {
            if (element.type === 'paragraph') {
              const text = element.children?.map((child: any) => {
                if (child.bold) return `<strong>${child.text}</strong>`
                if (child.italic) return `<em>${child.text}</em>`
                return child.text
              }).join('')

              return text ? (
                <p
                  key={index}
                  className="text-neutral-700 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ) : null
            }

            if (element.type === 'heading') {
              const text = element.children?.map((child: any) => child.text).join('')
              // Extract heading level, default to h2 for SEO (h1 is page title)
              const level = element.tag?.replace('h', '') || '2'
              const safeLevel = ['2', '3', '4', '5', '6'].includes(level) ? level : '2'

              return (
                <h2
                  key={index}
                  className={`font-semibold text-neutral-900 mt-8 mb-4 ${
                    safeLevel === '2' ? 'text-2xl' :
                    safeLevel === '3' ? 'text-xl' :
                    safeLevel === '4' ? 'text-lg' : 'text-base'
                  }`}
                >
                  {text}
                </h2>
              )
            }

            if (element.type === 'list') {
              const ListTag = element.listType === 'number' ? 'ol' : 'ul'
              return (
                <ListTag key={index} className="list-disc pl-6 mb-6 space-y-2">
                  {element.children?.map((item: any, itemIndex: number) => (
                    <li key={itemIndex} className="text-neutral-700">
                      {item.children?.map((child: any) => child.text).join('')}
                    </li>
                  ))}
                </ListTag>
              )
            }

            if (element.type === 'quote') {
              const text = element.children?.map((child: any) =>
                child.children?.map((c: any) => c.text).join('')
              ).join('')
              return (
                <blockquote key={index} className="border-l-4 border-[#1d2088] pl-6 py-2 my-8 italic text-neutral-600">
                  {text}
                </blockquote>
              )
            }

            return null
          })}

          {/* Fallback if no content */}
          {contentElements.length === 0 && article.excerpt && (
            <div className="text-neutral-700 leading-relaxed">
              <p>{article.excerpt}</p>
            </div>
          )}
        </div>

        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="mt-16 pt-8 border-t border-neutral-200">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Artikel Terkait</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.relatedArticles.map((related: any) => (
                <a
                  key={related.id}
                  href={`/article/${related.slug}`}
                  className="group flex gap-4 p-4 border border-neutral-200 hover:border-[#1d2088] transition-colors"
                >
                  <img
                    src={getMediaUrl(related.thumbnail) || "/images/card-blog/tahap3.png"}
                    alt={related.title}
                    className="w-24 h-24 object-cover shrink-0"
                  />
                  <div>
                    <span className="text-xs text-neutral-500 uppercase tracking-wide">
                      {related.category}
                    </span>
                    <h4 className="text-lg font-medium text-neutral-900 group-hover:text-[#1d2088] transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Back to Articles */}
        <div className="mt-12">
          <a
            href="/article"
            className="inline-flex items-center gap-2 text-[#1d2088] hover:underline font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Kembali ke Semua Artikel
          </a>
        </div>
      </div>

      <Footer settings={settings} />
    </>
  )
}

// Generate static paths for all articles
export async function generateStaticParams() {
  const articles = await getArticles('id')
  return articles.map((article: any) => ({
    slug: article.slug,
  }))
}

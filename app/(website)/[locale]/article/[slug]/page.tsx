import { getArticleBySlug, getArticles, getSettings, getArticlePage, getMediaUrl } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Footer from '../../../components/Footer'
import { locales, type Locale } from '@/i18n.config'

interface ArticleDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { locale, slug } = await params
  const [article, settings, articlePage] = await Promise.all([
    getArticleBySlug(slug, locale as Locale),
    getSettings(locale as Locale),
    getArticlePage(locale as Locale),
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

  // Helper to render Lexical children to HTML string
  function renderChildren(children: any[]): string {
    if (!children) return ''
    return children.map((child: any) => {
      if (child.type === 'text') {
        let text = child.text || ''
        if (child.format & 1) text = `<strong>${text}</strong>` // Bold
        if (child.format & 2) text = `<em>${text}</em>` // Italic
        if (child.format & 8) text = `<u>${text}</u>` // Underline
        if (child.format & 4) text = `<s>${text}</s>` // Strikethrough
        if (child.format & 16) text = `<code>${text}</code>` // Code
        return text
      }
      if (child.type === 'link') {
        return `<a href="${child.fields?.url || '#'}" ${child.fields?.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''} class="text-[#1d2088] hover:underline">${renderChildren(child.children)}</a>`
      }
      return ''
    }).join('')
  }

  return (
    <>
      <header>
        <title>{`${article.title} - Laksana Business Park`}</title>
      </header>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-25vh flex flex-col justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover"
            src={getMediaUrl(article.thumbnail) || "/images/bg-produk.png"}
            alt={article.title}
            fill
            priority
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
                <div className="flex justify-center">
                  <p className="text-white/90 text-sm bg-black/40 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border border-white/20">
                    <span className="opacity-80">{publicationDate}</span>
                    {authors && (
                      <>
                        <span className="mx-2 opacity-30">|</span>
                        <span className="font-medium">{authors}</span>
                      </>
                    )}
                  </p>
                </div>
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
            <div className="mb-12">
              <p className="text-xl text-neutral-600 leading-relaxed font-light italic border-l-4 border-[#1d2088] pl-6 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center flex-wrap gap-4 text-sm text-neutral-500 pl-7">
                {publicationDate && (
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                      <line x1="16" x2="16" y1="2" y2="6"/>
                      <line x1="8" x2="8" y1="2" y2="6"/>
                      <line x1="3" x2="21" y1="10" y2="10"/>
                    </svg>
                    {publicationDate}
                  </span>
                )}
                {authors && (
                  <>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      {authors}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Render richText content */}
          {contentElements.map((element: any, index: number) => {
            if (element.type === 'paragraph') {
              const html = renderChildren(element.children)

              return html ? (
                 <p
                  key={index}
                  className="text-neutral-700 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : null
            }

            if (element.type === 'heading') {
              const html = renderChildren(element.children)
              const level = element.tag?.replace('h', '') || '2'
              const Tag = `h${['2', '3', '4', '5', '6'].includes(level) ? level : '2'}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

              return (
                <Tag
                  key={index}
                  className={`font-semibold text-neutral-900 mt-10 mb-6 ${
                    level === '2' ? 'text-3xl' :
                    level === '3' ? 'text-2xl' :
                    level === '4' ? 'text-xl' : 'text-lg'
                  }`}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              )
            }

            if (element.type === 'list') {
              const ListTag = element.listType === 'number' ? 'ol' : 'ul'
              return (
                <ListTag key={index} className={`mb-6 space-y-3 ${element.listType === 'number' ? 'list-decimal pl-6' : 'list-disc pl-6'}`}>
                  {element.children?.map((item: any, itemIndex: number) => (
                    <li 
                      key={itemIndex} 
                      className="text-neutral-700"
                      dangerouslySetInnerHTML={{ __html: renderChildren(item.children) }}
                    />
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

            if (element.type === 'upload') {
              const media = element.value
              const url = typeof media === 'object' ? media?.url : null
              if (!url) return null

              const alt = media?.alt || media?.filename || 'Article image'
              const caption = element.fields?.caption
              const alignment = element.fields?.alignment || 'center'
              const size = element.fields?.size || 'full'

              const sizeClass =
                size === 'small' ? 'max-w-[25%]' :
                size === 'medium' ? 'max-w-[50%]' :
                size === 'large' ? 'max-w-[75%]' : 'max-w-full'

              const alignmentClass =
                alignment === 'center' ? 'mx-auto' :
                alignment === 'right' ? 'ml-auto' :
                alignment === 'left' ? 'mr-auto' : 'mx-auto'

              return (
                <figure key={index} className={`my-8 ${sizeClass} ${alignmentClass}`}>
                  <Image
                    src={url}
                    alt={alt}
                    width={media?.width || 800}
                    height={media?.height || 600}
                    className="w-full h-auto rounded-lg"
                  />
                  {caption && (
                    <figcaption className="text-sm text-neutral-500 mt-2 text-center italic">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              )
            }

            if (element.type === 'block') {
              const block = element.fields
              if (block?.blockType === 'button' && block.label && block.url) {
                const styleClasses =
                  block.style === 'secondary'
                    ? 'bg-neutral-700 text-white hover:bg-neutral-800'
                    : block.style === 'outline'
                      ? 'border-2 border-[#1d2088] text-[#1d2088] hover:bg-[#1d2088] hover:text-white'
                      : 'bg-[#1d2088] text-white hover:bg-[#171a6e]'

                return (
                  <div key={index} className="my-6">
                    <a
                      href={block.url}
                      className={`inline-block px-6 py-3 rounded font-medium transition-colors ${styleClasses}`}
                    >
                      {block.label}
                    </a>
                  </div>
                )
              }
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
            {articlePage?.backToArticlesText || "Kembali ke Semua Artikel"}
          </a>
        </div>
      </div>

      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <>
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 mt-10">
            <h1 className="text-1xl md:text-3xl font-medium tracking-tight text-black mb-4 leading-tight brand-font text-center mt-32">
              Artikel Lainnya
            </h1>
          </div>
          <div className="article-more max-w-7xl mx-auto px-6 lg:px-12 bg-grey-50">
            <div className="cursor-pointer pt-16 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {article.relatedArticles.map((relatedArticle: any, index: number) => {
                const isObject = typeof relatedArticle === 'object' && relatedArticle !== null;
                
                // Do not show the fallback UI with just IDs if the relationship isn't populated
                if (!isObject) return null;

                const relatedSlug = relatedArticle.slug;
                const relatedTitle = relatedArticle.title || 'Article';
                const relatedThumbnail = getMediaUrl(relatedArticle.thumbnail);
                const relatedCategory = typeof relatedArticle.category === 'object' ? relatedArticle.category?.name : relatedArticle.category || 'ARTICLE';
                const relatedExcerpt = relatedArticle.excerpt;

                if (!relatedSlug) return null;

                return (
                  <div key={index} className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:scale-[1.02] w-full lg:flex-1 rounded-xl">
                    <a href={`/${locale}/article/${relatedSlug}`} className="block relative h-full flex flex-col">
                      <div className="relative">
                        <img
                          src={relatedThumbnail || '/images/bg-produk.png'}
                          alt={relatedTitle}
                          className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                          <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                            {relatedCategory || 'ARTICLE'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6 bg-neutral-900 flex-1 flex flex-col justify-between">
                        <div>
                          <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-2 group-hover:text-[#1d2088] transition-colors duration-300 text-white line-clamp-2">
                            {relatedTitle}
                          </h2>
                          {relatedExcerpt && (
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-4 line-clamp-3">
                              {relatedExcerpt}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-start mt-auto pt-2">
                          <div className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
                            <span>Baca Berita</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <Footer settings={settings} />
    </>
  )
}

// Generate static paths for all articles and locales
export async function generateStaticParams() {
  const articles = await getArticles('id')
  return locales.flatMap((locale) =>
    articles.map((article: any) => ({
      locale,
      slug: article.slug,
    }))
  )
}

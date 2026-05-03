import { getProducts, getSettings, getProductPage, getMediaUrl, getPhases } from '@/lib/payload'
import Image from "next/image"
import Footer from "../../components/Footer"
import { locales, type Locale } from '@/i18n.config'
import type { Metadata } from 'next'

export const revalidate = 3600; // Cache for 1 hour (3600 seconds)

interface ProductPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  
  const titles: Record<string, string> = {
    id: "Produk & Unit - Laksana Business Park",
    en: "Products & Units - Laksana Business Park",
    zh: "产品与单位 - Laksana Business Park"
  }
  
  const descriptions: Record<string, string> = {
    id: "Lihat berbagai pilihan unit gudang dan properti industri di Laksana Business Park, dari unit siap pakai hingga kavling industri.",
    en: "Browse various warehouse units and industrial properties at Laksana Business Park, from ready-to-use units to industrial plots.",
    zh: "在 Laksana Business Park 浏览各种仓库单位和工业物业，从现成单位到工业用地。"
  }

  return {
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    alternates: {
      canonical: `${baseUrl}/${locale}/product`,
      languages: {
        id: `${baseUrl}/id/product`,
        en: `${baseUrl}/en/product`,
        zh: `${baseUrl}/zh/product`,
      },
    },
  }
}

export default async function Product({ params }: ProductPageProps) {
  const { locale } = await params

  const [products, settings, productPage, phases] = await Promise.all([
    getProducts(locale as Locale),
    getSettings(locale as Locale),
    getProductPage(locale as Locale),
    getPhases(locale as Locale),
  ])

  // Group products by phase ID
  const productsByPhase = products.reduce((acc: Record<string, any[]>, product: any) => {
    const phaseId = typeof product.phase === 'object' ? product.phase?.id : product.phase
    if (!phaseId) return acc
    if (!acc[phaseId]) acc[phaseId] = []
    acc[phaseId].push(product)
    return acc
  }, {})

  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-25vh flex flex-col justify-center px-6 overflow-hidden">
        {/* Background Image from CMS */}
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover"
            src={getMediaUrl(productPage?.hero?.backgroundImage) || "/images/bg-produk.png"}
            alt="Hero Background"
            width={1920}
            height={1080}
            priority
          />
          {/* Gradient overlay from top to bottom - 50% black to transparent */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          {/* Left-right gradient overlay for additional text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-20 md:pt-15 lg:pt-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Left side - Title and description */}
            <div className="lg:flex-1 fade-in-up mb-[10%] mt-[10%] justify-center text-center">
              <h1 className="text-4xl md:text-5xl sm:text-4xl font-medium tracking-tight text-white mb-4 leading-[0.95] brand-font">
                <span className="text-white bg-clip-text uppercase">{productPage?.hero?.title || productPage?.pageTitle || 'SEMUA PRODUK'}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Render products by phase */}
      {phases.map((phase: any) => {
        const phaseProducts = productsByPhase[phase.id]
        if (!phaseProducts || phaseProducts.length === 0) return null

        return (
          <div key={phase.id}>
            {/* Phase Header */}
            <div
              className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate"
              id={phase.slug}
            >
              <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9]">
                {phase.name}
              </h2>
            </div>

            {/* Product Cards Grid */}
            <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
              {phaseProducts.map((product: any) => (
                <a
                  key={product.id}
                  href={`/${locale}/product/${product.slug}`}
                  className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                  <Image
                    src={getMediaUrl(product.thumbnail) || "/images/card-unit/kavling-card.png"}
                    fill
                    className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                    alt={product.name || "Product"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/90 mb-1 block">
                      {product.label || product.type || "Produk"}
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-white">
                      {product.name}
                    </h3>
                    {/* Key Specs Icons */}
                    <div className="flex gap-3 mt-3">
                      {product.keySpecs?.slice(0, 3).map((spec: any, idx: number) => (
                        <div key={idx} className="bg-white/25 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-2">
                          {spec.icon && getMediaUrl(spec.icon) && (
                            <Image src={getMediaUrl(spec.icon)} alt={spec.label || "Spec"} width={14} height={14} className="w-[14px] h-[14px] object-contain invert grayscale" />
                          )}
                          <span className="text-[10px] text-white font-medium uppercase tracking-tighter">{spec.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )
      })}

      {/* Fallback for when there are no products in CMS */}
      {Object.keys(productsByPhase).length === 0 && (
        <>
          {/* Tahap Satu */}
          <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8" id="tahap-satu">
            <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9]">Tahap Satu</h2>
          </div>
          <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end">
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/blok-b.png" alt="Blok B" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang Siap Pakai</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Blok B</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/blok-c.png" alt="Blok C" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang Siap Pakai</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Blok C</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/blok-l.png" alt="Blok L" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang Siap Pakai</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Blok L</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/kavling-card.png" alt="Kavling" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Kavling Siap Bangun</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Kavling</h3>
              </div>
            </a>
          </div>

          {/* Tahap Dua */}
          <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8" id="tahap-dua">
            <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9]">Tahap Dua</h2>
          </div>
          <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end">
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/kavling-card.png" alt="Kavling" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Kavling Siap Bangun</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Kavling</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/cluster-card.png" alt="Cluster" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Cluster Siap Bangun</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Cluster</h3>
              </div>
            </a>
          </div>

          {/* Luxima */}
          <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8">
            <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9]" id="luxima-product">Luxima Bizhub 4 in 1</h2>
          </div>
          <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end">
            <a href="/product/opxima" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/unit-opxima.png" alt="Opxima" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang 4 in 1</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Opxima</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/unit-nexima.png" alt="Nexima" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang 4 in 1</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Nexima</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/unit-nexima-plus.png" alt="Nexima Plus" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang 4 in 1</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Nexima +</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <Image src="/images/card-unit/unit-maxima.png" alt="Maxima" fill className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang 4 in 1</span>
                <h3 className="text-lg sm:text-xl font-medium text-white">Maxima</h3>
              </div>
            </a>
          </div>
        </>
      )}

      <Footer settings={settings} />
    </>
  )
}

// Generate static paths for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

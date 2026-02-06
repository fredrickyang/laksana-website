import { getProducts, getSettings, getMediaUrl } from '@/lib/payload'
import Image from "next/image"
import Footer from "../components/Footer"

export default async function Product() {
  const [products, settings] = await Promise.all([
    getProducts('id'),
    getSettings('id'),
  ])

  // Group products by phase
  const productsByPhase = products.reduce((acc: Record<string, any[]>, product: any) => {
    const phase = product.phase || 'Other'
    if (!acc[phase]) acc[phase] = []
    acc[phase].push(product)
    return acc
  }, {})

  // Define phase display order and titles
  const phaseConfig: Record<string, { title: string; id: string }> = {
    'Tahap 1': { title: 'Tahap Satu', id: 'tahap-satu' },
    'Tahap 2': { title: 'Tahap Dua', id: 'tahap-dua' },
    'Luxima': { title: 'Luxima Bizhub 4 in 1', id: 'luxima-product' },
    'Kavling Industri': { title: 'Kavling Industri', id: 'kavling-industri' },
  }

  const phaseOrder = ['Tahap 1', 'Tahap 2', 'Luxima', 'Kavling Industri']

  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-25vh flex flex-col justify-center px-6 overflow-hidden">
        <title>
          Laksana Business Park - Solusi Gudang & Properti Strategis
        </title>
        {/* Background Video (fixed) */}
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover"
            src="/images/bg-produk.png"
            alt="Background Image"
            width={1400}
            height={400}
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
                <span className="text-white bg-clip-text">SEMUA PRODUK</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Render products by phase */}
      {phaseOrder.map((phase) => {
        const phaseProducts = productsByPhase[phase]
        if (!phaseProducts || phaseProducts.length === 0) return null

        const config = phaseConfig[phase]
        return (
          <div key={phase}>
            {/* Phase Header */}
            <div
              className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate"
              id={config.id}
            >
              <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9]">
                {config.title}
              </h2>
            </div>

            {/* Product Cards Grid */}
            <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
              {phaseProducts.map((product: any) => (
                <a
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                  <img
                    src={getMediaUrl(product.thumbnail) || "/images/card-unit/kavling-card.png"}
                    className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                      {product.label || product.type || "Produk"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-white">
                      {product.name}
                    </h3>
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
              <img src="/images/card-unit/blok-b.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang Siap Pakai</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Blok B</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <img src="/images/card-unit/blok-c.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang Siap Pakai</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Blok C</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <img src="/images/card-unit/blok-l.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang Siap Pakai</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Blok L</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <img src="/images/card-unit/kavling-card.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Kavling Siap Bangun</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Kavling</h3>
              </div>
            </a>
          </div>

          {/* Tahap Dua */}
          <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8" id="tahap-dua">
            <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9]">Tahap Dua</h2>
          </div>
          <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end">
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <img src="/images/card-unit/kavling-card.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Kavling Siap Bangun</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Kavling</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <img src="/images/card-unit/cluster-card.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Cluster Siap Bangun</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Cluster</h3>
              </div>
            </a>
          </div>

          {/* Luxima */}
          <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8">
            <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9]" id="luxima-product">Luxima Bizhub 4 in 1</h2>
          </div>
          <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end">
            <a href="/product/opxima" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <img src="/images/card-unit/unit-opxima.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang 4 in 1</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Opxima</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <img src="/images/card-unit/unit-nexima.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang 4 in 1</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Nexima</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <img src="/images/card-unit/unit-nexima-plus.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang 4 in 1</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Nexima +</h3>
              </div>
            </a>
            <a href="#" className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]">
              <img src="/images/card-unit/unit-maxima.png" className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">Gudang 4 in 1</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">Maxima</h3>
              </div>
            </a>
          </div>
        </>
      )}

      <Footer settings={settings} />
    </>
  )
}

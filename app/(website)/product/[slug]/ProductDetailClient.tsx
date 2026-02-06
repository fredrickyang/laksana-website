"use client";

import Footer from "../../components/Footer";
import Form from "../../components/Form";
import Image from "next/image";
import { useState } from "react";
import { getMediaUrl } from "@/lib/utils";

interface ProductDetailClientProps {
  product: any;
  settings?: any;
}

export default function ProductDetailClient({ product, settings }: ProductDetailClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  // Build slides from gallery or use default images
  const slides = product.gallery?.length > 0
    ? product.gallery.map((item: any, index: number) => ({
        src: getMediaUrl(item.image) || `/images/unit-detail/opxima-${index + 1}.png`,
        label: `${product.name} ${index + 1}`,
        desc: `Slide ${index + 1}`,
      }))
    : [
        { src: "/images/unit-detail/opxima-1.png", label: "Image 1", desc: "Slide 1" },
        { src: "/images/unit-detail/opxima-2.png", label: "Image 2", desc: "Slide 2" },
        { src: "/images/unit-detail/opxima-3.png", label: "Image 3", desc: "Slide 3" },
      ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Get highlight specs
  const dimension = product.highlightSpecs?.dimension || "6 x 24 Meter";
  const landArea = product.highlightSpecs?.landArea || "144 m²";
  const buildingArea = product.highlightSpecs?.buildingArea || "126 m²";

  // Get detailed specs
  const detailedSpecs = product.detailedSpecs || [];

  // Get facilities
  const facilities = product.facilities || [];

  // Get virtual tour URL
  const virtualTourUrl = product.virtualTourUrl || "https://www.vr-illustratorasia.xyz/Laksana%20Business%20Park/250831/";

  // Extract description text from richText
  const fullDescription = product.fullDescription?.root?.children?.map((p: any) =>
    p.children?.map((c: any) => c.text).join('')
  ).join('\n\n') || product.shortDescription || "";

  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-25vh flex flex-col justify-center px-6 overflow-hidden">
        <title>
          {product.name} - Laksana Business Park
        </title>
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover"
            src="/images/bg-produk.png"
            alt="Background Image"
            width={1400}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-20 md:pt-15 lg:pt-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div className="lg:flex-1 fade-in-up mb-[10%] mt-[10%] justify-center text-center">
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight mb-8">
                <span className="text-white bg-clip-text">
                  Tipe {product.name}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Carousel Section */}
      <div className="w-full flex items-center justify-center px-6 mt-5 mb-10">
        <div className="w-full max-w-300">
          <div className="lg:col-span-5 flex flex-col lg:pt-5 flex items-start relative justify-center">
            <p className="text-neutral-900 justify-center max-w-md mb-5">
              Beranda / Produk /{" "}
              <span className="font-bold">{product.name}</span>
            </p>
          </div>
          {/* Carousel Container */}
          <div className="relative bg-white overflow-hidden">
            <div className="relative w-full aspect-video">
              {slides.map((slide: any, index: number) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-0.5 transition-all duration-300 ${
                    index === currentSlide ? "bg-white w-5" : "bg-white/50 w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Highlight Specs */}
      <div className="w-full flex items-center justify-center px-6">
        <section className="highlight-specs w-full max-w-300 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-stone-50 border-stone-200 border pt-2 pr-2 pb-2 pl-2 gap-x-2 gap-y-4">
            <div className="bg-white p-6 border border-neutral-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-300">
              <p className="text-[15px] leading-relaxed text-neutral-500 font-geist">Dimensi</p>
              <h3 className="text-2xl font-medium text-neutral-900 tracking-tight mb-2 font-geist">{dimension}</h3>
            </div>
            <div className="bg-white p-6 border border-neutral-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-300">
              <p className="text-[15px] leading-relaxed text-neutral-500 font-geist">Luas Tanah</p>
              <h3 className="text-2xl font-medium text-neutral-900 tracking-tight mb-2 font-geist">{landArea}</h3>
            </div>
            <div className="bg-white p-6 border border-neutral-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-300">
              <p className="text-[15px] leading-relaxed text-neutral-500 font-geist">Luas Bangunan</p>
              <h3 className="text-2xl font-medium text-neutral-900 tracking-tight mb-2 font-geist">{buildingArea}</h3>
            </div>
            <div className="bg-white hover:bg-[#1d2088] hover:text-white p-6 flex justify-center items-center border border-neutral-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <a href="https://api.whatsapp.com/send?phone=6281805886000&text=%5BWEB%5D%20Halo%20tim%20marketing%20Laksana%2C%20saya%20ingin%20bertanya%20lebih%20lanjut%20tentang%20unit%20Laksana%20Business%20Park" className="flex items-center justify-center gap-2">
                <h3 className="text-2xl font-medium tracking-tight mr-2 flex justify-center items-center gap-3">
                  Konsultasi Gratis
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                </h3>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Content Section */}
      <div className="w-full flex items-start justify-center px-6">
        <div className="w-full max-w-300">
          <div className="lg:pt-5 flex items-start relative border-b border-gray-200 justify-start gap-8">
            <p className="text-lg font-medium text-gray-400 justify-start max-w-md mb-2 hover:text-gray-600 cursor-pointer">
              <a href="#overview">Ringkasan</a>
            </p>
            <p className="text-lg font-medium text-gray-400 justify-start max-w-md mb-2 hover:text-gray-600 cursor-pointer">
              <a href="#facilities">Fasilitas</a>
            </p>
            <p className="text-lg font-medium text-gray-400 justify-start max-w-md mb-2 hover:text-gray-600 cursor-pointer">
              <a href="#spesifikasi">Spesifikasi</a>
            </p>
          </div>

          <div className="mt-8 mb-16" id="overview">
            <h2 className="text-3xl lg:text-4xl font-medium tracking-tight border-l-4 border-[#1d2088] pl-6 mb-8">
              Tipe {product.name}
            </h2>
            <p className="text-justify text-neutral-600 mb-6">
              {fullDescription || `${product.name} adalah solusi properti komersial terkemuka yang dirancang untuk memenuhi kebutuhan bisnis modern.`}
            </p>

            {showMore && (
              <>
                {/* Detailed Specs */}
                {detailedSpecs.length > 0 && (
                  <>
                    <h2 className="text-3xl lg:text-4xl mt-4 sm:mt-8 font-medium tracking-tight border-l-4 border-[#1d2088] pl-6 mb-8" id="spesifikasi">
                      Spesifikasi
                    </h2>
                    <div className="relative z-30 mt-4 sm:mt-8 grid grid-cols-2 md:grid-cols-4 border-y border-neutral-200 animate-in animate-in-delay-3 bg-white/60 backdrop-blur-sm">
                      {detailedSpecs.slice(0, 4).map((spec: any, index: number) => (
                        <div key={index} className={`p-4 sm:p-8 ${index < 3 ? 'border-r' : ''} border-neutral-200 text-center`}>
                          <div className="sm:text-2xl md:text-3xl text-xl font-medium text-neutral-900 tracking-tighter mb-1">
                            {spec.key}
                          </div>
                          <div className="text-[15px] sm:text-[17px] text-white uppercase tracking-widest bg-gradient-to-r from-[#1d2088]/0 via-[#1d2088] to-[#facc15]/0">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    {detailedSpecs.length > 4 && (
                      <div className="relative z-30 -mt-1 grid grid-cols-2 md:grid-cols-4 border-y border-neutral-200 animate-in animate-in-delay-3 bg-white/60 backdrop-blur-sm">
                        {detailedSpecs.slice(4, 8).map((spec: any, index: number) => (
                          <div key={index} className={`p-4 sm:p-8 ${index < 3 ? 'border-r' : ''} border-neutral-200 text-center`}>
                            <div className="sm:text-2xl md:text-3xl text-xl font-medium text-neutral-900 tracking-tighter mb-1">
                              {spec.key}
                            </div>
                            <div className="text-[15px] sm:text-[17px] text-white uppercase tracking-widest bg-gradient-to-r from-[#facc15]/0 via-[#1d2088] to-[#facc15]/0">
                              {spec.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {detailedSpecs.length > 8 && (
                      <div className="relative z-30 -mt-1 grid grid-cols-2 md:grid-cols-4 border-y border-neutral-200 animate-in animate-in-delay-3 bg-white/60 backdrop-blur-sm">
                        {detailedSpecs.slice(8, 12).map((spec: any, index: number) => (
                          <div key={index} className={`p-4 sm:p-8 ${index < 3 ? 'border-r' : ''} border-neutral-200 text-center`}>
                            <div className="sm:text-2xl md:text-3xl text-xl font-medium text-neutral-900 tracking-tighter mb-1">
                              {spec.key}
                            </div>
                            <div className="text-[15px] sm:text-[17px] text-white uppercase tracking-widest bg-gradient-to-r from-[#facc15]/0 via-[#1d2088] to-[#facc15]/0">
                              {spec.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setShowMore((s) => !s)}
                className="font-medium text-gray-400 cursor-pointer"
              >
                {showMore ? "Sembunyikan" : "Lihat Detail"}
              </button>
            </div>
          </div>

          {/* Facilities Section */}
          <h2 className="text-3xl lg:text-4xl font-medium tracking-tight border-l-4 border-[#1d2088] pl-6 mb-8">
            Fasilitas & Layanan
          </h2>
          <p className="text-justify text-neutral-600 mb-6">
            On-site amenities include 24/7 security, ample parking, reliable utilities, and customizable units to support warehousing, light manufacturing, and office use.
          </p>
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center" id="facilities">
            {facilities.length > 0 ? facilities.map((facility: any, index: number) => (
              <div key={index} className="flex flex-col items-center gap-2">
                {facility.icon ? (
                  <img className="mx-auto" src={getMediaUrl(facility.icon)} width="56" height="56" alt={facility.label} />
                ) : (
                  <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/512/3381/3381540.png" width="56" height="56" alt={facility.label} />
                )}
                <span className="text-xs text-neutral-600 uppercase tracking-widest">{facility.label}</span>
              </div>
            )) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/512/3381/3381540.png" width="56" height="56" alt="One Gate System" />
                  <span className="text-xs text-neutral-600 uppercase tracking-widest">One Gate System</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/512/2062/2062582.png" width="46" height="46" alt="Keamanan CCTV 24Jam" />
                  <span className="text-xs text-neutral-600 uppercase tracking-widest">Keamanan CCTV 24Jam</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/512/7969/7969430.png" width="46" height="46" alt="Porter Bongkar Muat" />
                  <span className="text-xs text-neutral-600 uppercase tracking-widest">Tersedia Porter Bongkar Muat</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/512/25/25276.png" width="46" height="46" alt="Akses Jalan Luas" />
                  <span className="text-xs text-neutral-600 uppercase tracking-widest">Akses Jalan Luas</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="border-white/5 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative border border-slate-800 bg-zinc-900 overflow-hidden p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/50 to-black pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-white/5 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl text-white tracking-tighter mb-6 font-montserrat font-medium">
                Punya kebutuhan spesifik mengenai Gudang ?
              </h2>
              <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-2xl mx-auto font-manrope">
                Coba diskusikan dengan tim kami, buat janji visit anda ke Marketing Gallery kami.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#contact" className="button-cta1 w-full sm:w-auto px-8 py-3 bg-white hover:bg-[#1d2088] hover:text-white text-black text-sm font-semibold transition-colors tracking-tight cursor-pointer">
                  Konsultasi Gratis
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3 bg-transparent border border-white text-white text-sm font-medium hover:bg-white/5 transition-colors tracking-tight cursor-pointer">
                  Download E-Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section id="video" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 mb-8">
                Kenapa Investor memilih <br />
                <span className="text-[#1d2088]">Laksana Business Park</span>
              </h2>
              <p className="text-stone-600 mb-6">
                Kami satu-satunya kawasan pergudangan yang terus berkembang dengan fasilitas lengkap dan serta pengembangan hingga Tahap 3 & Township.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check w-4 h-4 text-stone-700">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-stone-900">Dukungan Izin IUKI</h4>
                  <p className="text-stone-500 text-sm">Kawasan pergudangan dengan izin produksi dan izin industri terlengkap di Tangerang.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3 w-4 h-4 text-stone-700">
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                    <path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-stone-900">Nilai Jual Kembali Tinggi</h4>
                  <p className="text-stone-500 text-sm">Kebutuhan gudang dan properti industri yang terus meningkat.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-4 h-4 text-stone-700">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <circle cx={9} cy={7} r={4} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-stone-900">Dikelola oleh tim estate profesional</h4>
                  <p className="text-stone-500 text-sm">Memberikan kemudahan dan kenyamanan bagi para investor dan penghuni.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Tour Iframe */}
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900 border border-stone-400 shadow-md mt-24 group">
            {showIframe ? (
              <iframe
                src={virtualTourUrl}
                className="w-full h-full border-0"
                allowFullScreen
                title="Virtual 3D Tour"
              ></iframe>
            ) : (
              <>
                <img
                  src="https://agungintiland.com/assets/source/assets/thumbs/images/cover_1280_700_laksana-business-park---view-semi-bev-05.png.webp"
                  alt="Video cover"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
                  <button
                    onClick={() => setShowIframe(true)}
                    className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 border border-white/30 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="white" className="bi bi-badge-3d" viewBox="0 0 16 16">
                      <path d="M4.52 8.368h.664c.646 0 1.055.378 1.06.9.008.537-.427.919-1.086.919-.598-.004-1.037-.325-1.068-.756H3c.03.914.791 1.688 2.153 1.688 1.24 0 2.285-.66 2.272-1.798-.013-.953-.747-1.38-1.292-1.432v-.062c.44-.07 1.125-.527 1.108-1.375-.013-.906-.8-1.57-2.053-1.565-1.31.005-2.043.734-2.074 1.67h1.103c.022-.391.383-.751.936-.751.532 0 .928.33.928.813.004.479-.383.835-.928.835h-.632v.914zm3.606-3.367V11h2.189C12.125 11 13 9.893 13 7.985c0-1.894-.861-2.984-2.685-2.984zm1.187.967h.844c1.112 0 1.621.686 1.621 2.04 0 1.353-.505 2.02-1.621 2.02h-.844z" />
                      <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                    </svg>
                  </button>
                  <p className="text-white text-xl font-medium tracking-tight">See Virtual 3D Tour</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Form />
      <Footer settings={settings} />
    </>
  );
}

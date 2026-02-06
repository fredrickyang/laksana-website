"use client";
import {
  useEffect,
  useState,
  useRef
} from "react";
import Image from "next/image";
import Footer from "./components/Footer";
import { getMediaUrl } from "@/lib/utils";

// Helper to extract plain text from Payload richText field
function getRichText(richText: any, fallback: string = ''): string {
  if (!richText?.root?.children) return fallback;
  return richText.root.children
    .map((p: any) => p.children?.map((c: any) => c.text).join('') || '')
    .filter(Boolean)
    .join(' ') || fallback;
}

interface HomePageClientProps {
  homePage: any;
  products: any[];
  articles: any[];
  settings?: any;
}

export default function HomePageClient({ homePage, products, articles, settings }: HomePageClientProps) {
  // Build images map from CMS stats data
  const statsImages = homePage?.mainFeature?.stats?.reduce((acc: Record<string, string>, stat: any, index: number) => {
    const imageUrl = getMediaUrl(stat.image) || `/images/hero${index + 1}.png`;
    acc[String(index + 1)] = imageUrl;
    return acc;
  }, {}) || {
    "1": "/images/hero1.png",
    "2": "/images/img2.png",
    "3": "/images/hero2.png",
  };

  const [currentImage, setCurrentImage] = useState(Object.values(statsImages)[0] as string);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initInViewAnimations = function(selector = ".animate-on-scroll") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: "0px 0px -5% 0px"
        });
      document.querySelectorAll(selector).forEach((el) => {
        observer.observe(el);
      });
    };
    initInViewAnimations();

    const stats = Array.from(document.querySelectorAll(".stat-item")) as HTMLElement[];
    const mainImage = document.getElementById("main-image") as HTMLImageElement | null;

    if (stats.length > 0) {
      stats.forEach((s) => s.classList.remove("active"));
      stats[0].classList.add("active");
    }

    const statListeners: { el: HTMLElement; handler: EventListener }[] = [];
    stats.forEach((stat) => {
      const handler = () => {
        stats.forEach((s) => s.classList.remove("active"));
        stat.classList.add("active");
        const imgId = stat.dataset.imgId;
        if (imgId && statsImages[imgId]) {
          const newSrc = statsImages[imgId];
          if (mainImage) mainImage.classList.add("fade-out");
          const loader = document.createElement('img') as HTMLImageElement;
          loader.src = newSrc;
          loader.onload = () => {
            setCurrentImage(newSrc);
            setTimeout(() => {
              if (mainImage) mainImage.classList.remove("fade-out");
            }, 50);
          };
        }
      };
      stat.addEventListener("click", handler);
      statListeners.push({ el: stat, handler });
    });

    // Carousel navigation
    const carouselContainer = carouselRef.current;
    const leftBtn = document.querySelector('.carousel-btn-left') as HTMLButtonElement | null;
    const rightBtn = document.querySelector('.carousel-btn-right') as HTMLButtonElement | null;
    const scrollCarousel = (direction: 'left' | 'right') => {
      if (!carouselContainer) return;
      const scrollAmount = 400;
      const targetScroll = direction === 'left' ? carouselContainer.scrollLeft - scrollAmount : carouselContainer.scrollLeft + scrollAmount;
      carouselContainer.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };
    const onLeft = () => scrollCarousel('left');
    const onRight = () => scrollCarousel('right');
    leftBtn?.addEventListener('click', onLeft);
    rightBtn?.addEventListener('click', onRight);

    return () => {
      statListeners.forEach(({ el, handler }) => el.removeEventListener('click', handler));
      leftBtn?.removeEventListener('click', onLeft);
      rightBtn?.removeEventListener('click', onRight);
    };
  }, [statsImages]);

  // Get CTA URLs from CMS or use defaults
  const primaryCtaLink = homePage?.hero?.primaryCtaLink || "https://api.whatsapp.com/send?phone=6281805886000&text=%5BWEB%5D%20Halo%20tim%20marketing%20Laksana%2C%20saya%20ingin%20bertanya%20lebih%20lanjut%20tentang%20unit%20Laksana%20Business%20Park";
  const secondaryCtaLink = homePage?.hero?.secondaryCtaLink || "#virtual";
  const heroVideoUrl = getMediaUrl(homePage?.hero?.backgroundVideo) || "/videos/hero-video.mp4";

  return (
    <>
      {/* Hero Section with Background Image */}
      <header className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
        <title>{settings?.siteTitle || 'Laksana Business Park - Solusi Gudang & Properti Strategis'}</title>
        {/* Background Video (fixed) */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={heroVideoUrl} type="video/mp4" />
            Video tidak Support.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-40 md:pt-32 lg:pt-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div className="lg:flex-1 fade-in-up">
              <h1 className="text-2xl md:text-5xl font-medium tracking-tight text-white mb-4 leading-[0.95] brand-font">
                <span className="text-white bg-clip-text">
                  {getRichText(homePage?.hero?.headline, 'Laksana Business Park')}
                </span>
              </h1>
              <p className="text-sm lg:text-lg text-white max-w-2xl font-light leading-relaxed">
                {getRichText(homePage?.hero?.subheadline, 'Kawasan industri dan komersial terintegrasi di Tangerang Utara, dikembangkan oleh Agung Intiland dengan fasilitas modern dan lokasi strategis.')}
              </p>
            </div>
            <div className="flex gap-4 fade-in-up justify-center lg:justify-start px-4 md:px-0 w-full lg:w-auto items-end" style={{ animationDelay: "0.2s" }}>
              <a
                href={primaryCtaLink}
                className="px-8 py-4 bg-white text-black font-medium hover:bg-[#1d2088] hover:text-white transition-all flex items-center gap-3 group text-sm tracking-wide whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
                {homePage?.hero?.primaryCta || "Hubungi Kami"}
              </a>
              <div className="flex flex-col items-center gap-2">
                <span className="text-white text-sm text-shadow tracking-wide animate-bounce">
                  Klik untuk Lihat
                </span>
                <a
                  href={secondaryCtaLink}
                  className="justify-start flex px-8 py-4 border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm font-medium transition-colors text-sm tracking-wide whitespace-nowrap"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle-fill mr-3 mt-0.5" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                  </svg>
                  {homePage?.hero?.secondaryCta || "Virtual 3D"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="text-neutral-800 min-h-screen flex flex-col overflow-x-hidden selection:bg-[#FACC15] selection:text-black">
        <div
          className="aura-background-component top-0 w-full h-screen -z-10 mix-blend-darken saturate-0 brightness-150 absolute opacity-50"
          data-alpha-mask="80"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, white 0%, white 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, white 0%, white 80%, transparent)",
          }}
        >
          <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
            <div
              data-us-project="inzENTvhzS9plyop7Z6g"
              className="absolute w-full h-full left-0 top-0 -z-10"
              data-us-initialized="true"
              data-scene-id="id-e069jmsq6g6thr8klsgcd"
            ></div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="w-full px-6 lg:px-12 flex justify-between items-center relative z-50 [animation:fadeSlideIn_0.8s_ease-out_0s_both] animate-on-scroll animate">
          <div className="beam-border-h"></div>
        </nav>

        {/* Header (Light Theme) */}
        <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-7 mt-20 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
          <h2 className="text-5xl text-neutral-900 tracking-tighter leading-[0.9]">
            Proyek Kami
          </h2>
          <a
            href="/product"
            className="group flex items-center gap-4 text-xs font-medium text-neutral-800 hover:text-[#1d2088] transition-colors uppercase tracking-widest pb-2 border-b border-neutral-200 hover:border-[#1d2088]"
          >
            Lihat Semua Proyek
            <span className="iconify" data-icon="solar:arrow-right-up-bold-duotone" />
          </a>
        </div>

        {/* Carousel Scroll Container (Light Theme) */}
        <div
          ref={carouselRef}
          className="w-full overflow-x-auto pb-12 px-6 lg:px-12 flex gap-6 snap-x snap-mandatory scrollbar-hide [animation:fadeSlideIn_1s_ease-out_0.3s_both] animate-on-scroll animate"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {products.length > 0 ? products.map((product, index) => (
            <a
              key={product.id || index}
              href={`/product/${product.slug || '#'}`}
              className="snap-center shrink-0 w-[300px] md:w-[360px] group cursor-pointer block"
            >
              <div className="aspect-[4/5] overflow-hidden transition-all duration-500 hover:border-neutral-300 bg-white w-full border border-black/5 relative">
                <div className="absolute top-0 right-0 bottom-0 left-0">
                  <img
                    src={getMediaUrl(product.thumbnail) || "/images/card-unit/luxima.png"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    alt={product.name || "Product"}
                  />
                </div>
                <div className="opacity-10 absolute top-0 right-0 bottom-0 left-0"></div>
              </div>
              <div className="justify-start mt-6 border-l border-black/5 pl-4">
                <h3 className="text-xl text-neutral-900 font-medium mb-2 hover:text-[#1d2088]">
                  {product.name}
                </h3>
                <div className="flex justify-start items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
                  </svg>
                  <p className="ml-[2%] mr-5 text-sm leading-relaxed max-w-[90%]">
                    {product.type || "Industrial"}
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
                  </svg>
                  <p className="ml-[2%] text-sm leading-relaxed max-w-[90%]">
                    {product.highlightSpecs?.landArea || "Luas 550 ha"}
                  </p>
                </div>
                <p className="mt-5 text-neutral-600 font-light text-xs text-justify leading-relaxed max-w-[90%]">
                  {product.shortDescription || ""}
                </p>
              </div>
            </a>
          )) : (
            // Fallback to hardcoded cards if no products in CMS
            <>
              <a href="/product#luxima-product" className="snap-center shrink-0 w-[300px] md:w-[360px] group cursor-pointer block">
                <div className="aspect-[4/5] overflow-hidden transition-all duration-500 hover:border-neutral-300 bg-white w-full border border-black/5 relative">
                  <div className="absolute top-0 right-0 bottom-0 left-0">
                    <img src="/images/card-unit/luxima.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Luxima" />
                  </div>
                </div>
                <div className="justify-start mt-6 border-l border-black/5 pl-4">
                  <h3 className="text-xl text-neutral-900 font-medium mb-2 hover:text-[#1d2088]">Luxima Bizhub 4 in 1</h3>
                  <p className="mt-5 text-neutral-600 font-light text-xs text-justify leading-relaxed max-w-[90%]">
                    Didesain untuk menjawab kebutuhan ruang usaha dan tempat tinggal dalam satu atap yang sama sebagai solusi nyata khususnya bagi start-up business.
                  </p>
                </div>
              </a>
            </>
          )}
        </div>
      </div>

      <section className="w-full relative pt-32 pb-0 overflow-hidden">
        <div className="absolute bottom-12 right-6 lg:right-12 flex gap-px border border-black/5 bg-white">
          <button className="carousel-btn-left w-12 h-12 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all border-r border-black/5 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
          <button className="carousel-btn-right w-12 h-12 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </button>
        </div>
      </section>

      <main className="flex-grow grid grid-cols-1 lg:px-12 lg:grid-cols-12 my-10 pb-12 relative gap-x-8 gap-y-8 px-6 py-6">
        <div className="lg:col-span-5 flex flex-col lg:pt-10 z-20 relative justify-center">
          <h1 className="text-3xl lg:text-[2.3rem] font-normal max-w-md tracking-tighter text-black mb-12 [animation:fadeSlideIn_0.8s_ease-out_0.1s_both] animate-on-scroll animate">
            {getRichText(homePage?.mainFeature?.headline, 'Membangun berkerlanjutan untuk kawasan terpadu')}
          </h1>
          <p className="text-md text-neutral-600 text-justify max-w-md leading-relaxed mb-12 font-light [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
            {getRichText(homePage?.mainFeature?.description, 'Kawasan industri dan komersial terintegrasi di Tangerang Utara dikembangkan oleh Agung Intiland dengan fasilitas modern dan lokasi strategis. Kami memiliki lebih dari 1200 Hektar total kawasan dengan pilihan unit mulai dari Kavling, Gudang Serbaguna dan Ruko untuk menunjang bisnis anda.')}
          </p>
          <div className="flex flex-col items-start gap-3 [animation:fadeSlideIn_0.8s_ease-out_0.3s_both] animate-on-scroll animate">
            <a
              href={homePage?.mainFeature?.ctaButtonLink || "/our-company"}
              className="btn-wrapper"
              style={{
                "--dot-size": "6px",
                "--line-weight": "1px",
                "--line-distance": "0.8rem 1rem",
                "--animation-speed": "0.35s",
                "--dot-color": "#1d2088",
                "--line-color": "#1d2088",
                "--grid-color": "#0003",
                position: "relative",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
                height: "auto",
                padding: "var(--line-distance)",
                userSelect: "none",
              } as React.CSSProperties}
            >
              <div className="line horizontal top"></div>
              <div className="line vertical right"></div>
              <div className="line horizontal bottom"></div>
              <div className="line vertical left"></div>
              <div className="dot top left"></div>
              <div className="dot top right"></div>
              <div className="dot bottom right"></div>
              <div className="dot bottom left"></div>
              <button className="btn">
                <span className="btn-text tracking-tight">
                  {homePage?.mainFeature?.ctaButtonLabel || "Tentang Perusahaan"}
                </span>
                <svg className="btn-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 relative flex items-center justify-center py-20 lg:py-0 [animation:fadeSlideIn_1s_ease-out_0.2s_both] animate-on-scroll animate">
          <div className="absolute inset-0 grid-bg opacity-100 z-0 mx-[-2rem] mask-image-linear-gradient(to bottom, black, transparent)"></div>
          <div className="relative z-10 w-full aspect-[3/4] overflow-hidden shadow-2xl border border-black/10 group">
            <img
              id="main-image"
              src={currentImage}
              alt="Architectural Detail"
              className="opacity-90 w-full h-full object-cover scale-110"
            />
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col relative z-20 pt-10 pl-6 [animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate">
          <div className="beam-border-v"></div>
          <div className="flex-1 flex flex-col justify-between h-full pb-10">
            {homePage?.mainFeature?.stats?.length > 0 ? homePage.mainFeature.stats.map((stat: any, index: number) => (
              <div
                key={index}
                className={`stat-item ${index > 0 ? 'py-12 border-t border-black/5 border-dashed' : 'mt-10'}`}
                data-img-id={String(index + 1)}
              >
                <span className="stat-value text-7xl font-light tracking-tighter text-neutral-300 block transition-colors">
                  {stat.number || `0${index + 1}`}
                </span>
                <span className="text-sm text-neutral-500 uppercase tracking-widest mt-2 block pl-2 group-hover:text-black">
                  {stat.title?.root?.children?.[0]?.children?.[0]?.text || `Stat ${index + 1}`}
                </span>
              </div>
            )) : (
              <>
                <div className="stat-item mt-10" data-img-id="1">
                  <span className="stat-value text-7xl font-light tracking-tighter text-neutral-300 block transition-colors">01</span>
                  <span className="text-sm text-neutral-500 uppercase tracking-widest mt-2 block pl-2 group-hover:text-black">Menjaga Kualitas Produk</span>
                </div>
                <div className="stat-item py-12 border-t border-black/5 border-dashed" data-img-id="2">
                  <span className="stat-value text-7xl font-light tracking-tighter text-neutral-300 block transition-colors">02</span>
                  <span className="text-sm text-neutral-500 uppercase tracking-widest mt-2 block pl-2 group-hover:text-black">Dikembangkan Oleh Manajemen Estate Terbaik</span>
                </div>
                <div className="stat-item border-t border-black/5 border-dashed pt-12" data-img-id="3">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Image src="/images/usp/usp-1.png" alt="Lead Architect" width={80} height={80} className="w-28 h-28 rounded-full object-cover relative z-10 transition-all" />
                        <Image src="/images/usp/usp-2.png" alt="Lead Architect 2" width={80} height={80} className="w-28 h-28 rounded-full object-cover relative z-10 transition-all" />
                      </div>
                    </div>
                  </div>
                  <p className="text-base font-normal text-neutral-700 uppercase leading-relaxed tracking-tight max-w-[200px] mt-6 pointer-events-none">
                    Akses Mudah ke Bandara Tersertifikasi UIKI
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <section className="w-full bg-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-12 left-0 right-0 flex justify-center z-30 px-6"></div>

        <div className="branding">
          <section className="overflow-hidden border-neutral-200 border-t pt-24 pb-24 relative">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="flex flex-col items-center mb-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1 shadow-sm">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                    {getRichText(homePage?.branding?.tag, 'Klien Kami')}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl lg:text-4xl font-medium tracking-tight text-neutral-900 text-center max-w-3xl leading-[1.05]">
                  {getRichText(homePage?.branding?.sectionTitle, 'Dipercaya oleh perusahaan besar')}
                </h2>
                <p className="mt-4 text-base text-neutral-500 text-center max-w-2xl">
                  {getRichText(homePage?.branding?.description, 'Kini mereka dapat fokus mengembangkan bisnis & operasional gudang lebih efisien bersama kami.')}
                </p>
              </div>
              <div className="mt-14 flex flex-col items-center gap-5">
                <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
                  {homePage?.branding?.clientLogos?.length > 0 ? homePage.branding.clientLogos.map((client: any, index: number) => (
                    <span key={index} className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <img src={getMediaUrl(client.logo) || "/brand/placeholder.svg"} alt={client.clientName || "Client"} className="w-28 h-28 object-cover relative transition-all" />
                    </span>
                  )) : (
                    <>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                        <img src="/brand/coca-cola.svg" alt="Client" className="w-28 h-28 object-cover relative transition-all" />
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                        <img src="/brand/google.svg" alt="Client" className="w-28 h-28 object-cover relative transition-all" />
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                        <img src="/brand/heineken.svg" alt="Client" className="w-28 h-28 object-cover relative transition-all" />
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                        <img src="/brand/microsoft.svg" alt="Client" className="w-28 h-28 object-cover relative transition-all" />
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                        <img src="/brand/underarmour.svg" alt="Client" className="w-20 h-20 object-cover relative transition-all" />
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                        <img src="/brand/yamaha.svg" alt="Client" className="w-28 h-28 object-cover relative transition-all" />
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                        <img src="/brand/mastercard.svg" alt="Client" className="w-20 h-20 object-cover relative transition-all" />
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="cta-section">
          <section className="overflow-hidden border-neutral-200 border-t pt-24 pb-24 relative"></section>
        </div>

        <div className="relative z-30 mx-4 lg:mx-auto max-w-6xl -mt-16 transform lg:-translate-y-12">
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] p-8 lg:p-16 overflow-hidden relative shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"></div>
              <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "20px 20px", maskImage: "radial-gradient(circle at 50% 50%, black, transparent 70%)" }}></div>
            </div>
            <div className="relative z-10 max-w-xl">
              <h3 className="text-2xl lg:text-4xl text-white mb-4 leading-tight font-playfair font-medium tracking-tight">
                {getRichText(homePage?.ctaSection?.cardTitle, 'Sekarang giliran anda untuk bergabung dengan komunitas Laksana Business Park')}
              </h3>
              <p className="text-[#A1A1AA] text-sm lg:text-base mb-8 font-geist">
                {getRichText(homePage?.ctaSection?.cardDescription, 'Lebih dari 1000 perusahaan telah mempercayakan kebutuhan industri dan komersialnya bersama kami.')}
              </p>
              <div className="flex flex-col items-start gap-3 [animation:fadeSlideIn_0.8s_ease-out_0.3s_both] animate-on-scroll animate -ml-2">
                <a
                  href={homePage?.ctaSection?.buttonLink || "/our-company#contact"}
                  className="btn-wrapper"
                  style={{
                    "--dot-size": "6px",
                    "--line-weight": "1px",
                    "--line-distance": "0.8rem 1rem",
                    "--animation-speed": "0.35s",
                    "--dot-color": "#1d2088",
                    "--line-color": "#1d2088",
                    "--grid-color": "rgba(255, 255, 255, 0.29)",
                    position: "relative",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                    height: "auto",
                    padding: "var(--line-distance)",
                    userSelect: "none",
                  } as React.CSSProperties}
                >
                  <div className="line horizontal top"></div>
                  <div className="line vertical right"></div>
                  <div className="line horizontal bottom"></div>
                  <div className="line vertical left"></div>
                  <div className="dot top left"></div>
                  <div className="dot top right"></div>
                  <div className="dot bottom right"></div>
                  <div className="dot bottom left"></div>
                  <button className="btn bg-neutral-900 text-white border-transparent hover:bg-neutral-800 transition-colors rounded-md">
                    <span className="btn-text tracking-tight text-white">
                      {homePage?.ctaSection?.button || "Bergabung Sekarang"}
                    </span>
                    <svg className="btn-svg text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between -mb-10 mt-20 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
          <h2 className="text-5xl text-neutral-900 tracking-tighter leading-[0.9]">Artikel</h2>
          <a href="/article" className="group flex items-center gap-4 text-xs font-medium text-neutral-800 hover:text-[#1d2088] transition-colors uppercase tracking-widest pb-2 border-b border-neutral-200 hover:border-[#1d2088]">
            Lihat Semua Artikel
            <span className="iconify" data-icon="solar:arrow-right-up-bold-duotone" />
          </a>
        </div>

        <div className="w-full px-6 lg:px-12 bg-grey-50">
          <article className="cursor-pointer pt-16 pb-16 flex flex-col lg:flex-row justify-start gap-8 flex-wrap">
            {articles.length > 0 ? articles.map((article, index) => (
              <a key={article.id || index} href={`/article/${article.slug}`} className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:scale-[1.02] w-full lg:flex-1">
                <div className="relative">
                  <img
                    src={getMediaUrl(article.thumbnail) || "images/card-blog/tahap3.png"}
                    alt={article.title || "Article"}
                    className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                    <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                      {(typeof article.category === 'object' ? article.category?.name : article.category) || "NEWS"}
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-neutral-900">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                    {article.title}
                  </h2>
                  <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-start">
                    <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
                      <span>Baca Berita</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </a>
            )) : (
              <>
                <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:scale-[1.02] w-full lg:flex-1">
                  <div className="relative">
                    <img src="images/card-blog/tahap3.png" alt="Article" className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">NEWS</span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 bg-neutral-900">
                    <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">Pengembangan Laksana Tahap 3</h2>
                    <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">Demi pesatnya kebutuhan industri di Indonesia, Laksana Business Park kembali menghadirkan pengembangan tahap 3 dengan berbagai keunggulan.</p>
                    <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
                      <span>Baca Berita</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </article>
        </div>
      </section>
      <Footer settings={settings} />
    </>
  );
}

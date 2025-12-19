"use client";
import {
    useEffect,
    useState,
    useRef
} from "react";
import Image from "next/image";
export default function Home() {
    const images: {
        [key: string]: string
    } = {
        "1": "/images/hero1.png",
        "2": "/images/img2.jpg",
        "3": "/images/img1.jpg",
    };
    const [currentImage, setCurrentImage] = useState(images["1"]);
    const carouselRef = useRef < HTMLDivElement > (null);
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
        // Ensure first stat is active on initial load
        if (stats.length > 0) {
            stats.forEach((s) => s.classList.remove("active"));
            stats[0].classList.add("active");
        }
        // Attach click handlers with proper cleanup and preloading
        const statListeners: {
            el: HTMLElement;handler: EventListener
        } [] = [];
        stats.forEach((stat) => {
            const handler = () => {
                stats.forEach((s) => s.classList.remove("active"));
                stat.classList.add("active");
                const imgId = stat.dataset.imgId;
                if (imgId && images[imgId]) {
                    const newSrc = images[imgId];
                    if (mainImage) mainImage.classList.add("fade-out");
                    // Preload image before swapping to avoid flicker / missing image
                    const loader = document.createElement('img') as HTMLImageElement;
                    loader.src = newSrc;
                    loader.onload = () => {
                        // Once loaded, update state so React swaps src synchronously
                        setCurrentImage(newSrc);
                        // small delay to let render commit, then remove fade
                        setTimeout(() => {
                            if (mainImage) mainImage.classList.remove("fade-out");
                        }, 50);
                    };
                }
            };
            stat.addEventListener("click", handler);
            statListeners.push({
                el: stat,
                handler
            });
        });
        // Carousel navigation
        const carouselContainer = carouselRef.current;
        const leftBtn = document.querySelector('.carousel-btn-left') as HTMLButtonElement | null;
        const rightBtn = document.querySelector('.carousel-btn-right') as HTMLButtonElement | null;
        const scrollCarousel = (direction: 'left' | 'right') => {
            if (!carouselContainer) return;
            const scrollAmount = 400; // Adjust scroll distance
            const targetScroll = direction === 'left' ? carouselContainer.scrollLeft - scrollAmount : carouselContainer.scrollLeft + scrollAmount;
            carouselContainer.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        };
        const onLeft = () => scrollCarousel('left');
        const onRight = () => scrollCarousel('right');
        leftBtn?.addEventListener('click', onLeft);
        rightBtn?.addEventListener('click', onRight);
        return () => {
            // cleanup stat listeners
            statListeners.forEach(({
                el,
                handler
            }) => el.removeEventListener('click', handler));
            // cleanup carousel listeners
            leftBtn?.removeEventListener('click', onLeft);
            rightBtn?.removeEventListener('click', onRight);
        };
    }, []);
    return (<>

        {/* Hero Section with Background Image */}
  <header className="relative min-h-screen flex flex-col justify-center px-6 border-b overflow-hidden">
    {/* Background Video (fixed) */}
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Gradient overlay from top to bottom - 50% black to transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
      {/* Left-right gradient overlay for additional text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto w-full pt-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
        {/* Left side - Title and description */}
        <div className="lg:flex-1 fade-in-up">
          <h1 className="text-2xl md:text-5xl font-medium tracking-tight text-white mb-8 leading-[0.95] brand-font">
            
            <span className="text-white bg-clip-text">
              Laksana Business Park
            </span>
          </h1>
          <p className="text-lg text-white max-w-2xl font-light leading-relaxed border-l border-white/20 pl-6">
            Kawasan industri dan komersial terintegrasi di Tangerang Utara, dikembangkan oleh PT. Agung Intiland dengan fasilitas modern dan lokasi strategis.
          </p>
        </div>
        {/* Right side - Buttons aligned horizontally */}
        <div
          className="flex flex-col sm:flex-row gap-4 fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-slate-200 transition-all flex items-center gap-3 group text-sm tracking-wide whitespace-nowrap"
            >
              Hubungi Kami
            </a>
            <a
              href="#locations"
              className="px-8 py-4 border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm font-medium rounded-sm transition-colors text-sm tracking-wide whitespace-nowrap"
            >
              Virtual 3D
            </a>
          </div>
      </div>
    </div>
  </header>
      <div className="text-neutral-800 min-h-screen flex flex-col overflow-x-hidden selection:bg-[#FACC15] selection:text-black">

        <div
          className="aura-background-component top-0 w-full h-screen -z-10 mix-blend-darken saturate-0 brightness-150 absolute opacity-50"
          data-alpha-mask="80"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, white 0%, white 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, white 0%, white 80%, transparent)",
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
        <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-20 mt-20 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
          <h2 className="text-5xl lg:text-6xl font-normal text-neutral-900 tracking-tighter leading-[0.9] uppercase">
            Proyek Kami
          </h2>
          <a
            href="#"
            className="group flex items-center gap-4 text-xs font-medium text-neutral-800 hover:text-[#FACC15] transition-colors uppercase tracking-widest pb-2 border-b border-neutral-200 hover:border-[#FACC15]"
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
          {/* Card 1: Luxima */}
          <div className="snap-center shrink-0 w-[300px] md:w-[360px] group cursor-default">
            <div className="aspect-[4/5] overflow-hidden transition-all duration-500 hover:border-neutral-300 bg-white w-full border border-black/5 relative">
              {/* Background Abstract */}
              <div className="absolute top-0 right-0 bottom-0 left-0">
                <img
                  src="/images/card-unit/luxima.png"
                  className="w-full h-full object-cover"
                  alt="Abstract"
                />
              </div>
              {/* Overlay Grid */}
          <div className="pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] absolute top-0 right-0 bottom-0 left-0"></div>
            </div>
            <div className="justify-start mt-6 border-l border-black/5 pl-4">
              <h3 className="text-xl text-neutral-900 font-medium mb-2">
                Luxima Bizhub 4in1
              </h3>

              <div className="flex justify-start items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
                  </svg>
                <p className="ml-[2%] mr-5 text-sm leading-relaxed max-w-[90%]">
                  Industrial
                </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
                </svg>
                <p className="ml-[2%] text-sm leading-relaxed max-w-[90%]">
                  Luas 550 ha
                </p>
              </div>

              <p className="mt-5 text-neutral-600 font-light text-xs text-justify leading-relaxed max-w-[90%]">
                Didesain untuk menjawab kebutuhan ruang usaha dan tempat tinggal dalam satu atap yang sama sebagai solusi nyata khususnya bagi start-up business.
              </p>
            </div>
          </div>

          {/* Card 2: Laksana Tahap 1 */}
          <div className="snap-center shrink-0 w-[300px] md:w-[360px] group cursor-default">
            <div className="aspect-[4/5] overflow-hidden transition-all duration-500 hover:border-neutral-300 bg-white w-full border border-black/5 relative">
              {/* Background Abstract */}
              <div className="absolute top-0 right-0 bottom-0 left-0">
                <img
                  src="/images/card-unit/laksana1.png"
                  className="w-full h-full object-cover"
                  alt="Abstract"
                />
              </div>
              {/* Overlay Grid */}
          <div className="pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] absolute top-0 right-0 bottom-0 left-0"></div>
            </div>
            <div className="justify-start mt-6 border-l border-black/5 pl-4">
              <h3 className="text-xl text-neutral-900 font-medium mb-2">
                Laksana Tahap 1
              </h3>

              <div className="flex justify-start items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
                  </svg>
                <p className="ml-[2%] mr-5 text-sm leading-relaxed max-w-[90%]">
                  Industrial
                </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
                </svg>
                <p className="ml-[2%] text-sm leading-relaxed max-w-[90%]">
                  Luas 550 ha
                </p>
              </div>

              <p className="mt-5 text-neutral-600 font-light text-xs text-justify leading-relaxed max-w-[90%]">
                Kawasan terpadu dengan pilihan unit dan luas kavling hingga 4142 m² menjadikan pilihan yang lengkap serta anda memilihin unit yang tersedia.
              </p>
            </div>
          </div>

          {/* Card 3: Laksana Tahap 2 */}
          <div className="snap-center shrink-0 w-[300px] md:w-[360px] group cursor-default">
            <div className="aspect-[4/5] overflow-hidden transition-all duration-500 hover:border-neutral-300 bg-white w-full border border-black/5 relative">
              {/* Background Abstract */}
              <div className="absolute top-0 right-0 bottom-0 left-0">
                <img
                  src="/images/card-unit/laksana2.png"
                  className="w-full h-full object-cover"
                  alt="Abstract"
                />
              </div>
              {/* Overlay Grid */}
          <div className="pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] absolute top-0 right-0 bottom-0 left-0"></div>
            </div>
            <div className="justify-start mt-6 border-l border-black/5 pl-4">
              <h3 className="text-xl text-neutral-900 font-medium mb-2">
                Laksana Tahap 2
              </h3>

              <div className="flex justify-start items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
                  </svg>
                <p className="ml-[2%] mr-5 text-sm leading-relaxed max-w-[90%]">
                  Industrial
                </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
                </svg>
                <p className="ml-[2%] text-sm leading-relaxed max-w-[90%]">
                  Luas 550 ha
                </p>
              </div>

              <p className="mt-5 text-neutral-600 font-light text-xs text-justify leading-relaxed max-w-[90%]">
                Penuhi kebutungan industri anda dengan memilih luasan tanah yang beragam, serta dukungan izin industri yang lengkap untuk memulai kegiatan produksi bisnis anda.
              </p>
            </div>
          </div>

          {/* Card 4: Kavling Industri */}
          <div className="snap-center shrink-0 w-[300px] md:w-[360px] group cursor-default">
            <div className="aspect-[4/5] overflow-hidden transition-all duration-500 hover:border-neutral-300 bg-white w-full border border-black/5 relative">
              {/* Background Abstract */}
              <div className="absolute top-0 right-0 bottom-0 left-0">
                <img
                  src="/images/card-unit/kavling-industri.png"
                  className="w-full h-full object-cover"
                  alt="Abstract"
                />
              </div>
              {/* Overlay Grid */}
          <div className="pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] absolute top-0 right-0 bottom-0 left-0"></div>
            </div>
            <div className="justify-start mt-6 border-l border-black/5 pl-4">
              <h3 className="text-xl text-neutral-900 font-medium mb-2">
                Kavling Industri
              </h3>

              <div className="flex justify-start items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
                  </svg>
                <p className="ml-[2%] mr-5 text-sm leading-relaxed max-w-[90%]">
                  Industrial
                </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
                </svg>
                <p className="ml-[2%] text-sm leading-relaxed max-w-[90%]">
                  Luas 550 ha
                </p>
              </div>

              <p className="mt-5 text-neutral-600 font-light text-xs text-justify leading-relaxed max-w-[90%]">
                Didesain untuk menjawab kebutuhan ruang usaha dan tempat tinggal dalam satu atap yang sama sebagai solusi nyata khususnya bagi start-up business.
              </p>
            </div>
          </div>
          </div>
        </div>
        
        <section className="w-full relative pt-32 pb-0 overflow-hidden">
        {/* Navigation Controls (Light Theme) */}
        <div className="absolute bottom-12 right-6 lg:right-12 flex gap-px border border-black/5 bg-white">
            <button className="carousel-btn-left w-12 h-12 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all border-r border-black/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
          <button className="carousel-btn-right w-12 h-12 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </button>
        </div>
        </section>

        <main className="flex-grow grid grid-cols-1 lg:px-12 lg:grid-cols-12 my-10 pb-12 relative gap-x-8 gap-y-8 px-6 py-6">
          <div className="lg:col-span-5 flex flex-col lg:pt-10 z-20 relative justify-center">
            <h1 className="text-3xl lg:text-[2.3rem] font-normal tracking-tighter text-black mb-12 uppercase [animation:fadeSlideIn_0.8s_ease-out_0.1s_both] animate-on-scroll animate">
              Membangun Bekerlanjutan
              Untuk Kawasan Terpadu
            </h1>

            <p className="text-lg text-neutral-600 text-justify max-w-md leading-relaxed mb-12 font-light [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
              Kawasan industri dan komersial terintegrasi di Tangerang Utara dikembangkan oleh PT. Agung Intiland dengan fasilitas modern dan lokasi strategis.
              Kami memiliki lebih dari 1200 Hektar total kawasan dengan pilihan unit mulai dari Kavling, Gudang Serbaguna dan Ruko untuk menunjang bisnis anda.
            </p>

            <div className="flex flex-col items-start gap-3 [animation:fadeSlideIn_0.8s_ease-out_0.3s_both] animate-on-scroll animate">
              <a
                href="#"
                className="btn-wrapper"
                style={
                  {
                    "--dot-size": "6px",
                    "--line-weight": "1px",
                    "--line-distance": "0.8rem 1rem",
                    "--animation-speed": "0.35s",
                    "--dot-color": "#FACC15",
                    "--line-color": "#FACC15",
                    "--grid-color": "#0003",
                    position: "relative",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                    height: "auto",
                    padding: "var(--line-distance)",
                    userSelect: "none",
                  } as React.CSSProperties
                }
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
                    Tentang Perusahaan
                  </span>
                  <svg
                    className="btn-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </a>

              {/* <span className="text-xs text-neutral-500 uppercase tracking-widest pl-4 opacity-70">
                View Showreel (01:20)
              </span> */}
            </div>
          </div>

          <div className="lg:col-span-4 relative flex items-center justify-center py-20 lg:py-0 [animation:fadeSlideIn_1s_ease-out_0.2s_both] animate-on-scroll animate">
            <div className="absolute inset-0 grid-bg opacity-100 z-0 mx-[-2rem] mask-image-linear-gradient(to bottom, black, transparent)"></div>

            <div className="relative z-10 w-full aspect-[3/4] overflow-hidden shadow-2xl border border-black/10 group">
              <img
                id="main-image"
                src={currentImage}
                alt="Architectural Detail"
                className="group-hover:grayscale-0 opacity-90 w-full h-full object-cover grayscale scale-110"
              />
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col relative z-20 pt-10 pl-6 [animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate">
            <div className="beam-border-v"></div>

            <div className="flex-1 flex flex-col justify-between h-full pb-10">
              <div className="stat-item mt-10" data-img-id="1">
                <span className="stat-value text-7xl font-light tracking-tighter text-neutral-300 block transition-colors">
                  01
                </span>
                <span className="text-sm text-neutral-500 uppercase tracking-widest mt-2 block pl-2 group-hover:text-black">
                  Menjaga Kualitas Produk
                </span>
              </div>

              <div
                className="stat-item py-12 border-t border-black/5 border-dashed"
                data-img-id="2"
              >
                <span className="stat-value text-7xl font-light tracking-tighter text-neutral-300 block transition-colors">
                  02
                </span>
                <span className="text-sm text-neutral-500 uppercase tracking-widest mt-2 block pl-2 group-hover:text-black">
                  Dikembangkan Oleh Manajemen Estate Terbaik
                </span>
              </div>

              <div
                className="stat-item border-t border-black/5 border-dashed pt-12"
                data-img-id="3"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/usp/usp-1.png"
                        alt="Lead Architect"
                        width={80}
                        height={80}
                        className="w-28 h-28 rounded-full object-cover relative z-10 transition-all"
                      />
                      <Image
                        src="/images/usp/usp-2.png"
                        alt="Lead Architect 2"
                        width={80}
                        height={80}
                        className="w-28 h-28 rounded-full object-cover relative z-10 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-base font-normal text-neutral-700 uppercase leading-relaxed tracking-tight max-w-[200px] mt-6 pointer-events-none">
                  Akses Mudah ke Bandara
                  Tersertifikasi UIKI
                </p>
              </div>
            </div>
          </div>
        </main>
        
      <section className="w-full bg-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-12 left-0 right-0 flex justify-center z-30 px-6">
          </div>

          <div className="branding">
            <section className="overflow-hidden bg-white border-neutral-200 border-t pt-24 pb-24 relative">
              <div className="bg-gradient-to-b from-neutral-50 via-white to-neutral-100 absolute top-0 right-0 bottom-0 left-0" />
              <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Label */}
                <div className="flex flex-col items-center mb-14">
                  <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1 shadow-sm">
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                      Klien Kami
                    </span>
                  </div>
                  <h2 className="mt-6 text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 text-center max-w-3xl leading-[1.05]">
                    Dipercaya oleh perusahaan besar
                  </h2>
                  <p className="mt-4 text-base text-neutral-500 text-center max-w-2xl">
                    Kini mereka dapat fokus mengembangkan bisnis & operasional gudang lebih efisien bersama kami.
                  </p>
                </div>
                {/* Logos Row */}
                <div className="mt-14 flex flex-col items-center gap-5">
                  <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <img
                        src="/brand/coca-cola.svg"
                        alt="Lead Architect"
                        className="w-28 h-28 object-cover relative transition-all"
                      />
                      {/* <span className="hidden sm:inline">GitHub Labs</span> */}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <img
                        src="/brand/google.svg"
                        alt="Lead Architect"
                        className="w-28 h-28 object-cover relative transition-all"
                      />
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <img
                        src="/brand/heineken.svg"
                        alt="Lead Architect"
                        className="w-28 h-28 object-cover relative transition-all"
                      />
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <img
                        src="/brand/microsoft.svg"
                        alt="Lead Architect"
                        className="w-28 h-28 object-cover relative transition-all"
                      />
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <img
                        src="/brand/underarmour.svg"
                        alt="Lead Architect"
                        className="w-20 h-20 object-cover relative transition-all"
                      />
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <img
                        src="/brand/yamaha.svg"
                        alt="Lead Architect"
                        className="w-28 h-28 object-cover relative transition-all"
                      />
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <img
                        src="/brand/mastercard.svg"
                        alt="Lead Architect"
                        className="w-20 h-20 object-cover relative transition-all"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="cta-section">
            <section className="overflow-hidden bg-white border-neutral-200 border-t pt-24 pb-24 relative">
              <div className="bg-gradient-to-b from-neutral-50 via-white to-neutral-100 absolute top-0 right-0 bottom-0 left-0" />
            </section>
          </div>

                    {/* Floating Dark Feature Card */}
                    {/* Negative margin pulls it up into the white section above */}
                    <div className="relative z-30 mx-4 lg:mx-auto max-w-6xl -mt-16 transform lg:-translate-y-12">
                      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] p-8 lg:p-16 overflow-hidden relative shadow-2xl border border-white/10">
                        {/* Grid/Globe Background Effect */}
                        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-40">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"></div>
                          {/* Simulate Dotted Map/Globe with CSS pattern */}
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: "radial-gradient(white 1px, transparent 1px)",
                              backgroundSize: "20px 20px",
                              maskImage:
                                "radial-gradient(circle at 50% 50%, black, transparent 70%)"
                            }}
                          ></div>
                        </div>
                        <div className="relative z-10 max-w-xl">
                          <h3
                            className="text-3xl lg:text-5xl text-white mb-4 leading-tight font-playfair font-medium tracking-tight"
                            style={{}}
                          >
                            Sekarang giliran anda untuk bergabung dengan komunitas Laksana Business Park
                          </h3>
                          <p
                            className="text-[#A1A1AA] text-sm lg:text-base mb-8 font-geist"
                            style={{ transition: "outline 0.1s ease-in-out" }}
                          >
                            Lebih dari 1000 perusahaan telah mempercayakan kebutuhan industri dan komersialnya bersama kami.
                          </p>
            <div className="flex flex-col items-start gap-3 [animation:fadeSlideIn_0.8s_ease-out_0.3s_both] animate-on-scroll animate -ml-2">
              <a
                href="#"
                className="btn-wrapper"
                style={
                  {
                    "--dot-size": "6px",
                    "--line-weight": "1px",
                    "--line-distance": "0.8rem 1rem",
                    "--animation-speed": "0.35s",
                    "--dot-color": "#FACC15",
                    "--line-color": "#FACC15",
                    "--grid-color": "rgba(255, 255, 255, 0.29)",
                    position: "relative",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                    height: "auto",
                    padding: "var(--line-distance)",
                    userSelect: "none",
                  } as React.CSSProperties
                }
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
                    Bergabung Sekarang
                  </span>
                  <svg
                    className="btn-svg text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-10 mt-20 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
          <h2 className="text-5xl lg:text-6xl font-normal text-neutral-900 tracking-tighter leading-[0.9] uppercase">
            Artikel
          </h2>
          <a
            href="#"
            className="group flex items-center gap-4 text-xs font-medium text-neutral-800 hover:text-[#FACC15] transition-colors uppercase tracking-widest pb-2 border-b border-neutral-200 hover:border-[#FACC15]"
          >
            Lihat Semua Artikel
            <span className="iconify" data-icon="solar:arrow-right-up-bold-duotone" />
          </a>
      </div>
      <div className="w-full px-6 lg:px-12">
        <article className="group cursor-pointer pt-16 pb-16 flex flex-col lg:flex-row justify-start gap-8 flex-wrap">
        <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-[#facc15] transition-all duration-500 hover:transform hover:scale-[1.02] w-full lg:flex-1">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=2160&q=80"
              alt="Neural Network Visualization"
              className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
              <span className="bg-[#facc15]/20 backdrop-blur-sm border border-[#facc15]/30 text-[#facc15] text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                NEWS
              </span>
            </div>
            <div className="absolute top-3 right-3">
            </div>
            <div className="absolute bottom-3 left-3 right-3">
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-neutral-900">
            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
              </div>
            </div>
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#facc15] transition-colors duration-300 text-white">
              Pengembangan Laksana Tahap 3
            </h2>
            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
              Demi pesatnya kebutuhan industri di Indonesia, Laksana Business Park kembali menghadirkan pengembangan tahap 3 dengan berbagai keunggulan.
            </p>
            <div className="flex items-center justify-start">
              <div className="flex items-center gap-4">
              </div>
              <button className="flex items-center gap-2 text-[#facc15] hover:text-[#facc15] transition-colors font-medium text-xs">
                <span>Baca Berita</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-[#facc15] transition-all duration-500 hover:transform hover:scale-[1.02] w-full lg:flex-1">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=2160&q=80"
              alt="Neural Network Visualization"
              className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
              <span className="bg-[#facc15]/20 backdrop-blur-sm border border-[#facc15]/30 text-[#facc15] text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                TIPS & TRICK
              </span>
            </div>
            <div className="absolute top-3 right-3">
            </div>
            <div className="absolute bottom-3 left-3 right-3">
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-neutral-900">
            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
              </div>
            </div>
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#facc15] transition-colors duration-300 text-white">
              Kawasan Industri dengan Izin Lengkap (UIKI)
            </h2>
            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
              Memiliki izin lengkap (UIKI) memberikan kemudahan bagi perusahaan dalam menjalankan operasional bisnisnya di kawasan industri.
            </p>
            <div className="flex items-center justify-start">
              <div className="flex items-center gap-4">
              </div>
              <button className="flex items-center gap-2 text-[#facc15] hover:text-[#facc15] transition-colors font-medium text-xs">
                <span>Baca Berita</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-[#facc15] transition-all duration-500 hover:transform hover:scale-[1.02] w-full lg:flex-1">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=2160&q=80"
              alt="Neural Network Visualization"
              className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
              <span className="bg-[#facc15]/20 backdrop-blur-sm border border-[#facc15]/30 text-[#facc15] text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                Article
              </span>
            </div>
            <div className="absolute top-3 right-3">
            </div>
            <div className="absolute bottom-3 left-3 right-3">
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-neutral-900">
            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
              </div>
            </div>
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#facc15] transition-colors duration-300 text-white">
              Dikelola dengan manajemen estate profesional
            </h2>
            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
              Kami menjalankan dengan manajemen estate profesional untuk memastikan operasional kawasan berjalan lancar dan efisien.
            </p>
            <div className="flex items-center justify-start">
              <div className="flex items-center gap-4">
              </div>
              <button className="flex items-center gap-2 text-[#facc15] hover:text-[#facc15] transition-colors font-medium text-xs">
                <span>Baca Berita</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>
      </div>
        </section>
      <footer className="w-full justify-between mb-10 mt-20 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
      <div className="container mx-auto">
        <div className="px-6 py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Brand */}
            <div className="lg:w-1/3 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="solar:cpu-bolt-bold-duotone"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M9.18 9.18c.054-.052.149-.118.451-.159c.323-.043.761-.044 1.439-.044h1.86c.678 0 1.116.001 1.438.044c.303.041.398.107.45.16c.054.053.12.148.16.45c.044.323.045.761.045 1.439v1.86c0 .678-.001 1.116-.045 1.438c-.04.303-.106.398-.16.45c-.052.054-.147.12-.45.16c-.322.044-.76.045-1.438.045h-1.86c-.678 0-1.116-.001-1.439-.045c-.302-.04-.397-.106-.45-.16c-.053-.052-.119-.147-.16-.45c-.043-.322-.044-.76-.044-1.438v-1.86c0-.678.001-1.116.044-1.439c.041-.302.107-.397.16-.45"
                      opacity=".5"
                      className=""
                    />
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12.698 2.698a.698.698 0 0 0-1.396 0v2.79q-.764 0-1.395.017V2.698a.698.698 0 0 0-1.395 0v2.79q0 .056.008.108c-.936.115-1.585.353-2.078.846s-.731 1.142-.846 2.078a1 1 0 0 0-.108-.008h-2.79a.698.698 0 0 0 0 1.395h2.807q-.016.63-.016 1.395H2.698a.698.698 0 0 0 0 1.396h2.79q0 .764.017 1.395H2.698a.698.698 0 0 0 0 1.395h2.79a1 1 0 0 0 .108-.008c.115.936.353 1.585.846 2.078s1.142.731 2.078.846a1 1 0 0 0-.008.108v2.79a.698.698 0 0 0 1.395 0v-2.807q.63.016 1.395.016v2.791a.698.698 0 0 0 1.396 0v-2.79q.764 0 1.395-.017v2.807a.698.698 0 0 0 1.395 0v-2.79a1 1 0 0 0-.008-.108c.936-.115 1.585-.353 2.078-.846s.731-1.142.846-2.078q.053.009.108.008h2.79a.698.698 0 0 0 0-1.395h-2.807q.016-.63.016-1.395h2.791a.698.698 0 0 0 0-1.396h-2.79q0-.764-.017-1.395h2.807a.698.698 0 0 0 0-1.395h-2.79a1 1 0 0 0-.108.008c-.115-.936-.353-1.585-.846-2.078s-1.142-.731-2.078-.846a1 1 0 0 0 .008-.108v-2.79a.698.698 0 0 0-1.395 0v2.807a56 56 0 0 0-1.395-.016zm-3.252 4.94c.426-.057.96-.057 1.578-.057h1.952c.619 0 1.151 0 1.578.058c.458.061.896.2 1.252.555c.355.356.494.794.555 1.252c.058.426.058.96.058 1.578v1.952c0 .619 0 1.151-.058 1.578c-.061.458-.2.896-.555 1.252c-.356.355-.794.494-1.252.555c-.427.058-.96.058-1.578.058h-1.952c-.619 0-1.152 0-1.578-.058c-.458-.061-.896-.2-1.252-.555c-.355-.356-.494-.794-.555-1.252c-.058-.427-.058-.96-.058-1.578v-1.952c0-.619 0-1.152.058-1.578c.061-.458.2-.896.555-1.252c.356-.355.794-.494 1.252-.555"
                      clipRule="evenodd"
                      className=""
                    />
                    <path
                      fill="currentColor"
                      d="M12.966 10.545a.698.698 0 0 0-1.135-.811l-1.329 1.86a.698.698 0 0 0 .568 1.103h.505l-.541.758a.698.698 0 1 0 1.135.81l1.329-1.86a.698.698 0 0 0-.568-1.103h-.505z"
                      className=""
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight text-neutral-900">
                    Cognitive Future
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                    Neural Systems Studio
                  </span>
                </div>
              </div>
              <p className="text-sm text-neutral-500 max-w-sm">
                We partner with product and platform teams to turn fragmented
                machine learning experiments into resilient, observable neural
                systems that compound value.
              </p>
              <div className="flex items-center gap-3 text-neutral-500">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:x"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M14.234 10.162L22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299l-.929-1.329L3.076 1.56h3.182l5.965 8.532l.929 1.329l7.754 11.09h-3.182z"
                      className=""
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:linkedin"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"
                      className=""
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:github"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      className=""
                    />
                  </svg>
                </a>
              </div>
            </div>
            {/* Links */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Product
                </h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Neural Orchestrator
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Data Contracts
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Observability
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Security Profiles
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Resources
                </h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Playbooks
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Implementation Guide
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Webinars
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Status
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Company
                </h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Studio
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Clients
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="#"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Logos + Bottom row */}
          <div className="mt-10 border-t border-neutral-100 pt-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-5 text-neutral-400">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                Running on
              </span>
              <div className="flex flex-wrap gap-4 opacity-70">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:awsamplify"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M5.223 17.905h6.76l1.731 3.047H0l4.815-8.344l2.018-3.494l1.733 3.002zm2.52-10.371L9.408 4.65l9.415 16.301h-3.334zm2.59-4.486h3.33L24 20.952h-3.334z"
                      className=""
                    />
                  </svg>
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:kubernetes"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="m10.204 14.35l.007.01l-.999 2.413a5.17 5.17 0 0 1-2.075-2.597l2.578-.437l.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.14 5.14 0 0 0-.73 3.255l2.514-.725zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005l.15-2.62a5.14 5.14 0 0 0-3.01 1.442l2.147 1.523zm.76 2.75l.723.349l.722-.347l.18-.78l-.5-.623h-.804l-.5.623l.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003l2.134-1.513a5.2 5.2 0 0 0-2.992-1.442l.148 2.615zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.58 1.58 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.6 1.6 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34m-3.289-2.057c-.042-.01-.103-.026-.145-.034c-.174-.033-.315-.025-.479-.038c-.35-.037-.638-.067-.895-.148c-.105-.04-.18-.165-.216-.216l-.201-.059a6.5 6.5 0 0 0-.105-2.332a6.5 6.5 0 0 0-.936-2.163c.052-.047.15-.133.177-.159c.008-.09.001-.183.094-.282c.197-.185.444-.338.743-.522c.142-.084.273-.137.415-.242c.032-.024.076-.062.11-.089c.24-.191.295-.52.123-.736s-.506-.236-.745-.045c-.034.027-.08.062-.111.088c-.134.116-.217.23-.33.35c-.246.25-.45.458-.673.609c-.097.056-.239.037-.303.033l-.19.135a6.55 6.55 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25c-.022-.268.015-.557.057-.905c.023-.163.061-.298.068-.475c.001-.04-.001-.099-.001-.142c0-.306-.224-.555-.5-.555c-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128c.006.177.044.312.067.475c.042.348.078.637.056.906a.55.55 0 0 1-.162.258l-.012.211a6.42 6.42 0 0 0-4.166 2.003l-.18-.128c-.09.012-.18.04-.297-.029c-.223-.15-.427-.358-.673-.608c-.113-.12-.195-.234-.329-.349l-.111-.088a.6.6 0 0 0-.348-.132a.48.48 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005l.104.083c.142.105.272.159.414.242c.299.185.546.338.743.522c.076.082.09.226.1.288l.16.143a6.46 6.46 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217c-.257.081-.546.11-.895.147c-.164.014-.305.006-.48.039c-.037.007-.09.02-.133.03l-.004.002l-.007.002c-.295.071-.484.342-.423.608c.061.267.349.429.645.365l.007-.001l.01-.003l.129-.029c.17-.046.294-.113.448-.172c.33-.118.604-.217.87-.256c.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282c-.097.252-.263.517-.452.813c-.091.136-.185.242-.268.399c-.02.037-.045.095-.064.134c-.128.275-.034.591.213.71c.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127c.07-.162.094-.301.144-.458c.132-.332.205-.68.387-.897c.05-.06.13-.082.215-.105l.113-.205a6.45 6.45 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155c.136.232.229.507.342.84c.05.156.074.295.145.457c.016.037.043.09.062.129c.133.276.442.402.69.282c.247-.118.341-.435.213-.71c-.02-.039-.045-.096-.065-.134c-.083-.156-.177-.261-.268-.398c-.19-.296-.346-.541-.443-.793c-.04-.13.007-.21.038-.294c-.018-.022-.059-.144-.083-.202a6.5 6.5 0 0 0 2.88-3.622c.064.01.176.03.213.038c.075-.05.144-.114.28-.104c.266.039.54.138.87.256c.154.06.277.128.448.173c.036.01.088.019.13.028l.009.003l.007.001c.297.064.584-.098.645-.365c.06-.266-.128-.537-.423-.608M16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01l2.526.728a5.2 5.2 0 0 0-.108-1.674A5.2 5.2 0 0 0 16.4 9.7zm-4.013 5.325a.44.44 0 0 0-.404-.232a.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.16 5.16 0 0 0 3.326.003l-1.27-2.296zm1.888-1.293a.44.44 0 0 0-.27.036a.44.44 0 0 0-.214.572l-.003.004l1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44z"
                      className=""
                    />
                  </svg>
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:postgresql"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M23.56 14.723a.5.5 0 0 0-.057-.12q-.21-.395-1.007-.231c-1.654.34-2.294.13-2.526-.02c1.342-2.048 2.445-4.522 3.041-6.83c.272-1.05.798-3.523.122-4.73a1.6 1.6 0 0 0-.15-.236C21.693.91 19.8.025 17.51.001c-1.495-.016-2.77.346-3.116.479a10 10 0 0 0-.516-.082a8 8 0 0 0-1.312-.127c-1.182-.019-2.203.264-3.05.84C8.66.79 4.729-.534 2.296 1.19C.935 2.153.309 3.873.43 6.304c.041.818.507 3.334 1.243 5.744q.69 2.26 1.433 3.582q.83 1.493 1.714 1.79c.448.148 1.133.143 1.858-.729a56 56 0 0 1 1.945-2.206c.435.235.906.362 1.39.377v.004a11 11 0 0 0-.247.305c-.339.43-.41.52-1.5.745c-.31.064-1.134.233-1.146.811a.6.6 0 0 0 .091.327c.227.423.922.61 1.015.633c1.335.333 2.505.092 3.372-.679c-.017 2.231.077 4.418.345 5.088c.221.553.762 1.904 2.47 1.904q.375.001.829-.094c1.782-.382 2.556-1.17 2.855-2.906c.15-.87.402-2.875.539-4.101c.017-.07.036-.12.057-.136c0 0 .07-.048.427.03l.044.007l.254.022l.015.001c.847.039 1.911-.142 2.531-.43c.644-.3 1.806-1.033 1.595-1.67M2.37 11.876c-.744-2.435-1.178-4.885-1.212-5.571c-.109-2.172.417-3.683 1.562-4.493c1.837-1.299 4.84-.54 6.108-.13l-.01.01C6.795 3.734 6.843 7.226 6.85 7.44c0 .082.006.199.016.36c.034.586.1 1.68-.074 2.918c-.16 1.15.194 2.276.973 3.089q.12.126.252.237c-.347.371-1.1 1.193-1.903 2.158c-.568.682-.96.551-1.088.508c-.392-.13-.813-.587-1.239-1.322c-.48-.839-.963-2.032-1.415-3.512m6.007 5.088a1.6 1.6 0 0 1-.432-.178c.089-.039.237-.09.483-.14c1.284-.265 1.482-.451 1.915-1a8 8 0 0 1 .367-.443a.4.4 0 0 0 .074-.13c.17-.151.272-.11.436-.042c.156.065.308.26.37.475c.03.102.062.295-.045.445c-.904 1.266-2.222 1.25-3.168 1.013m2.094-3.988l-.052.14c-.133.357-.257.689-.334 1.004c-.667-.002-1.317-.288-1.81-.803c-.628-.655-.913-1.566-.783-2.5c.183-1.308.116-2.447.08-3.059l-.013-.22c.296-.262 1.666-.996 2.643-.772c.446.102.718.406.83.928c.585 2.704.078 3.83-.33 4.736a9 9 0 0 0-.23.546m7.364 4.572q-.024.266-.062.596l-.146.438a.4.4 0 0 0-.018.108c-.006.475-.054.649-.115.87a4.8 4.8 0 0 0-.18 1.057c-.11 1.414-.878 2.227-2.417 2.556c-1.515.325-1.784-.496-2.02-1.221a7 7 0 0 0-.078-.227c-.215-.586-.19-1.412-.157-2.555c.016-.561-.025-1.901-.33-2.646q.006-.44.019-.892a.4.4 0 0 0-.016-.113a2 2 0 0 0-.044-.208c-.122-.428-.42-.786-.78-.935c-.142-.059-.403-.167-.717-.087c.067-.276.183-.587.309-.925l.053-.142c.06-.16.134-.325.213-.5c.426-.948 1.01-2.246.376-5.178c-.237-1.098-1.03-1.634-2.232-1.51c-.72.075-1.38.366-1.709.532a6 6 0 0 0-.196.104c.092-1.106.439-3.174 1.736-4.482a4 4 0 0 1 .303-.276a.35.35 0 0 0 .145-.064c.752-.57 1.695-.85 2.802-.833q.616.01 1.174.081c1.94.355 3.244 1.447 4.036 2.383c.814.962 1.255 1.931 1.431 2.454c-1.323-.134-2.223.127-2.68.78c-.992 1.418.544 4.172 1.282 5.496c.135.242.252.452.289.54c.24.583.551.972.778 1.256c.07.087.138.171.189.245c-.4.116-1.12.383-1.055 1.717a35 35 0 0 1-.084.815c-.046.208-.07.46-.1.766m.89-1.621c-.04-.832.27-.919.597-1.01l.135-.041a1 1 0 0 0 .134.103c.57.376 1.583.421 3.007.134c-.202.177-.519.4-.953.601c-.41.19-1.096.333-1.747.364c-.72.034-1.086-.08-1.173-.151m.57-9.271a7 7 0 0 1-.105 1.001c-.055.358-.112.728-.127 1.177c-.014.436.04.89.093 1.33c.107.887.216 1.8-.207 2.701a4 4 0 0 1-.188-.385a8 8 0 0 0-.325-.617c-.616-1.104-2.057-3.69-1.32-4.744c.38-.543 1.342-.566 2.179-.463m.228 7.013l-.085-.107l-.035-.044c.726-1.2.584-2.387.457-3.439c-.052-.432-.1-.84-.088-1.222c.013-.407.066-.755.118-1.092c.064-.415.13-.844.111-1.35a.6.6 0 0 0 .012-.19c-.046-.486-.6-1.938-1.73-3.253a7.8 7.8 0 0 0-2.688-2.04A9.3 9.3 0 0 1 17.62.746c2.052.046 3.675.814 4.824 2.283a1 1 0 0 1 .067.1c.723 1.356-.276 6.275-2.987 10.54m-8.816-6.116c-.025.18-.31.423-.621.423l-.081-.006a.8.8 0 0 1-.506-.315c-.046-.06-.12-.178-.106-.285a.22.22 0 0 1 .093-.149c.118-.089.352-.122.61-.086c.316.044.642.193.61.418m7.93-.411c.011.08-.049.2-.153.31a.72.72 0 0 1-.408.223l-.075.005c-.293 0-.541-.234-.56-.371c-.024-.177.264-.31.56-.352c.298-.042.612.009.636.185"
                      className=""
                    />
                  </svg>
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-icon="simple-icons:cloudflare"
                    className=""
                  >
                    <path
                      fill="currentColor"
                      d="M16.509 16.845c.147-.507.09-.971-.155-1.316c-.225-.316-.605-.499-1.062-.52l-8.66-.113a.16.16 0 0 1-.133-.07a.2.2 0 0 1-.02-.156a.24.24 0 0 1 .203-.156l8.736-.113c1.035-.049 2.16-.886 2.554-1.913l.499-1.302a.27.27 0 0 0 .014-.168a5.689 5.689 0 0 0-10.937-.584a2.58 2.58 0 0 0-1.794-.498a2.56 2.56 0 0 0-2.223 3.18A3.634 3.634 0 0 0 0 16.751q.002.264.035.527a.174.174 0 0 0 .17.148h15.98a.22.22 0 0 0 .204-.155zm2.757-5.564c-.077 0-.161 0-.239.011c-.056 0-.105.042-.127.098l-.337 1.174c-.148.507-.092.971.154 1.317c.225.316.605.498 1.062.52l1.844.113c.056 0 .105.026.133.07a.2.2 0 0 1 .021.156a.24.24 0 0 1-.204.156l-1.92.112c-1.042.049-2.159.887-2.553 1.914l-.141.358c-.028.072.021.142.099.142h6.597a.174.174 0 0 0 .17-.126a5 5 0 0 0 .175-1.28a4.74 4.74 0 0 0-4.734-4.727"
                      className=""
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-neutral-400">
              <p>© 2025 Cognitive Future, Inc. All rights reserved.</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="hover:text-neutral-700 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-neutral-700 transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-neutral-700 transition-colors"
                >
                  Data Processing
                </a>
                <a
                  href="#"
                  className="hover:text-neutral-700 transition-colors"
                >
                  Cookie Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>);
}
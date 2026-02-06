"use client"
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const defaultJourneyData = [
    {
        year: "2010",
        title: "Agung Intiland didirikan",
        desc: "Dimulai perusahaan kami dengan visi untuk menjadi pelopor dalam industri properti pergudangan, mengutamakan inovasi dan keberlanjutan dalam setiap proyek yang kami jalankan.",
        image: "/images/timeline/tl-1.jpg"
    },
    {
        year: "2015",
        title: "Pembangunan Proyek Perdana",
        desc: "Laksana Business Park Tahap 1 dibangun, menandai tonggak penting dalam perjalanan kami. Proyek ini menampilkan desain modern dan fasilitas ramah lingkungan yang menetapkan standar baru untuk pergudangan di kawasan ini.",
        image: "/images/timeline/tl-2.jpg"
    },
    {
        year: "2017",
        title: "Pembangunan Infrastruktur & Fasilitas Komersial",
        desc: "Pembangunan infrastruktur pendukung seperti jalan akses utama, sistem drainase tertutup, dan fasilitas komersial untuk mendukung kebutuhan operasional tenant kami.",
        image: "/images/timeline/tl-3.jpg"
    },
    {
        year: "2019",
        title: "Pembangunan Laksana Business Park Tahap 2",
        desc: "Pengembangan Laksana Business Park Tahap 2 dengan penambahan area kawasan, seiring bertambahnya permintaan pasar terhadap fasilitas pergudangan modern dan terintegrasi.",
        image: "/images/timeline/tl-4.jpg"
    },
    {
        year: "2022",
        title: "Peluncuran Pasar Laksana Business Park Tahap 2",
        desc: "Peresmian peluncuran Laksana Business Park Tahap 2, menandai ekspansi besar-besaran dengan fasilitas yang lebih canggih, area kawasan yang luas, dan row jalan lebar untuk mendukung operasional tenant kami.",
        image: "/images/timeline/tl-5.jpg"
    },
    {
        year: "2025",
        title: "Peluncuran Luxima Bizhub, Gudang dengan konsep 4 in 1",
        desc: "Peluncuran Luxima Bizhub, gudang dengan konsep 4 in 1 yang mengintegrasikan fungsi pergudangan, kantor, ruko, dan fasilitas pendukung lainnya dalam satu kawasan terpadu untuk memenuhi kebutuhan bisnis modern.",
        image: "/images/timeline/tl-6.jpg"
    }
];

interface TimelineProps {
    timelineData?: Array<{
        year: string;
        title: string;
        description: string;
    }>;
}

export default function Timeline({ timelineData }: TimelineProps) {
    // Transform CMS data or use defaults
    const journeyData = timelineData && timelineData.length > 0
        ? timelineData.map((item, index) => ({
            year: item.year,
            title: item.title,
            desc: item.description,
            image: `/images/timeline/tl-${index + 1}.jpg`
        }))
        : defaultJourneyData;
    const [currentIndex, setCurrentIndex] = useState(0);
    const yearsContainerRef = useRef<HTMLDivElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);

    const updateSlide = (index: number) => {
        if (index < 0 || index >= journeyData.length) return;
        setCurrentIndex(index);
    };

    useEffect(() => {
        const textContent = textContentRef.current;
        if (textContent) {
            textContent.classList.remove('fade-in');
            void textContent.offsetWidth;
            textContent.classList.add('fade-in');
        }

        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const yearsContainer = yearsContainerRef.current;
            if (yearsContainer) {
                const yearButtons = yearsContainer.querySelectorAll('button');
                if (yearButtons[currentIndex]) {
                    yearButtons[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        }
    }, [currentIndex]);
    
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === journeyData.length - 1;

    const currentData = journeyData[currentIndex];

    return (
        <section className="relative w-full py-20 lg:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-6">
                            Sejarah dimulainya perjalanan <br className="hidden md:block"/> perusahaan untuk membangun masa depan.
                        </h2>
                        <p className="text-base md:text-lg text-zinc-500 font-normal leading-relaxed max-w-xl">
                            Perjalanan kami dimulai dari sebuah visi yang berani untuk membangun masa depan properti yang berkelanjutan.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        <button onClick={() => updateSlide(currentIndex - 1)} disabled={isFirst} className="group p-3 border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <ArrowLeft className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                        </button>
                        <button onClick={() => updateSlide(currentIndex + 1)} disabled={isLast} className="group p-3 border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full border-b border-zinc-200 bg-white sticky top-0 z-10 backdrop-blur-md bg-white/80 supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="relative">
                        <div ref={yearsContainerRef} className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4 scroll-smooth snap-x">
                            {journeyData.map((item, index) => (
                                <button
                                    key={item.year}
                                    onClick={() => updateSlide(index)}
                                    className={`relative px-1 py-4 text-sm font-medium transition-colors duration-300 snap-start flex-shrink-0 whitespace-nowrap cursor-pointer ${index === currentIndex ? 'text-[#1d2088]' : 'text-zinc-400 hover:text-zinc-600'}`}
                                >
                                    {item.year}
                                    {index === currentIndex && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1d2088] rounded-t-full"></span>}
                                </button>
                            ))}
                        </div>
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <div className="lg:col-span-5 flex flex-col justify-center h-full order-2 lg:order-1 pt-4 lg:pt-12">
                        <div ref={textContentRef} className="fade-in">
                            <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-[#1d2088] mb-6">
                                {currentData.title}
                            </h3>
                            <p className="text-base text-zinc-500 leading-relaxed mb-8">
                                {currentData.desc}
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-zinc-900/5">
                            <Image
                                src={currentData.image}
                                alt={currentData.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute bottom-4 right-4 flex gap-2 md:hidden">
                                <button onClick={() => updateSlide(currentIndex - 1)} disabled={isFirst} className="p-2 bg-white/90 backdrop-blur shadow-sm border border-zinc-200/50">
                                    <ArrowLeft className="w-4 h-4 text-zinc-700" />
                                </button>
                                <button onClick={() => updateSlide(currentIndex + 1)} disabled={isLast} className="p-2 bg-white/90 backdrop-blur shadow-sm border border-zinc-200/50">
                                    <ArrowRight className="w-4 h-4 text-zinc-700" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .fade-in {
                    animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}

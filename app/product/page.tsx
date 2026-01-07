"use client";

import Footer from "../components/Footer";
import Image from "next/image";

export default function Product() {
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
                                <span className="text-white bg-clip-text">
                                    SEMUA PRODUK
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* Konten Produk */}
            <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9] uppercase">
                    Tahap Satu
                </h2>
            </div>
            {/* Card Produk */}
            <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                <a
                    href="#"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/blok-b.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Gudang Siap Pakai
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Blok B
                        </h3>
                    </div>
                </a>
                <a
                    href="#"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/blok-c.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 object-auto bg-center w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="w-full pt-4 sm:pt-6 pr-4 sm:pr-6 pb-4 sm:pb-6 pl-4 sm:pl-6 absolute bottom-0 left-0">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Gudang Siap Pakai
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Blok C
                        </h3>
                    </div>
                </a>
                <a
                    href="#"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/blok-l.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Gudang Siap Pakai
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Blok L
                        </h3>
                    </div>
                </a>
                <a
                    href="#"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/kavling-card.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="w-full pt-4 sm:pt-6 pr-4 sm:pr-6 pb-4 sm:pb-6 pl-4 sm:pl-6 absolute bottom-0 left-0">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Kavling Siap Bangun
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Kavling
                        </h3>
                    </div>
                </a>
            </div>

            {/* Konten Produk 2 */}
            <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9] uppercase">
                    Tahap Dua
                </h2>
            </div>
            {/* Card Produk */}
            <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                <a
                    href="#"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/kavling-card.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Kavling Siap Bangun
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Kavling
                        </h3>
                    </div>
                </a>
                <a
                    href="#"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/cluster-card.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 object-auto bg-center w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="w-full pt-4 sm:pt-6 pr-4 sm:pr-6 pb-4 sm:pb-6 pl-4 sm:pl-6 absolute bottom-0 left-0">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Cluster Siap Bangun
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Cluster
                        </h3>
                    </div>
                </a>
            </div>

            {/* Konten Produk 3 */}
            <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-5 mt-15 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tighter leading-[0.9] uppercase" id="luxima-product">
                    Luxima Bizhub 4 in 1
                </h2>
            </div>
            {/* Card Produk */}
            <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid md:grid-cols-4 md:items-end [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                <a
                    href="/unit-detail"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/unit-opxima.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Gudang 4 in 1
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Opxima
                        </h3>
                    </div>
                </a>
                <a
                    href="#"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/unit-nexima.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 object-auto bg-center w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="w-full pt-4 sm:pt-6 pr-4 sm:pr-6 pb-4 sm:pb-6 pl-4 sm:pl-6 absolute bottom-0 left-0">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Gudang 4 in 1
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Nexima
                        </h3>
                    </div>
                </a>
                <a
                    href="#"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/unit-nexima-plus.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Gudang 4 in 1 
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Nexima Plus
                        </h3>
                    </div>
                </a>
                <a
                    href="#"
                    className="group relative aspect-[3/4] overflow-hidden border-r border-b border-[#C7D0C8] bg-[#EBE9E4]"
                >
                    <img
                        src="/images/card-unit/unit-maxima.png"
                        className="grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="w-full pt-4 sm:pt-6 pr-4 sm:pr-6 pb-4 sm:pb-6 pl-4 sm:pl-6 absolute bottom-0 left-0">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/80 mb-1 block">
                            Gudang 4 in 1
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                            Maxima
                        </h3>
                    </div>
                </a>
            </div>
            <Footer />
        </>
    );
}

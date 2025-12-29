"use client";

import Footer from "../components/Footer";
import Image from "next/image";
import { useState } from "react";

export default function Unit() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const slides = [
        {
            src: "/images/unit-detail/opxima-1.png",
            label: "Opxima 1",
            desc: "Slide pertama",
        },
        {
            src: "/images/unit-detail/opxima-2.png",
            label: "Opxima 2",
            desc: "Slide kedua",
        },
        {
            src: "/images/unit-detail/opxima-3.png",
            label: "Opxima 3",
            desc: "Slide ketiga",
        },
        {
            src: "/images/unit-detail/opxima-4.png",
            label: "Opxima 4",
            desc: "Slide keempat",
        },
        {
            src: "/images/unit-detail/opxima-5.png",
            label: "Opxima 5",
            desc: "Slide kelima",
        },
    ];

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };
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
                                    Tipe Opxima
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* Gallery Carousel Section - Centered */}
            <div className="w-full flex items-center justify-center px-6 py-6">
                <div className="w-full max-w-300">
                    <div className="lg:col-span-5 flex flex-col lg:pt-5 flex items-start relative justify-center">
                        <p className="text-neutral-900 justify-center max-w-md mb-5">
                            Beranda / Produk /{" "}
                            <span className="font-bold">Opxima</span>
                        </p>
                    </div>
                    {/* Carousel Container */}
                    <div className="relative bg-gray-900 overflow-hidden">
                        {/* Carousel Wrapper */}
                        <div className="relative w-full aspect-video">
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                        index === currentSlide
                                            ? "opacity-100"
                                            : "opacity-0"
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
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1 rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? "bg-white w-5"
                                            : "bg-white/50 w-2"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Previous Button */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
                            aria-label="Next slide"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
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
                            <a href="#overview">Unit Plan</a>
                        </p>
                    </div>
                    <div className="mt-8 mb-16" id="overview">
                        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                            Tipe Opxima
                        </h2>
                        <p className="text-justify text-neutral-600 mb-6">
                            Opxima adalah solusi properti komersial terkemuka
                            yang dirancang untuk memenuhi kebutuhan bisnis
                            modern. Terletak strategis di pusat kawasan
                            industri, Opxima menawarkan Fasilitas kelas dunia,
                            infrastruktur mutakhir, dan akses mudah ke jaringan
                            transportasi utama. Dengan berbagai pilihan unit
                            yang dapat disesuaikan, Opxima adalah tempat ideal
                            bagi perusahaan yang mencari ruang kantor, gudang,
                            atau fasilitas manufaktur. Komitmen kami terhadap
                            keberlanjutan dan inovasi memastikan bahwa bisnis
                            Anda tidak hanya tumbuh, tetapi juga berkembang
                            dalam lingkungan yang mendukung kesuksesan jangka
                            panjang.
                        </p>

                        {showMore && (
                            <>
                                <p className="text-justify text-neutral-600 mb-6">
                                    This residence is located in West BSD City,
                                    an emerging Sunrise Area fueled by rapid
                                    development and the opening of new toll
                                    access in Legok and the Serpong cross-area
                                    corridor. The one-stop concept to live,
                                    work, learn & play ensures every life
                                    necessity is fulfilled within a single
                                    integrated district. A comfortable, dynamic,
                                    and effortless environment presents a modern
                                    lifestyle ideal for growing families.
                                </p>
                                <p className="text-justify text-neutral-600 mb-6">
                                    Easy access to major toll roads, rail links,
                                    and logistics hubs makes Opxima a strategic
                                    choice for businesses requiring fast
                                    distribution and commuter convenience.
                                </p>
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
                                                    <h2 className="font-bold text-xl text-neutral-900 mb-6">
                                    Facilities & Services
                                </h2>
                                <p className="text-justify text-neutral-600 mb-6">
                                    On-site amenities include 24/7 security,
                                    ample parking, reliable utilities, and
                                    customizable units to support warehousing,
                                    light manufacturing, and office use.
                                </p>
                    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center" id="facilities">
                        <div className="flex flex-col items-center gap-2">
                            <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/512/3381/3381540.png" width="56" height="56" alt="One Gate System" title="One Gate System" />
                            <span className="text-xs text-neutral-600 uppercase tracking-widest">One Gate System</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/512/2062/2062582.png" width="46" height="46" alt="Keamanan CCTV 24Jam" title="Keamanan CCTV 24Jam" />
                            <span className="text-xs text-neutral-600 uppercase tracking-widest">Keamanan CCTV 24Jam</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/512/7969/7969430.png" width="46" height="46" alt="Porter Bongkar Muat" title="Porter Bongkar Muat" />
                            <span className="text-xs text-neutral-600 uppercase tracking-widest">Tersedia Porter Bongkar Muat</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/512/25/25276.png" width="46" height="46" alt="Rating Rata-rata" title="Rating Rata-rata" />
                            <span className="text-xs text-neutral-600 uppercase tracking-widest">Akses Jalan Luas</span>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

"use client";
import Footer from "../components/Footer";
import Image from "next/image";
export default function ArticleDetail() {
    return (
        <>
            {/* Hero Section with Background Image */}
            <div className="relative flex flex-col justify-center px-6 overflow-hidden">
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
                        <div className="lg:flex-1 fade-in-up mb-[10%] mt-[10%] justify-center text-center"></div>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24 flex justify-start">
                {/* Main Content Area */}
                <div className="flex flex-col items-center text-4xl font-medium tracking-tight mb-4 leading-[0.95]">
                    <div className="inline-flex rounded-full border border-neutral-200 bg-white/80 px-4 py-2 shadow-sm mb-4">
                        <span className="text-[11px] text-center font-medium uppercase tracking-[0.18em] text-neutral-500">
                            Tips & Trick
                        </span>
                    </div>
                    <span className="text-grey-900 py-3">
                        Kawasan Industri dengan Izin Lengkap (IUKI)
                    </span>
                    <span className="text-base py-3">
                       08 Januari, 2026
                    </span>
                </div>
                
            </div>
            <Footer />
        </>
    );
}

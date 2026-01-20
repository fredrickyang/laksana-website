"use client";
import Footer from "../components/Footer";
import Image from "next/image";
export default function Article() {
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
                                    ARTIKEL
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between -mb-10 mt-20 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                <h1 className="text-5xl text-neutral-900 tracking-tighter leading-[0.9]">
                    Semua Artikel
                </h1>
                {/* Dropdown Selector Kategori Article */}
                <div className="relative inline-flex items-center gap-4">
                    <p className="text-gray-600">Kategori</p>
                    <svg
                        className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 412 232"
                    >
                        <path
                            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                            fill="#648299"
                            fillRule="nonzero"
                        />
                    </svg>
                    <select className="border border-gray-300 text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                        <option>Semua</option>
                        <option>News</option>
                        <option>Tips & Trick</option>
                        <option>Article</option>
                    </select>
                </div>
            </div>
            <div className="w-full px-6 lg:px-12 bg-grey-50">
                <article className="cursor-pointer pt-16 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:scale-[1.02] w-full lg:flex-1">
                        <div className="relative">
                            <img
                                src="images/card-blog/tahap3.png"
                                alt="Neural Network Visualization"
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                                <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                    NEWS
                                </span>
                            </div>
                            <div className="absolute top-3 right-3"></div>
                            <div className="absolute bottom-3 left-3 right-3"></div>
                        </div>
                        <div className="p-3 sm:p-4 bg-neutral-900">
                            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                                Pengembangan Laksana Tahap 3
                            </h2>
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                                Demi pesatnya kebutuhan industri di Indonesia,
                                Laksana Business Park kembali menghadirkan
                                pengembangan tahap 3 dengan berbagai keunggulan.
                            </p>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-4"></div>
                                <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
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

                    <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:transform hover:scale-[1.02] w-full lg:flex-1">
                        <div className="relative">
                            <img
                                src="images/card-blog/iuki.png"
                                alt="Neural Network Visualization"
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                                <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                    TIPS & TRICK
                                </span>
                            </div>
                            <div className="absolute top-3 right-3"></div>
                            <div className="absolute bottom-3 left-3 right-3"></div>
                        </div>
                        <div className="p-3 sm:p-4 bg-neutral-900">
                            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                                Kawasan Industri dengan Izin Lengkap (UIKI)
                            </h2>
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                                Memiliki izin lengkap (UIKI) memberikan
                                kemudahan bagi perusahaan dalam menjalankan
                                operasional bisnisnya di kawasan industri.
                            </p>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-4"></div>
                                <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
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

                    <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:transform hover:scale-[1.02] w-full lg:flex-1">
                        <div className="relative">
                            <img
                                src="images/card-blog/estate-terbaik.png"
                                alt="Neural Network Visualization"
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                                <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                    Article
                                </span>
                            </div>
                            <div className="absolute top-3 right-3"></div>
                            <div className="absolute bottom-3 left-3 right-3"></div>
                        </div>
                        <div className="p-3 sm:p-4 bg-neutral-900">
                            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                                Dikelola dengan manajemen estate profesional
                            </h2>
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                                Kami menjalankan dengan manajemen estate
                                profesional untuk memastikan operasional kawasan
                                berjalan lancar dan efisien.
                            </p>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-4"></div>
                                <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
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
                    <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:scale-[1.02] w-full lg:flex-1">
                        <div className="relative">
                            <img
                                src="images/card-blog/iuki.png"
                                alt="Neural Network Visualization"
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                                <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                    NEWS
                                </span>
                            </div>
                            <div className="absolute top-3 right-3"></div>
                            <div className="absolute bottom-3 left-3 right-3"></div>
                        </div>
                        <div className="p-3 sm:p-4 bg-neutral-900">
                            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                                Inovasi Terbaru di Laksana Business Park
                            </h2>
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                                Laksana Business Park terus berinovasi
                                menghadirkan fasilitas dan layanan terbaik untuk
                                mendukung pertumbuhan bisnis Anda.
                            </p>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-4"></div>
                                <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
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
                    <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:transform hover:scale-[1.02] w-full lg:flex-1">
                        <div className="relative">
                            <img
                                src="images/card-blog/estate-terbaik.png"
                                alt="Neural Network Visualization"
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                                <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                    TIPS & TRICK
                                </span>
                            </div>
                            <div className="absolute top-3 right-3"></div>
                            <div className="absolute bottom-3 left-3 right-3"></div>
                        </div>
                        <div className="p-3 sm:p-4 bg-neutral-900">
                            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                                Tips Memilih Lokasi Gudang Strategis
                            </h2>
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                                Pemilihan lokasi gudang yang tepat sangat
                                penting untuk efisiensi operasional dan
                                distribusi produk Anda.
                            </p>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-4"></div>
                                <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
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
                    <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:transform hover:scale-[1.02] w-full lg:flex-1">
                        <div className="relative">
                            <img
                                src="images/card-blog/tahap3.png"
                                alt="Neural Network Visualization"
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                                <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                    ARTICLE
                                </span>
                            </div>
                            <div className="absolute top-3 right-3"></div>
                            <div className="absolute bottom-3 left-3 right-3"></div>
                        </div>
                        <div className="p-3 sm:p-4 bg-neutral-900">
                            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                                Keunggulan Berinvestasi di Kawasan Industri
                                Modern
                            </h2>
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                                Investasi di kawasan industri modern menawarkan
                                berbagai keuntungan jangka panjang bagi para
                                pelaku bisnis.
                            </p>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-4"></div>
                                <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
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
                    <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:scale-[1.02] w-full lg:flex-1">
                        <div className="relative">
                            <img
                                src="images/card-blog/iuki.png"
                                alt="Neural Network Visualization"
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                                <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                    NEWS
                                </span>
                            </div>
                            <div className="absolute top-3 right-3"></div>
                            <div className="absolute bottom-3 left-3 right-3"></div>
                        </div>
                        <div className="p-3 sm:p-4 bg-neutral-900">
                            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                                Pembangunan Infrastruktur Penunjang Terbaru
                            </h2>
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                                Laksana Business Park berkomitmen memperluas dan
                                meningkatkan infrastruktur untuk kenyamanan
                                semua tenant.
                            </p>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-4"></div>
                                <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
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
                    <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:transform hover:scale-[1.02] w-full lg:flex-1">
                        <div className="relative">
                            <img
                                src="images/card-blog/estate-terbaik.png"
                                alt="Neural Network Visualization"
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                                <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                    TIPS & TRICK
                                </span>
                            </div>
                            <div className="absolute top-3 right-3"></div>
                            <div className="absolute bottom-3 left-3 right-3"></div>
                        </div>
                        <div className="p-3 sm:p-4 bg-neutral-900">
                            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                                Strategi Optimalisasi Logistik Bisnis Anda
                            </h2>
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                                Pelajari cara mengoptimalkan rantai pasok dan
                                logistik untuk meningkatkan efisiensi dan
                                mengurangi biaya operasional.
                            </p>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-4"></div>
                                <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
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
                    <div className="group relative overflow-hidden bg-neutral-900 transition-all duration-500 hover:transform hover:scale-[1.02] w-full lg:flex-1">
                        <div className="relative">
                            <img
                                src="images/card-blog/tahap3.png"
                                alt="Neural Network Visualization"
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                                <span className="bg-white border border-white/30 text-black/50 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                    ARTICLE
                                </span>
                            </div>
                            <div className="absolute top-3 right-3"></div>
                            <div className="absolute bottom-3 left-3 right-3"></div>
                        </div>
                        <div className="p-3 sm:p-4 bg-neutral-900">
                            <div className="hidden sm:flex items-center gap-2 mb-2 text-xs text-neutral-400">
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold leading-tight mb-1 group-hover:text-[#1d2088] transition-colors duration-300 text-white">
                                Dampak Positif Kawasan Industri Terhadap Ekonomi
                                Lokal
                            </h2>
                            <p className="hidden sm:block text-neutral-400 text-xs leading-relaxed mb-3">
                                Kehadiran Laksana Business Park memberikan
                                kontribusi signifikan terhadap perekonomian
                                lokal melalui penciptaan lapangan kerja.
                            </p>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-4"></div>
                                <button className="flex items-center gap-2 text-white transition-colors font-medium text-xs">
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
                <div className="flex flex-col items-center mb-10">
                    {/* Pagination Component */}
                    <div className="flex items-center gap-1">
                        <button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none cursor-pointer focus:shadow-none text-sm py-2 px-4 bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none">
                            <svg
                                width="1.5em"
                                height="1.5em"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                                className="mr-1.5 h-4 w-4 stroke-2"
                            >
                                <path
                                    d="M15 6L9 12L15 18"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Previous
                        </button>
                        <button className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] shadow-sm hover:shadow-md bg-neutral-900 border-stone-800 text-stone-50 hover:border-stone-700 cursor-pointer">
                            1
                        </button>
                        <button className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none cursor-pointer">
                            2
                        </button>
                        <button className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none cursor-pointer">
                            3
                        </button>
                        <button className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none cursor-pointer">
                            4
                        </button>
                        <button className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none cursor-pointer">
                            5
                        </button>
                        <button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none focus:shadow-none text-sm py-2 px-4 bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none cursor-pointer">
                            Next
                            <svg
                                width="1.5em"
                                height="1.5em"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                                className="ml-1.5 h-4 w-4 stroke-2"
                            >
                                <path
                                    d="M9 6L15 12L9 18"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

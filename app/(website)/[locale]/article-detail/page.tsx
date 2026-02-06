"use client";
import Footer from "../../components/Footer";
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
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 md:py-12 flex justify-center items-center">
        {/* Main Content Area */}
        <div className="flex flex-col items-center text-4xl font-medium tracking-tight mb-4 leading-[0.95]">
          <div className="inline-flex rounded-full border border-neutral-200 bg-white/80 px-4 py-2 shadow-sm mb-2">
            <span className="text-[11px] text-center font-medium uppercase tracking-[0.18em] text-neutral-500">
              Tips & Trick
            </span>
          </div>
          <span className="text-[#1d2088] py-3 items-center text-center mb-4">
            Kawasan Industri dengan Izin Lengkap (IUKI)
          </span>
          <span className="text-base">08 Januari, 2026</span>
        </div>
      </div>
      <div className="max-w-6xl mx-auto md:px-12 pb-12 md:pb-24 flex flex-col gap-6 text-justify">
        {/* Article Content */}
        <p>
          Jakarta, Agung Intiland News – Pelaku usaha kawasan industri di
          Indonesia menunjukkan optimisme terhadap realisasi investasi nasional
          pada tahun 2026, menyusul tren positif capaian investasi sepanjang
          2025 serta upaya penguatan ekosistem investasi melalui kolaborasi
          antara pemerintah dan sektor swasta.
        </p>
        <p>
          Menurut pengurus Himpunan Kawasan Industri Indonesia (HKI),
          pengembangan kawasan industri berpotensi menjadi motor pertumbuhan
          investasi di tengah dinamika ekonomi global dan peningkatan permintaan
          terhadap fasilitas industri terintegrasi.
        </p>
        Data terbaru menunjukkan realisasi investasi di kawasan industri
        sepanjang 2025 mencapai sekitar Rp6.744,58 triliun, tumbuh 9,26%
        dibandingkan 2024, dengan jumlah kawasan industri yang meningkat serta
        penyerapan tenaga kerja sekitar 2,35 juta orang. Kawasan industri juga
        mencatat dominasi Pulau Jawa dengan lebih dari 59% total kawasan yang
        beroperasi di Indonesia.
        <p>
          Selain itu, kontribusi kawasan industri dan tenant-nya terhadap Produk
          Domestik Bruto (PDB) nasional mencapai hampir 9,44% berdasarkan data
          triwulan III 2025, yang mencerminkan peran sektor ini dalam menopang
          perekonomian domestik.
        </p>
        <p>
          Akhmad Ma’ruf Maulana, Ketua Umum HKI, menyampaikan bahwa sinergi
          antara pengembang kawasan, pemerintah, serta pemangku kepentingan
          menjadi kunci bagi realisasi investasi yang lebih besar pada 2026.
          “Kawasan industri bukan sekadar lahan pabrik; ini adalah ekosistem
          masa depan yang memadukan teknologi, logistik, energi, dan talenta
          untuk menciptakan daya tarik investasi yang kuat,” ujarnya. Ma’ruf
          juga menekankan pentingnya penyelesaian hambatan tata ruang dan
          perizinan agar Indonesia dapat memaksimalkan peluang dari relokasi
          rantai pasok global serta minat investasi asing yang meningkat di
          sektor-sektor seperti kendaraan listrik, logistik modern, energi
          terbarukan, dan pusat data.
        </p>
      </div>
      <div className="max-w-6xl mx-auto md:px-12 pb-12 md:pb-24 flex flex-col border-b gap-6 text-justify">
        <a href="/article" className="text-base font-semibold">
          <p>Back to List ⟶</p>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between -mb-10 mt-20 gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
        <h1 className="text-5xl text-neutral-900 tracking-tighter leading-[0.9]">
          Artikel Lainnya
        </h1>
      </div>
      <div className="article-more max-w-7xl mx-auto px-6 lg:px-12 bg-grey-50">
        <div className="cursor-pointer pt-16 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                Demi pesatnya kebutuhan industri di Indonesia, Laksana Business
                Park kembali menghadirkan pengembangan tahap 3 dengan berbagai
                keunggulan.
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
                Memiliki izin lengkap (UIKI) memberikan kemudahan bagi
                perusahaan dalam menjalankan operasional bisnisnya di kawasan
                industri.
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
                Kami menjalankan dengan manajemen estate profesional untuk
                memastikan operasional kawasan berjalan lancar dan efisien.
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
        </div>
      </div>
      <Footer />
    </>
  );
}

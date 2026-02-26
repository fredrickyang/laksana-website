"use client";

export default function AboutSection() {

  return (
    <section className="py-12 md:py-20 lg:py-40 bg-[url(/luxima/images/about-us-optimized.webp)] bg-cover bg-center relative overflow-hidden">
      {/* Add a semi-transparent overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/30"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-end">
          {/* Text Content - Centered on mobile, right side on desktop */}
          <div className="w-full md:w-1/2 md:bg-transparent  md:backdrop-blur-none p-5 md:p-6 lg:p-8 rounded-lg text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              <span className="text-white leading-[125%] block md:inline">Mengapa </span>
              <span className="text-luxima-gold leading-[125%]">Kami?</span>
            </h2>

            <div className="mb-6 leading-relaxed text-sm sm:text-base">
              <p className="mb-3 md:mb-4">Komplek Industri Paling<span className="font-medium text-luxima-gold"> Modern</span> di Tangerang Utara</p>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2 font-medium">
                <li>Keamanan 24 jam dibantu oleh petugas keamanan & ruang kontrol CCTV</li>
                <li>Sistem satu pintu (One Gate System)</li>
                <li>Kelistrikan underground</li>
                <li>Internet fiber optic</li>
                <li>Tersedia porter bongkar muat</li>
              </ul>
              <p className="my-3 md:my-4">Keunggulan Lokasi Kami:</p>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2 font-medium">
                <li>Rencana Akses Tol Langsung</li>
                <li>Dekat dengan Bandara Soekarno Hatta</li>
                <li>Bebas dari banjir</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

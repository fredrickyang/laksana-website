"use client";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Image from "next/image";
import FacilityCard from "../components/FacilityCard";
export default function Facilities() {
  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-25vh flex flex-col justify-center px-8 overflow-hidden">
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
                <span className="text-white bg-clip-text uppercase">
                  Fasilitas Kami
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <section className="w-full mt-[5%] mb-[5%] border-y border-white/5">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-5xl tracking-tight mb-6">
            Nilai-Nilai Perusahaan Kami
          </h2>
          <div className="text-md text-slate-600 text-justify">
            <p className="mb-4">
              Sebagai perusahaan properti yang berkomitmen menghadirkan kawasan
              terbaik bagi mitra bisnis maupun penghuni, kami menjunjung tinggi
              nilai-nilai yang menjadi fondasi dalam setiap pengembangan semua
              kawasan kami. Nilai-nilai ini kami terapkan secara konsisten untuk
              memastikan kenyamanan, keamanan, dan keberlanjutan kawasan yang
              kami bangun.
            </p>
            <p className="mb-4">
              Setiap proyek yang kami hadirkan dibangun di atas dasar
              perencanaan matang, infrastruktur andal, serta fasilitas lengkap
              yang menunjang kebutuhan bisnis modern. Laksana Business Park,
              sebagai tonggak pertama kami, telah berkembang menjadi pusat
              industri dan komersial yang dinamis, didukung oleh komunitas yang
              dirancang untuk meningkatkan efisiensi sekaligus pertumbuhan.
            </p>
          </div>

          <div className="card-facilities mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FacilityCard
              title="Enterprise Security"
              description="Row jalan Lebar untuk Kenyamanan Akses Operasional"
              imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              imageAlt="security dashboard"
            />
            <FacilityCard
              title="Enterprise Security"
              description="Keamanan yang Terjamin dengan Sistem Pengawasan Security 24 Jam"
              imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              imageAlt="security dashboard"
            />
            <FacilityCard
              title="Enterprise Security"
              description="Underground Utility System yang menciptakan kawasan Rapih, Bersih, dan Elegan"
              imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              imageAlt="security dashboard"
            />
          </div>
        </div>
      </section>
      <div className="px-8 max-w-7xl mx-auto">
        <div className="mb-16 grid lg:grid-cols-2 gap-8 items-start">
          <h2 className="text-3xl md:text-5xl border-l-4 border-[#1d2088] pl-6 tracking-tight text-black">
            Fasilitas Utama Kami
          </h2>
          <div className="flex flex-col items-start lg:items-end gap-6">
            <p className="text-lg max-w-xl text-left lg:text-right text-neutral-700">
              Semua solusi dari kami dirancang untuk memberikan pengalaman
              terbaik bagi pemilik bisnis dan penghuni kami
            </p>
          </div>
        </div>
        <div className="max-w-7xl flex flex-col lg:flex-row lg:justify-center gap-8 lg:gap-0 border-t border-b border-black/10 mb-24">
          {/* Service 1 */}
          <div className="divide-y lg:border-r divide-black/10 border-black/10">
            <div className="px-12 py-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-wifi"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.44 12.44 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049" />
                    <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.46 9.46 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065m-2.183 2.183c.226-.226.185-.605-.1-.75A6.5 6.5 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.5 5.5 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091zM9.06 12.44c.196-.196.198-.52-.04-.66A2 2 0 0 0 8 11.5a2 2 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z" />
                  </svg>
                </div>
                <div className="">
                  <div className="font-bold text-black">
                    Internet Fiber Optic
                  </div>
                  <div className="text-sm text-neutral-600">
                    Koneksi Internet Cepat & Stabil
                  </div>
                </div>
              </div>
              <div className="leading-relaxed text-neutral-700 pl-5">
                <ul className="list-disc">
                  <li>Koneksi Fiber Optic</li>
                  <li>Kecepatan Internet Tinggi</li>
                  <li>Backup Connection</li>
                  <li>Teknologi Terkini</li>
                </ul>
              </div>
            </div>
            <div className="px-12 py-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-black"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" className="" />
                    <path d="m2 17 10 5 10-5" className="" />
                    <path d="m2 12 10 5 10-5" className="" />
                  </svg>
                </div>
                <div className="">
                  <div className="font-bold text-black">Gudang Serbaguna</div>
                  <div className="text-sm text-neutral-600">
                    Gudang dengan Konsep 4 in 1
                  </div>
                </div>
              </div>
              <div className="leading-relaxed text-neutral-700 pl-5">
                <ul className="list-disc">
                  <li>Kantor</li>
                  <li>Gudang</li>
                  <li>Ruko</li>
                  <li>Tempat Tinggal</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Service 2 */}
          <div className="divide-y lg:border-r divide-black/10 border-black/10">
            <div className="px-12 py-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-p-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
                  </svg>
                </div>
                <div className="">
                  <div className="font-bold text-black">Parkir Luas</div>
                  <div className="text-sm text-neutral-600">
                    Area Parkir Luas dan Aman
                  </div>
                </div>
              </div>
              <div className="leading-relaxed text-neutral-700 pl-5">
                <ul className="list-disc">
                  <li>Area Parkir Luas</li>
                  <li>Keamanan Gate System</li>
                  <li>Akses Mudah</li>
                  <li>Area Loading Barang</li>
                </ul>
              </div>
            </div>
            <div className="px-12 py-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-lightning"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1z" />
                  </svg>
                </div>
                <div className="">
                  <div className="font-bold text-black">Listrik Stabil</div>
                  <div className="text-sm text-neutral-600">
                    Terdapat pilihan besaran listrik
                  </div>
                </div>
              </div>
              <div className="leading-relaxed text-neutral-700 pl-5">
                <ul className="list-disc">
                  <li>Generator Backup</li>
                  <li>Panel Distribusi</li>
                  <li>Listrik Stabil</li>
                  <li>Maintenance Rutin</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Service 3 */}
          <div className="divide-y divide-black/10">
            <div className="px-12 py-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-shield"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                  </svg>
                </div>
                <div className="">
                  <div className="font-bold text-black">Keamanan 24 Jam</div>
                  <div className="text-sm text-neutral-600">
                    Sistem Keamanan Terintegrasi CCTV
                  </div>
                </div>
              </div>
              <div className="leading-relaxed text-neutral-700 pl-5">
                <ul className="list-disc">
                  <li>Pengawasan CCTV 24 Jam</li>
                  <li>Penjagaan Security</li>
                  <li>Kontrol Akses</li>
                  <li>Monitoring Realtime</li>
                </ul>
              </div>
            </div>
            <div className="px-12 py-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-geo"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-black">Lokasi Strategis</div>
                  <div className="text-sm text-neutral-600">
                    Berada di Lokasi Strategis & Berkembang
                  </div>
                </div>
              </div>
              <div className="leading-relaxed text-neutral-700 pl-5">
                <ul className="list-disc">
                  <li>Dekat dengan Bandara Soetta</li>
                  <li>Akses Tol Baru Kataraja</li>
                  <li>Jalan Utama</li>
                  <li>Area Berkembang Pesat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Form />
      <Footer />
    </>
  );
}

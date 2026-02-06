"use client";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Image from "next/image";
import { useState } from "react";
import Timeline from "../components/TimeLine";
import { getMediaUrl } from "@/lib/utils";

interface OurCompanyClientProps {
  aboutPage: any;
  settings?: any;
}

export default function OurCompanyClient({ aboutPage, settings }: OurCompanyClientProps) {
  const [showVideo, setShowVideo] = useState(false);

  // Get YouTube embed URL
  const youtubeUrl = aboutPage?.videoSection?.youtubeUrl || "https://www.youtube.com/embed/aIA9kDBlJDc?start=1";
  const youtubeEmbedUrl = youtubeUrl.includes('embed') ? youtubeUrl : youtubeUrl.replace('watch?v=', 'embed/');
  const videoThumbnail = getMediaUrl(aboutPage?.videoSection?.thumbnail) || "https://agungintiland.com/assets/source/assets/thumbs/images/cover_1280_700_laksana-business-park---view-semi-bev-05.png.webp";

  // Get hero background
  const heroBackground = getMediaUrl(aboutPage?.hero?.backgroundImage) || "/images/bg-produk.png";

  // Get leaders data
  const leaders = aboutPage?.leadership?.leaders || [];

  // Get history content - extract plain text from richText
  const historyContent = aboutPage?.history?.content?.root?.children?.map((p: any) =>
    p.children?.map((c: any) => c.text).join('')
  ) || [];

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
            src={heroBackground}
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
                  {aboutPage?.hero?.title || "Tentang Perusahaan"}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full mt-[8%] mb-[5%] border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl tracking-tight mb-6">
            {aboutPage?.history?.headline || "Perjalanan Agung Intiland Dimulai 2010"}
          </h2>
          <div className="text-md text-slate-600 text-justify">
            {historyContent.length > 0 ? historyContent.map((paragraph: string, index: number) => (
              <p key={index} className="mb-4">{paragraph}</p>
            )) : (
              <>
                <p className="mb-4">
                  Sejak itu, Agung Intiland telah berkembang menjadi pengembang
                  kawasan industri terbesar di Tangerang Utara, dengan komitmen
                  untuk menciptakan ekosistem produktif yang mendorong pertumbuhan
                  bisnis berkelanjutan. Dimulai dari pengembangan Laksana Business
                  Park, kini kami telah menjadi tolok ukur kawasan industri dan
                  komersial terintegrasi di wilayah ini.
                </p>
                <p className="mb-4">
                  Setiap proyek yang kami hadirkan dibangun di atas dasar
                  perencanaan matang, infrastruktur andal, serta fasilitas lengkap
                  yang menunjang kebutuhan bisnis modern. Laksana Business Park,
                  sebagai tonggak pertama kami, telah berkembang menjadi pusat
                  industri dan komersial yang dinamis, didukung oleh komunitas yang
                  dirancang untuk meningkatkan efisiensi sekaligus pertumbuhan.
                </p>
                <p className="mb-4">
                  Dengan dedikasi lebih dari 300 profesional, Agung Intiland terus
                  memperkuat reputasinya melalui konsistensi, inovasi, dan praktik
                  berkelanjutan. Ke depan, kami bersiap untuk mengembangkan proyek
                  residensial, melengkapi visi kami dalam menciptakan kawasan
                  terintegrasi yang menyatukan bisnis dan kehidupan secara harmonis.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="thumbnail-iframe w-full mb-14 border-y border-white/5">
        <div className="max-w-[86%] mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-b from-[#00ffc4]/20 to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative border border-slate-900 overflow-hidden shadow-3xl border border-white/10 bg-neutral-900 aspect-video ring-1 ring-black/5">
            {showVideo ? (
              <iframe
                className="w-full h-full aspect-video"
                src={`${youtubeEmbedUrl}${youtubeEmbedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                title="Company Profile Laksana Business Park"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <img
                  src={videoThumbnail}
                  alt="thumbnail-photo"
                  className="w-full h-full object-cover group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start"></div>
                  <div
                    onClick={() => setShowVideo(true)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,196,0.1)] group-hover:shadow-[0_0_60px_rgba(0,255,196,0.2)] transition-shadow">
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
                        data-lucide="play"
                        className="lucide lucide-play w-10 h-10 text-white fill-white ml-1"
                      >
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="profile" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight">
              {aboutPage?.leadership?.headline || "Pimpinan Perusahaan"}
            </h2>
            <p className="text-md text-slate-600 max-w-xl mx-auto">
              {aboutPage?.leadership?.description || "Tim manajemen yang terdiri dari para profesional dengan pengalaman luas di berbagai bidang."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.length > 0 ? leaders.map((leader: any, index: number) => (
              <div key={index} className="group relative bg-[#0A0A0A] border border-white/50 hover:border-[#1d2088] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="aspect-[2/3] overflow-hidden">
                  <Image
                    src={getMediaUrl(leader.photo) || `/images/pimpinan/pimpinan${index + 1}.png`}
                    className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    alt={leader.name || "Pimpinan"}
                    width={400}
                    height={600}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-white text-sm font-medium mb-3">
                    {leader.position}
                  </p>
                </div>
              </div>
            )) : (
              <>
                {/* Fallback hardcoded leaders */}
                <div className="group relative bg-[#0A0A0A] border border-white/50 hover:border-[#1d2088] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="aspect-[2/3] overflow-hidden">
                    <Image src="/images/pimpinan/pimpinan1.png" className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Pimpinan" width={400} height={600} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Francis Cahyadi</h3>
                    <p className="text-white text-sm font-medium mb-3">Komisaris Utama</p>
                  </div>
                </div>
                <div className="group relative bg-[#0A0A0A] border border-white/50 hover:border-[#1d2088] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="aspect-[2/3] overflow-hidden">
                    <Image src="/images/pimpinan/pimpinan2.png" className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Pimpinan" width={400} height={600} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Jimmy Widjaja</h3>
                    <p className="text-white text-sm font-medium mb-3">Komisaris</p>
                  </div>
                </div>
                <div className="group relative bg-[#0A0A0A] border border-white/50 hover:border-[#1d2088] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="aspect-[2/3] overflow-hidden">
                    <Image src="/images/pimpinan/pimpinan3.png" className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Pimpinan" width={400} height={600} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Paberd Leonard Hutagaol</h3>
                    <p className="text-white text-sm font-medium mb-3">Direktur Utama</p>
                  </div>
                </div>
                <div className="group relative bg-[#0A0A0A] border border-white/50 hover:border-[#1d2088] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="aspect-[2/3] overflow-hidden">
                    <Image src="/images/pimpinan/pimpinan4.png" className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Pimpinan" width={400} height={600} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Netty Rusli</h3>
                    <p className="text-white text-sm font-medium mb-3">Direktur Keuangan</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Timeline timelineData={aboutPage?.timeline} />
      <Form />
      <Footer settings={settings} />
    </>
  );
}

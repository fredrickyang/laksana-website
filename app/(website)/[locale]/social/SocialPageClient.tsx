"use client";

import Image from "next/image";

interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  altText: string;
}

export default function SocialPageClient() {
  const socialLinks: SocialLink[] = [
    {
      id: "261652",
      title: "Official Whatsapp Laksana Business Park",
      url: "https://api.whatsapp.com/send?phone=6281805886000&text=%5BSOCIAL%5D%20Halo%20tim%20marketing%20Laksana%2C%20saya%20ingin%20bertanya%20lebih%20lanjut%20tentang%20unit%20Laksana%20Business%20Park",
      icon: "/images/landing/wa.png",
      altText: "Official Whatsapp Laksana",
    },
    {
      id: "261685",
      title: "Tiktok Official Laksana Business Park",
      url: "https://www.tiktok.com/@laksanabusinesspark.id",
      icon: "/images/landing/tiktok.webp.png",
      altText: "Tiktok @ laksanabusinesspark.id",
    },
    {
      id: "261686",
      title: "Estate Management Laksana Business Park",
      url: "https://api.whatsapp.com/send?phone=6285776686962&text=%5BSOCIAL%5D%20Halo%20saya%20ingin%20bertanya%2C%20mengenai%20Estate%20manajemen%20bisa%20tolong%20dibantu",
      icon: "/images/landing/wa.png",
      altText: "Estate Management Laksana Business Park",
    },
    {
      id: "261687",
      title: "Location Laksana Business Park Marketing Gallery (PIK)",
      url: "https://maps.app.goo.gl/mJnbJZiBcm4S5fho8",
      icon: "/images/landing/maps.png",
      altText: "Location Laksana Business Park Marketing Gallery (PIK)",
    },
    {
      id: "261688",
      title: "Location Laksana Business Park Marketing Gallery (Site Gallery)",
      url: "https://maps.app.goo.gl/L6v6HjzGwCoETv4V8",
      icon: "/images/landing/maps.png",
      altText: "Location Laksana Business Park Marketing Gallery (Site Gallery)",
    },
  ];

  return (
    <div className="min-h-screen flex-h-center" id="background_div">
      {/* Background Image */}
      <div className="page-bg">
        <Image
          src="/images/social/bg-1.webp"
          alt="Background"
          fill
          className="page-image"
          priority
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
      </div>

      {/* Main Content */}
      <div className="mt-[10rem] page-full-wrap relative">
        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 flex items-center justify-center">
            <Image
              src="/images/landing/logos.png"
              alt="Profile Picture"
              width={120}
              height={120}
              className="w-16 h-auto"
              priority
            />
          </div>
        </div>

        {/* Page Title */}
        <h2 className="page-title page-text-color page-text-font mt-16 text-center">
          Laksana Business Park
        </h2>
        <h3 className="page-bioline page-text-color page-text-font mt-4 text-center">
          Kawasan Industri dan Pergudangan Terpadu berlokasi di Utara Tangerang.
        </h3>

        {/* Social Links Container */}
        <div className="mt-24">
          {socialLinks.map((link) => (
            <div key={link.id} className="page-item-wrap relative">
              <div className="page-item flex-both-center absolute"></div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="page-item-each py-10 flex-both-center"
                href={link.url}
                data-id={link.id}
                data-type="page_item"
              >
                <Image
                  src={link.icon}
                  alt={link.altText}
                  width={100}
                  height={100}
                  className="link-each-image"
                />
                <span className="item-title text-center">{link.title}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

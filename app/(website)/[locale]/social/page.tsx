"use client";

import Image from "next/image";

interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  altText: string;
}

export default function SocialPage() {
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
      icon: "/images/landing/tiktok.webp",
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
    <div className="min-h-full flex-h-center" id="background_div">

      {/* Canvas Background Overlay */}
      <canvas id="bg-canvas" className="background-overlay">
        
      </canvas>

      {/* Main Content */}
      <div className="mt-[10rem] page-full-wrap relative">
        {/* Profile Image */}
        <div className="flex-both-center">
          <Image
            src="/images/landing/logos.png"
            alt="Profile Picture"
            width={120}
            height={120}
            className="display-image"
            priority
          />
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

"use client";

import Image from "next/image";
import { type SocialPage as SocialPageType, Media } from "@/payload-types";

interface SocialPageClientProps {
  socialPage: SocialPageType;
}

export default function SocialPageClient({ socialPage }: SocialPageClientProps) {
  return (
    <div className="min-h-full flex-h-center" id="background_div">
      {/* Canvas Background Overlay */}
      <canvas id="bg-canvas" className="background-overlay"></canvas>

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
          {socialPage.socialLinks?.map((link, index) => {
            const icon = link.icon as Media;
            return (
              <div key={link.id || index} className="page-item-wrap relative">
                <div className="page-item flex-both-center absolute"></div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="page-item-each py-10 flex-both-center"
                  href={link.url}
                  data-type="page_item"
                >
                  <Image
                    src={icon?.url || "/images/landing/wa.png"}
                    alt={link.altText || link.title}
                    width={100}
                    height={100}
                    className="link-each-image"
                  />
                  <span className="item-title text-center">{link.title}</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

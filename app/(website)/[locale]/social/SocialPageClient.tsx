"use client";

import Image from "next/image";
import {
  Building2,
  Globe2,
  Instagram,
  LucideIcon,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { type SocialPage as SocialPageType, Media } from "@/payload-types";
import { COMPANY_CONTACT, WHATSAPP_CONTACT } from "@/constants/contacts";

interface SocialPageClientProps {
  socialPage: SocialPageType;
}

type SocialLink = {
  id?: string | null;
  title: string;
  url: string;
  altText?: string | null;
  icon?: Media | number | null;
};

const fallbackLinks: SocialLink[] = [
  {
    title: "WhatsApp Marketing",
    url: WHATSAPP_CONTACT.WHATSAPP_URL,
    altText: "WhatsApp Laksana Business Park",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/laksanabusinesspark.id/",
    altText: "Instagram Laksana Business Park",
  },
  {
    title: "YouTube",
    url: "https://www.youtube.com/@laksanabusinesspark",
    altText: "YouTube Laksana Business Park",
  },
  {
    title: "Website",
    url: "https://laksanabusinesspark.com",
    altText: "Website Laksana Business Park",
  },
];

function getIcon(title: string): LucideIcon {
  const normalized = title.toLowerCase();
  if (normalized.includes("whatsapp")) return MessageCircle;
  if (normalized.includes("instagram")) return Instagram;
  if (normalized.includes("youtube")) return Youtube;
  if (normalized.includes("phone") || normalized.includes("telepon")) return Phone;
  if (normalized.includes("website") || normalized.includes("web")) return Globe2;
  return Building2;
}

function getLinkDescription(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("whatsapp")) return "Chat langsung dengan tim marketing";
  if (normalized.includes("instagram")) return "Update proyek dan aktivitas kawasan";
  if (normalized.includes("youtube")) return "Video kawasan, produk, dan fasilitas";
  if (normalized.includes("website") || normalized.includes("web")) return "Detail unit, fasilitas, dan artikel";
  return "Kanal resmi Laksana Business Park";
}

export default function SocialPageClient({ socialPage }: SocialPageClientProps) {
  const links = socialPage.socialLinks?.length ? socialPage.socialLinks : fallbackLinks;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#121722] px-5 py-8 text-white sm:px-8">
      <Image
        src="/images/hero2.png"
        alt=""
        fill
        priority
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,23,34,0.65)_0%,rgba(18,23,34,0.9)_48%,rgba(18,23,34,1)_100%)]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl flex-col justify-center py-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white p-5 shadow-xl">
            <Image
              src="/images/logo/logo.svg"
              alt="Laksana Business Park"
              width={180}
              height={72}
              priority
              className="h-auto w-full"
            />
          </div>
          <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
            Laksana Business Park
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/78 sm:text-base">
            Kawasan industri dan pergudangan terpadu di Utara Tangerang.
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          {links.map((link, index) => {
            const cmsIcon = typeof link.icon === "object" ? link.icon : null;
            const Icon = getIcon(link.title);

            return (
              <a
                key={link.id || `${link.title}-${index}`}
                target="_blank"
                rel="noopener noreferrer"
                href={link.url}
                className="group flex min-h-20 items-center gap-4 rounded-lg border border-white/14 bg-white px-4 py-3 text-[#1F365C] shadow-lg transition hover:-translate-y-0.5 hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#121722]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#1F365C] text-white">
                  {cmsIcon?.url ? (
                    <Image
                      src={cmsIcon.url}
                      alt={link.altText || link.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  ) : (
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold">{link.title}</span>
                  <span className="mt-0.5 block text-sm text-[#4d607d]">
                    {getLinkDescription(link.title)}
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-white/12 bg-white/10 p-5 backdrop-blur">
          <div className="flex gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-white/85" aria-hidden="true" />
            <div>
              <h2 className="text-base font-semibold">Marketing Gallery</h2>
              <p className="mt-1 text-sm leading-6 text-white/76">{COMPANY_CONTACT.ADDRESS}</p>
            </div>
          </div>
          <a
            href={WHATSAPP_CONTACT.WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-[#1F365C] transition hover:bg-white/92 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#121722]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Hubungi Marketing
          </a>
        </div>
      </section>
    </main>
  );
}

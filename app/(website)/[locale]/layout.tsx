import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import Menu from "../components/Menu";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { getSettings } from "@/lib/payload";
import { locales, type Locale } from "@/i18n.config";
import { notFound } from "next/navigation";

import "../../globals.css";
import "../../style-component.css";
import "../../style-menu.css";
import JsonLd from "@/components/JsonLd";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laksana Business Park - Solusi Gudang & Properti Strategis",
  description: "Kawasan industri dan komersial terintegrasi di Tangerang Utara",
  icons: {
    icon: "/images/logo/logo.svg",
    shortcut: "/images/logo/logo.svg",
    apple: "/images/logo/logo.svg",
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const revalidate = 3600; // Revalidate every 1 hour

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const settings = await getSettings(locale as Locale);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Laksana Business Park",
    "url": process.env.NEXT_PUBLIC_SERVER_URL || "https://laksanabusinesspark.id",
    "logo": `${process.env.NEXT_PUBLIC_SERVER_URL || "https://laksanabusinesspark.id"}/images/logo/logo.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings?.contactInformation?.phoneNumbers?.[0]?.number || "+62-818-0588-6000",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English", "Chinese"]
    },
    "sameAs": [
      settings?.socialMedia?.instagram,
      settings?.socialMedia?.facebook,
      settings?.socialMedia?.linkedin
    ].filter(Boolean)
  };

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} ${montserrat.variable} antialiased font-sans mb-0`}>
        <JsonLd data={organizationJsonLd} />
        <Menu settings={settings} locale={locale} />
        {children}
        <FloatingWhatsApp settings={settings} />
      </body>
    </html>
  );
}



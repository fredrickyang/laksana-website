import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import Menu from "../components/Menu";
import { getSettings } from "@/lib/payload";
import { locales, type Locale } from "@/i18n.config";
import { notFound } from "next/navigation";

import "../../globals.css";
import "../../style-component.css";
import "../../style-menu.css";

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

export const revalidate = 60; // Revalidate every 60 seconds

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

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} ${montserrat.variable} antialiased font-sans mb-0`}>
        <Menu settings={settings} locale={locale} />
        {children}
      </body>
    </html>
  );
}



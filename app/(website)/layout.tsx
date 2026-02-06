import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from 'next/script'
import "../globals.css";
import "../style-component.css";
import "../style-menu.css";
import Menu from "./components/Menu";
import { getSettings } from "@/lib/payload";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laksana Business Park - Solusi Gudang & Properti Strategis",
  description: "Kawasan industri dan komersial terintegrasi di Tangerang Utara",
};

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings('id');

  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased font-sans mb-0`}>
        <Script src="https://unpkg.com/lucide@latest" />
        <Menu settings={settings} />
        {children}
      </body>
    </html>
  );
}

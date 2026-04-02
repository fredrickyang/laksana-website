import type { Metadata } from 'next';
import Header from '@/components/luxima/Header';
import Footer from '@/components/luxima/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';
import { getSettings } from '@/lib/payload';
import { locales, type Locale } from '@/i18n.config';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Luxima - Premium Property Development',
  description: 'Luxima is a premier property development company specializing in luxury residential, commercial, and retail properties.',
  icons: {
    icon: '/luxima/favicon/favicon.ico',
    shortcut: '/luxima/favicon/favicon.ico',
    apple: '/luxima/favicon/apple-icon.png',
  },
};

export default async function LuximaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const settings = await getSettings(locale as Locale);

  return (
    <>
      <Header />
      <main className="font-montserrat font-medium text-xl">
        {children}
      </main>
      <Footer settings={settings} />
      {/* Scroll indicator implementation */}
      <ScrollIndicator /> 
    </>
  );
}
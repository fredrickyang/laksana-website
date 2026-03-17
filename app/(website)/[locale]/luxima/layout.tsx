import type { Metadata } from 'next';
import Header from '@/components/luxima/Header';
import Footer from '@/components/luxima/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';

export const metadata: Metadata = {
  title: 'Luxima - Premium Property Development',
  description: 'Luxima is a premier property development company specializing in luxury residential, commercial, and retail properties.',
  icons: {
    icon: '/luxima/favicon/favicon.ico',
    shortcut: '/luxima/favicon/favicon.ico',
    apple: '/luxima/favicon/apple-icon.png',
  },
};

export default function LuximaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="font-montserrat font-medium text-xl">
        {children}
      </main>
      <Footer />
      {/* Scroll indicator implementation */}
      <ScrollIndicator /> 
    </>
  );
} 
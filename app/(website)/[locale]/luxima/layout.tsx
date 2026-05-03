import type { Metadata } from 'next';
import Header from '@/components/luxima/Header';
import Footer from '@/components/luxima/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  
  const titles: Record<string, string> = {
    id: "Luxima - Pengembangan Properti Premium",
    en: "Luxima - Premium Property Development",
    zh: "Luxima - 优质物业开发"
  }
  
  const descriptions: Record<string, string> = {
    id: "Luxima adalah pengembang properti terkemuka yang mengkhususkan diri dalam unit gudang dan properti industri berkualitas tinggi.",
    en: "Luxima is a leading property developer specializing in high-quality warehouse units and industrial properties.",
    zh: "Luxima 是领先的物业开发商，专门从事高质量的仓库单位和工业物业。"
  }

  return {
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    alternates: {
      canonical: `${baseUrl}/${locale}/luxima`,
      languages: {
        id: `${baseUrl}/id/luxima`,
        en: `${baseUrl}/en/luxima`,
        zh: `${baseUrl}/zh/luxima`,
      },
    },
  }
}

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
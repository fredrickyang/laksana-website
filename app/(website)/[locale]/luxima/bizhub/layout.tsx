import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://laksanabusinesspark.id'
  
  const titles: Record<string, string> = {
    id: "Luxima Bizhub - Pusat Bisnis Modern",
    en: "Luxima Bizhub - Modern Business Center",
    zh: "Luxima Bizhub - 现代商业中心"
  }
  
  const descriptions: Record<string, string> = {
    id: "Luxima Bizhub adalah pusat bisnis modern yang dirancang untuk mendukung pertumbuhan dan kesuksesan perusahaan Anda.",
    en: "Luxima Bizhub is a modern business center designed to support the growth and success of your company.",
    zh: "Luxima Bizhub 是一个现代商业中心，旨在支持您公司的成长和成功。"
  }

  return {
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    alternates: {
      canonical: `${baseUrl}/${locale}/luxima/bizhub`,
      languages: {
        id: `${baseUrl}/id/luxima/bizhub`,
        en: `${baseUrl}/en/luxima/bizhub`,
        zh: `${baseUrl}/zh/luxima/bizhub`,
      },
    },
  }
}

export default function BizhubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

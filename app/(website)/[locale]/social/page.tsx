import { getSocialPage } from "@/lib/payload";
import SocialPageClient from "./SocialPageClient";
import { locales, type Locale } from "@/i18n.config";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface SocialPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SocialPage({ params }: SocialPageProps) {
  const { locale } = await params;

  const socialPage = await getSocialPage(locale as Locale);

  if (!socialPage) {
    notFound();
  }

  return <SocialPageClient socialPage={socialPage} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

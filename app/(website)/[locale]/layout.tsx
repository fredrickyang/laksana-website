import Menu from "../components/Menu";
import { getSettings } from "@/lib/payload";
import { locales, type Locale } from "@/i18n.config";
import { notFound } from "next/navigation";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

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
    <>
      <Menu settings={settings} locale={locale} />
      {children}
    </>
  );
}

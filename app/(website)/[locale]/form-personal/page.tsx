import FormPersonalClient from "./FormPersonalClient";
import { locales, type Locale } from "@/i18n.config";
import { getSettings } from "@/lib/payload";

export const revalidate = 3600;

interface FormPersonalPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FormPersonalPage({ params }: FormPersonalPageProps) {
  const { locale } = await params;
  const settings = await getSettings(locale as Locale);
  
  return <FormPersonalClient settings={settings} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

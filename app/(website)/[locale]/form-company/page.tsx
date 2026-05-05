import FormCompanyClient from "./FormCompanyClient";
import { locales, type Locale } from "@/i18n.config";
import { getSettings } from "@/lib/payload";

export const revalidate = 3600;

interface FormCompanyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FormCompanyPage({ params }: FormCompanyPageProps) {
  const { locale } = await params;
  const settings = await getSettings(locale as Locale);
  
  return <FormCompanyClient settings={settings} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

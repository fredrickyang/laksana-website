import FormCompanyClient from "./FormCompanyClient";
import { locales, type Locale } from "@/i18n.config";
import { getSettings } from "@/lib/payload";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Submission | Laksana Business Park",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

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

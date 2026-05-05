import FormCompanyClient from "./FormCompanyClient";
import { locales } from "@/i18n.config";

export const revalidate = 3600;

export default async function FormCompanyPage() {
  return <FormCompanyClient />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

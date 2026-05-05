import FormPersonalClient from "./FormPersonalClient";
import { locales } from "@/i18n.config";

export const revalidate = 3600;

export default async function FormPersonalPage() {
  return <FormPersonalClient />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

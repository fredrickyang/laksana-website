import { getAboutPage, getSettings, getMediaUrl } from '@/lib/payload'
import OurCompanyClient from './OurCompanyClient'
import { locales, type Locale } from '@/i18n.config'

interface OurCompanyPageProps {
  params: Promise<{ locale: string }>
}

export default async function OurCompany({ params }: OurCompanyPageProps) {
  const { locale } = await params

  const [aboutPage, settings] = await Promise.all([
    getAboutPage(locale as Locale),
    getSettings(locale as Locale),
  ])

  return <OurCompanyClient aboutPage={aboutPage} settings={settings} />
}

// Generate static paths for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

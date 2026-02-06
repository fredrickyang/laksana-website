import { getFacilitiesPage, getSettings, getMediaUrl } from '@/lib/payload'
import FacilitiesClient from './FacilitiesClient'
import { locales, type Locale } from '@/i18n.config'

interface FacilitiesPageProps {
  params: Promise<{ locale: string }>
}

export default async function Facilities({ params }: FacilitiesPageProps) {
  const { locale } = await params

  const [facilitiesPage, settings] = await Promise.all([
    getFacilitiesPage(locale as Locale),
    getSettings(locale as Locale),
  ])

  return <FacilitiesClient facilitiesPage={facilitiesPage} settings={settings} />
}

// Generate static paths for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

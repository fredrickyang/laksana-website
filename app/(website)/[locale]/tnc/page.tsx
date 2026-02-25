import { getSettings, getTermsConditionsPage } from '@/lib/payload'
import TncClient from './TncClient'
import { locales, type Locale } from '@/i18n.config'

interface TncPageProps {
  params: Promise<{ locale: string }>
}

export default async function Tnc({ params }: TncPageProps) {
  const { locale } = await params

  const [termsPage, settings] = await Promise.all([
    getTermsConditionsPage(locale as Locale),
    getSettings(locale as Locale),
  ])

  return <TncClient termsPage={termsPage} settings={settings} />
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

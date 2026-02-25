import { getSettings, getPrivacyPolicyPage } from '@/lib/payload'
import PrivacyPolicyClient from './PrivacyPolicyClient'
import { locales, type Locale } from '@/i18n.config'

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>
}

export default async function PrivacyPolicy({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params

  const [privacyPage, settings] = await Promise.all([
    getPrivacyPolicyPage(locale as Locale),
    getSettings(locale as Locale),
  ])

  return <PrivacyPolicyClient privacyPage={privacyPage} settings={settings} />
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

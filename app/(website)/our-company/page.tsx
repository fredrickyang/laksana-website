import { getAboutPage, getSettings, getMediaUrl } from '@/lib/payload'
import OurCompanyClient from './OurCompanyClient'

export default async function OurCompany() {
  const [aboutPage, settings] = await Promise.all([
    getAboutPage('id'),
    getSettings('id'),
  ])

  return <OurCompanyClient aboutPage={aboutPage} settings={settings} />
}

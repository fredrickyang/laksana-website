import { getFacilitiesPage, getSettings, getMediaUrl } from '@/lib/payload'
import FacilitiesClient from './FacilitiesClient'

export default async function Facilities() {
  const [facilitiesPage, settings] = await Promise.all([
    getFacilitiesPage('id'),
    getSettings('id'),
  ])

  return <FacilitiesClient facilitiesPage={facilitiesPage} settings={settings} />
}

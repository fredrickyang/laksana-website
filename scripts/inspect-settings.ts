import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({
    slug: 'settings',
    locale: 'id',
    depth: 1,
  })
  console.log('ID Settings:', JSON.stringify(settings, null, 2))

  const settingsEn = await payload.findGlobal({
    slug: 'settings',
    locale: 'en',
    depth: 1,
  })
  console.log('EN Settings:', JSON.stringify(settingsEn, null, 2))

  const settingsZh = await payload.findGlobal({
    slug: 'settings',
    locale: 'zh',
    depth: 1,
  })
  console.log('ZH Settings:', JSON.stringify(settingsZh, null, 2))

  process.exit(0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

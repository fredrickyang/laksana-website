import 'dotenv/config'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function run() {
    const config = await configPromise
    const payload = await getPayload({ config })
    const settingsEn = await payload.findGlobal({
        slug: 'settings',
        locale: 'en',
    })
    console.log("English Navigation:")
    console.dir(settingsEn.navigation, { depth: null })

    const settingsId = await payload.findGlobal({
        slug: 'settings',
        locale: 'id',
    })
    console.log("Indonesian Navigation:")
    console.dir(settingsId.navigation, { depth: null })

    process.exit(0)
}

run()

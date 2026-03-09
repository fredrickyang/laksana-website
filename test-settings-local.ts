import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function test() {
    const payload = await getPayload({ config })

    const settings = await payload.findGlobal({
        slug: 'settings',
        locale: 'en',
    })

    console.log(JSON.stringify(settings.navigation, null, 2))
    process.exit(0)
}

test()

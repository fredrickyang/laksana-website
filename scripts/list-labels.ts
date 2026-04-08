import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
    const payload = await getPayload({ config })
    const products = await payload.find({
        collection: 'products',
        limit: 100,
        locale: 'all' as any,
    })

    console.log('Current Product Labels (ID/Name/Label):')
    for (const p of products.docs as any[]) {
        console.log(`- [${p.id}] ${p.name?.id || p.name}: ${JSON.stringify(p.label)}`)
    }
    process.exit(0)
}

run()

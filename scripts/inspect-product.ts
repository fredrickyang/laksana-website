import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
    const payload = await getPayload({ config })
    const p = await payload.findByID({ 
        collection: 'products', 
        id: 7,
        locale: 'all' 
    })

    console.log('Product Full Data:')
    console.log(JSON.stringify(p, null, 2))
    process.exit(0)
}

run()

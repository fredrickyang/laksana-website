import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
    const payload = await getPayload({ config })
    const products = await payload.find({ collection: 'products', limit: 1 })
    console.log(JSON.stringify(products.docs[0], null, 2))
    process.exit(0)
}

run().catch(err => {
    console.error(err)
    process.exit(1)
})

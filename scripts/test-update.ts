import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
    const payload = await getPayload({ config })
    const products = await payload.find({ collection: 'products', limit: 1 })
    const product = products.docs[0]

    console.log(`Testing update for [${product.name}]...`)

    try {
        await payload.update({
            collection: 'products',
            id: product.id,
            data: {
                featured: true,
                detailedSpecs: [
                    { key: 'Test', value: 'Value ID' }
                ]
            },
            locale: 'id'
        })
        console.log('Update ID success')

        await payload.update({
            collection: 'products',
            id: product.id,
            data: {
                detailedSpecs: [
                    { key: 'Test', value: 'Value EN' }
                ]
            },
            locale: 'en'
        })
        console.log('Update EN success')

    } catch (err: any) {
        console.error('Update failed:', JSON.stringify(err.data?.errors || err, null, 2))
    }
    process.exit(0)
}

run()

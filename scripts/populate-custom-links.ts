import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
    console.log('🚀 Starting Bulk Custom Link Population...\n')
    const payload = await getPayload({ config })

    // 1. Fetch Global Settings
    const settings = await payload.findGlobal({
        slug: 'settings',
        locale: 'id',
    })

    const globalWaUrl = settings?.contactInformation?.whatsAppUrl
    const globalWaMsg = settings?.contactInformation?.whatsAppMessage

    // 2. Fetch all products
    const productsResult = await payload.find({
        collection: 'products',
        limit: 500,
        locale: 'id',
    })

    const products = productsResult.docs
    console.log(`📦 Found ${products.length} products to process.\n`)

    for (const product of products) {
        if (!product.highlightSpecs?.customLink) {
            console.log(`📝 Processing: ${product.name}...`)
            
            // Use legacy hidden fields if they exist, otherwise fallback to global
            const waUrl = (product as any).whatsAppUrl || globalWaUrl
            const waMsg = (product as any).whatsAppMessage || globalWaMsg
            const productName = product.name || 'this unit'
            
            let finalLink = ''
            if (waUrl) {
                const message = waMsg || `[WEB] Halo tim marketing Laksana, saya ingin bertanya lebih lanjut tentang unit ${productName}`
                finalLink = `${waUrl}?text=${encodeURIComponent(message)}`
            } else {
                // Absolute fallback
                finalLink = `https://api.whatsapp.com/send?phone=6281805886000&text=${encodeURIComponent('[WEB] Halo tim marketing Laksana, saya ingin bertanya lebih lanjut tentang unit ' + productName)}`
            }

            try {
                await payload.update({
                    collection: 'products',
                    id: product.id,
                    data: {
                        highlightSpecs: {
                            ...product.highlightSpecs,
                            customLink: finalLink,
                        }
                    }
                })
                console.log(`   ✅ Success: ${product.name}`)
            } catch (err: any) {
                console.error(`   ❌ Failed: ${product.name}`, err.message)
            }
        } else {
            console.log(`⏭️  Skipping: ${product.name} (already has custom link)`)
        }
    }

    console.log('\n🎉 Bulk population complete!')
    process.exit(0)
}

run().catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
})

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

    console.log(`\n📦 KeySpecs audit for ${products.docs.length} products\n`)
    console.log('='.repeat(80))

    for (const p of products.docs as any[]) {
        const nameAll = p.name || {}
        const nameId = nameAll?.id || nameAll?.en || nameAll?.zh || `ID:${p.id}`

        const specs = p.keySpecs || []
        console.log(`\n🏷  "${nameId}" (ID: ${p.id}) — ${specs.length} keySpecs`)

        for (let i = 0; i < specs.length; i++) {
            const spec = specs[i]
            const iconId = typeof spec.icon === 'object' ? spec.icon?.id : spec.icon
            const iconName = typeof spec.icon === 'object' ? spec.icon?.filename : `(ID: ${spec.icon})`
            const labelAll = spec.label || {}
            console.log(`  [${i+1}] icon: ${iconName} (${iconId})`)
            console.log(`       label.id: "${labelAll.id || '(empty)'}"`)
            console.log(`       label.en: "${labelAll.en || '(empty)'}"`)
            console.log(`       label.zh: "${labelAll.zh || '(empty)'}"`)
        }

        if (specs.length === 0) {
            console.log(`  (no keySpecs)`)
        }
    }

    process.exit(0)
}

run()

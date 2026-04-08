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

    const locales = ['id', 'en', 'zh'] as const;

    for (const p of products.docs as any[]) {
        console.log(`Fixing mandatory fields for [${p.id}]...`)
        
        const nameData = p.name || {};
        const fallbackName = nameData.id || nameData.en || nameData.zh || 'Unit';
        
        const fixedName: any = {};
        for (const loc of locales) {
            fixedName[loc] = nameData[loc] || fallbackName;
        }

        const fixedSpecs = (p.detailedSpecs || []).map((spec: any) => {
            const val = spec.value || {};
            const fallbackVal = val.id || val.en || val.zh || 'N/A';
            const fixedVal: any = {};
            for (const loc of locales) {
                fixedVal[loc] = val[loc] || fallbackVal;
            }
            return { ...spec, value: fixedVal };
        });

        try {
            await payload.update({
                collection: 'products',
                id: p.id,
                locale: 'all' as any,
                data: {
                    name: fixedName,
                    detailedSpecs: fixedSpecs
                }
            })
            console.log(`  ✅ [${p.id}] data fixed`)
        } catch (err: any) {
            console.error(`  ❌ [${p.id}] fix fail:`, JSON.stringify(err.data?.errors || err.message, null, 2))
        }
    }
    process.exit(0)
}

run()

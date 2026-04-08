import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const labelMap: Record<string, { id: string; en: string; zh: string }> = {
    'Unit Maxima Plus': {
        id: 'Gudang Modern Siap Pakai',
        en: 'Ready-to-Use Modern Warehouse',
        zh: '即用型现代仓库'
    },
    'Luxima - Maxima': {
        id: 'Gudang Premium',
        en: 'Premium Warehouse',
        zh: '高端仓库'
    },
    'Unit Nexima Plus': {
        id: 'Gudang Multiguna',
        en: 'Multipurpose Warehouse',
        zh: '多功能仓库'
    },
    'Unit Opxima': {
        id: 'Gudang Komersial Strategis',
        en: 'Strategic Commercial Warehouse',
        zh: '战略商用仓库'
    }
}

async function run() {
    const payload = await getPayload({ config })
    const products = await payload.find({
        collection: 'products',
        limit: 100,
        locale: 'all' as any,
    })

    const locales = ['id', 'en', 'zh'] as const;

    for (const p of products.docs as any[]) {
        const nameData = p.name || {};
        const nameId = nameData.id || nameData.en || nameData.zh || 'Unit';
        const newLabels = labelMap[nameId];

        if (!newLabels) {
            console.log(`Skipping [${nameId}] (No label mapping)`)
            continue
        }

        console.log(`Updating [${nameId}] (ID: ${p.id})...`)

        for (const loc of locales) {
            try {
                const data: any = {
                    label: newLabels[loc],
                    name: nameData[loc] || nameId,
                }

                // If detailedSpecs exist, we must provide localized value for the current locale
                if (p.detailedSpecs && Array.isArray(p.detailedSpecs)) {
                    data.detailedSpecs = p.detailedSpecs.map((spec: any) => {
                        const val = spec.value || {};
                        const fallbackVal = val.id || val.en || val.zh || 'N/A';
                        return { ...spec, value: val[loc] || fallbackVal };
                    });
                }

                await payload.update({
                    collection: 'products',
                    id: p.id,
                    locale: loc,
                    data: data,
                    // Try to bypass excessive validation if possible (not standard)
                })
                console.log(`  ✅ [${loc}] success`)
            } catch (err: any) {
                console.error(`  ❌ [${loc}] fail:`, JSON.stringify(err.data?.errors || err.message, null, 2))
            }
        }
    }
    process.exit(0)
}

run()

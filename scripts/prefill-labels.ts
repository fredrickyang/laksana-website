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
        const nameId = nameData?.id || nameData?.en || nameData?.zh || '';
        const currentLabel = p.label || {};
        const labelId = currentLabel?.id || currentLabel?.en || currentLabel?.zh || '';

        const newLabels = labelMap[nameId];
        
        if (newLabels || !labelId || labelId === nameId) {
            console.log(`Processing [${nameId}] (ID: ${p.id})...`)
            
            const updateData: any = {};
            
            // 1. Label
            if (newLabels) {
                updateData.label = newLabels;
            }

            // 2. Fix Name (required, localized)
            const fixedName: any = {};
            let nameFixed = false;
            for (const loc of locales) {
                fixedName[loc] = nameData[loc] || nameId;
                if (!nameData[loc]) nameFixed = true;
            }
            if (nameFixed) {
                console.log(`  Fixing missing localized values in name...`)
                updateData.name = fixedName;
            } else {
                updateData.name = nameData; // Still pass it to satisfy Payload with locale:'all'?
            }

            // 3. Fix detailedSpecs (value is required, localized)
            if (p.detailedSpecs && Array.isArray(p.detailedSpecs)) {
                let specsFixed = false;
                const fixedSpecs = p.detailedSpecs.map((spec: any) => {
                    const val = spec.value || {};
                    const fallback = val.id || val.en || val.zh || 'N/A';
                    const newVal: any = {};
                    let specLocFixed = false;
                    for (const loc of locales) {
                        newVal[loc] = val[loc] || fallback;
                        if (!val[loc]) specLocFixed = true;
                    }
                    if (specLocFixed) {
                        specsFixed = true;
                        return { ...spec, value: newVal };
                    }
                    return spec;
                });
                
                if (specsFixed) {
                    console.log(`  Fixing missing localized values in detailedSpecs...`)
                    updateData.detailedSpecs = fixedSpecs;
                } else {
                    updateData.detailedSpecs = p.detailedSpecs;
                }
            }

            if (Object.keys(updateData).length > 0) {
                try {
                    await payload.update({
                        collection: 'products',
                        id: p.id,
                        locale: 'all' as any,
                        data: updateData
                    })
                    console.log(`  ✅ [${nameId}] success`)
                } catch (err: any) {
                    console.error(`  ❌ [${nameId}] fail:`, JSON.stringify(err.data?.errors || err.message, null, 2))
                }
            }
        } else {
            console.log(`Skipping [${nameId}] (Label is already descriptive: "${labelId}")`)
        }
    }
    process.exit(0)
}

run()

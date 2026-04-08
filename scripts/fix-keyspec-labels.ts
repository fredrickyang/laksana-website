/**
 * fix-keyspec-labels.ts
 *
 * Fills in missing 'id' and 'en' labels for keySpecs across all products.
 * The zh label already exists, so we only add id and en per-locale updates.
 *
 * Icon → Label mapping (consistent across all products):
 *   134 shield-icon-2.svg  → Security 24/7
 *   135 location-icon-2.svg → Strategic Location
 *   133 lightning-icon-2.svg → Stable Power Supply
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

// Icon ID → labels per locale
const iconLabelMap: Record<number, { id: string; en: string; zh: string }> = {
    134: { id: 'Keamanan 24/7', en: '24/7 Security', zh: '24/7 全天候安保' },
    135: { id: 'Lokasi Strategis', en: 'Strategic Location', zh: '优越地理位置' },
    133: { id: 'Listrik Stabil', en: 'Stable Power', zh: '稳定电力供应' },
}

async function run() {
    const payload = await getPayload({ config })

    const products = await payload.find({
        collection: 'products',
        limit: 100,
        locale: 'all' as any,
    })

    console.log(`\n🔧 Fixing keySpec labels for ${products.docs.length} products...\n`)

    for (const p of products.docs as any[]) {
        const nameAll = p.name || {}
        const nameId = nameAll?.id || nameAll?.en || nameAll?.zh || `ID:${p.id}`

        const specs = p.keySpecs || []
        if (specs.length === 0) {
            console.log(`⏭  "${nameId}" — no keySpecs, skipping`)
            continue
        }

        // Check if any id/en labels are missing
        const needsFix = specs.some((spec: any) => {
            const labelAll = spec.label || {}
            return !labelAll.id || !labelAll.en
        })

        if (!needsFix) {
            console.log(`✅  "${nameId}" — keySpec labels complete, skipping`)
            continue
        }

        console.log(`\n🔨  Fixing "${nameId}" (ID: ${p.id})`)

        const locales = ['id', 'en', 'zh'] as const

        // Fetch existing detailedSpecs per-locale to pass along (required field)
        const detailedSpecsByLocale: Record<string, any[]> = {}
        for (const locale of locales) {
            try {
                const existing = await payload.findByID({
                    collection: 'products',
                    id: p.id,
                    locale,
                })
                detailedSpecsByLocale[locale] = (existing as any).detailedSpecs || []
            } catch {
                detailedSpecsByLocale[locale] = []
            }
        }

        for (const locale of locales) {
            // Build keySpecs for this locale — only label changes, icon stays
            const localeSpecs = specs.map((spec: any) => {
                const iconId = typeof spec.icon === 'object' ? spec.icon?.id : spec.icon
                const labels = iconLabelMap[iconId]

                if (labels) {
                    console.log(`  [${locale}] icon ${iconId}: "${labels[locale]}"`)
                    return {
                        icon: iconId,
                        label: labels[locale],
                    }
                }

                // Unknown icon — keep existing label for this locale
                const existingLabel = spec.label?.[locale] || ''
                console.warn(`  ⚠️  Unknown icon ID: ${iconId}, keeping label: "${existingLabel}"`)
                return {
                    icon: iconId,
                    label: existingLabel,
                }
            })

            const existingDetailedSpecs = detailedSpecsByLocale[locale] || []

            try {
                await payload.update({
                    collection: 'products',
                    id: p.id,
                    locale,
                    data: {
                        name: nameAll[locale] || nameAll.id || nameAll.en || nameAll.zh,
                        keySpecs: localeSpecs,
                        // Pass existing detailedSpecs to satisfy required field validation
                        ...(existingDetailedSpecs.length > 0 ? {
                            detailedSpecs: existingDetailedSpecs.map((s: any) => ({
                                key: s.key,
                                value: s.value,
                            }))
                        } : {}),
                    } as any,
                })
            } catch (err: any) {
                console.error(`  ❌ Failed [${locale}]:`, JSON.stringify(err?.data?.errors || err.message, null, 2))
            }
        }

        console.log(`  ✅ All 3 locales updated for "${nameId}"`)
    }

    console.log('\n✅ Done!\n')
    process.exit(0)
}

run()

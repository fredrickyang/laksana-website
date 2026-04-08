/**
 * fix-locale-specs.ts
 *
 * Fixes products where detailedSpecs have Chinese keys/values bleeding into
 * the 'id' (Indonesian) and 'en' (English) locales.
 *
 * Root cause: specs were seeded with Chinese-only data, so Payload's locale
 * fallback put Chinese content into id/en as well.
 *
 * Strategy: update each locale individually (not locale:'all') to avoid
 * Payload's cross-locale required field validation.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

// ============================================================
// KEY MAP: Chinese key → proper Indonesian key
// 'key' is NOT localized in schema — one value for all locales
// ============================================================
const keyMap: Record<string, string> = {
    '地基': 'Pondasi',
    '结构': 'Struktur',
    '墙体': 'Dinding',
    '屋顶': 'Atap',
    '地面': 'Lantai',
    '电力': 'Listrik / Daya',
    '基础设施': 'Infrastruktur',
    '供电': 'Listrik / Daya',
    '用水': 'Air',
    '认证': 'Sertifikasi',
    '水源': 'Sumber Air',       // Water source
    '许可证': 'Izin / Sertifikasi', // License/Permit
}

// ============================================================
// VALUE MAP: Chinese value → { id, en, zh }
// ============================================================
const valueMap: Record<string, { id: string; en: string; zh: string }> = {
    // Common warehouse spec values
    '桩基础': { id: 'Tiang Pancang', en: 'Pile Foundation', zh: '桩基础' },
    'WF钢结构': { id: 'Baja WF', en: 'WF Steel Structure', zh: 'WF钢结构' },
    '红砖 / 轻质砖': { id: 'Bata Merah / Bata Ringan', en: 'Red Brick / Lightweight Brick', zh: '红砖 / 轻质砖' },
    'UPVC双层': { id: 'UPVC 2 Layer', en: 'UPVC Double Layer', zh: 'UPVC双层' },
    '地坪硬化剂': { id: 'Floor Hardener', en: 'Floor Hardener', zh: '地坪硬化剂' },
    '6600 VA起': { id: 'Mulai dari 6600 VA', en: 'Starting from 6600 VA', zh: '6600 VA起' },
    // Kavling Industri
    '完善且现代化': { id: 'Modern & Tersedia', en: 'Modern & Available', zh: '完善且现代化' },
    '工业级供电': { id: 'Daya Industri', en: 'Industrial Power Supply', zh: '工业级供电' },
    '自来水和井水': { id: 'PDAM & Air Sumur', en: 'Municipal Water & Well Water', zh: '自来水和井水' },
    'IUKI就绪': { id: 'IUKI Siap', en: 'IUKI Ready', zh: 'IUKI就绪' },
    // Other possible Chinese values
    '自来水': { id: 'Air PDAM', en: 'Municipal Water', zh: '自来水' },
    '井水': { id: 'Air Sumur', en: 'Well Water', zh: '井水' },
    'IUKI认证': { id: 'Bersertifikat IUKI', en: 'IUKI Certified', zh: 'IUKI认证' },
    'UIKI认证': { id: 'Bersertifikat UIKI', en: 'UIKI Certified', zh: 'UIKI认证' },
}

function hasChinese(str: string): boolean {
    return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(str)
}

function translateKey(key: string): string {
    return keyMap[key] ?? key
}

function translateValue(val: string): { id: string; en: string; zh: string } {
    if (valueMap[val]) return valueMap[val]
    if (hasChinese(val)) {
        console.warn(`    ⚠️  No translation found for: "${val}" — keeping as-is`)
    }
    return { id: val, en: val, zh: val }
}

async function run() {
    const payload = await getPayload({ config })

    const products = await payload.find({
        collection: 'products',
        limit: 100,
        locale: 'all' as any,
    })

    console.log(`\n🔧 Fixing locale specs for ${products.docs.length} products...\n`)

    for (const p of products.docs as any[]) {
        const nameAll = p.name || {}
        const nameId = nameAll?.id || nameAll?.en || nameAll?.zh || `ID:${p.id}`

        const specs = p.detailedSpecs
        if (!specs || specs.length === 0) {
            console.log(`⏭  "${nameId}" — no detailedSpecs, skipping`)
            continue
        }

        // Check if this product has any Chinese keys or values in wrong locales
        let needsFix = false
        for (const spec of specs) {
            if (hasChinese(spec.key || '')) needsFix = true
            const val = spec.value || {}
            if (hasChinese(val.id || '') || hasChinese(val.en || '')) needsFix = true
        }

        if (!needsFix) {
            console.log(`✅  "${nameId}" — looks clean, skipping`)
            continue
        }

        console.log(`\n🔨  Fixing "${nameId}" (ID: ${p.id})`)

        // Build translated spec objects, preserving icon/id fields
        const translatedSpecs = specs.map((spec: any) => {
            const originalKey = spec.key || ''
            const correctedKey = translateKey(originalKey)
            const val = spec.value || {}

            // Find source Chinese value (could be in any locale due to fallback)
            const srcZh = val.zh && hasChinese(val.zh) ? val.zh : null
            const srcId = val.id && hasChinese(val.id) ? val.id : null
            const srcEn = val.en && hasChinese(val.en) ? val.en : null
            const chineseVal = srcZh || srcId || srcEn

            if (originalKey !== correctedKey) {
                console.log(`  key: "${originalKey}" → "${correctedKey}"`)
            }

            let translations: { id: string; en: string; zh: string }
            if (chineseVal) {
                translations = translateValue(chineseVal)
                console.log(`  value["${correctedKey}"]: id→"${translations.id}" / en→"${translations.en}" / zh→"${translations.zh}"`)
            } else {
                // Keep existing, just fix key
                translations = { id: val.id || val.en || val.zh || '', en: val.en || val.id || val.zh || '', zh: val.zh || val.en || val.id || '' }
            }

            return { key: correctedKey, value: translations }
        })

        // Update per-locale to avoid cross-locale required-field validation errors
        const locales = ['id', 'en', 'zh'] as const
        let successCount = 0

        for (const locale of locales) {
            // Build specs for this locale: key stays the same, value is just a string
            const localeSpecs = translatedSpecs.map((spec: any) => ({
                key: spec.key,
                value: spec.value[locale],
            }))

            try {
                await payload.update({
                    collection: 'products',
                    id: p.id,
                    locale,
                    data: {
                        name: nameAll[locale] || nameAll.id || nameAll.en || nameAll.zh,
                        detailedSpecs: localeSpecs,
                    } as any,
                })
                successCount++
            } catch (err: any) {
                console.error(`  ❌ Failed [${locale}]:`, JSON.stringify(err?.data?.errors || err.message, null, 2))
            }
        }

        if (successCount === 3) {
            console.log(`  ✅ All 3 locales updated for "${nameId}"`)
        } else {
            console.log(`  ⚠️  Only ${successCount}/3 locales succeeded for "${nameId}"`)
        }
    }

    console.log('\n✅ Done!\n')
    process.exit(0)
}

run()

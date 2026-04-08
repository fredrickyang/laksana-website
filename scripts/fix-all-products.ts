/**
 * fix-all-products.ts
 *
 * One-shot script: fixes all locale data for all products in a single update
 * per locale — avoids Payload's cross-field required validation.
 *
 * Fixes:
 * 1. keySpecs labels (id + en + zh)
 * 2. detailedSpecs keys (Chinese → proper) + values (per locale)
 * 3. shortDescription for Unit Maxima Plus (was empty)
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

// ─── KeySpecs: icon → labels ────────────────────────────────────────────────
const iconLabelMap: Record<number, { id: string; en: string; zh: string }> = {
    134: { id: 'Keamanan 24/7', en: '24/7 Security', zh: '24/7 全天候安保' },
    135: { id: 'Lokasi Strategis', en: 'Strategic Location', zh: '优越地理位置' },
    133: { id: 'Listrik Stabil', en: 'Stable Power', zh: '稳定电力供应' },
}

// ─── DetailedSpecs: Chinese key → Indonesian key ─────────────────────────────
const keyMap: Record<string, string> = {
    '地基': 'Pondasi', '结构': 'Struktur', '墙体': 'Dinding',
    '屋顶': 'Atap', '地面': 'Lantai', '电力': 'Listrik / Daya',
    '基础设施': 'Infrastruktur', '供电': 'Listrik / Daya',
    '用水': 'Air', '认证': 'Sertifikasi',
    '水源': 'Sumber Air', '许可证': 'Izin / Sertifikasi',
}

// ─── DetailedSpecs: Chinese value → { id, en, zh } ──────────────────────────
const valueMap: Record<string, { id: string; en: string; zh: string }> = {
    '桩基础': { id: 'Tiang Pancang', en: 'Pile Foundation', zh: '桩基础' },
    'WF钢结构': { id: 'Baja WF', en: 'WF Steel Structure', zh: 'WF钢结构' },
    '红砖 / 轻质砖': { id: 'Bata Merah / Bata Ringan', en: 'Red Brick / Lightweight Brick', zh: '红砖 / 轻质砖' },
    'UPVC双层': { id: 'UPVC 2 Layer', en: 'UPVC Double Layer', zh: 'UPVC双层' },
    '地坪硬化剂': { id: 'Floor Hardener', en: 'Floor Hardener', zh: '地坪硬化剂' },
    '6600 VA起': { id: 'Mulai dari 6600 VA', en: 'Starting from 6600 VA', zh: '6600 VA起' },
    '完善且现代化': { id: 'Modern & Tersedia', en: 'Modern & Available', zh: '完善且现代化' },
    '工业级供电': { id: 'Daya Industri', en: 'Industrial Power Supply', zh: '工业级供电' },
    '自来水和井水': { id: 'PDAM & Air Sumur', en: 'Municipal Water & Well Water', zh: '自来水和井水' },
    'IUKI就绪': { id: 'IUKI Siap', en: 'IUKI Ready', zh: 'IUKI就绪' },
    '自来水': { id: 'Air PDAM', en: 'Municipal Water', zh: '自来水' },
    '井水': { id: 'Air Sumur', en: 'Well Water', zh: '井水' },
    'IUKI认证': { id: 'Bersertifikat IUKI', en: 'IUKI Certified', zh: 'IUKI认证' },
}

// ─── Per-product short descriptions ─────────────────────────────────────────
const shortDescMap: Record<string, { id: string; en: string; zh: string }> = {
    'unit-maxima-plus': {
        id: 'Versi premium dari Unit Maxima dengan kapasitas dan fasilitas yang ditingkatkan.',
        en: 'The premium version of Unit Maxima with enhanced capacity and facilities.',
        zh: 'Maxima单元的高端版本，容量和设施更为出色。',
    },
}

function hasChinese(str: string): boolean {
    return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(str)
}

function fixKey(key: string): string {
    return keyMap[key] ?? key
}

function fixValue(val: string): { id: string; en: string; zh: string } {
    if (valueMap[val]) return valueMap[val]
    if (hasChinese(val)) console.warn(`  ⚠️  No translation for value: "${val}"`)
    return { id: val, en: val, zh: val }
}

async function run() {
    const payload = await getPayload({ config })

    const products = await payload.find({
        collection: 'products',
        limit: 100,
        locale: 'all' as any,
    })

    console.log(`\n🔧 Fixing all product locale data for ${products.docs.length} products...\n`)

    const locales = ['id', 'en', 'zh'] as const

    for (const p of products.docs as any[]) {
        const nameAll = p.name || {}
        const nameId = nameAll?.id || nameAll?.en || nameAll?.zh || `ID:${p.id}`
        const slug = p.slug?.id || p.slug?.en || p.slug?.zh || ''

        console.log(`\n📦 "${nameId}" (ID: ${p.id})`)

        // ── Build corrected detailedSpecs translations ──────────────────────
        const rawSpecs = p.detailedSpecs || []
        const translatedSpecs = rawSpecs.map((spec: any) => {
            const origKey = spec.key || ''
            const corrKey = fixKey(origKey)
            const val = spec.value || {}

            const srcChinese = hasChinese(val.zh) ? val.zh
                : hasChinese(val.id) ? val.id
                : hasChinese(val.en) ? val.en
                : null

            const translations = srcChinese ? fixValue(srcChinese)
                : { id: val.id || val.en || val.zh || '', en: val.en || val.id || val.zh || '', zh: val.zh || val.en || val.id || '' }

            return { key: corrKey, value: translations }
        })

        // ── Build corrected keySpecs ─────────────────────────────────────────
        const rawKeySpecs = p.keySpecs || []
        const translatedKeySpecs = rawKeySpecs.map((spec: any) => {
            const iconId = typeof spec.icon === 'object' ? spec.icon?.id : spec.icon
            const labels = iconLabelMap[iconId]
            return {
                icon: iconId,
                labels: labels || { id: '', en: '', zh: '' },
            }
        })

        // ── Per-locale update (single call with all fields) ─────────────────
        for (const locale of locales) {
            const localeSpecs = translatedSpecs.map((s: any) => ({
                key: s.key,
                value: s.value[locale],
            }))

            const localeKeySpecs = translatedKeySpecs.map((s: any) => ({
                icon: s.icon,
                label: s.labels[locale] || '',
            }))

            const name = nameAll[locale] || nameAll.id || nameAll.en || nameAll.zh

            // shortDescription: use existing or fill if empty
            const existingShortDesc = (p.shortDescription || {})[locale]
            const extraShortDesc = shortDescMap[slug]
            const shortDescription = existingShortDesc || (extraShortDesc ? extraShortDesc[locale] : undefined)

            const updateData: any = { name }
            if (localeSpecs.length > 0) updateData.detailedSpecs = localeSpecs
            if (localeKeySpecs.length > 0) updateData.keySpecs = localeKeySpecs
            if (shortDescription) updateData.shortDescription = shortDescription

            try {
                await payload.update({
                    collection: 'products',
                    id: p.id,
                    locale,
                    data: updateData,
                })
                console.log(`  ✅ [${locale}] updated`)
            } catch (err: any) {
                const errors = err?.data?.errors || err.message
                console.error(`  ❌ [${locale}] failed:`, JSON.stringify(errors, null, 2))
            }
        }
    }

    console.log('\n✅ All done!\n')
    process.exit(0)
}

run()

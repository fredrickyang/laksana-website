import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

// Detect if a string contains Chinese/Mandarin characters
function hasChinese(str: string): boolean {
    return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(str)
}

async function run() {
    const payload = await getPayload({ config })
    const products = await payload.find({
        collection: 'products',
        limit: 100,
        locale: 'all' as any,
    })

    const locales = ['id', 'en', 'zh'] as const
    const issues: string[] = []

    console.log(`\n📦 Found ${products.docs.length} products\n`)
    console.log('='.repeat(80))

    for (const p of products.docs as any[]) {
        const nameAll = p.name || {}
        const nameId = nameAll?.id || nameAll?.en || nameAll?.zh || `ID:${p.id}`

        console.log(`\n🏷  Product: "${nameId}" (ID: ${p.id})`)

        // Check name across locales
        for (const loc of locales) {
            const val = nameAll[loc]
            const isChineseInWrongLocale = loc !== 'zh' && val && hasChinese(val)
            const isMissing = !val
            
            if (isChineseInWrongLocale) {
                issues.push(`[${p.id}] name.${loc} has Chinese chars: "${val}"`)
                console.log(`  ⚠️  name[${loc}]: "${val}" ← CHINESE IN WRONG LOCALE`)
            } else if (isMissing) {
                issues.push(`[${p.id}] name.${loc} is empty`)
                console.log(`  ❌  name[${loc}]: (empty)`)
            } else {
                console.log(`  ✅  name[${loc}]: "${val}"`)
            }
        }

        // Check label
        const labelAll = p.label || {}
        console.log(`  --- label ---`)
        for (const loc of locales) {
            const val = labelAll[loc]
            const isChineseInWrongLocale = loc !== 'zh' && val && hasChinese(val)
            const isMissing = !val
            
            if (isChineseInWrongLocale) {
                issues.push(`[${p.id}] label.${loc} has Chinese chars: "${val}"`)
                console.log(`  ⚠️  label[${loc}]: "${val}" ← CHINESE IN WRONG LOCALE`)
            } else if (isMissing) {
                console.log(`  ❌  label[${loc}]: (empty)`)
            } else {
                console.log(`  ✅  label[${loc}]: "${val}"`)
            }
        }

        // Check shortDescription
        if (p.shortDescription) {
            const sdAll = p.shortDescription || {}
            console.log(`  --- shortDescription ---`)
            for (const loc of locales) {
                const val = sdAll[loc]
                const isChineseInWrongLocale = loc !== 'zh' && val && hasChinese(val)
                if (isChineseInWrongLocale) {
                    issues.push(`[${p.id}] shortDescription.${loc} has Chinese chars`)
                    console.log(`  ⚠️  shortDesc[${loc}]: "${val?.slice(0,60)}..." ← CHINESE IN WRONG LOCALE`)
                } else if (!val) {
                    console.log(`  ❌  shortDesc[${loc}]: (empty)`)
                } else {
                    console.log(`  ✅  shortDesc[${loc}]: "${val?.slice(0,60)}"`)
                }
            }
        }

        // Check detailedSpecs values
        if (p.detailedSpecs && p.detailedSpecs.length > 0) {
            console.log(`  --- detailedSpecs (${p.detailedSpecs.length} items) ---`)
            for (const spec of p.detailedSpecs) {
                const val = spec.value || {}
                for (const loc of locales) {
                    const v = val[loc]
                    const isChineseInWrongLocale = loc !== 'zh' && v && hasChinese(v)
                    if (isChineseInWrongLocale) {
                        issues.push(`[${p.id}] detailedSpecs["${spec.key}"].value.${loc} has Chinese: "${v}"`)
                        console.log(`  ⚠️  spec[${spec.key}][${loc}]: "${v}" ← CHINESE IN WRONG LOCALE`)
                    }
                }
            }
        }

        // Check keySpecs labels
        if (p.keySpecs && p.keySpecs.length > 0) {
            console.log(`  --- keySpecs (${p.keySpecs.length} items) ---`)
            for (const spec of p.keySpecs) {
                const labelData = spec.label || {}
                for (const loc of locales) {
                    const v = labelData[loc]
                    const isChineseInWrongLocale = loc !== 'zh' && v && hasChinese(v)
                    if (isChineseInWrongLocale) {
                        issues.push(`[${p.id}] keySpecs label.${loc} has Chinese: "${v}"`)
                        console.log(`  ⚠️  keySpec label[${loc}]: "${v}" ← CHINESE`)
                    }
                }
            }
        }
    }

    console.log('\n' + '='.repeat(80))
    if (issues.length === 0) {
        console.log('✅ No issues found!')
    } else {
        console.log(`\n⚠️  ISSUES FOUND (${issues.length}):`)
        issues.forEach(i => console.log('  • ' + i))
    }

    process.exit(0)
}

run()

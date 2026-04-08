import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const iconMappings: Record<string, { id: string, en: string, zh: string }> = {
    'shield-icon-2.svg': {
        id: 'Keamanan 24 Jam',
        en: '24/7 Security',
        zh: '24/7 全天候安保'
    },
    'location-icon-2.svg': {
        id: 'Lokasi Strategis',
        en: 'Strategic Location',
        zh: '优越地理位置'
    },
    'wifi-icon.svg': {
        id: 'Koneksi Internet',
        en: 'Internet Connection',
        zh: '互联网连接'
    },
    'box-icon.svg': {
        id: 'Area Bongkar Muat',
        en: 'Loading Area',
        zh: '装卸区'
    },
    'road-icon.svg': {
        id: 'Akses Jalan Luas',
        en: 'Wide Road Access',
        zh: '宽广道路通达'
    },
    'gate-icon.svg': {
        id: 'One Gate System',
        en: 'One Gate System',
        zh: '单口进出系统'
    },
    'camera-icon.svg': {
        id: 'CCTV 24 Jam',
        en: '24/7 CCTV',
        zh: '24/7 监控设备'
    },
    'lighting-icon.svg': {
        id: 'Penerangan Jalan',
        en: 'Street Lighting',
        zh: '街道照明'
    }
}

const locales = ['id', 'en', 'zh'] as const

async function audit() {
    console.log('🚀 Starting Product Audit...\n')
    const payload = await getPayload({ config })

    const productsResult = await payload.find({
        collection: 'products',
        limit: 100,
        locale: 'id', // Base fetch in ID as source of truth
    })

    const products = productsResult.docs

    for (const product of products) {
        console.log(`📦 Auditing Product: ${product.name} (ID: ${product.id})`)

        for (const locale of locales) {
            let needsUpdate = false
            const updateData: any = {}

            // Fetch the product for the specific locale to check current values
            const localizedProduct = await payload.findByID({
                collection: 'products',
                id: product.id,
                locale,
            })

            // 1. Check main label
            if (!localizedProduct.label) {
                updateData.label = product.label || product.name || '-'
                needsUpdate = true
            }

            // 2. Check keySpecs
            if (product.keySpecs && Array.isArray(product.keySpecs)) {
                const updatedKeySpecs = product.keySpecs.map((spec: any, index: number) => {
                    const localSpec = localizedProduct.keySpecs?.[index]
                    let updatedLabel = localSpec?.label

                    if (!updatedLabel) {
                        if (spec.icon) {
                            const iconFilename = typeof spec.icon === 'object' ? spec.icon.filename : null
                            if (iconFilename && iconMappings[iconFilename]) {
                                updatedLabel = iconMappings[iconFilename][locale]
                                needsUpdate = true
                            } else if (spec.label) {
                                updatedLabel = spec.label
                                needsUpdate = true
                            }
                        } else if (spec.label) {
                            updatedLabel = spec.label
                            needsUpdate = true
                        }
                    }

                    if (!updatedLabel) {
                        updatedLabel = '-' // Mandatory fallback
                        needsUpdate = true
                    }

                    return {
                        id: spec.id,
                        label: updatedLabel,
                        icon: typeof spec.icon === 'object' ? spec.icon.id : spec.icon
                    }
                })
                if (needsUpdate) {
                    updateData.keySpecs = updatedKeySpecs
                }
            }

            // 3. Check facilities
            if (product.facilities && Array.isArray(product.facilities)) {
                const updatedFacilities = product.facilities.map((fac: any, index: number) => {
                    const localFac = localizedProduct.facilities?.[index]
                    let updatedLabel = localFac?.label

                    if (!updatedLabel) {
                        if (fac.icon) {
                            const iconFilename = typeof fac.icon === 'object' ? fac.icon.filename : null
                            if (iconFilename && iconMappings[iconFilename]) {
                                updatedLabel = iconMappings[iconFilename][locale]
                                needsUpdate = true
                            } else if (fac.label) {
                                updatedLabel = fac.label
                                needsUpdate = true
                            }
                        } else if (fac.label) {
                            updatedLabel = fac.label
                            needsUpdate = true
                        }
                    }

                    if (!updatedLabel) {
                        updatedLabel = '-' // Mandatory fallback
                        needsUpdate = true
                    }

                    return {
                        id: fac.id,
                        label: updatedLabel,
                        icon: typeof fac.icon === 'object' ? fac.icon.id : fac.icon
                    }
                })
                if (needsUpdate) {
                    updateData.facilities = updatedFacilities
                }
            }

            // 4. Fill required detailedSpecs values
            if (product.detailedSpecs && Array.isArray(product.detailedSpecs)) {
                const updatedDetailedSpecs = product.detailedSpecs.map((spec: any, index: number) => {
                    const localSpec = localizedProduct.detailedSpecs?.[index]
                    let updatedValue = localSpec?.value

                    if (!updatedValue && spec.value) {
                        updatedValue = spec.value
                        needsUpdate = true
                    }

                    if (!updatedValue) {
                        updatedValue = '-' // Satisfy required field
                        needsUpdate = true
                    }

                    return {
                        id: spec.id,
                        key: spec.key || 'Spec', // key is required too
                        value: updatedValue
                    }
                })
                if (needsUpdate) {
                    updateData.detailedSpecs = updatedDetailedSpecs
                }
            }

            // 5. Short Description
            if (!localizedProduct.shortDescription) {
                if (product.shortDescription) {
                    updateData.shortDescription = product.shortDescription
                    needsUpdate = true
                } else {
                    updateData.shortDescription = '-' // Fallback
                    needsUpdate = true
                }
            }

            // 6. Call to Action
            if (!localizedProduct.callToAction) {
                if (product.callToAction) {
                    updateData.callToAction = product.callToAction
                    needsUpdate = true
                } else {
                    updateData.callToAction = 'Hubungi Kami' // Default CTA
                    needsUpdate = true
                }
            }

            if (needsUpdate) {
                try {
                    console.log(`  📝 Updating locale [${locale}]...`)
                    console.log('  DEBUG Update Data keys:', Object.keys(updateData))
                    await payload.update({
                        collection: 'products',
                        id: product.id,
                        locale,
                        data: updateData,
                    })
                    console.log(`  ✅ [${locale}] updated`)
                } catch (err: any) {
                    console.error(`  ❌ Failed to update [${locale}]:`, JSON.stringify(err.data || err.message))
                    if (err.data?.errors) {
                        console.error('  Validation Errors:', JSON.stringify(err.data.errors, null, 2))
                    }
                }
            } else {
                console.log(`  ⏭️  [${locale}] no update needed`)
            }
        }
        console.log('')
    }

    console.log('🎉 Product audit complete!')
    process.exit(0)
}

audit().catch((err) => {
    console.error('Fatal error during audit:', err)
    process.exit(1)
})

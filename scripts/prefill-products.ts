import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
    const payload = await getPayload({ config })
    const products = await payload.find({ collection: 'products', limit: 50 })

    for (const p of products.docs) {
        console.log(`Prefilling [${p.name}]...`)
        try {
            for (const loc of ['id', 'en', 'zh']) {
                await payload.update({
                    collection: 'products',
                    id: p.id,
                    locale: loc as any,
                    data: {
                        featured: true,
                        keySpecs: [
                            { icon: 134, label: 'Keamanan 24/7' },
                            { icon: 135, label: 'Lokasi Strategis' },
                            { icon: 133, label: 'Listrik Stabil' }
                        ],
                        detailedSpecs: [
                            { key: 'Pondasi', value: 'Tiang Pancang' },
                            { key: 'Struktur', value: 'Baja WF' },
                            { key: 'Dinding', value: 'Bata Merah / Bata Ringan' },
                            { key: 'Lantai', value: 'Floor Hardener' }
                        ],
                        facilities: [
                            { icon: 134, label: 'CCTV 24 Jam' },
                            { icon: 135, label: 'Main Gate' }
                        ]
                    }
                })
            }
            console.log(`✅ [${p.name}] success`)
        } catch (err: any) {
            console.error(`❌ [${p.name}] fail:`, JSON.stringify(err.data?.errors || err, null, 2))
        }
    }
    process.exit(0)
}

run()

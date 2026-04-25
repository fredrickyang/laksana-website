import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

async function backup() {
    const { default: config } = await import('../payload.config')
    
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error('PAYLOAD_SECRET is missing from environment variables')
    }
    const payload = await getPayload({ config })
    const backupDir = path.resolve(process.cwd(), '.tmp/backup-' + new Date().toISOString().replace(/[:.]/g, '-'))
    
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true })
    }

    const collections = ['users', 'media', 'products', 'phases', 'articles', 'categories', 'form-submissions']
    const globals = ['settings', 'home-page', 'about-page', 'facilities-page', 'privacy-policy-page', 'terms-conditions-page', 'article-page', 'product-page']

    console.log('Starting backup to', backupDir)

    for (const slug of collections) {
        console.log(`Backing up collection: ${slug}`)
        let allDocs: any[] = []
        let page = 1
        let hasNextPage = true

        while (hasNextPage) {
            const result = await payload.find({
                collection: slug as any,
                limit: 100,
                page,
                depth: 0,
            })
            allDocs = allDocs.concat(result.docs)
            hasNextPage = result.hasNextPage
            page++
        }

        fs.writeFileSync(
            path.resolve(backupDir, `collection-${slug}.json`),
            JSON.stringify(allDocs, null, 2)
        )
    }

    for (const slug of globals) {
        console.log(`Backing up global: ${slug}`)
        const doc = await payload.findGlobal({
            slug: slug as any,
            depth: 0,
        })
        fs.writeFileSync(
            path.resolve(backupDir, `global-${slug}.json`),
            JSON.stringify(doc, null, 2)
        )
    }

    console.log('Backup completed successfully!')
    process.exit(0)
}

backup().catch(err => {
    console.error('Backup failed:', err)
    process.exit(1)
})

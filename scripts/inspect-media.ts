import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  
  const mediaList = await payload.find({
    collection: 'media',
    limit: 100,
  })

  console.log('Total Media files:', mediaList.totalDocs)
  console.log('Media files:', JSON.stringify(mediaList.docs.map(doc => ({
    id: doc.id,
    filename: doc.filename,
    mimeType: doc.mimeType,
    url: doc.url,
  })), null, 2))

  process.exit(0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

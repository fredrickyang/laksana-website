import 'dotenv/config'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getPayload } from 'payload'
import sharp from 'sharp'

import config from '../payload.config'
import { getS3Client } from '../lib/s3'
import { IMAGE_VARIANTS, isRasterImage, type ImageVariantName } from '../lib/image-variants'

type MediaDoc = {
  id: number
  alt?: string
  filename?: string | null
  height?: number | null
  mimeType?: string | null
  prefix?: string | null
  sizes?: Record<string, unknown> | null
  url?: string | null
  width?: number | null
}

type MediaSizes = Partial<Record<ImageVariantName, { url?: string | null }>>

const args = new Set(process.argv.slice(2))
const dryRun = args.has('--dry-run')
const force = args.has('--force')
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity
const bucket = process.env.S3_BUCKET
const publicBaseUrl = process.env.NEXT_PUBLIC_S3_URL || 'https://d2ml0yc0mb1c0r.cloudfront.net'

function getExtension(filename: string) {
  const ext = filename.split('.').pop()
  return ext ? `.${ext}` : ''
}

function stripExtension(filename: string) {
  const ext = getExtension(filename)
  return ext ? filename.slice(0, -ext.length) : filename
}

function getVariantKey(doc: MediaDoc, variant: ImageVariantName, width: number) {
  const sourceName = doc.filename || `media-${doc.id}`
  const basename = stripExtension(sourceName)
  const prefix = doc.prefix ? `${doc.prefix.replace(/\/+$/, '')}/` : ''
  return `${prefix}optimized/${basename}-${variant}-${width}.webp`
}

async function fetchOriginal(doc: MediaDoc) {
  if (!doc.url) throw new Error(`Media ${doc.id} has no URL`)

  const response = await fetch(doc.url)
  if (!response.ok) {
    throw new Error(`Failed to download ${doc.url}: ${response.status} ${response.statusText}`)
  }

  return Buffer.from(await response.arrayBuffer())
}

async function putObject(key: string, body: Buffer) {
  if (!bucket) throw new Error('S3_BUCKET is required when not using --dry-run')

  await getS3Client().send(
    new PutObjectCommand({
      Body: body,
      Bucket: bucket,
      CacheControl: 'public, max-age=31536000, immutable',
      ContentType: 'image/webp',
      Key: key,
    }),
  )
}

async function buildSizes(doc: MediaDoc, original: Buffer) {
  const metadata = await sharp(original).metadata()
  const originalWidth = metadata.width || Math.max(...IMAGE_VARIANTS.map((variant) => variant.width))
  const sizes: Record<string, unknown> = {}

  for (const variant of IMAGE_VARIANTS) {
    const width = Math.min(variant.width, originalWidth)
    const output = await sharp(original)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: variant.quality })
      .toBuffer({ resolveWithObject: true })
    const key = getVariantKey(doc, variant.name, width)

    sizes[variant.name] = {
      filename: key,
      filesize: output.info.size,
      height: output.info.height,
      mimeType: 'image/webp',
      url: `${publicBaseUrl.replace(/\/+$/, '')}/${key}`,
      width: output.info.width,
    }

    if (!dryRun) await putObject(key, output.data)
  }

  return sizes
}

async function main() {
  const payload = await getPayload({ config })
  let page = 1
  let processed = 0
  let skipped = 0
  let updated = 0
  const failures: Array<{ id: number; error: string }> = []

  while (processed + skipped < limit) {
    const result = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 100,
      page,
    })

    for (const doc of result.docs as MediaDoc[]) {
      if (processed + skipped >= limit) break

      if (!isRasterImage(doc.mimeType || doc.filename || doc.url)) {
        skipped += 1
        continue
      }

      const existingSizes = doc.sizes as MediaSizes | null | undefined
      if (!force && IMAGE_VARIANTS.every((variant) => Boolean(existingSizes?.[variant.name]?.url))) {
        skipped += 1
        continue
      }

      processed += 1

      try {
        const original = await fetchOriginal(doc)
        const sizes = await buildSizes(doc, original)

        if (!dryRun) {
          await payload.update({
            collection: 'media',
            data: {
              sizes: {
                ...(doc.sizes || {}),
                ...sizes,
              },
            },
            id: doc.id,
            overrideAccess: true,
          })
          updated += 1
        }
      } catch (error) {
        failures.push({
          id: doc.id,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    if (!result.hasNextPage) break
    page += 1
  }

  console.log(
    JSON.stringify(
      {
        dryRun,
        failures,
        force,
        processed,
        skipped,
        updated,
      },
      null,
      2,
    ),
  )

  process.exit(failures.length > 0 ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

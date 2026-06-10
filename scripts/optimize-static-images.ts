import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { STATIC_IMAGE_WIDTHS, getStaticVariantPath, isRasterImage } from '../lib/image-variants'

const root = process.cwd()
const inputDirs = ['public/images', 'public/media', 'public/luxima/images']
const generatedRoot = path.join(root, 'public/generated')
const quality = 80

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(entryPath)
      if (entry.isFile()) return [entryPath]
      return []
    }),
  )

  return files.flat()
}

async function shouldGenerate(sourcePath: string, outputPath: string) {
  if (!(await fileExists(outputPath))) return true

  const [sourceStat, outputStat] = await Promise.all([fs.stat(sourcePath), fs.stat(outputPath)])
  return sourceStat.mtimeMs > outputStat.mtimeMs
}

async function optimizeFile(sourcePath: string) {
  const publicRelative = `/${path.relative(path.join(root, 'public'), sourcePath)}`
  const metadata = await sharp(sourcePath).metadata()
  const sourceWidth = metadata.width || Math.max(...STATIC_IMAGE_WIDTHS)
  const widths = STATIC_IMAGE_WIDTHS.filter((width) => width <= sourceWidth)
  const targetWidths = widths.length > 0 ? widths : [sourceWidth]

  let created = 0
  let skipped = 0
  let savedBytes = 0

  for (const width of targetWidths) {
    const outputPublicPath = getStaticVariantPath(publicRelative, width)
    const outputPath = path.join(root, 'public', outputPublicPath)

    if (!(await shouldGenerate(sourcePath, outputPath))) {
      skipped += 1
      continue
    }

    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await sharp(sourcePath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath)

    const [sourceStat, outputStat] = await Promise.all([fs.stat(sourcePath), fs.stat(outputPath)])
    savedBytes += Math.max(0, sourceStat.size - outputStat.size)
    created += 1
  }

  return { created, skipped, savedBytes }
}

async function main() {
  let fileCount = 0
  let created = 0
  let skipped = 0
  let savedBytes = 0

  for (const dir of inputDirs) {
    const absoluteDir = path.join(root, dir)
    if (!(await fileExists(absoluteDir))) continue

    const files = await walk(absoluteDir)
    for (const file of files) {
      if (!isRasterImage(file)) continue
      fileCount += 1
      const result = await optimizeFile(file)
      created += result.created
      skipped += result.skipped
      savedBytes += result.savedBytes
    }
  }

  console.log(
    JSON.stringify(
      {
        created,
        filesScanned: fileCount,
        generatedDir: path.relative(root, generatedRoot),
        savedMB: Number((savedBytes / 1024 / 1024).toFixed(2)),
        skipped,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

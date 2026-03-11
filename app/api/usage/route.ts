import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import config from '@payload-config'

const STORAGE_SERVICE_UUID = 'b81c3090-092c-4a98-b4e5-6d6ba3cc54d0'

// No auth required — this endpoint is called by the Dashboard server on its daily pull schedule
export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Storage: sum of all media file sizes (in bytes)
    const result = await payload.db.drizzle.execute(
      sql`SELECT COALESCE(SUM(filesize), 0) as total FROM media`,
    )

    const storageBytes = Number(result.rows[0]?.total ?? 0)

    return NextResponse.json({
      [STORAGE_SERVICE_UUID]: storageBytes,
    })
  } catch (error) {
    console.error('Usage endpoint error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

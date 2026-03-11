import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import config from '@payload-config'

const DASHBOARD_API_URL =
  'https://dashboard.anakweb.com/api/clients/8769740a-566a-474c-b67f-3368b1ef4998/usage'
const SERVICE_UUID = 'b81c3090-092c-4a98-b4e5-6d6ba3cc54d0'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config })

    const result = await payload.db.drizzle.execute(
      sql`SELECT COALESCE(SUM(filesize), 0) as total FROM media`,
    )

    const usageBytes = Number(result.rows[0]?.total ?? 0)

    const response = await fetch(DASHBOARD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.DASHBOARD_API_KEY!,
      },
      body: JSON.stringify({
        serviceKey: SERVICE_UUID,
        usedAmount: usageBytes,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Dashboard API error:', response.status, text)
      return NextResponse.json(
        { error: 'Failed to sync usage to dashboard', status: response.status },
        { status: 502 },
      )
    }

    return NextResponse.json({
      success: true,
      usage_bytes: usageBytes,
    })
  } catch (error) {
    console.error('Sync usage error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

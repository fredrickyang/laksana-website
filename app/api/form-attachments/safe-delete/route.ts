import { getPayloadClient } from '@/lib/payload'
import { previewFormAttachmentDeletion } from '@/lib/form-attachment-references'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function isValidId(value: unknown): value is number | string {
  return typeof value === 'number' || (typeof value === 'string' && value.length > 0)
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: await headers() })

    if (!user || !(user.role === 'admin' || user.role === 'legal')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const ids = Array.isArray(body?.ids) ? body.ids.filter(isValidId) : []
    const apply = body?.apply === true

    if (ids.length === 0) {
      return NextResponse.json({ error: 'No attachment IDs provided' }, { status: 400 })
    }

    const preview = await previewFormAttachmentDeletion(payload, ids)

    if (!apply) {
      return NextResponse.json({ preview })
    }

    const deletedParents: Array<{ collection: string; id: number | string; title: string }> = []
    const deletedAttachments: Array<number | string> = []

    for (const parent of preview.parentSubmissions) {
      await payload.delete({
        collection: parent.collection,
        id: parent.id,
        overrideAccess: true,
      })

      deletedParents.push({
        collection: parent.collection,
        id: parent.id,
        title: parent.title,
      })
    }

    for (const id of preview.unreferencedAttachmentIds) {
      await payload.delete({
        collection: 'form-attachments',
        id,
        overrideAccess: true,
      })

      deletedAttachments.push(id)
    }

    return NextResponse.json({
      deletedAttachments,
      deletedParents,
      preview,
    })
  } catch (error) {
    console.error('Safe form attachment delete error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

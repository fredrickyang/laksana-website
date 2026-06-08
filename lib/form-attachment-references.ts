import type { Payload } from 'payload'

type SubmissionCollection = 'form-company-submissions' | 'form-personal-submissions'

type SubmissionDoc = Record<string, unknown> & {
  createdAt?: string
  fullname_company?: string
  fullname_customer?: string
  id: number | string
}

type AttachmentDoc = {
  alt?: string | null
  filename?: string | null
  id: number | string
}

export type FormAttachmentReference = {
  collection: SubmissionCollection
  field: string
  fieldLabel: string
  id: number | string
  title: string
}

export type FormAttachmentDeletionPreview = {
  attachments: Array<{
    filename: string | null
    id: number | string
    references: FormAttachmentReference[]
    title: string
  }>
  parentSubmissions: FormAttachmentReference[]
  unreferencedAttachmentIds: Array<number | string>
}

const COMPANY_FIELDS = [
  { label: 'KTP / NPWP / Paspor (Direksi)', name: 'ktp_kitas' },
  { label: 'NIB Berbasis Resiko', name: 'nib' },
  { label: 'Akta Pendirian/Perubahan', name: 'akta_perusahaan' },
  { label: 'Surat Pernyataan Akta Kelahiran', name: 'surat_pernyataan' },
  { label: 'Surat Persetujuan Dewan Komisaris', name: 'surat_persetujuan' },
  { label: 'Booking Form', name: 'booking_form' },
  { label: 'Dokumen Tambahan', name: 'dokumen_tambahan' },
] as const

const PERSONAL_FIELDS = [
  { label: 'KTP / KITAS', name: 'ktp_kitas' },
  { label: 'NPWP Pribadi', name: 'npwp_pribadi' },
  { label: 'Kartu Keluarga', name: 'kartu_keluarga' },
  { label: 'Akta Kelahiran / Akta Pernikahan', name: 'akta_kelahiran_pernikahan' },
  { label: 'Booking Form', name: 'booking_form' },
  { label: 'Dokumen Tambahan', name: 'dokumen_tambahan' },
] as const

function getRelationId(value: unknown): number | string | null {
  if (!value) return null
  if (typeof value === 'number' || typeof value === 'string') return value

  if (typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: number | string }).id
    return id ?? null
  }

  return null
}

function getSubmissionTitle(submission: SubmissionDoc, collection: SubmissionCollection) {
  const name =
    collection === 'form-company-submissions'
      ? submission.fullname_company
      : submission.fullname_customer

  return name || `${collection} ${submission.id}`
}

async function findAllSubmissions(payload: Payload, collection: SubmissionCollection) {
  const docs: SubmissionDoc[] = []
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const result = await payload.find({
      collection,
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
    })

    docs.push(...(result.docs as unknown as SubmissionDoc[]))
    hasNextPage = result.hasNextPage
    page += 1
  }

  return docs
}

function indexReferences(
  referenceMap: Map<string, FormAttachmentReference[]>,
  submission: SubmissionDoc,
  collection: SubmissionCollection,
  fields: readonly { label: string; name: string }[],
) {
  for (const field of fields) {
    const rawValue = submission[field.name]
    const values = Array.isArray(rawValue) ? rawValue : [rawValue]

    for (const value of values) {
      const attachmentId = getRelationId(value)
      if (!attachmentId) continue

      const key = String(attachmentId)
      const references = referenceMap.get(key) ?? []
      references.push({
        collection,
        field: field.name,
        fieldLabel: field.label,
        id: submission.id,
        title: getSubmissionTitle(submission, collection),
      })
      referenceMap.set(key, references)
    }
  }
}

export async function getFormAttachmentReferences(payload: Payload) {
  const referenceMap = new Map<string, FormAttachmentReference[]>()

  const companySubmissions = await findAllSubmissions(payload, 'form-company-submissions')
  const personalSubmissions = await findAllSubmissions(payload, 'form-personal-submissions')

  for (const submission of companySubmissions) {
    indexReferences(referenceMap, submission, 'form-company-submissions', COMPANY_FIELDS)
  }

  for (const submission of personalSubmissions) {
    indexReferences(referenceMap, submission, 'form-personal-submissions', PERSONAL_FIELDS)
  }

  return referenceMap
}

export async function previewFormAttachmentDeletion(
  payload: Payload,
  attachmentIds: Array<number | string>,
): Promise<FormAttachmentDeletionPreview> {
  const uniqueIds = [...new Set(attachmentIds.map(String))]
  const referenceMap = await getFormAttachmentReferences(payload)
  const attachments = await Promise.all(
    uniqueIds.map(async (id) => {
      const attachment = await payload.findByID({
        collection: 'form-attachments',
        id,
        depth: 0,
        overrideAccess: true,
      })

      return attachment as AttachmentDoc
    }),
  )

  const parentSubmissionMap = new Map<string, FormAttachmentReference>()
  const unreferencedAttachmentIds: Array<number | string> = []

  const previewAttachments = attachments.map((attachment) => {
    const references = referenceMap.get(String(attachment.id)) ?? []

    if (references.length === 0) {
      unreferencedAttachmentIds.push(attachment.id)
    }

    for (const reference of references) {
      parentSubmissionMap.set(`${reference.collection}:${reference.id}`, reference)
    }

    return {
      filename: attachment.filename ?? null,
      id: attachment.id,
      references,
      title: attachment.alt || attachment.filename || `Attachment ${attachment.id}`,
    }
  })

  return {
    attachments: previewAttachments,
    parentSubmissions: [...parentSubmissionMap.values()],
    unreferencedAttachmentIds,
  }
}

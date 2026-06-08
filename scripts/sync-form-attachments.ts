import 'dotenv/config';
import { getPayload } from 'payload';
import type { Payload } from 'payload';
import config from '../payload.config';
import { s3ObjectExists } from '../lib/s3';

type CollectionSlug = 'form-company-submissions' | 'form-personal-submissions';

type SubmissionReference = {
  collection: CollectionSlug;
  id: number | string;
};

type AttachmentDoc = {
  filename?: string | null;
  id: number | string;
};

type SubmissionDoc = Record<string, unknown> & {
  id: number | string;
};

const COMPANY_FIELDS = [
  'ktp_kitas',
  'nib',
  'akta_perusahaan',
  'surat_pernyataan',
  'surat_persetujuan',
  'booking_form',
  'dokumen_tambahan',
];

const PERSONAL_FIELDS = [
  'ktp_kitas',
  'npwp_pribadi',
  'kartu_keluarga',
  'akta_kelahiran_pernikahan',
  'booking_form',
  'dokumen_tambahan',
];

const args = new Set(process.argv.slice(2));
const shouldApply = args.has('--apply');

function getRelationId(value: unknown): number | string | null {
  if (!value) return null;
  if (typeof value === 'number' || typeof value === 'string') return value;
  if (typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: number | string }).id;
    return id ?? null;
  }
  return null;
}

async function findAll<T extends { id: number | string }>(
  payload: Payload,
  collection: CollectionSlug | 'form-attachments',
) {
  const docs: T[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const result = await payload.find({
      collection: collection as never,
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
    });

    docs.push(...(result.docs as T[]));
    hasNextPage = result.hasNextPage;
    page += 1;
  }

  return docs;
}

function indexSubmissionReferences(
  referenceMap: Map<string, SubmissionReference[]>,
  submission: SubmissionDoc,
  collection: CollectionSlug,
  fields: string[],
) {
  for (const field of fields) {
    const rawValue = submission[field];
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];

    for (const value of values) {
      const attachmentId = getRelationId(value);
      if (!attachmentId) continue;

      const key = String(attachmentId);
      const refs = referenceMap.get(key) ?? [];
      refs.push({ collection, id: submission.id });
      referenceMap.set(key, refs);
    }
  }
}

async function main() {
  const missingEnv = [
    'DATABASE_URI',
    'PAYLOAD_SECRET',
    'S3_BUCKET',
    'S3_REGION',
    'S3_ACCESS_KEY_ID',
    'S3_SECRET_ACCESS_KEY',
  ].filter((key) => !process.env[key]);

  if (missingEnv.length > 0) {
    throw new Error(`Missing required env vars: ${missingEnv.join(', ')}`);
  }

  const payload = await getPayload({ config });
  const referenceMap = new Map<string, SubmissionReference[]>();

  const companySubmissions = await findAll<SubmissionDoc>(payload, 'form-company-submissions');
  const personalSubmissions = await findAll<SubmissionDoc>(payload, 'form-personal-submissions');

  for (const submission of companySubmissions) {
    indexSubmissionReferences(referenceMap, submission, 'form-company-submissions', COMPANY_FIELDS);
  }

  for (const submission of personalSubmissions) {
    indexSubmissionReferences(referenceMap, submission, 'form-personal-submissions', PERSONAL_FIELDS);
  }

  const attachments = await findAll<AttachmentDoc>(payload, 'form-attachments');
  const missingReferencedSubmissions = new Map<string, SubmissionReference>();
  const missingUnreferencedAttachmentIds: Array<number | string> = [];

  for (const attachment of attachments) {
    if (!attachment.filename) {
      missingUnreferencedAttachmentIds.push(attachment.id);
      continue;
    }

    const exists = await s3ObjectExists(attachment.filename);
    if (exists) continue;

    const references = referenceMap.get(String(attachment.id)) ?? [];
    if (references.length === 0) {
      missingUnreferencedAttachmentIds.push(attachment.id);
      continue;
    }

    for (const reference of references) {
      missingReferencedSubmissions.set(`${reference.collection}:${reference.id}`, reference);
    }
  }

  console.log(`Checked ${attachments.length} form attachment records.`);
  console.log(`Broken referenced submissions: ${missingReferencedSubmissions.size}`);
  console.log(`Broken unreferenced attachments: ${missingUnreferencedAttachmentIds.length}`);

  if (!shouldApply) {
    console.log('Dry run only. Re-run with --apply to delete broken parent submissions and unreferenced attachments.');
    return;
  }

  for (const reference of missingReferencedSubmissions.values()) {
    console.log(`Deleting ${reference.collection} submission ${reference.id} because one or more attachments are missing from S3...`);
    await payload.delete({
      collection: reference.collection,
      id: reference.id,
      overrideAccess: true,
    });
  }

  for (const id of missingUnreferencedAttachmentIds) {
    console.log(`Deleting unreferenced form attachment ${id} because its S3 file is missing...`);
    await payload.delete({
      collection: 'form-attachments',
      id,
      overrideAccess: true,
    });
  }

  console.log('Form attachment sync complete.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import { getPayloadClient } from '@/lib/payload';
import { s3ObjectExists } from '@/lib/s3';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const REQUIRED_S3_ENV = [
  'S3_BUCKET',
  'S3_REGION',
  'S3_ACCESS_KEY_ID',
  'S3_SECRET_ACCESS_KEY',
];

export async function POST(req: NextRequest) {
  console.log(`[Upload-API] Incoming POST request. Content-Type: ${req.headers.get('content-type')}`);
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      console.warn('[Upload-API] Warning: Expected multipart/form-data request.');
      return NextResponse.json(
        { error: 'Expected multipart/form-data upload request' },
        { status: 400 },
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const s3Key = formData.get('s3Key');
    const fileName = formData.get('filename');
    const fileSize = formData.get('filesize');
    const fileType = formData.get('filetype');

    console.log(`[Upload-API] Parsed Form Data - s3Key: "${s3Key}", filename: "${fileName}", filesize: "${fileSize}", filetype: "${fileType}", hasFile: ${file ? 'YES' : 'NO'}`);

    if (typeof s3Key === 'string' && s3Key) {
      console.log(`[Upload-API] S3 Key detected: "${s3Key}". Verifying upload config...`);
      const missingEnv = REQUIRED_S3_ENV.filter((key) => !process.env[key]);
      if (missingEnv.length > 0) {
        console.error(`[Upload-API] Error: Missing environment variables: ${missingEnv.join(', ')}`);
        return NextResponse.json(
          { error: `S3 upload is not configured. Missing: ${missingEnv.join(', ')}` },
          { status: 500 },
        );
      }

      const payload = await getPayloadClient();
      const originalFileName = typeof fileName === 'string' && fileName ? fileName : s3Key;
      const mimeType = typeof fileType === 'string' && fileType ? fileType : 'application/octet-stream';
      const filesize = typeof fileSize === 'string' ? Number.parseInt(fileSize, 10) : 0;
      
      console.log(`[Upload-API] Verifying existence of key "${s3Key}" in S3 bucket "${process.env.S3_BUCKET}"...`);
      const exists = await s3ObjectExists(s3Key);

      if (!exists) {
        console.warn(`[Upload-API] Warning: Key "${s3Key}" was not found in S3.`);
        return NextResponse.json(
          { error: 'Uploaded file was not found in S3. Please upload the file again.' },
          { status: 400 },
        );
      }
      console.log(`[Upload-API] Key "${s3Key}" exists in S3. Creating form-attachments doc in database...`);

      const doc = await payload.create({
        collection: 'form-attachments',
        data: {
          alt: originalFileName,
          filename: s3Key,
          mimeType,
          filesize: Number.isFinite(filesize) ? filesize : 0,
        },
      });
      console.log(`[Upload-API] Successfully created attachment document in DB. ID: "${doc.id}"`);
      return NextResponse.json({ id: doc.id });
    }

    if (!(file instanceof File) || file.size === 0) {
      console.warn('[Upload-API] Warning: No file provided or file size is 0.');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log(`[Upload-API] Non-S3 direct fallback upload. Processing file "${file.name}" of size ${file.size} bytes...`);
    const payload = await getPayloadClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const doc = await payload.create({
      collection: 'form-attachments',
      data: { alt: file.name },
      file: {
        data: buffer,
        name: file.name,
        mimetype: file.type || 'application/octet-stream',
        size: file.size,
      },
    });

    console.log(`[Upload-API] Successfully created attachment document via local fallback. ID: "${doc.id}"`);
    return NextResponse.json({ id: doc.id });
  } catch (error: any) {
    console.error('[Upload-API] ERROR during POST handler:', error);
    if (error && typeof error === 'object') {
      console.error('[Upload-API] Error stack:', error.stack);
    }
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

import { getPayloadClient } from '@/lib/payload';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const REQUIRED_S3_ENV = [
  'S3_BUCKET',
  'S3_REGION',
  'S3_ACCESS_KEY_ID',
  'S3_SECRET_ACCESS_KEY',
];

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
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

    if (typeof s3Key === 'string' && s3Key) {
      const missingEnv = REQUIRED_S3_ENV.filter((key) => !process.env[key]);
      if (missingEnv.length > 0) {
        return NextResponse.json(
          { error: `S3 upload is not configured. Missing: ${missingEnv.join(', ')}` },
          { status: 500 },
        );
      }

      const payload = await getPayloadClient();
      const originalFileName = typeof fileName === 'string' && fileName ? fileName : s3Key;
      const mimeType = typeof fileType === 'string' && fileType ? fileType : 'application/octet-stream';
      const filesize = typeof fileSize === 'string' ? Number.parseInt(fileSize, 10) : 0;

      const doc = await payload.create({
        collection: 'form-attachments',
        data: {
          alt: originalFileName,
          filename: s3Key,
          mimeType,
          filesize: Number.isFinite(filesize) ? filesize : 0,
        },
      });
      return NextResponse.json({ id: doc.id });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

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

    return NextResponse.json({ id: doc.id });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

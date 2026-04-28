import { getPayloadClient } from '@/lib/payload';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const s3Key = formData.get('s3Key') as string;
    const fileName = formData.get('filename') as string;
    const fileSize = formData.get('filesize') as string;
    const fileType = formData.get('filetype') as string;

    if (s3Key) {
      // Direct-to-S3 registration: Create the record in Payload without uploading again
      // We manually populate the fields that the S3 plugin expects
      const doc = await payload.create({
        collection: 'form-attachments',
        data: {
          alt: fileName || s3Key,
          filename: s3Key,
          mimeType: fileType || 'application/pdf',
          filesize: parseInt(fileSize || '0'),
        },
      });
      return NextResponse.json({ id: doc.id });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

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

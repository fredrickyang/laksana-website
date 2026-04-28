import { getPayloadClient } from '@/lib/payload';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const formData = await req.formData();
    const file = formData.get('file') as File;

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

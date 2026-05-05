import { getS3Client } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const REQUIRED_S3_ENV = [
  'S3_BUCKET',
  'S3_REGION',
  'S3_ACCESS_KEY_ID',
  'S3_SECRET_ACCESS_KEY',
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');
    const contentType = searchParams.get('type');

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'Missing filename or type' }, { status: 400 });
    }

    const missingEnv = REQUIRED_S3_ENV.filter((key) => !process.env[key]);
    if (missingEnv.length > 0) {
      return NextResponse.json(
        { error: `S3 upload is not configured. Missing: ${missingEnv.join(', ')}` },
        { status: 500 },
      );
    }

    const s3 = getS3Client();
    const bucket = process.env.S3_BUCKET!;
    
    // Generate a unique key to prevent collisions
    const fileExtension = filename.split('.').pop();
    const key = `${crypto.randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    // URL expires in 15 minutes
    const url = await getSignedUrl(s3, command, { expiresIn: 900 });

    return NextResponse.json({ url, key });
  } catch (error) {
    console.error('Presigned URL error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

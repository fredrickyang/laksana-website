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
  console.log(`[Presigned-URL] Incoming request URL: ${req.url}`);
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');
    const contentType = searchParams.get('type');

    console.log(`[Presigned-URL] Params - filename: "${filename}", type: "${contentType}"`);

    if (!filename || !contentType) {
      console.warn('[Presigned-URL] Error: Missing filename or type.');
      return NextResponse.json({ error: 'Missing filename or type' }, { status: 400 });
    }

    const missingEnv = REQUIRED_S3_ENV.filter((key) => !process.env[key]);
    if (missingEnv.length > 0) {
      console.error(`[Presigned-URL] Error: Missing environment variables: ${missingEnv.join(', ')}`);
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

    console.log(`[Presigned-URL] Generating pre-signed S3 URL for bucket "${bucket}" with key "${key}"...`);

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    // URL expires in 15 minutes
    const url = await getSignedUrl(s3, command, { expiresIn: 900 });

    console.log(`[Presigned-URL] Successfully generated URL: ${url.substring(0, 120)}...`);

    return NextResponse.json({ url, key });
  } catch (error: any) {
    console.error('[Presigned-URL] ERROR encountered during GET handler:', error);
    if (error && typeof error === 'object') {
      console.error('[Presigned-URL] Error stack:', error.stack);
    }
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

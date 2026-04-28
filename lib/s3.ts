import { S3Client } from '@aws-sdk/client-s3';

let s3Client: S3Client | null = null;

export function getS3Client() {
  if (s3Client) return s3Client;

  s3Client = new S3Client({
    region: process.env.S3_REGION!,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: !!process.env.S3_ENDPOINT, // Often needed for local S3-compatible storage
  });

  return s3Client;
}

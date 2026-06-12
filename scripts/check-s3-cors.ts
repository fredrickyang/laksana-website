import 'dotenv/config';
import { S3Client, GetBucketCorsCommand } from '@aws-sdk/client-s3';

async function main() {
  const bucketName = process.env.S3_BUCKET;
  const region = process.env.S3_REGION;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

  console.log(`Bucket Name: ${bucketName}`);
  console.log(`Region: ${region}`);
  console.log(`Access Key ID: ${accessKeyId ? 'Set (starts with ' + accessKeyId.substring(0, 4) + ')' : 'Not Set'}`);

  if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
    console.error('Error: Missing S3 environment variables.');
    process.exit(1);
  }

  const s3 = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  try {
    const response = await s3.send(new GetBucketCorsCommand({ Bucket: bucketName }));
    console.log('\n--- S3 CORS Rules ---');
    console.log(JSON.stringify(response.CORSRules, null, 2));
  } catch (err: any) {
    console.error('\n--- Failed to get S3 CORS configuration ---');
    if (err.name === 'NoSuchCORSConfiguration') {
      console.log('No CORS configuration exists on this bucket.');
    } else {
      console.error(err);
    }
  }
}

main();

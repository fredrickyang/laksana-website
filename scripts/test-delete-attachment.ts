import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload.config';

async function testDelete() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config });

  // 1. Create a dummy attachment record first (without uploading a file)
  console.log('Creating a dummy attachment record...');
  let docId: number | null = null;
  try {
    const doc = await payload.create({
      collection: 'form-attachments',
      data: {
        alt: 'test-delete-dummy.txt',
        filename: 'test-delete-dummy.txt', // A file that probably doesn't exist on S3
        mimeType: 'text/plain',
        filesize: 10,
      },
    });
    docId = doc.id;
    console.log(`Dummy attachment created with ID: ${docId}`);
  } catch (err) {
    console.error('Failed to create dummy attachment:', err);
    process.exit(1);
  }

  // 2. Try to delete the attachment record to see if it throws a 500 error
  if (docId) {
    console.log(`Attempting to delete attachment ID ${docId}...`);
    try {
      const result = await payload.delete({
        collection: 'form-attachments',
        id: docId,
      });
      console.log('Success! Deleted successfully.', result);
    } catch (err) {
      console.error('DELETE FAILED WITH ERROR:', err);
    }
  }

  process.exit(0);
}

testDelete();

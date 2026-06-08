import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload.config';

async function testDeleteReal() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config });

  // Let's find one of the actual attachments in the database
  console.log('Finding attachments...');
  const res = await payload.find({
    collection: 'form-attachments',
    limit: 5,
  });

  if (res.docs.length === 0) {
    console.log('No attachments found in database.');
    process.exit(0);
  }

  console.log('Found attachments:');
  res.docs.forEach(doc => {
    console.log(`  ID: ${doc.id}, Alt: ${doc.alt}, Filename: ${doc.filename}`);
  });

  // Try deleting the first attachment
  const targetDoc = res.docs[0];
  console.log(`\nAttempting to delete real attachment ID ${targetDoc.id} (${targetDoc.filename})...`);
  try {
    const result = await payload.delete({
      collection: 'form-attachments',
      id: targetDoc.id,
    });
    console.log('Success! Deleted successfully.', result);
  } catch (err) {
    console.error('DELETE FAILED WITH ERROR:', err);
  }

  process.exit(0);
}

testDeleteReal();

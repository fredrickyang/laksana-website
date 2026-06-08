import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload.config';

async function testDeleteReferenced() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config });

  const targetId = 65; // Referenced by PT Maju Mundur
  console.log(`\nAttempting to delete referenced attachment ID ${targetId}...`);
  try {
    const result = await payload.delete({
      collection: 'form-attachments',
      id: targetId,
    });
    console.log('Success! Deleted successfully.', result);
  } catch (err: any) {
    console.error('DELETE FAILED WITH ERROR:');
    console.error(err.message || err);
  }

  process.exit(0);
}

testDeleteReferenced();

import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload.config';

async function inspectUrl() {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: 'form-attachments',
    limit: 5,
  });
  console.log('Sample Form Attachments:');
  res.docs.forEach(doc => {
    console.log(`ID: ${doc.id}`);
    console.log(`  Filename: ${doc.filename}`);
    console.log(`  URL: ${doc.url}`);
  });
  process.exit(0);
}

inspectUrl();

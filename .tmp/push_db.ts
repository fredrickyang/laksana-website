import 'dotenv/config';
import { getPayload } from 'payload';
import config from './payload.config';

async function push() {
  process.env.PAYLOAD_DB_PUSH = 'true';
  console.log('Running Payload DB Push...');
  await getPayload({ config });
  console.log('Payload Initialized (DB Pushed!).');
  process.exit(0);
}
push();

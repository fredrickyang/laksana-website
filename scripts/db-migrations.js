import pg from 'pg';
import 'dotenv/config';

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URI });
  await client.connect();
  
  try {
    const res = await client.query("SELECT id, name, batch, created_at, updated_at FROM payload_migrations ORDER BY id ASC");
    console.log('\n--- Database Migrations ---');
    console.table(res.rows);
  } catch (err) {
    console.error('Error querying payload_migrations:', err.message);
  } finally {
    await client.end();
  }
}

main().catch(console.error);

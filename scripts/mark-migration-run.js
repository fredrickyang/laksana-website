import pg from 'pg';
import 'dotenv/config';

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URI });
  await client.connect();
  
  const migrationName = '20260612_114851_add_media_sizes';
  const batchNumber = 4;
  
  try {
    // Check if it already exists
    const checkRes = await client.query("SELECT id FROM payload_migrations WHERE name = $1", [migrationName]);
    if (checkRes.rows.length > 0) {
      console.log(`Migration '${migrationName}' is already marked as run.`);
      return;
    }
    
    // Insert record
    await client.query(
      "INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())",
      [migrationName, batchNumber]
    );
    console.log(`Successfully marked migration '${migrationName}' as run (batch ${batchNumber}) in the database.`);
  } catch (err) {
    console.error('Error inserting migration record:', err.message);
  } finally {
    await client.end();
  }
}

main().catch(console.error);

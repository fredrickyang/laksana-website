import 'dotenv/config'
import pg from 'pg'

async function main() {
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URI,
  })
  await client.connect()

  try {
    // List all tables
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `)
    console.log('Tables:', tablesRes.rows.map(r => r.table_name))

    // Query settings_locales table if it exists
    const settingsLocalesRes = await client.query('SELECT * FROM settings_locales')
    console.log('Raw Settings Locales:', JSON.stringify(settingsLocalesRes.rows, null, 2))

    // Query settings_rels or similar if it exists
    try {
      const relsRes = await client.query('SELECT * FROM settings_rels')
      console.log('Raw Settings Rels:', JSON.stringify(relsRes.rows, null, 2))
    } catch (e) {
      console.log('No settings_rels table')
    }

  } catch (err) {
    console.error('Error querying DB:', err)
  } finally {
    await client.end()
  }
}

main()

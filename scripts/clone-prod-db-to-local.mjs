import 'dotenv/config'
import { existsSync, mkdirSync } from 'fs'
import { spawnSync } from 'child_process'
import path from 'path'

const LOCAL_DATABASE_URI =
  process.env.LOCAL_DATABASE_URI || 'postgresql://payload:payload@127.0.0.1:54329/laksana_local'
const PROD_DATABASE_URI = process.env.PROD_DATABASE_URI || process.env.DATABASE_URI
const DUMP_PATH = path.resolve('.tmp/prod-db-snapshot.dump')
const POSTGRES_17_BIN = '/opt/homebrew/opt/postgresql@17/bin'
const PG_DUMP =
  process.env.PG_DUMP_BIN ||
  (existsSync(path.join(POSTGRES_17_BIN, 'pg_dump')) ? path.join(POSTGRES_17_BIN, 'pg_dump') : 'pg_dump')
const PG_RESTORE =
  process.env.PG_RESTORE_BIN ||
  (existsSync(path.join(POSTGRES_17_BIN, 'pg_restore'))
    ? path.join(POSTGRES_17_BIN, 'pg_restore')
    : 'pg_restore')

const args = new Set(process.argv.slice(2))
const shouldApply = args.has('--apply')
const skipDump = args.has('--skip-dump')

function redactDatabaseUri(uri) {
  const parsed = new URL(uri)
  return `${parsed.protocol}//${parsed.hostname}${parsed.port ? `:${parsed.port}` : ''}${parsed.pathname}`
}

function assertRemoteProductionUri(uri) {
  const host = new URL(uri).hostname
  const localHosts = new Set(['127.0.0.1', '::1', 'localhost'])

  if (localHosts.has(host)) {
    throw new Error('Production database URI resolves to localhost. Refusing to clone from a local source.')
  }
}

function assertDifferentDatabases() {
  if (!PROD_DATABASE_URI) {
    throw new Error('DATABASE_URI or PROD_DATABASE_URI is required as the production snapshot source.')
  }

  if (PROD_DATABASE_URI === LOCAL_DATABASE_URI) {
    throw new Error('Production and local database URIs are identical. Refusing to continue.')
  }

  assertRemoteProductionUri(PROD_DATABASE_URI)
}

function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, {
    env: process.env,
    stdio: 'inherit',
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(`${command} exited with status ${result.status}`)
  }
}

function assertLocalDatabaseIsReachable() {
  const result = spawnSync('psql', [LOCAL_DATABASE_URI, '-c', 'select 1'], {
    env: process.env,
    stdio: 'ignore',
  })

  if (result.status !== 0) {
    throw new Error(
      'Local database is not reachable. Run `pnpm db:local:up` first, then try this command again.',
    )
  }
}

function applyLocalSafeModeSchemaPatch() {
  run('psql', [
    LOCAL_DATABASE_URI,
    '-v',
    'ON_ERROR_STOP=1',
    '-c',
    [
      'alter table if exists form_attachments add column if not exists prefix varchar;',
      'alter table if exists media add column if not exists prefix varchar;',
    ].join(' '),
  ])
}

async function main() {
  assertDifferentDatabases()

  console.log('Production source:', redactDatabaseUri(PROD_DATABASE_URI))
  console.log('Local target:', redactDatabaseUri(LOCAL_DATABASE_URI))
  console.log('Snapshot:', DUMP_PATH)

  if (!shouldApply) {
    console.log('Dry run only. Re-run with `-- --apply` to overwrite the local database from production.')
    return
  }

  assertLocalDatabaseIsReachable()

  if (!existsSync('.tmp')) {
    mkdirSync('.tmp')
  }

  if (!skipDump) {
    console.log('Creating production snapshot with pg_dump...')
    run(PG_DUMP, ['--format=custom', '--no-owner', '--no-acl', '--file', DUMP_PATH, PROD_DATABASE_URI])
  } else if (!existsSync(DUMP_PATH)) {
    throw new Error(`Cannot use --skip-dump because ${DUMP_PATH} does not exist.`)
  }

  console.log('Resetting local database schema...')
  run('psql', [
    LOCAL_DATABASE_URI,
    '-v',
    'ON_ERROR_STOP=1',
    '-c',
    'drop schema if exists public cascade; create schema public;',
  ])

  console.log('Restoring snapshot into local database...')
  run(PG_RESTORE, ['--no-owner', '--no-acl', '--dbname', LOCAL_DATABASE_URI, DUMP_PATH])

  console.log('Applying local safe-mode schema patch...')
  applyLocalSafeModeSchemaPatch()

  console.log('Local database now mirrors the production snapshot.')
  console.log('Use `.env.local` with LOCAL_SAFE_MODE=true before running the CMS locally.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

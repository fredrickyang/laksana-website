import { existsSync, mkdirSync } from 'fs'
import { spawnSync } from 'child_process'
import path from 'path'

const DATA_DIR = path.resolve('.tmp/local-postgres-data')
const LOG_PATH = path.resolve('.tmp/local-postgres.log')
const POSTGRES_BIN = process.env.POSTGRES_BIN || '/opt/homebrew/opt/postgresql@17/bin'
const PG_CTL = path.join(POSTGRES_BIN, 'pg_ctl')
const INITDB = path.join(POSTGRES_BIN, 'initdb')
const PSQL = path.join(POSTGRES_BIN, 'psql')
const CREATEDB = path.join(POSTGRES_BIN, 'createdb')
const PORT = process.env.LOCAL_POSTGRES_PORT || '54329'
const HOST = '127.0.0.1'
const DB_NAME = 'laksana_local'
const DB_USER = 'payload'
const DB_PASSWORD = 'payload'

const command = process.argv[2] || 'up'

function assertPostgresTools() {
  for (const binary of [PG_CTL, INITDB, PSQL, CREATEDB]) {
    if (!existsSync(binary)) {
      throw new Error(`Missing Postgres 17 binary: ${binary}. Install it with \`brew install postgresql@17\`.`)
    }
  }
}

function run(commandPath, args, options = {}) {
  const result = spawnSync(commandPath, args, {
    env: { ...process.env, LC_ALL: 'C' },
    stdio: options.stdio || 'inherit',
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0 && !options.allowFailure) {
    throw new Error(`${commandPath} exited with status ${result.status}`)
  }

  return result
}

function isRunning() {
  const result = run(PG_CTL, ['-D', DATA_DIR, 'status'], {
    allowFailure: true,
    stdio: 'ignore',
  })

  return result.status === 0
}

function initIfNeeded() {
  if (existsSync(path.join(DATA_DIR, 'PG_VERSION'))) {
    return
  }

  mkdirSync(path.dirname(DATA_DIR), { recursive: true })
  run(INITDB, ['-D', DATA_DIR, '--auth-local=trust', '--auth-host=scram-sha-256'])
}

function start() {
  assertPostgresTools()
  initIfNeeded()

  if (isRunning()) {
    console.log(`Local Postgres is already running on ${HOST}:${PORT}.`)
    return
  }

  run(PG_CTL, ['-D', DATA_DIR, '-l', LOG_PATH, '-o', `-p ${PORT} -h ${HOST}`, 'start'])
  ensureDatabase()
}

function stop() {
  assertPostgresTools()

  if (!existsSync(DATA_DIR) || !isRunning()) {
    console.log('Local Postgres is not running.')
    return
  }

  run(PG_CTL, ['-D', DATA_DIR, 'stop'])
}

function status() {
  assertPostgresTools()

  if (!existsSync(DATA_DIR)) {
    console.log('Local Postgres has not been initialized yet.')
    return
  }

  run(PG_CTL, ['-D', DATA_DIR, 'status'])
}

function ensureDatabase() {
  const sql = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE ROLE ${DB_USER} LOGIN PASSWORD '${DB_PASSWORD}';
  ELSE
    ALTER ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASSWORD}';
  END IF;
END
$$;
`

  run(PSQL, ['-p', PORT, '-d', 'postgres', '-v', 'ON_ERROR_STOP=1', '-c', sql])

  const dbCheck = run(PSQL, ['-p', PORT, '-d', 'postgres', '-tAc', `SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`], {
    stdio: 'pipe',
  })

  if (dbCheck.stdout.toString().trim() !== '1') {
    run(CREATEDB, ['-p', PORT, '-O', DB_USER, DB_NAME])
  }
}

try {
  if (command === 'up' || command === 'start') {
    start()
  } else if (command === 'stop') {
    stop()
  } else if (command === 'status') {
    status()
  } else {
    throw new Error(`Unknown command: ${command}. Use up, status, or stop.`)
  }
} catch (error) {
  console.error(error)
  process.exit(1)
}

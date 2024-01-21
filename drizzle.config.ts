import 'dotenv/config'
import { type Config } from 'drizzle-kit'

const { DB_NAME, DB_HOST, DB_PORT, DB_ADMIN_USER, DB_ADMIN_PASSWORD } =
  process.env

if (!DB_NAME || !DB_HOST || !DB_PORT || !DB_ADMIN_USER || !DB_ADMIN_PASSWORD) {
  throw new Error(
    'Missing DB_NAME, DB_HOST, DB_PORT, DB_ADMIN_USER or DB_ADMIN_PASSWORD environment variable'
  )
}

export default {
  schema: './src/db/schema/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: DB_HOST,
    port: +DB_PORT,
    database: DB_NAME,
    user: DB_ADMIN_USER,
    password: DB_ADMIN_PASSWORD,
  },
  schemaFilter: ['public'],
} satisfies Config

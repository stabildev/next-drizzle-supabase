import 'dotenv/config'
import { type Config } from 'drizzle-kit'

const { DB_ADMIN_URL } = process.env

if (!DB_ADMIN_URL) {
  throw new Error('Missing DB_ADMIN_URL environment variable')
}

export default {
  schema: './src/db/schema/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: DB_ADMIN_URL,
  },
  schemaFilter: ['public'],
} satisfies Config

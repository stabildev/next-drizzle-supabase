import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const { DB_ADMIN_URL } = process.env

if (!DB_ADMIN_URL) {
  throw new Error('Missing DB_ADMIN_URL environment variable')
}

export default defineConfig({
  schema: './src/db/schema/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_ADMIN_URL,
  },
  schemaFilter: ['public'],
})

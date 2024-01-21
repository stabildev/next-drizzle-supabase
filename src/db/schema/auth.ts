import { pgSchema, uuid } from 'drizzle-orm/pg-core'

// This is a basic schema to enable referencing the user id in other tables.
// If you want to have access to the complete schema, just add 'auth' to the schemaFilter in drizzle.config.ts

export const auth = pgSchema('auth')

export const users = auth.table('users', {
  id: uuid('id').primaryKey().notNull(),
})

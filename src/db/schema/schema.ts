import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { users } from '@/db/schema'

export const todos = pgTable('todos', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  completedAt: timestamp('completed_at', { mode: 'date' }),
})

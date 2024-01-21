import { type InferSelectModel } from 'drizzle-orm'

import { type todos } from '@/db/schema'

export type Todo = InferSelectModel<typeof todos>

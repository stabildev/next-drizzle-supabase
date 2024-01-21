import { type ExtractTablesWithRelations, sql } from 'drizzle-orm'
import { type PgTransaction } from 'drizzle-orm/pg-core'
import { type PostgresJsQueryResultHKT, drizzle } from 'drizzle-orm/postgres-js'
import jwt from 'jsonwebtoken'
import postgres from 'postgres'
import 'server-only'

import { type Session } from '@/lib/supabase'

import * as schema from './schema'

const { DB_URL, JWT_SECRET } = process.env

if (!DB_URL) {
  throw new Error('Missing DB_URL environment variable')
}

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable')
}

const psql = postgres(DB_URL)

const db = drizzle(psql, { schema })

type TxType = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>

export const withSession = <T>(
  session: Session,
  fn: (tx: TxType) => Promise<T>
) => {
  const jwtClaims = jwt.verify(session.access_token, JWT_SECRET)

  if (!jwtClaims) {
    throw new Error('Invalid access token')
  }

  const claims = JSON.stringify(jwtClaims)
  const userId = jwtClaims.sub as string
  console.log('claims', claims)

  return db.transaction(async (tx) => {
    await tx.execute(
      sql`SELECT set_config('request.jwt.claim', '${sql.raw(claims)}', TRUE)`
    )
    await tx.execute(
      sql`SELECT set_config('request.jwt.claim.sub', '${sql.raw(userId)}', TRUE)`
    )

    return fn(tx)
  })
}

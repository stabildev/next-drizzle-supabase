import { type ExtractTablesWithRelations, sql } from 'drizzle-orm'
import { type PgTransaction } from 'drizzle-orm/pg-core'
import { type PostgresJsQueryResultHKT, drizzle } from 'drizzle-orm/postgres-js'
import jwt from 'jsonwebtoken'
import postgres from 'postgres'
import 'server-only'

import { type Session } from '@/lib/supabase'

import * as schema from './schema'

const { DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, JWT_SECRET } =
  process.env

if (!DB_NAME || !DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD) {
  throw new Error(
    'Missing DB_NAME, DB_HOST, DB_PORT, DB_USER or DB_PASSWORD environment variable'
  )
}

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable')
}

const psql = postgres({
  host: DB_HOST,
  port: +DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
})

const db = drizzle(psql, { schema })

type TxType = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>

export const authDB = <T>(session: Session, fn: (tx: TxType) => Promise<T>) => {
  const jwtClaims = jwt.verify(session.access_token, JWT_SECRET)

  if (!jwtClaims) {
    throw new Error('Invalid access token')
  }

  return db.transaction(async (tx) => {
    await tx.execute(
      sql`SET LOCAL request.jwt.claims = "${sql.raw(JSON.stringify(jwtClaims))}"`
    )

    return fn(tx)
  })
}

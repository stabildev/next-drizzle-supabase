'use server'

import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

import { withSession } from '@/db'
import { todos } from '@/db/schema'
import { getSession } from '@/lib/supabase'

export const getTodos = async () => {
  const session = await getSession(cookies())

  if (!session) {
    throw new Error('No session')
  }

  const todos = await withSession(session, (tx) => tx.query.todos.findMany())

  return todos
}

export const addTodo = async (text: string) => {
  const session = await getSession(cookies())

  if (!session) {
    throw new Error('No session')
  }

  const [{ id }] = await withSession(session, (tx) =>
    tx
      .insert(todos)
      .values({ title: text, userId: session.user.id })
      .returning({ id: todos.id })
  )

  return id
}

export const setDone = async (id: string, done: boolean) => {
  const session = await getSession(cookies())

  if (!session) {
    throw new Error('No session')
  }

  await withSession(session, (tx) =>
    tx
      .update(todos)
      .set({ completedAt: done ? new Date() : null })
      .where(eq(todos.id, id))
  )
  return true
}

export const deleteTodo = async (id: string) => {
  const session = await getSession(cookies())

  if (!session) {
    throw new Error('No session')
  }

  await withSession(session, (tx) => tx.delete(todos).where(eq(todos.id, id)))
  return true
}

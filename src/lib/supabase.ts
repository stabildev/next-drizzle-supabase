import { createServerClient } from '@supabase/ssr'
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import 'server-only'

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env

if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable'
  )
}

export const createClient = (cookies?: ReadonlyRequestCookies) => {
  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => {
          return cookies?.get(name)?.value
        },
        set: (name, value, options) => {
          try {
            cookies?.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove: (name, options) => {
          try {
            cookies?.set({ name, value: '', ...options })
          } catch (error) {
            // The `remove` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export const getSession = async (cookies: ReadonlyRequestCookies) => {
  return (await createClient(cookies).auth.getSession()).data.session
}

export type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>

export const getCurrentUser = async (cookies: ReadonlyRequestCookies) => {
  const session = await getSession(cookies)

  return session?.user ?? null
}

export type User = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>

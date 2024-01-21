import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase'

interface Props {
  message?: string
}

export const LoginForm = ({ message }: Props) => {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await createClient(cookies()).auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/dashboard')
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="flex w-full flex-1 flex-col justify-center gap-6 text-foreground animate-in"
        action={signIn}
      >
        {message && (
          <p className="mb-4 rounded-md bg-muted p-4 text-center text-muted-foreground dark:bg-muted/50">
            {message}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <Label className="text-md" htmlFor="email">
            Email
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-md" htmlFor="password">
            Password
          </Label>
          <Input
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <SubmitButton className="mt-4">Log In</SubmitButton>

        <Link
          href="/signup"
          className="text-center text-sm text-muted-foreground underline-offset-2 hover:underline"
        >
          Don&apos;t have an account? <span className="font-bold">Sign up</span>
        </Link>
      </form>
    </div>
  )
}

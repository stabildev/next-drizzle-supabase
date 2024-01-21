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

export const SignupForm = ({ message }: Props) => {
  const signUp = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      return redirect('/login?message=Email and password are required')
    }

    const { error } = await createClient(cookies()).auth.signUp({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="flex w-full flex-1 flex-col justify-center gap-6 text-foreground animate-in"
        action={signUp}
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

        <SubmitButton className="mt-4">Sign Up</SubmitButton>

        <Link
          href="/login"
          className="text-center text-sm text-muted-foreground underline-offset-2 hover:underline"
        >
          Already have an account? <span className="font-bold">Log in</span>
        </Link>
      </form>
    </div>
  )
}

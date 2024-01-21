import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase'

export const LogoutButton = () => {
  const signOut = async () => {
    'use server'

    const res = await createClient(cookies()).auth.signOut()

    if (res.error) {
      return
    }

    redirect('/')
  }

  return (
    <form action={signOut}>
      <Button variant="outline">Log Out</Button>
    </form>
  )
}

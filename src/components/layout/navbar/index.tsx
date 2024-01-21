import { cookies } from 'next/headers'
import Link from 'next/link'

import { MaxWidthWrapper } from '@/components/layout/max-width-wrapper'
import { ModeToggle } from '@/components/layout/navbar/mode-toggle'
import { buttonVariants } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/supabase'

import { LogoutButton } from './logout-button'

export const Navbar = async () => {
  const user = await getCurrentUser(cookies())

  return (
    <nav className="fixed top-0 z-10 flex h-16 w-full items-center justify-center border-b bg-background/50 backdrop-blur">
      <MaxWidthWrapper className="flex flex-row items-center justify-between text-sm">
        <Link href={!user ? '/' : '/dashboard'}>
          <h1 className="text-xl font-semibold">Next Drizzle Supabase MVP</h1>
        </Link>
        <div className="flex flex-row items-center gap-4">
          {user ? (
            <LogoutButton />
          ) : (
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href="/login"
            >
              Log In
            </Link>
          )}
          <ModeToggle />
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

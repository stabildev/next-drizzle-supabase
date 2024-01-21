import { type PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface Props extends PropsWithChildren {
  className?: string
}

export const MaxWidthWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1440px] px-4 md:px-10', className)}
    >
      {children}
    </div>
  )
}

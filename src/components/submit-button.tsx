'use client'

import { Loader2Icon } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends ButtonProps {
  disabled?: boolean
  className?: string
  forcePending?: boolean
}

export const SubmitButton = ({
  disabled,
  children = 'Submit',
  className,
  forcePending,
  variant,
  ...props
}: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      variant={variant}
      disabled={pending || forcePending || disabled}
      className={cn('relative data-[disabled=true]:opacity-50', className)}
      {...props}
    >
      <span
        className={cn('flex flex-row items-center gap-2', {
          'opacity-50': pending || forcePending,
        })}
      >
        {children}
      </span>
      {(pending || forcePending) && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2Icon
            className={cn(
              'h-6 w-6 animate-spin',
              variant === 'default' || variant === undefined
                ? 'text'
                : 'text-black'
            )}
          />
        </span>
      )}
    </Button>
  )
}

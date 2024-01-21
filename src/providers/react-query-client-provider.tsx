'use client'

import {
  QueryClientProvider as Provider,
  QueryClient,
} from '@tanstack/react-query'
import { useState, type PropsWithChildren } from 'react'

export const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  )
  return <Provider client={queryClient}>{children}</Provider>
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ReactQueryClientProvider } from '@/providers/react-query-client-provider'
import { ThemeProvider } from '@/providers/theme-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Drizzle Supabase MVP',
  description: 'Starter by Hardcoded Digital',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <Navbar />
            <div className="mt-16 flex min-h-[calc(100vh-4rem)] flex-col items-center">
              <div className="flex w-full flex-grow flex-col items-center px-4 py-12">
                {children}
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}

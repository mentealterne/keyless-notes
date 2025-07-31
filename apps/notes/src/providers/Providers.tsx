"use client";

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/react-query-client'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/providers/themeProvider/theme.context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}> <ThemeProvider>{children} </ThemeProvider></QueryClientProvider>
  );
}

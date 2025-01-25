'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MainErrorFallback } from '@/components/errors/main';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { getQueryClient } from '@/lib/react-query';
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";

const ThemeProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export const AppProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session;
}) => {
  const queryClient = getQueryClient();
  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <ReactQueryDevtools />
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

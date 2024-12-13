'use client';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from './getQueryClient';
import { theme } from './theme';
import { GlobalPortal } from '~/GlobalPortal';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <GlobalPortal.Provider>
      <QueryClientProvider client={queryClient}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Theme>{children}</Theme>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GlobalPortal.Provider>
  );
}

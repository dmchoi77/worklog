'use client';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Theme } from '@radix-ui/themes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from './getQueryClient';
import { GlobalPortal } from './GlobalPortal';
import { theme } from './theme';

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

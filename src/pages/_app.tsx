import '~/styles/globals.css';

import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

import { useState } from 'react';

import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';

import { ThemeProvider, createTheme } from '@mui/material';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import MasterLayout from '~/components/layout/MasterLayout';
import NonAuthLayout from '~/components/layout/NonAuthLayout';
import { RoutePath } from '~/constants/route';

import { GlobalPortal } from '~/GlobalPortal';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  const pathname = usePathname();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#303030cd',
      },
    },
  });

  return (
    <GlobalPortal.Provider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {pathname === RoutePath.Login || pathname === RoutePath.SignIn ? (
            <NonAuthLayout>
              <Component {...pageProps} />
            </NonAuthLayout>
          ) : (
            <HydrationBoundary state={pageProps.dehydratedState}>
              <MasterLayout>
                <Component {...pageProps} />
              </MasterLayout>
            </HydrationBoundary>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </GlobalPortal.Provider>
  );
}

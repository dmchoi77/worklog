import '~/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

import { useState } from 'react';

import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';

import { ThemeProvider, createTheme } from '@mui/material';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { MasterLayout, NonAuthLayout } from '~/components/templates/layout';

import { RoutePath } from '~/constants';
import { GlobalPortal } from '~/GlobalPortal';
import '../globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 0,
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
    <>
      <Head>
        <title>오늘의 워크로그</title>
        <meta name='description' content='오늘은 회사에서 어떤 일들이 생길까 오늘의 워크로그' />
      </Head>
      <GlobalPortal.Provider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {pathname === RoutePath.Login || pathname === RoutePath.SignIn ? (
              <NonAuthLayout>
                <Component {...pageProps} />
              </NonAuthLayout>
            ) : (
              <HydrationBoundary state={pageProps.dehydratedState}>
                <MasterLayout userAgent={pageProps.userAgent}>
                  <Component {...pageProps} />
                </MasterLayout>
              </HydrationBoundary>
            )}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </GlobalPortal.Provider>
    </>
  );
}

import '~/styles/globals.css';

import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

import { useState } from 'react';

import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

  return (
    <GlobalPortal.Provider>
      <QueryClientProvider client={queryClient}>
        {pathname === RoutePath.Login || pathname === RoutePath.SignIn ? (
          <NonAuthLayout>
            <Component {...pageProps} />
          </NonAuthLayout>
        ) : (
          <MasterLayout>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </HydrationBoundary>
          </MasterLayout>
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GlobalPortal.Provider>
  );
}

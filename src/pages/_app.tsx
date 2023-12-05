import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import MasterLayout from '~/components/layout/MasterLayout';
import { GlobalPortal } from '~/GlobalPortal';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RoutePath } from '~/constants/route';
import NonAuthLayout from '~/components/layout/NonAuthLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {},
});
export default function App({ Component, pageProps }: AppProps) {
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
            <Component {...pageProps} />
          </MasterLayout>
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GlobalPortal.Provider>
  );
}

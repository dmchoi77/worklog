import '~/styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';
import { GlobalPortal } from '~/GlobalPortal';

import MasterLayout from '~/components/layout/MasterLayout';
import NonAuthLayout from '~/components/layout/NonAuthLayout';
import { RoutePath } from '~/constants/route';

import type { AppProps } from 'next/app';

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

App.getInitialProps = async ({ ctx }: any) => {
  return {
    props: {},
  };
};

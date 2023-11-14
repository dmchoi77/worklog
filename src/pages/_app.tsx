import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import MasterLayout from '~/components/layout/MasterLayout';
import { RecoilRoot } from 'recoil';
import { GlobalPortal } from '~/GlobalPortal';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { RoutePath } from '~/constants/route';

const queryClient = new QueryClient({
  defaultOptions: {},
});
export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <GlobalPortal.Provider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          {pathname === RoutePath.Login || pathname === RoutePath.SignIn ? (
            <Component {...pageProps} />
          ) : (
            <MasterLayout>
              <Component {...pageProps} />
            </MasterLayout>
          )}
        </RecoilRoot>
      </QueryClientProvider>
    </GlobalPortal.Provider>
  );
}

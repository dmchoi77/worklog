import type { AppProps } from 'next/app';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MasterLayout, NonAuthLayout } from '~/components/templates/layout';
import { RoutePath } from '~/constants';
import { GlobalPortal } from '~/GlobalPortal';
import '~/styles/globals.css';
import '../globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  const RenderLayout = () => {
    if (pathname === RoutePath.Login || pathname === RoutePath.SignIn) {
      return (
        <NonAuthLayout>
          <Component {...pageProps} />
        </NonAuthLayout>
      );
    } else {
      return (
        <HydrationBoundary state={pageProps.dehydratedState}>
          <MasterLayout userAgent={pageProps.userAgent}>
            <Component {...pageProps} />
          </MasterLayout>
        </HydrationBoundary>
      );
    }
  };

  return (
    <>
      <Head>
        <title>오늘의 워크로그</title>
        <meta name='description' content='오늘은 회사에서 어떤 일들이 생길까 오늘의 워크로그' />
      </Head>
      <Provider>
        <RenderLayout />
      </Provider>
    </>
  );
}

const Provider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

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
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </GlobalPortal.Provider>
  );
};

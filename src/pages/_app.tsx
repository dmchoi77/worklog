import '~/styles/globals.css';

import type { AppContext, AppProps } from 'next/app';

import MasterLayout from '~/components/layout/MasterLayout';
import { GlobalPortal } from '~/GlobalPortal';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RoutePath } from '~/constants/route';
import NonAuthLayout from '~/components/layout/NonAuthLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { refreshAccessToken } from '~/apis/user';
import { getAuthTokenInstance } from '~/utils/authToken';
import { removeCookie, setCookie } from '~/utils/cookie';
import { ILoginResponse } from '~/types/apis/user.types';

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
  const { req } = ctx;
  const authToken = getAuthTokenInstance(); // 클라이언트 및 서버에서 동일한 인스턴스 사용

  const refreshToken = req?.cookies.refreshToken;
  console.log('🚀 ~ file: _app.tsx:46 ~ App.getInitialProps= ~ refreshToken:', refreshToken);
  const accessToken = authToken.getToken();
  try {
    const response = (await refreshAccessToken(refreshToken)) as ILoginResponse;

    setCookie('refreshToken', response.refreshToken, { path: '/', maxAge: 1000, secure: true });
    authToken.setToken(response.accessToken);
  } catch (e) {
    console.log('🚀 ~ file: _app.tsx:53 ~ App.getInitialProps= ~ e:', e);
  }
  // 로그인을 하고 새로고침을 한 경우
  return {
    props: {},
  };
};

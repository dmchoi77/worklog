import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import MasterLayout from '~/components/layout/MasterLayout';
import { RecoilRoot } from 'recoil';
import { GlobalPortal } from '~/GlobalPortal';
import PanelLeft from '~/components/panel/PanelLeft';
import { usePathname } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <GlobalPortal.Provider>
      <RecoilRoot>
        {pathname === '/login' || pathname === '/signin' ? (
          <Component {...pageProps} />
        ) : (
          <MasterLayout>
            <Component {...pageProps} />
          </MasterLayout>
        )}
      </RecoilRoot>
    </GlobalPortal.Provider>
  );
}

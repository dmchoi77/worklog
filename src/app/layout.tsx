import '@radix-ui/themes/styles.css';
import './globals.css';

import type { Metadata } from 'next';
import Providers from './Providers';

export const metadata: Metadata = {
  title: '오늘의 워크로그',
  description: 'Generated by create next app',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head suppressHydrationWarning>
        <link rel='preconnect' href='https://cdn.jsdelivr.net' />
        <link
          rel='preload'
          as='style'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css'
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
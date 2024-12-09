import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head />
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

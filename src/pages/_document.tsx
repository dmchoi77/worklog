import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='kor'>
      <Head />
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css'
      />
      <link
        // rel='preload'
        as='style'
        crossOrigin='anonymous'
        href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css'
      />
      <link rel='preconnect' href='https://cdn.jsdelivr.net' crossOrigin='anonymous' />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

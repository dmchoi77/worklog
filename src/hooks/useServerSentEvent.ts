import { useEffect } from 'react';

import { EventSourcePolyfill } from 'event-source-polyfill';

import { ACCESS_TOKEN } from '~/constants/cookie';
import { getCookie } from '~/utils/cookie';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const useServerSentEvent = () => {
  const accessToken = getCookie(ACCESS_TOKEN);

  useEffect(() => {
    if (typeof window === 'undefined' || !accessToken) return;
    const eventSource = new EventSourcePolyfill(`${baseURL}/connect`, {
      // const eventSource = new EventSource(`http://localhost:3100/sse`, {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log('connection opened!');
    };

    eventSource.onmessage = (e) => {
      console.log('🚀 ~ useEffect ~ e:', e);
    };

    eventSource.onerror = (e: any) => {
      // 종료 또는 에러 발생 시 할 일
      eventSource.close();

      if (e.error) {
        console.log('🚀 ~ useEffect ~ e.error:', e.error);
        // 에러 발생 시 할 일
      }

      if (e.target.readyState === EventSource.CLOSED) {
        // 종료 시 할 일
      }
    };

    return () => eventSource.close();
  }, []);
};

export default useServerSentEvent;

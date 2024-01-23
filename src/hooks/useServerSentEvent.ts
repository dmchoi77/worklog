import { useEffect } from 'react';

// import { EventSourcePolyfill } from 'event-source-polyfill';

import { useUserInfoState } from '~/stores/useUserInfoStore';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const useServerSentEvent = () => {
  const username = useUserInfoState((state) => state.username);

  useEffect(() => {
    if (typeof window === 'undefined' || !username) return;

    let eventSource: EventSource;

    const createEventSource = () => {
      eventSource = new EventSource(`${baseURL}/connect?username=${username}`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      eventSource.onopen = () => {
        console.log('connection opened!');
      };

      eventSource.onmessage = (e) => {};

      eventSource.onerror = (e: any) => {
        // 종료 또는 에러 발생 시 할 일
        eventSource.close();

        if (e.error) {
          console.log('🚀 ~ useEffect ~ e.error:', e.error);
          // 에러 발생 시 할 일
        }

        if (e.target.readyState === EventSource.CLOSED) {
          createEventSource();

          // 종료 시 할 일
        }
      };
    };

    createEventSource();

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [username]);
};

export default useServerSentEvent;

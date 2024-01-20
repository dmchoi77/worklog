import { useEffect } from 'react';

import { EventSourcePolyfill } from 'event-source-polyfill';

import { ACCESS_TOKEN } from '~/constants/cookie';
import { getCookie } from '~/utils/cookie';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const useServerSentEvent = () => {
  const accessToken = getCookie(ACCESS_TOKEN);
  const eventSource = new EventSourcePolyfill(`${baseURL}/connect`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  useEffect(() => {
    eventSource.onmessage = ({ data }) => {
      console.log('New message', JSON.parse(data));
    };
  }, []);
};

export default useServerSentEvent;

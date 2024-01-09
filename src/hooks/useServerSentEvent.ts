import { useEffect } from 'react';

const useServerSentEvent = () => {
  const eventSource = new EventSource('http://localhost:3100/sse');

  useEffect(() => {
    eventSource.onmessage = ({ data }) => {
      console.log('New message', JSON.parse(data));
    };
  }, []);
};

export default useServerSentEvent;

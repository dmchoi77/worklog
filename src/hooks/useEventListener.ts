import { useRef, useEffect } from 'react';

const useEventListener = (
  eventName: string,
  handler: any,
  element: Window | undefined = typeof window === 'undefined' ? undefined : window,
) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e: any) => savedHandler.current(e);
    element?.addEventListener(eventName, listener);

    return () => {
      element?.removeEventListener(eventName, listener);
    };
  }, [eventName, element]);
};

export default useEventListener;

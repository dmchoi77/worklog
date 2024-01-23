import { useMutation, useQuery } from '@tanstack/react-query';

import { createQueryKeys } from '@lukemorales/query-key-factory';

import { checkNotification, triggerNotification } from '~/apis/notification';

const notificationQueryKeys = createQueryKeys('notification', {
  checkNotification: ['checkNotification'],
});

export const useCheckNotification = (isLogin: boolean) => {
  return useQuery({
    queryKey: notificationQueryKeys.checkNotification.queryKey,
    queryFn: () => checkNotification(),
    enabled: isLogin,
  });
};

export const useTriggerNotification = () => {
  return useMutation({
    mutationFn: () => triggerNotification(),
  });
};
